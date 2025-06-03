<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search Header -->
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Tìm Kiếm Phim
        </h1>
        <p class="text-gray-400 text-lg">
          Khám phá hàng ngàn bộ phim và phim bộ theo ý thích
        </p>
      </div>

      <!-- Search Form -->
      <div class="bg-dark-300 rounded-lg p-6 mb-8">
        <form @submit.prevent="handleSearch" class="space-y-6">
          <!-- Main Search -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Từ khóa
            </label>
            <div class="relative">
              <input
                v-model="searchParams.keyword"
                type="text"
                placeholder="Nhập tên phim, diễn viên, đạo diễn..."
                class="input-field pr-12"
                @keyup.enter="handleSearch"
                @input="handleInputChange"
                @focus="showSuggestions = true"
                @blur="hideSuggestionsDelayed"
              />
              <button
                type="submit"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <Search class="w-5 h-5" />
              </button>
              
              <!-- Search Suggestions Dropdown -->
              <div 
                v-if="showSuggestions && (suggestions.length > 0 || suggestionLoading || searchParams.keyword.length === 0)" 
                class="absolute top-full left-0 right-0 bg-dark-300 border border-gray-600 rounded-lg mt-1 max-h-80 overflow-y-auto z-50 shadow-2xl"
              >
                <div class="p-2">
                  <!-- Popular searches when no keyword -->
                  <div v-if="searchParams.keyword.length === 0">
                    <p class="text-xs text-gray-400 mb-2 px-2">🔥 Từ khóa phổ biến</p>
                    <div class="flex flex-wrap gap-2 p-2">
                      <button 
                        v-for="popularKeyword in popularKeywords"
                        :key="popularKeyword"
                        @mousedown="fillPopularKeyword(popularKeyword)"
                        class="px-3 py-1.5 bg-dark-200 hover:bg-primary-600 text-gray-300 hover:text-white rounded-full text-sm transition-colors"
                      >
                        {{ popularKeyword }}
                      </button>
                    </div>
                  </div>
                  
                  <!-- Search suggestions -->
                  <div v-else>
                    <p class="text-xs text-gray-400 mb-2 px-2">💡 Gợi ý tìm kiếm</p>
                    
                    <!-- Loading State -->
                    <div v-if="suggestionLoading" class="flex items-center justify-center py-4">
                      <Loader2 class="w-5 h-5 animate-spin text-primary-500 mr-2" />
                      <span class="text-gray-400 text-sm">Đang tìm gợi ý...</span>
                    </div>
                    
                    <!-- Suggestions List -->
                    <div v-else>
                      <div
                        v-for="suggestion in suggestions"
                        :key="suggestion._id"
                        class="flex items-center p-2 hover:bg-dark-200 rounded cursor-pointer transition-colors group"
                      >
                        <!-- Navigate to movie detail -->
                        <div 
                          @mousedown="navigateToMovie(suggestion)"
                          class="flex items-center flex-1 min-w-0"
                        >
                          <img
                            :src="getImageUrl(suggestion.poster_url)"
                            :alt="suggestion.name"
                            class="w-10 h-14 object-cover rounded mr-3 flex-shrink-0"
                            @error="$event.target.src = getPlaceholderImage(40, 56)"
                          />
                          <div class="flex-1 min-w-0">
                            <p class="text-white text-sm font-medium truncate">{{ suggestion.name }}</p>
                            <p class="text-gray-400 text-xs truncate">{{ suggestion.origin_name }}</p>
                            <div class="flex items-center gap-2 mt-1">
                              <span class="text-xs px-2 py-0.5 bg-primary-600 text-white rounded">{{ suggestion.year }}</span>
                              <span class="text-xs text-gray-500">{{ suggestion.episode_current }}</span>
                            </div>
                          </div>
                        </div>
                        
                        <!-- Action buttons -->
                        <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            @mousedown="fillKeyword(suggestion)"
                            class="p-1.5 text-gray-500 hover:text-primary-500 transition-colors"
                            title="Điền vào ô tìm kiếm"
                          >
                            <Search class="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>



      <!-- Initial State -->
      <div class="text-center py-16">
        <Search class="w-24 h-24 mx-auto text-gray-600 mb-6" />
        <h3 class="text-xl font-medium text-white mb-2">
          Bắt đầu tìm kiếm phim yêu thích
        </h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Search, SearchX, AlertCircle, Loader2 } from 'lucide-vue-next'
import MovieCard from '@/components/MovieCard.vue'
import { movieApi } from '@/services/movieApi.js'
import { getImageUrl, getPlaceholderImage } from '@/utils/imageUtils.js'

// Router
const router = useRouter()

