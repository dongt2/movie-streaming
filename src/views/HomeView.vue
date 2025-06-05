<template>
  <div class="min-h-screen">
    <!-- Announcement Banner -->
    <div class="bg-dark-900 text-white py-2">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-center text-sm">
          <span class="mr-2">🔥</span>
          <p>Nếu website bị lỗi, vui lòng Ctrl + F5 để refresh lại trang</p>
        </div>
      </div>
    </div>
    <!-- Hero Section -->
    <section class="relative h-96 bg-gradient-to-r from-primary-900 to-primary-700 flex items-center">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">
          Zô Phim
        </h1>
        <p class="text-xl text-gray-200 mb-8">
          Khám phá hàng ngàn bộ phim và phim bộ mới nhất với chất lượng HD
        </p>
        <router-link to="/search" class="btn-primary text-lg px-8 py-3">
          Tìm Kiếm Phim
        </router-link>
      </div>
    </section>

    <!-- Hot Movies Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-800">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold text-white flex items-center">
          <span class="text-2xl mr-2">🔥</span>
          Phim Hot 2025
        </h2>
        <router-link to="/search" class="text-primary-500 hover:text-primary-400 text-sm">
          Xem tất cả →
        </router-link>
      </div>

      <!-- Hot Movies Loading State -->
      <div v-if="hotLoading" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div
          v-for="n in 12"
          :key="n"
          class="bg-dark-200 rounded-lg animate-pulse aspect-[2/3]"
        ></div>
      </div>

      <!-- Hot Movies Error State -->
      <div v-else-if="hotError" class="text-center py-8">
        <div class="text-red-500 mb-4">
          <AlertCircle class="w-12 h-12 mx-auto mb-2" />
          <p class="text-sm">{{ hotError }}</p>
        </div>
        <button @click="fetchHotMovies" class="btn-secondary text-sm px-4 py-2">
          Thử Lại
        </button>
      </div>

      <!-- Hot Movies Grid -->
      <div v-else-if="hotMovies.length > 0">
        <!-- Desktop Horizontal Scroll -->
        <div class="hidden md:block">
          <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            <router-link
              v-for="movie in hotMovies"
              :key="movie._id"
              :to="{ name: 'movie-detail', params: { slug: movie.slug } }"
              class="flex-shrink-0 w-40"
            >
              <MovieCard :movie="movie" />
            </router-link>
          </div>
        </div>
        
        <!-- Mobile Grid -->
        <div class="md:hidden grid grid-cols-2 gap-4">
          <router-link
            v-for="movie in hotMovies.slice(0, 6)"
            :key="movie._id"
            :to="{ name: 'movie-detail', params: { slug: movie.slug } }"
            class="block"
          >
            <MovieCard :movie="movie" />
          </router-link>
        </div>
      </div>

      <!-- No Hot Movies -->
      <div v-else class="text-center py-8">
        <p class="text-gray-400 text-sm">Chưa có phim hot nào</p>
      </div>
    </section>

    <!-- Single Movies Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-800">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold text-white flex items-center">
          <span class="text-2xl mr-2">🎬</span>
          Phim Lẻ
        </h2>
        <router-link to="/search" class="text-primary-500 hover:text-primary-400 text-sm">
          Xem tất cả →
        </router-link>
      </div>

      <!-- Single Movies Loading State -->
      <div v-if="singleLoading" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div
          v-for="n in 12"
          :key="n"
          class="bg-dark-200 rounded-lg animate-pulse aspect-[2/3]"
        ></div>
      </div>

      <!-- Single Movies Error State -->
      <div v-else-if="singleError" class="text-center py-8">
        <div class="text-red-500 mb-4">
          <AlertCircle class="w-12 h-12 mx-auto mb-2" />
          <p class="text-sm">{{ singleError }}</p>
        </div>
        <button @click="fetchSingleMovies" class="btn-secondary text-sm px-4 py-2">
          Thử Lại
        </button>
      </div>

      <!-- Single Movies Grid -->
      <div v-else-if="singleMovies.length > 0">
        <!-- Desktop Horizontal Scroll -->
        <div class="hidden md:block">
          <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            <router-link
              v-for="movie in singleMovies"
              :key="movie._id"
              :to="{ name: 'movie-detail', params: { slug: movie.slug } }"
              class="flex-shrink-0 w-40"
            >
              <MovieCard :movie="movie" />
            </router-link>
          </div>
        </div>
        
        <!-- Mobile Grid -->
        <div class="md:hidden grid grid-cols-2 gap-4">
          <router-link
            v-for="movie in singleMovies.slice(0, 6)"
            :key="movie._id"
            :to="{ name: 'movie-detail', params: { slug: movie.slug } }"
            class="block"
          >
            <MovieCard :movie="movie" />
          </router-link>
        </div>
      </div>

      <!-- No Single Movies -->
      <div v-else class="text-center py-8">
        <p class="text-gray-400 text-sm">Chưa có phim lẻ nào</p>
      </div>
    </section>

    <!-- Series Movies Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-gray-800">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold text-white flex items-center">
          <span class="text-2xl mr-2">📺</span>
          Phim Bộ
        </h2>
        <router-link to="/search" class="text-primary-500 hover:text-primary-400 text-sm">
          Xem tất cả →
        </router-link>
      </div>

      <!-- Series Movies Loading State -->
      <div v-if="seriesLoading" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div
          v-for="n in 12"
          :key="n"
          class="bg-dark-200 rounded-lg animate-pulse aspect-[2/3]"
        ></div>
      </div>

      <!-- Series Movies Error State -->
      <div v-else-if="seriesError" class="text-center py-8">
        <div class="text-red-500 mb-4">
          <AlertCircle class="w-12 h-12 mx-auto mb-2" />
          <p class="text-sm">{{ seriesError }}</p>
        </div>
        <button @click="fetchSeriesMovies" class="btn-secondary text-sm px-4 py-2">
          Thử Lại
        </button>
      </div>

      <!-- Series Movies Grid -->
      <div v-else-if="seriesMovies.length > 0">
        <!-- Desktop Horizontal Scroll -->
        <div class="hidden md:block">
          <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            <router-link
              v-for="movie in seriesMovies"
              :key="movie._id"
              :to="{ name: 'movie-detail', params: { slug: movie.slug } }"
              class="flex-shrink-0 w-40"
            >
              <MovieCard :movie="movie" />
            </router-link>
          </div>
        </div>
        
        <!-- Mobile Grid -->
        <div class="md:hidden grid grid-cols-2 gap-4">
          <router-link
            v-for="movie in seriesMovies.slice(0, 6)"
            :key="movie._id"
            :to="{ name: 'movie-detail', params: { slug: movie.slug } }"
            class="block"
          >
            <MovieCard :movie="movie" />
          </router-link>
        </div>
      </div>

      <!-- No Series Movies -->
      <div v-else class="text-center py-8">
        <p class="text-gray-400 text-sm">Chưa có phim bộ nào</p>
      </div>
    </section>

    <!-- Latest Movies Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold text-white">Phim Mới Cập Nhật</h2>
        <span v-if="totalMovies" class="text-gray-400">
          {{ totalMovies }} phim
        </span>
      </div>

      <!-- Loading State -->
      <div v-if="loading && !movies.length" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div
          v-for="n in 12"
          :key="n"
          class="bg-dark-200 rounded-lg animate-pulse aspect-[2/3]"
        ></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-500 mb-4">
          <AlertCircle class="w-16 h-16 mx-auto mb-2" />
          <p class="text-lg">{{ error }}</p>
        </div>
        <button @click="fetchMovies" class="btn-primary">
          Thử Lại
        </button>
      </div>

      <!-- Movies Grid -->
      <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <router-link
          v-for="movie in movies"
          :key="movie._id"
          :to="{ name: 'movie-detail', params: { slug: movie.slug } }"
          class="block"
        >
          <MovieCard :movie="movie" />
        </router-link>
      </div>

      <!-- Load More Button -->
      <div v-if="hasMorePages && !loading" class="text-center mt-12">
        <button
          @click="loadMore"
          :disabled="loadingMore"
          class="btn-primary px-8 py-3"
        >
          <span v-if="loadingMore" class="flex items-center">
            <Loader2 class="w-4 h-4 mr-2 animate-spin" />
            Đang tải...
          </span>
          <span v-else>Xem Thêm</span>
        </button>
      </div>

      <!-- Loading More -->
      <div v-if="loadingMore" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">
        <div
          v-for="n in 6"
          :key="n"
          class="bg-dark-200 rounded-lg animate-pulse aspect-[2/3]"
        ></div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { AlertCircle, Loader2 } from 'lucide-vue-next'
