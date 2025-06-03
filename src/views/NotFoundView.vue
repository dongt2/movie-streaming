<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <!-- 404 Illustration -->
      <div class="mb-8">
        <div class="relative">
          <!-- Background Circle -->
          <div class="w-48 h-48 mx-auto bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center opacity-10"></div>
          
          <!-- 404 Text -->
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-8xl font-bold text-primary-600">404</span>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">
        Trang không tồn tại
      </h1>
      
      <p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. 
        Hãy kiểm tra lại đường dẫn hoặc quay về trang chủ.
      </p>

      <!-- Action Buttons -->
      <div class="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
        <router-link to="/" class="btn-primary inline-flex items-center px-8 py-3">
          <Home class="w-5 h-5 mr-2" />
          Về Trang Chủ
        </router-link>
        
        <button @click="goBack" class="btn-secondary inline-flex items-center px-8 py-3">
          <ArrowLeft class="w-5 h-5 mr-2" />
          Quay Lại
        </button>
        
        <router-link to="/search" class="btn-secondary inline-flex items-center px-8 py-3">
          <Search class="w-5 h-5 mr-2" />
          Tìm Kiếm
        </router-link>
      </div>

      <!-- Helpful Links -->
      <div class="mt-12">
        <h3 class="text-lg font-medium text-white mb-4">
          Hoặc bạn có thể thử:
        </h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <router-link 
            to="/" 
            class="bg-dark-300 hover:bg-dark-200 rounded-lg p-4 text-center transition-colors duration-200 group"
          >
            <Film class="w-8 h-8 mx-auto text-primary-500 mb-2 group-hover:text-primary-400" />
            <p class="text-white font-medium">Phim Mới</p>
            <p class="text-gray-400 text-sm">Khám phá phim mới nhất</p>
          </router-link>
          
          <router-link 
            to="/categories" 
            class="bg-dark-300 hover:bg-dark-200 rounded-lg p-4 text-center transition-colors duration-200 group"
          >
            <Grid class="w-8 h-8 mx-auto text-primary-500 mb-2 group-hover:text-primary-400" />
            <p class="text-white font-medium">Thể Loại</p>
            <p class="text-gray-400 text-sm">Duyệt theo thể loại</p>
          </router-link>
          
          <router-link 
            to="/search" 
            class="bg-dark-300 hover:bg-dark-200 rounded-lg p-4 text-center transition-colors duration-200 group"
          >
            <Search class="w-8 h-8 mx-auto text-primary-500 mb-2 group-hover:text-primary-400" />
            <p class="text-white font-medium">Tìm Kiếm</p>
            <p class="text-gray-400 text-sm">Tìm phim yêu thích</p>
          </router-link>
        </div>
      </div>

      <!-- Fun Message -->
      <div class="mt-12 p-4 bg-dark-300 rounded-lg max-w-lg mx-auto">
        <p class="text-gray-300 text-sm">
          <span class="text-primary-500 font-medium">Mẹo:</span>
          Hãy thử sử dụng chức năng tìm kiếm để tìm bộ phim bạn đang tìm kiếm!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { 
  Home, 
  ArrowLeft, 
  Search, 
  Film, 
  Grid 
} from 'lucide-vue-next'

const router = useRouter()

const goBack = () => {
  // Check if there's history to go back to
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    // If no history, go to home
    router.push('/')
  }
}
</script> 