<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <nav class="flex items-center text-sm text-gray-400 mb-4">
          <router-link to="/" class="hover:text-white transition-colors duration-200">
            Trang Chủ
          </router-link>
          <ChevronRight class="w-4 h-4 mx-2" />
          <router-link to="/categories" class="hover:text-white transition-colors duration-200">
            Thể Loại
          </router-link>
          <ChevronRight class="w-4 h-4 mx-2" />
          <span class="text-white">{{ categoryName }}</span>
        </nav>

        <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
          {{ categoryName }}
        </h1>
        <p v-if="categoryDescription" class="text-gray-400 text-lg">
          {{ categoryDescription }}
        </p>
      </div>

      <!-- Filters -->
      <div class="bg-dark-300 rounded-lg p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <!-- Country Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Quốc gia
            </label>
            <select v-model="filters.country" @change="handleFilterChange" class="input-field">
              <option value="">Tất cả quốc gia</option>
              <option value="trung-quoc">Trung Quốc</option>
              <option value="han-quoc">Hàn Quốc</option>
              <option value="nhat-ban">Nhật Bản</option>
              <option value="thai-lan">Thái Lan</option>
              <option value="au-my">Âu Mỹ</option>
              <option value="viet-nam">Việt Nam</option>
            </select>
          </div>

          <!-- Year Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Năm
            </label>
            <select v-model="filters.year" @change="handleFilterChange" class="input-field">
              <option value="">Tất cả năm</option>
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>

          <!-- Sort Field -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Sắp xếp theo
            </label>
            <select v-model="filters.sort_field" @change="handleFilterChange" class="input-field">
              <option value="modified.time">Mới cập nhật</option>
              <option value="year">Năm sản xuất</option>
              <option value="name">Tên phim</option>
              <option value="view">Lượt xem</option>
            </select>
          </div>

          <!-- Sort Type -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Kiểu sắp xếp
            </label>
            <select v-model="filters.sort_type" @change="handleFilterChange" class="input-field">
              <option value="desc">Giảm dần</option>
              <option value="asc">Tăng dần</option>
            </select>
          </div>

          <!-- Reset Button -->
          <div class="flex items-end">
            <button
              @click="resetFilters"
              class="btn-secondary w-full py-2.5 text-sm"
            >
              <RotateCcw class="w-4 h-4 mr-2" />
              Đặt lại
            </button>
          </div>
        </div>
      </div>

      <!-- Results Info -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl font-bold text-white">
            Danh sách phim {{ categoryName }}
          </h2>
          <p v-if="totalMovies" class="text-gray-400 text-sm mt-1">
            {{ totalMovies }} phim
          </p>
        </div>
        
        <div v-if="totalPages > 1" class="text-gray-400 text-sm">
          Trang {{ currentPage }} / {{ totalPages }}
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div
          v-for="n in 12"
          :key="n"
          class="bg-dark-200 rounded-lg animate-pulse aspect-[2/3]"
        ></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <AlertCircle class="w-16 h-16 mx-auto text-red-500 mb-4" />
        <h3 class="text-2xl font-bold text-white mb-2">Có lỗi xảy ra</h3>
        <p class="text-gray-400 mb-6">{{ error }}</p>
        <button @click="fetchCategoryMovies" class="btn-primary">
          Thử Lại
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="movies.length === 0" class="text-center py-16">
        <Film class="w-16 h-16 mx-auto text-gray-600 mb-4" />
        <h3 class="text-xl font-medium text-white mb-2">
          Không tìm thấy phim
        </h3>
        <p class="text-gray-400 mb-6">
          Thử thay đổi bộ lọc để xem thêm phim
        </p>
        <button @click="resetFilters" class="btn-primary">
          Đặt lại bộ lọc
        </button>
      </div>

      <!-- Movies Grid -->
      <div v-else>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <router-link
            v-for="movie in movies"
            :key="movie._id"
            :to="{ name: 'movie-detail', params: { slug: movie.slug } }"
            class="block"
          >
            <MovieCard :movie="movie" />
          </router-link>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center mt-12">
          <nav class="flex items-center space-x-2">
            <!-- Previous Button -->
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-2 text-sm bg-dark-200 text-gray-300 rounded-lg hover:bg-dark-100 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronLeft class="w-4 h-4" />
            </button>

            <!-- Page Numbers -->
            <template v-for="page in getVisiblePages()" :key="page">
              <button
                v-if="page !== '...'"
                @click="goToPage(page)"
                :class="[
                  'px-3 py-2 text-sm rounded-lg transition-colors duration-200',
                  page === currentPage
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-200 text-gray-300 hover:bg-dark-100 hover:text-white'
                ]"
              >
                {{ page }}
              </button>
              <span v-else class="px-3 py-2 text-gray-500">...</span>
            </template>

            <!-- Next Button -->
            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-2 text-sm bg-dark-200 text-gray-300 rounded-lg hover:bg-dark-100 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronRight class="w-4 h-4" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { 
  AlertCircle, 
  Film, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw 
} from 'lucide-vue-next'
import MovieCard from '@/components/MovieCard.vue'
import { movieApi } from '@/services/movieApi.js'

