<template>
  <div id="app" class="min-h-screen bg-dark-400">
    <!-- Navigation Header -->
    <nav class="bg-dark-300 shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <!-- Logo -->
            <router-link to="/" class="flex items-center">
              <div class="bg-primary-600 text-white p-2 rounded-lg mr-3">
                <Play class="w-6 h-6" />
              </div>
              <span class="text-xl font-bold text-white">PhimMoi</span>
            </router-link>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-8">
            <router-link
              to="/"
              class="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
              active-class="text-white"
            >
              Trang Chủ
            </router-link>
            <router-link
              to="/categories"
              class="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
              active-class="text-white"
            >
              Thể Loại
            </router-link>
            <router-link
              to="/search"
              class="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
              active-class="text-white"
            >
              Tìm Kiếm
            </router-link>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="text-gray-400 hover:text-white focus:outline-none focus:text-white"
            >
              <Menu class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-dark-200">
          <router-link
            to="/"
            @click="mobileMenuOpen = false"
            class="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
          >
            Trang Chủ
          </router-link>
          <router-link
            to="/categories"
            @click="mobileMenuOpen = false"
            class="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
          >
            Thể Loại
          </router-link>
          <router-link
            to="/search"
            @click="mobileMenuOpen = false"
            class="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
          >
            Tìm Kiếm
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-dark-300 mt-16">
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-gray-400 text-sm">
            © 2025 PhimMoi. Xem phim online miễn phí với chất lượng HD.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Play, Menu } from 'lucide-vue-next'

const mobileMenuOpen = ref(false)
</script> 