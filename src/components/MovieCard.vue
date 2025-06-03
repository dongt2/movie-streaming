<template>
  <div class="card hover:scale-105 transition-transform duration-200 group cursor-pointer">
    <div class="relative aspect-[2/3] overflow-hidden">
      <!-- Movie Poster -->
      <img
        :src="getImageUrl(movie.poster_url || movie.thumb_url)"
        :alt="movie.name"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
        @error="handleImageError"
      />
      
      <!-- Quality Badge -->
      <div
        v-if="movie.quality"
        class="absolute top-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded"
      >
        {{ movie.quality }}
      </div>

      <!-- Episode Badge -->
      <div
        v-if="movie.episode_current"
        class="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded"
      >
        {{ movie.episode_current }}
      </div>

      <!-- Play Button Overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div class="bg-primary-600 rounded-full p-3">
          <Play class="w-8 h-8 text-white" fill="white" />
        </div>
      </div>
    </div>

    <!-- Movie Info -->
    <div class="p-4">
      <h3 class="text-white font-medium text-sm mb-2 line-clamp-2">
        {{ movie.name }}
      </h3>
      
      <div class="flex items-center justify-between text-xs text-gray-400">
        <span v-if="movie.year">{{ movie.year }}</span>
        <span v-if="movie.time">{{ movie.time }}</span>
      </div>

      <div v-if="movie.lang" class="mt-2">
        <span class="text-xs bg-gray-600 text-gray-200 px-2 py-1 rounded">
          {{ movie.lang }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Play } from 'lucide-vue-next'
import { getImageUrl, getPlaceholderImage } from '@/utils/imageUtils.js'

defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const handleImageError = (event) => {
  event.target.src = getPlaceholderImage()
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 