const route = useRoute()

// Props
const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

// Reactive data
const movies = ref([])
const loading = ref(true)
const error = ref(null)
const currentPage = ref(1)
const totalPages = ref(0)
const totalMovies = ref(0)

// Filters
const filters = ref({
  country: '',
  year: '',
  sort_field: 'modified.time',
  sort_type: 'desc',
  limit: 24
})

// Category info
const categoryName = ref('')
const categoryDescription = ref('')

// Category descriptions mapping
const categoryDescriptions = {
  'hanh-dong': 'Những bộ phim hành động kịch tính, mãn nhãn với những pha hành động đẹp mắt',
  'tinh-cam': 'Những câu chuyện tình yêu lãng mạn, cảm động và đầy cảm xúc',
  'hai-huoc': 'Những bộ phim hài hước mang lại tiếng cười và niềm vui cho khán giả',
  'kinh-di': 'Những bộ phim kinh dị ly kỳ, tạo cảm giác hồi hộp và sợ hãi',
  'chien-tranh': 'Những bộ phim chiến tranh sử thi, tái hiện những cuộc chiến tranh lịch sử',
  'co-trang': 'Những bộ phim cổ trang truyền thống với bối cảnh thời cổ đại',
  'khoa-hoc': 'Những bộ phim khoa học viễn tưởng với công nghệ tương lai',
  'phieu-luu': 'Những cuộc phiêu lưu mạo hiểm đầy thú vị và kịch tính',
  'tam-ly': 'Những bộ phim tâm lý sâu sắc, khám phá tâm hồn con người',
  'hinh-su': 'Những bộ phim hình sự trinh thám với những vụ án bí ẩn'
}

// Generate years for filter
const years = computed(() => {
  const currentYear = new Date().getFullYear()
  const yearList = []
  for (let i = currentYear; i >= 1990; i--) {
    yearList.push(i)
  }
  return yearList
})

// Methods
const fetchCategoryMovies = async (page = 1) => {
  try {
    loading.value = true
    error.value = null
    
    const params = {
      ...filters.value,
      page
    }
    
    const response = await movieApi.getCategoryDetail(props.slug, params)
    
    if (response.status) {
      movies.value = response.data?.items || []
      
      // Update pagination info
      if (response.data?.params?.pagination) {
        const pagination = response.data.params.pagination
        totalPages.value = Math.ceil(pagination.totalItems / pagination.totalItemsPerPage) || 0
        totalMovies.value = pagination.totalItems || 0
        currentPage.value = pagination.currentPage || 1
      }
      
      // Update category info
      if (response.data?.titlePage) {
        categoryName.value = response.data.titlePage
      } else {
        // Fallback: capitalize slug
        categoryName.value = props.slug.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')
      }
      
      categoryDescription.value = categoryDescriptions[props.slug] || 'Khám phá các bộ phim thú vị trong thể loại này'
      
    } else {
      throw new Error('Không thể tải danh sách phim')
    }
  } catch (err) {
    console.error('Error fetching category movies:', err)
    error.value = err.message || 'Đã xảy ra lỗi khi tải phim'
  } finally {
    loading.value = false
  }
}

const handleFilterChange = () => {
  currentPage.value = 1
  fetchCategoryMovies(1)
}

const resetFilters = () => {
  filters.value = {
    country: '',
    year: '',
    sort_field: 'modified.time',
    sort_type: 'desc',
    limit: 24
  }
  currentPage.value = 1
  fetchCategoryMovies(1)
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value && page !== currentPage.value) {
    currentPage.value = page
    fetchCategoryMovies(page)
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const getVisiblePages = () => {
  const delta = 2
  const range = []
  const rangeWithDots = []

  for (let i = Math.max(2, currentPage.value - delta); 
       i <= Math.min(totalPages.value - 1, currentPage.value + delta); 
       i++) {
    range.push(i)
  }

  if (currentPage.value - delta > 2) {
    rangeWithDots.push(1, '...')
  } else {
    rangeWithDots.push(1)
  }

  rangeWithDots.push(...range)

  if (currentPage.value + delta < totalPages.value - 1) {
    rangeWithDots.push('...', totalPages.value)
  } else if (totalPages.value > 1) {
    rangeWithDots.push(totalPages.value)
  }

  return rangeWithDots
}

// Watchers
watch(() => props.slug, (newSlug) => {
  if (newSlug) {
    resetFilters()
  }
}, { immediate: true })

// Lifecycle
onMounted(() => {
  if (props.slug) {
    fetchCategoryMovies()
  }
})
</script> 