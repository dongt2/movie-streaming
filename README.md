# 🎬 Ứng Dụng Xem Phim Trực Tuyến

Một ứng dụng xem phim trực tuyến hiện đại được xây dựng bằng Vue.js, mang đến trải nghiệm tương tự như Netflix cho việc duyệt và xem phim trực tuyến.

## ✨ Tính Năng

- 🏠 Trang chủ với phim mới nhất và nội dung thịnh hành
- 🎭 Thông tin chi tiết về phim bao gồm diễn viên, nội dung và tập phim
- 📺 Trình phát video tích hợp với hỗ trợ toàn màn hình
- 🔍 Tìm kiếm nâng cao theo tiêu đề, thể loại, quốc gia và năm
- 📂 Duyệt theo danh mục và thể loại
- 📱 Thiết kế responsive cho mọi thiết bị
- 🌙 Giao diện tối tối ưu cho việc xem phim
- ⚡ Tải nhanh với lazy loading và tối ưu API

## 🛠 Công Nghệ Sử Dụng

- Vue 3 với Composition API
- Vite cho công cụ build
- Vue Router cho điều hướng
- Tailwind CSS cho giao diện
- Axios cho các request API
- Lucide Vue cho biểu tượng

## 📡 Tích Hợp API

Sử dụng API từ [phimapi.com](https://phimapi.com):

- Trang chủ: `https://phimapi.com/danh-sach/phim-moi-cap-nhat-v3?page={page}`
- Chi tiết phim: `https://phimapi.com/phim/{slug}`
- Tìm kiếm: `https://phimapi.com/v1/api/tim-kiem?keyword={keyword}&page={page}`
- Danh mục: `https://phimapi.com/the-loai`
- Chi tiết danh mục: `https://phimapi.com/v1/api/the-loai/{type}?page={page}`

## 🚀 Bắt Đầu

### Yêu Cầu
- Node.js v16+
- npm hoặc yarn

### Cài Đặt

```bash
# Clone repository
git clone https://github.com/yourusername/movie-streaming.git
cd movie-streaming

# Cài đặt dependencies
npm install

# Khởi chạy server phát triển
npm run dev
```

Truy cập `http://localhost:3000` để xem ứng dụng.

### Lệnh Build

```bash
# Build cho production
npm run build

# Xem trước bản build
npm run preview
```

## 📁 Cấu Trúc Dự Án

```
movie-streaming-app/
├── public/                 # Tài nguyên tĩnh
├── src/
│   ├── assets/            # CSS và assets
│   ├── components/        # Components tái sử dụng
│   ├── services/          # Dịch vụ API
│   ├── views/             # Components trang
│   ├── router/            # Cấu hình route
│   ├── App.vue            # Component gốc
│   └── main.js            # Điểm khởi đầu
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 Tính Năng Chính

### Component MovieCard
- Component thumbnail phim tái sử dụng
- Hiệu ứng hover và hiển thị metadata

### HomeView
- Hiển thị phim mới nhất
- Cuộn vô hạn
- Phần hero

### MovieDetailView
- Thông tin chi tiết phim
- Danh sách tập phim
- Điều hướng xem phim

### WatchView
- Trình phát video HTML5
- Điều hướng tập phim
- Hỗ trợ toàn màn hình

### SearchView
- Bộ lọc tìm kiếm nâng cao
- Kết quả tìm kiếm thời gian thực
- Nhiều tùy chọn lọc

## 🎨 Giao Diện/Trải Nghiệm

- Giao diện tối tối ưu cho xem phim
- Thiết kế responsive (Mobile, Tablet, Desktop)
- Trạng thái tải với skeleton
- Xử lý lỗi
- Hiệu ứng mượt mà
- Hỗ trợ accessibility

## 🔮 Tính Năng Dự Kiến

- [ ] Xác thực người dùng
- [ ] Danh sách yêu thích
- [ ] Đề xuất phim
- [ ] Bình luận và đánh giá
- [ ] Xem offline
- [ ] Hỗ trợ PWA
- [ ] Đa ngôn ngữ
- [ ] Thông tin diễn viên
- [ ] Tích hợp trailer

## 🤝 Đóng Góp

1. Fork repository
2. Tạo nhánh tính năng (`git checkout -b feature/TinhNangMoi`)
3. Commit thay đổi (`git commit -m 'Thêm TinhNangMoi'`)
4. Push lên nhánh (`git push origin feature/TinhNangMoi`)
5. Tạo Pull Request

## 📄 Giấy Phép

MIT License - xem file [LICENSE](LICENSE)

## 🙏 Ghi Nhận

- [phimapi.com](https://phimapi.com) cho API phim
- [Lucide](https://lucide.dev) cho biểu tượng
- [Tailwind CSS](https://tailwindcss.com)
- [Vue.js](https://vuejs.org)

## 📞 Hỗ Trợ

Nếu có thắc mắc hoặc cần giúp đỡ, vui lòng tạo issue hoặc liên hệ nhóm phát triển.

---

**Được tạo với ❤️ bằng Vue.js** 