// Reactive data
const movies = ref([])
const categories = ref([])
const countries = ref([])
const loading = ref(false)
const loadingMore = ref(false)
const error = ref(null)
const hasSearched = ref(false)
const currentPage = ref(1)
const totalPages = ref(0)
const totalMovies = ref(0)
const showSuggestions = ref(false)
const suggestions = ref([])
const suggestionLoading = ref(false)
const suggestionDebounceTimer = ref(null)

// Popular search keywords
const popularKeywords = ref([
  'Hành động', 'Tình cảm', 'Cổ trang', 'Hài hước', 'Kinh dị',
  'Hàn Quốc', 'Trung Quốc', 'Nhật Bản', 'Thái Lan', 'Âu Mỹ',
  '2024', '2023', 'Vietsub', 'Thuyết minh'
])

// Search parameters
const searchParams = ref({
  keyword: '',
  category: '',
  country: '',
  year: '',
  sort_field: 'modified.time',
  sort_type: 'desc',
  sort_lang: '',
  limit: 24
})

// Generate years for filter
const years = computed(() => {
  const currentYear = new Date().getFullYear()
  const yearList = []
  for (let i = currentYear; i >= 1990; i--) {
    yearList.push(i)
  }
  return yearList
})

// Computed
const hasMorePages = computed(() => currentPage.value < totalPages.value)

// Methods
const fetchCategories = async () => {
  try {
    const response = await movieApi.getCategories()
    if ((response.status === true || response.status === "success") && response.data && response.data.items) {
      categories.value = response.data.items
    }
  } catch (err) {
    console.error('Error fetching categories:', err)
  }
}

const fetchCountries = async () => {
  try {
    const response = await movieApi.getCountries()
    if ((response.status === true || response.status === "success") && response.data && response.data.items) {
      countries.value = response.data.items
    }
  } catch (err) {
    console.error('Error fetching countries:', err)
  }
}

const handleSearch = async (append = false) => {
  try {
    if (!append) {
      loading.value = true
      error.value = null
      currentPage.value = 1
    } else {
      loadingMore.value = true
    }

    const params = {
      ...searchParams.value,
      page: append ? currentPage.value + 1 : 1
    }

    const response = await movieApi.searchMovies(params)
    
    if (response.status === true || response.status === "success") {
      const newMovies = response.data?.items || []
      
      if (append) {
        movies.value.push(...newMovies)
        currentPage.value += 1
      } else {
        movies.value = newMovies
        hasSearched.value = true
        currentPage.value = 1
      }
      
      // Update pagination info
      if (response.data?.params) {
        totalPages.value = Math.ceil(response.data.params.pagination.totalItems / response.data.params.pagination.totalItemsPerPage) || 0
        totalMovies.value = response.data.params.pagination.totalItems || 0
      }
    } else {
      throw new Error('Không thể tìm kiếm phim')
    }
  } catch (err) {
    console.error('Error searching movies:', err)
    error.value = err.message || 'Đã xảy ra lỗi khi tìm kiếm'
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

const loadMore = () => {
  if (hasMorePages.value && !loadingMore.value) {
    handleSearch(true)
  }
}

const resetSearch = () => {
  searchParams.value = {
    keyword: '',
    category: '',
    country: '',
    year: '',
    sort_field: 'modified.time',
    sort_type: 'desc',
    sort_lang: '',
    limit: 24
  }
  movies.value = []
  hasSearched.value = false
  error.value = null
}

const handleInputChange = async () => {
  // Clear previous timer
  if (suggestionDebounceTimer.value) {
    clearTimeout(suggestionDebounceTimer.value)
  }

  // Hide suggestions if keyword is too short
  if (searchParams.value.keyword.length < 2) {
    suggestions.value = []
    showSuggestions.value = false
    return
  }

  // Set debounced timer
  suggestionDebounceTimer.value = setTimeout(async () => {
    try {
      suggestionLoading.value = true
      showSuggestions.value = true
      
      const response = await movieApi.getSuggestions(searchParams.value.keyword)
      if (response.status === true || response.status === "success") {
        suggestions.value = response.data?.items || []
      }
    } catch (err) {
      console.error('Error fetching suggestions:', err)
      suggestions.value = []
    } finally {
      suggestionLoading.value = false
    }
  }, 300) // 300ms debounce delay
}

const hideSuggestionsDelayed = () => {
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}

const navigateToMovie = (suggestion) => {
  showSuggestions.value = false
  router.push({ name: 'movie-detail', params: { slug: suggestion.slug } })
}

const fillKeyword = (suggestion) => {
  searchParams.value.keyword = suggestion.name
  showSuggestions.value = false
}

const fillPopularKeyword = (keyword) => {
  searchParams.value.keyword = keyword
  showSuggestions.value = false
}

// Lifecycle
onMounted(() => {
  fetchCategories()
  fetchCountries()
})
</script> 