import MovieCard from '@/components/MovieCard.vue'
import { movieApi } from '@/services/movieApi.js'

// Reactive data
const movies = ref([])
const loading = ref(true)
const loadingMore = ref(false)
const error = ref(null)
const currentPage = ref(1)
const totalPages = ref(0)
const totalMovies = ref(0)

// Hot movies data
const hotMovies = ref([])
const hotLoading = ref(true)
const hotError = ref(null)

// Single movies data
const singleMovies = ref([])
const singleLoading = ref(true)
const singleError = ref(null)

// Series movies data
const seriesMovies = ref([])
const seriesLoading = ref(true)
const seriesError = ref(null)

// Computed
const hasMorePages = computed(() => currentPage.value < totalPages.value)

// Methods
const fetchMovies = async (page = 1, append = false) => {
  try {
    if (!append) {
      loading.value = true
      error.value = null
    } else {
      loadingMore.value = true
    }

    const response = await movieApi.getHomeMovies(page)
    
    if (response.status) {
      const newMovies = response.items || []
      
      if (append) {
        movies.value.push(...newMovies)
      } else {
        movies.value = newMovies
      }
      
      // Update pagination info
      if (response.pagination) {
        totalPages.value = response.pagination.totalPages || 0
        totalMovies.value = response.pagination.totalItems || 0
        currentPage.value = response.pagination.currentPage || 1
      }
    } else {
      throw new Error('Không thể tải danh sách phim')
    }
  } catch (err) {
    console.error('Error fetching movies:', err)
    error.value = err.message || 'Đã xảy ra lỗi khi tải phim'
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

const loadMore = () => {
  if (hasMorePages.value && !loadingMore.value) {
    const nextPage = currentPage.value + 1
    fetchMovies(nextPage, true)
  }
}

const fetchHotMovies = async () => {
  try {
    hotLoading.value = true
    hotError.value = null

    const response = await movieApi.getHotMovies()
    
    if (response.status === true || response.status === "success") {
      hotMovies.value = response.data?.items || []
    } else {
      throw new Error('Không thể tải danh sách phim hot')
    }
  } catch (err) {
    console.error('Error fetching hot movies:', err)
    hotError.value = err.message || 'Đã xảy ra lỗi khi tải phim hot'
  } finally {
    hotLoading.value = false
  }
}

const fetchSingleMovies = async () => {
  try {
    singleLoading.value = true
    singleError.value = null

    const response = await movieApi.getSingleMovies()
    console.log('Single movies API response:', response)
    
    if (response.status === true || response.status === "success") {
      singleMovies.value = response.data?.items || []
      console.log('Single movies found:', singleMovies.value.length)
    } else {
      throw new Error('Không thể tải danh sách phim lẻ')
    }
  } catch (err) {
    console.error('Error fetching single movies:', err)
    singleError.value = err.message || 'Đã xảy ra lỗi khi tải phim lẻ'
  } finally {
    singleLoading.value = false
  }
}

const fetchSeriesMovies = async () => {
  try {
    seriesLoading.value = true
    seriesError.value = null

    const response = await movieApi.getSeriesMovies()
    console.log('Series movies API response:', response)
    
    if (response.status === true || response.status === "success") {
      seriesMovies.value = response.data?.items || []
      console.log('Series movies found:', seriesMovies.value.length)
    } else {
      throw new Error('Không thể tải danh sách phim bộ')
    }
  } catch (err) {
    console.error('Error fetching series movies:', err)
    seriesError.value = err.message || 'Đã xảy ra lỗi khi tải phim bộ'
  } finally {
    seriesLoading.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchMovies()
  fetchHotMovies()
  fetchSingleMovies()
  fetchSeriesMovies()
})
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar { 
  display: none;  /* Safari and Chrome */
}
</style> 