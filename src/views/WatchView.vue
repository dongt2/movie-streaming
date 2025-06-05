<template>
  <div class="min-h-screen bg-black">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <Loader2 class="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
        <p class="text-white text-lg">Đang tải phim...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <AlertCircle class="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-white mb-2">Không thể phát video</h2>
        <p class="text-gray-400 mb-6">{{ error }}</p>
        <router-link :to="{ name: 'movie-detail', params: { slug: movieSlug } }" class="btn-primary">
          Quay Lại
        </router-link>
      </div>
    </div>

    <!-- Video Player -->
    <div v-else-if="currentEpisode && videoUrl" class="w-full">
      <!-- Video Container -->
      <div class="relative w-full" :class="isFullscreen ? 'h-screen' : 'aspect-video'">
        <!-- Iframe Player for Embed URLs -->
        <iframe
          v-if="isEmbedUrl(videoUrl)"
          :src="videoUrl"
          class="w-full h-full bg-black"
          frameborder="0"
          allowfullscreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          @load="onVideoCanPlay"
        ></iframe>

        <!-- HTML5 Video Player for Direct URLs -->
        <video
          v-else
          ref="videoPlayer"
          :src="getDirectVideoUrl(videoUrl)"
          class="w-full h-full bg-black"
          controls
          preload="metadata"
          @loadstart="onVideoLoadStart"
          @canplay="onVideoCanPlay"
          @error="onVideoError"
          @ended="onVideoEnded"
        >
          <p class="text-white p-4">
            Trình duyệt của bạn không hỗ trợ video HTML5.
          </p>
        </video>

        <!-- Loading Overlay -->
        <div
          v-if="videoLoading"
          class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75"
        >
          <div class="text-center">
            <Loader2 class="w-8 h-8 text-white animate-spin mx-auto mb-2" />
            <p class="text-white text-sm">Đang tải video...</p>
          </div>
        </div>

        <!-- Controls Overlay (only show for HTML5 video) -->
        <div v-if="!isEmbedUrl(videoUrl)" class="absolute bottom-4 right-4 flex gap-2">
          <button
            @click="toggleFullscreen"
            class="bg-black bg-opacity-50 text-white p-2 rounded-lg hover:bg-opacity-75 transition-colors"
          >
            <Maximize class="w-5 h-5" />
          </button>
        </div>

        <!-- Player Type Indicator -->
        <div class="absolute top-4 left-4">
          <span class="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
            {{ isEmbedUrl(videoUrl) ? 'Embed Player' : 'Direct Stream' }}
          </span>
        </div>
      </div>

      <!-- Movie Info & Episodes -->
      <div class="bg-dark-400 min-h-screen">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <!-- Movie Title & Episode Info -->
          <div class="mb-8">
            <h1 class="text-2xl md:text-3xl font-bold text-white mb-2">
              {{ movie?.name }}
            </h1>
            <div class="flex items-center gap-4 text-gray-400">
              <span class="text-primary-500 font-medium">
                {{ currentEpisode.name }}
              </span>
              <span v-if="movie?.year">{{ movie.year }}</span>
              <span v-if="movie?.quality">{{ movie.quality }}</span>
            </div>
          </div>

          <!-- Server Selection (if multiple servers available) -->
          <div v-if="availableServers.length > 1" class="mb-8">
            <h3 class="text-lg font-medium text-white mb-4">Chọn server phát:</h3>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="(server, index) in availableServers"
                :key="index"
                @click="changeServer(index)"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                  currentServerIndex === index
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-200 text-gray-300 hover:bg-dark-100 hover:text-white'
                ]"
              >
                Server {{ index + 1 }}
                <span v-if="server.server_name" class="ml-1">({{ server.server_name }})</span>
              </button>
            </div>
          </div>

          <!-- Episode Navigation -->
          <div v-if="episodes.length > 1" class="mb-8">
            <h3 class="text-lg font-medium text-white mb-4">Chọn tập phim:</h3>
            <div class="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
              <router-link
                v-for="episode in episodes"
                :key="episode.name"
                :to="{ 
                  name: 'watch', 
                  params: { 
                    slug: movieSlug, 
                    episode: episode.slug 
                  } 
                }"
                class="text-center py-2 px-3 rounded-lg transition-colors duration-200 text-sm font-medium"
                :class="isCurrentEpisode(episode) 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-dark-200 text-gray-300 hover:bg-dark-100 hover:text-white'"
              >
                {{ episode.name }}
              </router-link>
            </div>
          </div>

          <!-- Episode Navigation Buttons -->
          <div v-if="episodes.length > 1" class="flex justify-between mb-8">
            <router-link
              v-if="previousEpisode"
              :to="{ 
                name: 'watch', 
                params: { 
                  slug: movieSlug, 
                  episode: previousEpisode.slug 
                } 
              }"
              class="btn-secondary inline-flex items-center"
            >
              <ChevronLeft class="w-4 h-4 mr-1" />
              Tập trước
            </router-link>
            <div v-else></div>

            <router-link
              v-if="nextEpisode"
              :to="{ 
                name: 'watch', 
                params: { 
                  slug: movieSlug, 
                  episode: nextEpisode.slug 
                } 
              }"
              class="btn-primary inline-flex items-center"
            >
              Tập tiếp
              <ChevronRight class="w-4 h-4 ml-1" />
            </router-link>
            <div v-else></div>
          </div>

          <!-- Movie Details -->
          <div v-if="movie" class="bg-dark-300 rounded-lg p-6">
            <div class="md:flex md:space-x-6">
              <!-- Poster -->
              <div class="md:w-48 mb-4 md:mb-0">
                <img
                  :src="movie.poster_url || movie.thumb_url"
                  :alt="movie.name"
                  class="w-full aspect-[2/3] object-cover rounded-lg"
                  @error="handleImageError"
                />
              </div>

              <!-- Info -->
              <div class="flex-1">
                <h3 class="text-xl font-bold text-white mb-4">Thông tin phim</h3>
                
                <!-- Movie Meta -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div v-if="movie.origin_name">
                    <span class="text-gray-400 text-sm">Tên gốc:</span>
                    <p class="text-white">{{ movie.origin_name }}</p>
                  </div>
                  <div v-if="movie.year">
                    <span class="text-gray-400 text-sm">Năm:</span>
                    <p class="text-white">{{ movie.year }}</p>
                  </div>
                  <div v-if="movie.time">
                    <span class="text-gray-400 text-sm">Thời lượng:</span>
                    <p class="text-white">{{ movie.time }}</p>
                  </div>
                  <div v-if="movie.lang">
                    <span class="text-gray-400 text-sm">Ngôn ngữ:</span>
                    <p class="text-white">{{ movie.lang }}</p>
                  </div>
                </div>

                <!-- Categories -->
                <div v-if="movie.category && movie.category.length" class="mb-4">
                  <span class="text-gray-400 text-sm">Thể loại:</span>
                  <div class="flex flex-wrap gap-2 mt-1">
                    <span
                      v-for="cat in movie.category"
                      :key="cat.id"
                      class="px-2 py-1 bg-dark-200 text-gray-300 text-xs rounded"
                    >
                      {{ cat.name }}
                    </span>
                  </div>
                </div>

                <!-- Description -->
                <div v-if="movie.content">
                  <span class="text-gray-400 text-sm">Nội dung:</span>
                  <div
                    class="text-gray-300 text-sm mt-1 leading-relaxed"
                    v-html="movie.content"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { 
  AlertCircle, 
  Loader2, 
  Maximize, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-vue-next'
import { movieApi } from '@/services/movieApi.js'

const route = useRoute()

// Props
const props = defineProps({
  slug: {
    type: String,
    required: true
  },
  episode: {
    type: String,
    default: ''
  }
})

// Reactive data
const movie = ref(null)
const episodes = ref([])
const availableServers = ref([])
const currentEpisode = ref(null)
const currentServerIndex = ref(0)
const loading = ref(true)
const videoLoading = ref(false)
const error = ref(null)
const videoPlayer = ref(null)
const isFullscreen = ref(false)

// Computed
const movieSlug = computed(() => props.slug)

const videoUrl = computed(() => {
  if (!currentEpisode.value || availableServers.value.length === 0) return null
  
  const currentServer = availableServers.value[currentServerIndex.value]
  if (!currentServer || !currentServer.server_data) return null
  
  const episode = currentServer.server_data.find(ep => ep.slug === props.episode)
  return episode?.link_embed || episode?.link_m3u8 || null
})

const currentEpisodeIndex = computed(() => {
  return episodes.value.findIndex(ep => ep.slug === props.episode)
})

const previousEpisode = computed(() => {
  const prevIndex = currentEpisodeIndex.value - 1
  return prevIndex >= 0 ? episodes.value[prevIndex] : null
})

const nextEpisode = computed(() => {
  const nextIndex = currentEpisodeIndex.value + 1
  return nextIndex < episodes.value.length ? episodes.value[nextIndex] : null
})

// Methods
const isEmbedUrl = (url) => {
  if (!url) return false
  return url.includes('player.phimapi.com') || url.includes('embed') || url.includes('iframe')
}

const getDirectVideoUrl = (url) => {
  if (!url) return null
  
  // If it's an embed URL, try to extract the direct video URL
  if (url.includes('player.phimapi.com/player/?url=')) {
    try {
      const urlObj = new URL(url)
      const directUrl = urlObj.searchParams.get('url')
      return directUrl || url
    } catch (e) {
      console.warn('Could not parse embed URL:', url)
      return url
    }
  }
  
  return url
}

const fetchMovieDetail = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await movieApi.getMovieDetail(props.slug)
    
    if (response.status && response.movie) {
      movie.value = response.movie
      
      // Fix: Get episodes from response.episodes, not response.movie.episodes
      if (response.episodes && response.episodes.length > 0) {
        availableServers.value = response.episodes
        
        // Get episodes from the first server
        const firstServer = availableServers.value[0]
        episodes.value = firstServer.server_data || []
        
        // Set current episode
        setCurrentEpisode()
      } else {
        throw new Error('Không tìm thấy tập phim')
      }
    } else {
      throw new Error('Không tìm thấy thông tin phim')
    }
  } catch (err) {
    console.error('Error fetching movie detail:', err)
    error.value = err.message || 'Đã xảy ra lỗi khi tải phim'
  } finally {
    loading.value = false
  }
}

