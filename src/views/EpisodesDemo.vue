<template>
  <div class="min-h-screen bg-dark-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Demo Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-white mb-4">
          🎬 Episodes Display Demo
        </h1>
        <p class="text-gray-400 text-lg">
          Demonstrating enhanced episodes display for "Thiếu Hoa Nhược Cẩm"
        </p>
      </div>

      <!-- Movie Info Card -->
      <div class="bg-dark-300 rounded-lg p-6 mb-8">
        <div class="md:flex md:space-x-6">
          <div class="md:w-48 mb-4 md:mb-0">
            <img
              :src="demoMovie.poster_url"
              :alt="demoMovie.name"
              class="w-full aspect-[2/3] object-cover rounded-lg"
            />
          </div>
          
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-white mb-2">{{ demoMovie.name }}</h2>
            <h3 class="text-lg text-gray-300 mb-4">{{ demoMovie.origin_name }}</h3>
            
            <div class="flex flex-wrap gap-3 mb-4">
              <span class="inline-flex items-center px-3 py-1 bg-primary-600 text-white text-sm rounded-full">
                {{ demoMovie.year }}
              </span>
              <span class="inline-flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded-full">
                {{ demoMovie.quality }}
              </span>
              <span class="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                {{ demoMovie.lang }}
              </span>
              <span class="inline-flex items-center px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
                {{ demoMovie.episode_current }}
              </span>
            </div>
            
            <div class="text-gray-300 leading-relaxed">
              {{ demoMovie.content.substring(0, 300) }}...
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced Episodes Display -->
      <EpisodesDisplay :movie="demoMovie" />

      <!-- API Data Information -->
      <div class="mt-12 bg-dark-300 rounded-lg p-6">
        <h3 class="text-xl font-bold text-white mb-4">📊 API Data Structure</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h4 class="text-lg font-medium text-white mb-2">Server 1: Vietsub</h4>
            <ul class="text-gray-300 text-sm space-y-1">
              <li>• Total Episodes: {{ demoMovie.episodes[0].server_data.length }}</li>
              <li>• Quality: 1080p FHD</li>
              <li>• Language: Vietnamese Subtitles</li>
              <li>• Format: M3U8 + Embed Player</li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-medium text-white mb-2">Server 2: Thuyết Minh</h4>
            <ul class="text-gray-300 text-sm space-y-1">
              <li>• Total Episodes: {{ demoMovie.episodes[1].server_data.length }}</li>
              <li>• Quality: 1080p FHD</li>
              <li>• Language: Vietnamese Dubbed</li>
              <li>• Format: M3U8 + Embed Player</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Features Showcase -->
      <div class="mt-8 grid md:grid-cols-3 gap-6">
        <div class="bg-dark-300 rounded-lg p-6">
          <div class="text-primary-500 mb-3">
            <Monitor class="w-8 h-8" />
          </div>
          <h4 class="text-lg font-medium text-white mb-2">Multiple Servers</h4>
          <p class="text-gray-400 text-sm">
            Switch between Vietsub (25 tập) and Thuyết Minh (24 tập) servers seamlessly.
          </p>
        </div>
        
        <div class="bg-dark-300 rounded-lg p-6">
          <div class="text-green-500 mb-3">
            <Grid3X3 class="w-8 h-8" />
          </div>
          <h4 class="text-lg font-medium text-white mb-2">Grid & List Views</h4>
          <p class="text-gray-400 text-sm">
            Toggle between compact grid view and detailed list view for episodes.
          </p>
        </div>
        
        <div class="bg-dark-300 rounded-lg p-6">
          <div class="text-blue-500 mb-3">
            <Play class="w-8 h-8" />
          </div>
          <h4 class="text-lg font-medium text-white mb-2">Quick Actions</h4>
          <p class="text-gray-400 text-sm">
            Jump to first episode, last episode, or any specific episode quickly.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Monitor, Grid3X3, Play } from 'lucide-vue-next'
import EpisodesDisplay from '@/components/EpisodesDisplay.vue'

