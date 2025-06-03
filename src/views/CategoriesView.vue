<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Thể Loại Phim
        </h1>
        <p class="text-gray-400 text-lg">
          Khám phá phim theo thể loại yêu thích của bạn
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="n in 12"
          :key="n"
          class="bg-dark-200 rounded-lg h-32 animate-pulse"
        ></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <AlertCircle class="w-16 h-16 mx-auto text-red-500 mb-4" />
        <h2 class="text-2xl font-bold text-white mb-2">Không thể tải thể loại</h2>
        <p class="text-gray-400 mb-6">{{ error }}</p>
        <button @click="fetchCategories" class="btn-primary">
          Thử Lại
        </button>
      </div>

      <!-- Categories Grid -->
      <div v-else-if="categories.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <router-link
          v-for="category in categories"
          :key="category._id"
          :to="{ name: 'category-detail', params: { slug: category.slug } }"
          class="block group"
        >
          <div class="bg-dark-300 hover:bg-dark-200 rounded-lg p-6 text-center transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg">
            <!-- Category Icon -->
            <div class="mb-4">
              <div class="w-16 h-16 mx-auto bg-primary-600 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-200">
                <Film class="w-8 h-8 text-white" />
              </div>
            </div>

            <!-- Category Name -->
            <h3 class="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors duration-200">
              {{ category.name }}
            </h3>

            <!-- Category Description or Count -->
            <p class="text-sm text-gray-400">
              {{ getCategoryDescription(category.slug) }}
            </p>
          </div>
        </router-link>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <Film class="w-16 h-16 mx-auto text-gray-600 mb-4" />
        <h3 class="text-xl font-medium text-white mb-2">
          Chưa có thể loại nào
        </h3>
        <p class="text-gray-400">
          Danh sách thể loại sẽ được cập nhật sớm
        </p>
      </div>

      <!-- Popular Categories Section -->
      <div v-if="popularCategories.length > 0" class="mt-16">
        <h2 class="text-2xl font-bold text-white mb-8 text-center">
          Thể Loại Phổ Biến
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link
            v-for="category in popularCategories"
            :key="category._id"
            :to="{ name: 'category-detail', params: { slug: category.slug } }"
            class="block group"
          >
            <div class="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 rounded-lg p-6 text-white transition-all duration-200 group-hover:scale-105">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-4">
                  <Star class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-1">{{ category.name }}</h3>
                  <p class="text-primary-100 text-sm">Phim {{ category.name.toLowerCase() }}</p>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { AlertCircle, Film, Star } from 'lucide-vue-next'
import { movieApi } from '@/services/movieApi.js'

// Reactive data
const categories = ref([])
const loading = ref(true)
const error = ref(null)

// Category descriptions mapping
const categoryDescriptions = {
  'hanh-dong': 'Phim hành động kịch tính',
  'tinh-cam': 'Phim tình cảm lãng mạn',
  'hai-huoc': 'Phim hài hước vui nhộn',
  'kinh-di': 'Phim kinh dị ly kỳ',
  'chien-tranh': 'Phim chiến tranh sử thi',
  'co-trang': 'Phim cổ trang truyền thống',
  'khoa-hoc': 'Phim khoa học viễn tưởng',
  'phieu-luu': 'Phim phiêu lưu mạo hiểm',
  'tam-ly': 'Phim tâm lý tình cảm',
  'hinh-su': 'Phim hình sự trinh thám',
  'chieu-rap': 'Phim chiếu rạp mới nhất',
  'le': 'Phim lẻ đặc sắc',
  'bo': 'Phim bộ dài tập',
  'hoathinh': 'Phim hoạt hình anime'
}

// Computed
const popularCategories = computed(() => {
  // Define some popular categories
  const popularSlugs = ['hanh-dong', 'tinh-cam', 'hai-huoc', 'co-trang', 'khoa-hoc', 'phieu-luu']
  return categories.value.filter(cat => popularSlugs.includes(cat.slug)).slice(0, 6)
})

// Methods
const fetchCategories = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await movieApi.getCategories()
    
    if (response.status) {
      // The API structure might vary, handle different possible structures
      if (response.data && response.data.items) {
        categories.value = response.data.items
      } else if (response.items) {
        categories.value = response.items
      } else if (Array.isArray(response.data)) {
        categories.value = response.data
      } else {
        categories.value = []
      }
    } else {
      throw new Error('Không thể tải danh sách thể loại')
    }
  } catch (err) {
    console.error('Error fetching categories:', err)
    error.value = err.message || 'Đã xảy ra lỗi khi tải thể loại'
  } finally {
    loading.value = false
  }
}

const getCategoryDescription = (slug) => {
  return categoryDescriptions[slug] || 'Khám phá phim thú vị'
}

// Lifecycle
onMounted(() => {
  fetchCategories()
})
</script> 