const setCurrentEpisode = () => {
  if (episodes.value.length === 0) return
  
  let targetEpisode = null
  
  if (props.episode) {
    // Find episode by slug
    targetEpisode = episodes.value.find(ep => ep.slug === props.episode)
  }
  
  // Fallback to first episode
  if (!targetEpisode) {
    targetEpisode = episodes.value[0]
  }
  
  currentEpisode.value = targetEpisode
}

const isCurrentEpisode = (episode) => {
  return episode.slug === props.episode
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/300x450/1f2937/9ca3af?text=No+Image'
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    videoPlayer.value?.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

const changeServer = (index) => {
  if (index >= 0 && index < availableServers.value.length) {
    currentServerIndex.value = index
    
    // Update episodes list from the new server
    const newServer = availableServers.value[index]
    episodes.value = newServer.server_data || []
    
    // Reset video loading state
    videoLoading.value = true
    setTimeout(() => {
      videoLoading.value = false
    }, 1000)
  }
}

// Video event handlers
const onVideoLoadStart = () => {
  videoLoading.value = true
}

const onVideoCanPlay = () => {
  videoLoading.value = false
}

const onVideoError = (event) => {
  console.error('Video error:', event)
  videoLoading.value = false
  
  // Try switching to next server if available
  if (currentServerIndex.value < availableServers.value.length - 1) {
    console.log('Switching to next server...')
    changeServer(currentServerIndex.value + 1)
  } else {
    error.value = 'Không thể phát video từ tất cả server. Vui lòng thử lại sau.'
  }
}

const onVideoEnded = () => {
  // Auto play next episode if available
  if (nextEpisode.value) {
    // Automatically navigate to next episode
    // This could be made optional with a setting
  }
}

// Watchers
watch([() => props.slug, () => props.episode], () => {
  if (props.slug) {
    currentServerIndex.value = 0 // Reset server selection
    fetchMovieDetail()
  }
}, { immediate: true })

watch(() => props.episode, () => {
  setCurrentEpisode()
})

// Handle fullscreen changes
document.addEventListener('fullscreenchange', () => {
  isFullscreen.value = !!document.fullscreenElement
})

// Lifecycle
onMounted(() => {
  if (props.slug) {
    fetchMovieDetail()
  }
})
</script> 