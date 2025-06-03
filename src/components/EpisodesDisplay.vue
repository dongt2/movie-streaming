<template>
  <div v-if="hasEpisodes" class="mb-12">
    <!-- Episodes Header -->
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-2xl font-bold text-white">
        Danh sách tập phim
        <span class="text-base text-gray-400 ml-2">
          ({{ totalEpisodes }} tập)
        </span>
      </h3>
      
      <!-- Completion Status -->
      <div v-if="movie.episode_current" class="flex items-center gap-2">
        <CheckCircle class="w-5 h-5 text-green-500" />
        <span class="text-green-400 text-sm font-medium">
          {{ movie.episode_current }}
        </span>
      </div>
    </div>

    <!-- Server Selection -->
    <div v-if="availableServers.length > 1" class="mb-6">
      <h4 class="text-lg font-medium text-white mb-4">Chọn server:</h4>
      <div class="flex flex-wrap gap-3">
        <button
          v-for="(server, index) in availableServers"
          :key="index"
          @click="selectServer(index)"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
            selectedServerIndex === index
              ? 'bg-primary-600 text-white shadow-lg'
              : 'bg-dark-200 text-gray-300 hover:bg-dark-100 hover:text-white'
          ]"
        >
          <Monitor class="w-4 h-4 inline mr-2" />
          {{ server.server_name }}
          <span class="ml-2 text-xs opacity-75">
            ({{ server.server_data.length }} tập)
          </span>
        </button>
      </div>
    </div>

    <!-- Episodes Grid -->
    <div class="space-y-6">
      <!-- Episodes per row indicator -->
      <div class="flex items-center justify-between text-sm text-gray-400">
        <span>Tổng cộng: {{ currentEpisodes.length }} tập</span>
        <div class="flex items-center gap-2">
          <button
            @click="viewMode = 'grid'"
            :class="viewMode === 'grid' ? 'text-primary-500' : 'text-gray-400'"
          >
            <Grid3X3 class="w-4 h-4" />
          </button>
          <button
            @click="viewMode = 'list'"
            :class="viewMode === 'list' ? 'text-primary-500' : 'text-gray-400'"
          >
            <List class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Grid View -->
      <div 
        v-if="viewMode === 'grid'"
        class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 xl:grid-cols-15 gap-3"
      >
        <router-link
          v-for="(episode, index) in currentEpisodes"
          :key="episode.slug"
          :to="{ 
            name: 'watch', 
            params: { 
              slug: movie.slug, 
              episode: episode.slug 
            } 
          }"
          class="group relative bg-dark-200 hover:bg-primary-600 text-center py-3 px-2 rounded-lg transition-all duration-200 text-white font-medium transform hover:scale-105"
          :title="`Xem ${episode.name}`"
        >
          <!-- Episode Number -->
          <div class="text-sm">{{ episode.name }}</div>
          
          <!-- Play Icon on Hover -->
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Play class="w-4 h-4 text-white" fill="currentColor" />
          </div>

          <!-- Episode Quality Indicator -->
          <div v-if="getEpisodeQuality(episode)" class="absolute top-1 right-1">
            <span class="text-xs bg-green-600 text-white px-1 rounded">
              {{ getEpisodeQuality(episode) }}
            </span>
          </div>
        </router-link>
      </div>

      <!-- List View -->
      <div v-else class="space-y-2">
        <router-link
          v-for="(episode, index) in currentEpisodes"
          :key="episode.slug"
          :to="{ 
            name: 'watch', 
            params: { 
              slug: movie.slug, 
              episode: episode.slug 
            } 
          }"
          class="flex items-center justify-between p-4 bg-dark-200 hover:bg-primary-600 rounded-lg transition-all duration-200 text-white group"
        >
          <div class="flex items-center gap-4">
            <div class="flex-shrink-0 w-8 h-8 bg-dark-300 rounded-full flex items-center justify-center text-sm font-medium">
              {{ index + 1 }}
            </div>
            <div>
              <div class="font-medium">{{ episode.name }}</div>
              <div class="text-sm text-gray-400">{{ episode.filename || 'Không có mô tả' }}</div>
            </div>
          </div>
          
          <div class="flex items-center gap-3">
            <span v-if="getEpisodeQuality(episode)" class="text-xs bg-green-600 text-white px-2 py-1 rounded">
              {{ getEpisodeQuality(episode) }}
            </span>
            <Play class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
        </router-link>
      </div>
    </div>

    <!-- Episode Range Navigation (for series with many episodes) -->
    <div v-if="currentEpisodes.length > 60" class="mt-6 flex justify-center">
      <div class="flex items-center gap-2">
        <button
          v-for="range in episodeRanges"
          :key="range.label"
          @click="scrollToEpisodeRange(range.start)"
          class="px-3 py-1 text-sm bg-dark-200 hover:bg-primary-600 text-gray-300 hover:text-white rounded transition-colors duration-200"
        >
          {{ range.label }}
        </button>
      </div>
    </div>

    <!-- Quick Action Buttons -->
    <div class="mt-6 flex justify-center gap-4">
      <router-link
        :to="{ 
          name: 'watch', 
          params: { 
            slug: movie.slug, 
            episode: currentEpisodes[0]?.slug 
          } 
        }"
        class="btn-primary inline-flex items-center"
      >
        <Play class="w-4 h-4 mr-2" />
        Xem Tập Đầu
      </router-link>
      
      <router-link
        v-if="currentEpisodes.length > 1"
        :to="{ 
          name: 'watch', 
          params: { 
            slug: movie.slug, 
            episode: currentEpisodes[currentEpisodes.length - 1]?.slug 
          } 
        }"
        class="btn-secondary inline-flex items-center"
      >
        <FastForward class="w-4 h-4 mr-2" />
        Xem Tập Cuối
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  Play, 
  Monitor, 
  CheckCircle, 
  Grid3X3, 
  List,
  FastForward
} from 'lucide-vue-next'