// Demo movie data based on your provided JSON
const demoMovie = {
  "_id": "4703873a678a5cd835a7500d9a0948d1",
  "name": "Thiếu Hoa Nhược Cẩm",
  "slug": "thieu-hoa-nhuoc-cam",
  "origin_name": "Youthful Glory",
  "content": "Thiếu Hoa Nhược Cẩm kể về câu chuyện tình yêu của Minh Đàn, con gái của Tĩnh An hầu phủ và Giang Tự - chiến thần của Đại Hiển. Minh Đàn được ban hôn cho Giang Tự, nhưng sợ chàng là kẻ thô tục nên mới tìm cách lẻn vào quân doanh để xem mặt phu quân tương lai. Thế nhưng nàng không ngờ bản thân vừa gặp đã yêu. Giang Tự và Minh Đàn sau khi thành hôn bắt đầu trải qua mối tình nhiều ngọt ngào nhưng cũng lắm hoạn nạn, cuối cùng từ trong gian khó bồi đắp nên chân tình, cảm nhận được thế nào là hạnh phúc đích thực.",
  "type": "series",
  "status": "completed",
  "poster_url": "https://phimimg.com/upload/vod/20250519-1/168d93b4029d4038e06d38c0ec25164a.jpg",
  "thumb_url": "https://phimimg.com/upload/vod/20250519-1/5a11177fe7bf3d9e7a40c3aa0c21e5e6.jpg",
  "is_copyright": false,
  "sub_docquyen": false,
  "chieurap": false,
  "trailer_url": "https://www.youtube.com/watch?v=jMryyGoHlS0",
  "time": "46 phút/tập",
  "episode_current": "Hoàn Tất (25/25)",
  "episode_total": "25",
  "quality": "FHD",
  "lang": "Vietsub + Thuyết Minh",
  "notify": "",
  "showtimes": "",
  "year": 2025,
  "view": 0,
  "actor": ["Tống Uy Long", "Bao Thượng Ân", "Đại Lộ Oa", "Kha Oánh", "Bạch Thự", "Tân Hiểu Huyên", "Vương Khả", "Toàn Y Luân", "Dương Bác Tiêu", "Tôn Tổ Quân"],
  "director": ["Mạnh Quốc Huy", "Tạ Quốc Vĩ"],
  "category": [
    {"id": "37a7b38b6184a5ebd3c43015aa20709d", "name": "Chính Kịch", "slug": "chinh-kich"},
    {"id": "3a17c7283b71fa84e5a8d76fb790ed3e", "name": "Cổ Trang", "slug": "co-trang"},
    {"id": "bb2b4b030608ca5984c8dd0770f5b40b", "name": "Tình Cảm", "slug": "tinh-cam"},
    {"id": "a7b065b92ad356387ef2e075dee66529", "name": "Tâm Lý", "slug": "tam-ly"}
  ],
  "country": [{"id": "3e075636c731fe0f889c69e0bf82c083", "name": "Trung Quốc", "slug": "trung-quoc"}],
  "episodes": [
    {
      "server_name": "#Hà Nội (Vietsub)",
      "server_data": [
        {"name": "Tập 01", "slug": "tap-01", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 01", "link_embed": "https://player.phimapi.com/player/?url=https://s4.phim1280.tv/20250519/qCxUeTXq/index.m3u8", "link_m3u8": "https://s4.phim1280.tv/20250519/qCxUeTXq/index.m3u8"},
        {"name": "Tập 02", "slug": "tap-02", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 02", "link_embed": "https://player.phimapi.com/player/?url=https://s4.phim1280.tv/20250519/DZB9EDtR/index.m3u8", "link_m3u8": "https://s4.phim1280.tv/20250519/DZB9EDtR/index.m3u8"},
        {"name": "Tập 03", "slug": "tap-03", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 03", "link_embed": "https://player.phimapi.com/player/?url=https://s4.phim1280.tv/20250519/k9r5sXFJ/index.m3u8", "link_m3u8": "https://s4.phim1280.tv/20250519/k9r5sXFJ/index.m3u8"},
        {"name": "Tập 04", "slug": "tap-04", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 04", "link_embed": "https://player.phimapi.com/player/?url=https://s5.phim1280.tv/20250520/TqFpUVtg/index.m3u8", "link_m3u8": "https://s5.phim1280.tv/20250520/TqFpUVtg/index.m3u8"},
        {"name": "Tập 05", "slug": "tap-05", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 05", "link_embed": "https://player.phimapi.com/player/?url=https://s5.phim1280.tv/20250520/2P4s1CwF/index.m3u8", "link_m3u8": "https://s5.phim1280.tv/20250520/2P4s1CwF/index.m3u8"},
        {"name": "Tập 06", "slug": "tap-06", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 06", "link_embed": "https://player.phimapi.com/player/?url=https://s4.phim1280.tv/20250521/jLKe1QGf/index.m3u8", "link_m3u8": "https://s4.phim1280.tv/20250521/jLKe1QGf/index.m3u8"},
        {"name": "Tập 07", "slug": "tap-07", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 07", "link_embed": "https://player.phimapi.com/player/?url=https://s4.phim1280.tv/20250521/NqgN3i4g/index.m3u8", "link_m3u8": "https://s4.phim1280.tv/20250521/NqgN3i4g/index.m3u8"},
        {"name": "Tập 08", "slug": "tap-08", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 08", "link_embed": "https://player.phimapi.com/player/?url=https://s4.phim1280.tv/20250521/1VVOtPYD/index.m3u8", "link_m3u8": "https://s4.phim1280.tv/20250521/1VVOtPYD/index.m3u8"},
        {"name": "Tập 09", "slug": "tap-09", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 09", "link_embed": "https://player.phimapi.com/player/?url=https://s4.phim1280.tv/20250522/goVOvemF/index.m3u8", "link_m3u8": "https://s4.phim1280.tv/20250522/goVOvemF/index.m3u8"},
        {"name": "Tập 10", "slug": "tap-10", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 10", "link_embed": "https://player.phimapi.com/player/?url=https://s4.phim1280.tv/20250522/oBesdlK5/index.m3u8", "link_m3u8": "https://s4.phim1280.tv/20250522/oBesdlK5/index.m3u8"},
        {"name": "Tập 11", "slug": "tap-11", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 11", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250525/85NSexTc/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250525/85NSexTc/index.m3u8"},
        {"name": "Tập 12", "slug": "tap-12", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 12", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250526/uoErhCGp/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250526/uoErhCGp/index.m3u8"},
        {"name": "Tập 13", "slug": "tap-13", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 13", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250526/ota3W0xJ/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250526/ota3W0xJ/index.m3u8"},
        {"name": "Tập 14", "slug": "tap-14", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 14", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250526/0wDCVi4z/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250526/0wDCVi4z/index.m3u8"},
        {"name": "Tập 15", "slug": "tap-15", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 15", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250526/Ab1kRNAD/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250526/Ab1kRNAD/index.m3u8"},
        {"name": "Tập 16", "slug": "tap-16", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 16", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250527/4TSCwtFT/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250527/4TSCwtFT/index.m3u8"},
        {"name": "Tập 17", "slug": "tap-17", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 17", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250527/IvJSuhnr/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250527/IvJSuhnr/index.m3u8"},
        {"name": "Tập 18", "slug": "tap-18", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 18", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250528/qwwLosZL/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250528/qwwLosZL/index.m3u8"},
        {"name": "Tập 19", "slug": "tap-19", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 19", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250528/Uh75RVOf/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250528/Uh75RVOf/index.m3u8"},
        {"name": "Tập 20", "slug": "tap-20", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 20", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250529/PKzAJlsr/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250529/PKzAJlsr/index.m3u8"},
        {"name": "Tập 21", "slug": "tap-21", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 21", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250529/Mah9Fap4/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250529/Mah9Fap4/index.m3u8"},
        {"name": "Tập 22", "slug": "tap-22", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 22", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250530/dtsl3oiX/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250530/dtsl3oiX/index.m3u8"},
        {"name": "Tập 23", "slug": "tap-23", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 23", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250531/SSnBcPQp/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250531/SSnBcPQp/index.m3u8"},
        {"name": "Tập 24", "slug": "tap-24", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 24", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250601/PQRrdJoZ/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250601/PQRrdJoZ/index.m3u8"},
        {"name": "Tập 25", "slug": "tap-25", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Vietsub - Tập 25", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250602/wab6v4lL/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250602/wab6v4lL/index.m3u8"}
      ]
    },
    {
      "server_name": "#Hà Nội (Thuyết Minh)",
      "server_data": [
        {"name": "Tập 01", "slug": "tap-01", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 01", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250524/p7bC0yP7/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250524/p7bC0yP7/index.m3u8"},
        {"name": "Tập 02", "slug": "tap-02", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 02", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250524/JLxWODqW/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250524/JLxWODqW/index.m3u8"},
        {"name": "Tập 03", "slug": "tap-03", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 03", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250524/GUcns4gN/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250524/GUcns4gN/index.m3u8"},
        {"name": "Tập 04", "slug": "tap-04", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 04", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250524/PlEWnMz4/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250524/PlEWnMz4/index.m3u8"},
        {"name": "Tập 05", "slug": "tap-05", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 05", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250524/CbYXxmAV/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250524/CbYXxmAV/index.m3u8"},
        {"name": "Tập 06", "slug": "tap-06", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 06", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250524/MgtrAqG3/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250524/MgtrAqG3/index.m3u8"},
        {"name": "Tập 07", "slug": "tap-07", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 07", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250524/mxMzy0Qj/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250524/mxMzy0Qj/index.m3u8"},
        {"name": "Tập 08", "slug": "tap-08", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 08", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250524/bsBJbXmn/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250524/bsBJbXmn/index.m3u8"},
        {"name": "Tập 09", "slug": "tap-09", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 09", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250524/X5RFaB7n/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250524/X5RFaB7n/index.m3u8"},
        {"name": "Tập 10", "slug": "tap-10", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 10", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250524/eD32zl9u/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250524/eD32zl9u/index.m3u8"},
        {"name": "Tập 11", "slug": "tap-11", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 11", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250526/hZhrllvw/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250526/hZhrllvw/index.m3u8"},
        {"name": "Tập 12", "slug": "tap-12", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 12", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250526/dNn1PTbo/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250526/dNn1PTbo/index.m3u8"},
        {"name": "Tập 13", "slug": "tap-13", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 13", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250527/3Vk7EpM3/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250527/3Vk7EpM3/index.m3u8"},
        {"name": "Tập 14", "slug": "tap-14", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 14", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250527/ZXhZSbaE/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250527/ZXhZSbaE/index.m3u8"},
        {"name": "Tập 15", "slug": "tap-15", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 15", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250527/mLfYcVaw/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250527/mLfYcVaw/index.m3u8"},
        {"name": "Tập 16", "slug": "tap-16", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 16", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250528/mXSOdJdq/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250528/mXSOdJdq/index.m3u8"},
        {"name": "Tập 17", "slug": "tap-17", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 17", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250528/LQ4pqrff/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250528/LQ4pqrff/index.m3u8"},
        {"name": "Tập 18", "slug": "tap-18", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 18", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250529/DYlmZaxU/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250529/DYlmZaxU/index.m3u8"},
        {"name": "Tập 19", "slug": "tap-19", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 19", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250529/rpQ1MFBj/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250529/rpQ1MFBj/index.m3u8"},
        {"name": "Tập 20", "slug": "tap-20", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 20", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250530/RNyBQ6M1/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250530/RNyBQ6M1/index.m3u8"},
        {"name": "Tập 21", "slug": "tap-21", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 21", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250530/vgSh9Kzi/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250530/vgSh9Kzi/index.m3u8"},
        {"name": "Tập 22", "slug": "tap-22", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 22", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250531/DR3v8w83/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250531/DR3v8w83/index.m3u8"},
        {"name": "Tập 23", "slug": "tap-23", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 23", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250601/G2yt9gIT/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250601/G2yt9gIT/index.m3u8"},
        {"name": "Tập 24", "slug": "tap-24", "filename": "Thiếu Hoa Nhược Cẩm - Youthful Glory - 2025 - 1080p - Thuyết Minh - Tập 24", "link_embed": "https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250602/7uuaSdAJ/index.m3u8", "link_m3u8": "https://s6.kkphimplayer6.com/20250602/7uuaSdAJ/index.m3u8"}
      ]
    }
  ]
}
</script> 