<template>
  <div class="min-h-screen">
    <!-- Loading State -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="animate-pulse">
        <div class="md:flex md:space-x-8">
          <div class="md:w-1/3">
            <div class="bg-dark-200 aspect-[2/3] rounded-lg"></div>
          </div>
          <div class="md:w-2/3 mt-6 md:mt-0">
            <div class="bg-dark-200 h-8 rounded mb-4"></div>
            <div class="bg-dark-200 h-4 rounded mb-2"></div>
            <div class="bg-dark-200 h-4 rounded mb-4 w-3/4"></div>
            <div class="bg-dark-200 h-24 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <AlertCircle class="w-16 h-16 mx-auto text-red-500 mb-4" />
      <h2 class="text-2xl font-bold text-white mb-2">Không tìm thấy phim</h2>
      <p class="text-gray-400 mb-6">{{ error }}</p>
      <router-link to="/" class="btn-primary">
        Về Trang Chủ
      </router-link>
    </div>

    <!-- Movie Detail -->
    <div v-else-if="movie" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Movie Info Section -->
      <div class="md:flex md:space-x-8 mb-12">
        <!-- Poster -->
        <div class="md:w-1/3">
          <img
            :src="movie.poster_url || movie.thumb_url"
            :alt="movie.name"
            class="w-full aspect-[2/3] object-cover rounded-lg shadow-lg"
            @error="handleImageError"
          />
        </div>

        <!-- Details -->
        <div class="md:w-2/3 mt-6 md:mt-0">
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
            {{ movie.name }}
          </h1>
          
          <h2 v-if="movie.origin_name" class="text-xl text-gray-300 mb-4">
            {{ movie.origin_name }}
          </h2>

          <!-- Movie Meta -->
          <div class="flex flex-wrap gap-4 mb-6">
            <span v-if="movie.year" class="inline-flex items-center px-3 py-1 bg-primary-600 text-white text-sm rounded-full">
              <Calendar class="w-4 h-4 mr-1" />
              {{ movie.year }}
            </span>
            <span v-if="movie.time" class="inline-flex items-center px-3 py-1 bg-gray-600 text-white text-sm rounded-full">
              <Clock class="w-4 h-4 mr-1" />
              {{ movie.time }}
            </span>
            <span v-if="movie.quality" class="inline-flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded-full">
              <Monitor class="w-4 h-4 mr-1" />
              {{ movie.quality }}
            </span>
            <span v-if="movie.lang" class="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
              <Globe class="w-4 h-4 mr-1" />
              {{ movie.lang }}
            </span>
          </div>

          <!-- Categories -->
          <div v-if="movie.category && movie.category.length" class="mb-6">
            <h3 class="text-sm font-medium text-gray-400 mb-2">Thể loại:</h3>
            <div class="flex flex-wrap gap-2">
              <router-link
                v-for="cat in movie.category"
                :key="cat.id"
                :to="{ name: 'category-detail', params: { slug: cat.slug } }"
                class="px-3 py-1 bg-dark-200 text-gray-300 hover:text-white text-sm rounded transition-colors duration-200"
              >
                {{ cat.name }}
              </router-link>
            </div>
          </div>

          <!-- Countries -->
          <div v-if="movie.country && movie.country.length" class="mb-6">
            <h3 class="text-sm font-medium text-gray-400 mb-2">Quốc gia:</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="country in movie.country"
                :key="country.id"
                class="px-3 py-1 bg-dark-200 text-gray-300 text-sm rounded"
              >
                {{ country.name }}
              </span>
            </div>
          </div>

          <!-- Description -->
          <div v-if="movie.content" class="mb-6">
            <h3 class="text-lg font-medium text-white mb-2">Nội dung phim:</h3>
            <div
              class="text-gray-300 leading-relaxed"
              v-html="movie.content"
            ></div>
          </div>

          <!-- Watch Button -->
          <div class="flex gap-4">
            <router-link
              v-if="hasEpisodes"
              :to="getWatchLink()"
              class="btn-primary text-lg px-8 py-3 inline-flex items-center"
            >
              <Play class="w-5 h-5 mr-2" />
              Xem Phim
            </router-link>
            <button
              v-else
              disabled
              class="bg-gray-600 text-gray-400 text-lg px-8 py-3 rounded-lg cursor-not-allowed"
            >
              Chưa có tập phim
            </button>
          </div>
        </div>
      </div>

      <!-- Episodes Section -->
      <div v-if="hasEpisodes" class="mb-12">
        <EpisodesDisplay :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { 
  AlertCircle, 
  Calendar, 
  Clock, 
  Monitor, 
  Globe, 
  Play 
} from 'lucide-vue-next'
import { movieApi } from '@/services/movieApi.js'
import EpisodesDisplay from '@/components/EpisodesDisplay.vue'

const route = useRoute()

// Props
const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

// Reactive data
const movie = ref(null)
const loading = ref(true)
const error = ref(null)

// Computed
const hasEpisodes = computed(() => {
  return movie.value?.episodes && 
         movie.value.episodes.length > 0 && 
         movie.value.episodes[0]?.server_data && 
         movie.value.episodes[0].server_data.length > 0
})

// Methods
const fetchMovieDetail = async (slug) => {
  try {
    loading.value = true
    error.value = null
    
    const response = await movieApi.getMovieDetail(slug)
    
    if (response.status && response.movie) {
      movie.value = {
        ...response.movie,
        episodes: response.episodes || []
      }
    } else {
      throw new Error('Không tìm thấy thông tin phim')
    }
  } catch (err) {
    console.error('Error fetching movie detail:', err)
    error.value = err.message || 'Đã xảy ra lỗi khi tải thông tin phim'
  } finally {
    loading.value = false
  }
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/300x450/1f2937/9ca3af?text=No+Image'
}

const getWatchLink = () => {
  if (!hasEpisodes.value) return '#'
  
  // Get first episode from first server
  const firstServer = movie.value.episodes[0]
  const firstEpisode = firstServer?.server_data?.[0]
  
  if (!firstEpisode) return '#'
  
  return {
    name: 'watch',
    params: {
      slug: movie.value.slug,
      episode: firstEpisode.slug
    }
  }
}

// Watchers
watch(() => props.slug, (newSlug) => {
  if (newSlug) {
    fetchMovieDetail(newSlug)
  }
}, { immediate: true })

// Lifecycle
onMounted(() => {
  if (props.slug) {
    fetchMovieDetail(props.slug)
  }
})
</script> 