// Props
const props = defineProps({
  movie: {
    type: Object,
    required: true
  },
  episodes: {
    type: Array,
    default: () => []
  }
})

// Reactive data
const selectedServerIndex = ref(0)
const viewMode = ref('grid') // 'grid' or 'list'

// Computed properties
const availableServers = computed(() => {
  return props.movie?.episodes || []
})

const hasEpisodes = computed(() => {
  return availableServers.value.length > 0 && currentEpisodes.value.length > 0
})

const currentEpisodes = computed(() => {
  if (availableServers.value.length === 0) return []
  
  const currentServer = availableServers.value[selectedServerIndex.value]
  return currentServer?.server_data || []
})

const totalEpisodes = computed(() => {
  if (availableServers.value.length === 0) return 0
  const episodeCounts = availableServers.value.map(server => server.server_data?.length || 0)
  return Math.max(...episodeCounts)
})

const episodeRanges = computed(() => {
  const total = currentEpisodes.value.length
  const ranges = []
  
  for (let i = 0; i < total; i += 60) {
    const end = Math.min(i + 59, total - 1)
    ranges.push({
      label: `${i + 1}-${end + 1}`,
      start: i,
      end: end
    })
  }
  
  return ranges
})

// Methods
const selectServer = (index) => {
  selectedServerIndex.value = index
}

const getEpisodeQuality = (episode) => {
  // Extract quality from filename or use movie quality
  if (episode.filename?.includes('1080p')) return 'FHD'
  if (episode.filename?.includes('720p')) return 'HD'
  if (episode.filename?.includes('480p')) return 'SD'
  return props.movie.quality || ''
}

const scrollToEpisodeRange = (startIndex) => {
  // Scroll to specific episode range (could be enhanced with actual scrolling)
  console.log(`Scrolling to episode range starting at ${startIndex + 1}`)
}

// Lifecycle
onMounted(() => {
  // Auto-select first server with most episodes
  if (availableServers.value.length > 0) {
    const serverWithMostEpisodes = availableServers.value.reduce((prev, current) => {
      return (current.server_data?.length || 0) > (prev.server_data?.length || 0) ? current : prev
    })
    
    selectedServerIndex.value = availableServers.value.indexOf(serverWithMostEpisodes)
  }
})
</script>

<style scoped>
/* Custom grid for more episodes per row on larger screens */
@media (min-width: 1536px) {
  .xl\:grid-cols-15 {
    grid-template-columns: repeat(15, minmax(0, 1fr));
  }
}
</style> 