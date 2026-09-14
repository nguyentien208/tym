# ❤️ Love Gift - Website Quà Tặng Tình Yêu

Website món quà tình yêu bí mật dành tặng bạn gái, được thiết kế dưới dạng **Interactive Love Letter Landing Page** chạy mượt mà trên thiết bị di động.

---

## 📁 Cấu Trúc Project

```text
love-gift/
│
├── index.html          # Trang HTML chính (Meta, layout, container các section)
├── style.css           # Styling giao diện Dark Romantic, hiệu ứng glow, chuyển cảnh
├── script.js           # Logic CONFIG, đếm thời gian realtime, particle, audio, lightbox
│
├── assets/
│   ├── images/         # Thư mục chứa 4 ảnh kỷ niệm
│   │   ├── photo-01.jpg
│   │   ├── photo-02.jpg
│   │   ├── photo-03.jpg
│   │   └── photo-04.jpg
│   │
│   └── music/          # Thư mục chứa file nhạc nền
│       └── love-song.mp3
│
└── README.md           # Hướng dẫn chi tiết
```

---

## 🚀 Hướng Dẫn Chạy Local

1. Tải toàn bộ thư mục project về máy.
2. Mở trực tiếp file `index.html` bằng trình duyệt web bất kỳ (Chrome, Safari, Edge, Firefox).
3. Hoặc bạn có thể dùng extension **Live Server** trên VS Code để chạy local server.

---

## 🖼️ Hướng Dẫn Thay Ảnh Kỷ Niệm

1. Đặt 4 file ảnh của hai bạn vào thư mục `assets/images/`:
   - `photo-01.jpg`
   - `photo-02.jpg`
   - `photo-03.jpg`
   - `photo-04.jpg`
2. Nếu bạn dùng định dạng ảnh khác (như `.png` hoặc `.jpeg`), mở file `script.js` và cập nhật lại đường dẫn trong `CONFIG.photos`.
3. *Lưu ý*: Nếu chưa có ảnh, website sẽ tự động hiển thị khung placeholder tình yêu rất đẹp và ngọt ngào.

---

## 🎵 Hướng Dẫn Thay Nhạc Nền

1. Đặt file nhạc lãng mạn yêu thích (định dạng `.mp3`) vào thư mục `assets/music/` với tên file là:
   `love-song.mp3`
2. Do chính sách Autoplay của trình duyệt di động, nhạc sẽ bắt đầu phát ngay khi bạn gái bấm nút **"Mở món quà ❤️"**.
3. Nút biểu tượng âm nhạc 🎵 ở góc trên bên phải giúp dễ dàng Bật / Tắt nhạc bất kỳ lúc nào.

---

## 📝 Hướng Dẫn Thay Nội Dung (Chỉnh sửa `CONFIG` trong `script.js`)

Mở file `script.js`, ở ngay đầu file bạn sẽ thấy khối `CONFIG`:

```javascript
const CONFIG = {
    boyfriendName: "Anh",           // Tên bạn
    girlfriendName: "Tên Bạn Gái",  // Tên bạn gái
    nickname: "Công chúa",          // Tên gọi thân mật

    startDate: "2022-02-14T00:00:00", // Ngày bắt đầu yêu (Năm-Tháng-NgàyTHi:Phút:Giây)

    specialQuote: "...",            // Câu nói riêng
    personalMessage: "...",         // Lời nhắn cá nhân

    introStoryLines: [ ... ],       // Các câu chữ hiện từng đoạn ở Section 2
    timeline: [ ... ],              // Các mốc thời gian kỷ niệm
    photos: [ ... ],                // Đường dẫn & chú thích ảnh
    loveNotes: [ ... ]              // Những điều anh muốn nói
};
```

---

## 🌐 Hướng Dẫn Deploy Lên GitHub Pages

1. **Tạo GitHub Repository**:
   - Truy cập [GitHub](https://github.com/) -> Chọn **New Repository**.
   - Đặt tên repository: `love-gift`.
   - Để chế độ **Public** -> Bấm **Create repository**.

2. **Upload Code**:
   - Đưa toàn bộ các file (`index.html`, `style.css`, `script.js`, thư mục `assets`) lên repository `love-gift`.

3. **Bật GitHub Pages**:
   - Vào **Settings** của repository -> Chọn menu **Pages** ở thanh bên trái.
   - Tại phần **Build and deployment** -> **Source**: Chọn `Deploy from a branch`.
   - Tại phần **Branch**: Chọn branch `main` (hoặc `master`), thư mục `/root` -> Bấm **Save**.
   - Chờ khoảng 1-2 phút, GitHub sẽ cấp cho bạn một đường dẫn công khai có dạng:
     `https://<username>.github.io/love-gift/`

---

## 📱 Hướng Dẫn Tạo Mã QR

1. Copy đường dẫn GitHub Pages đã tạo ở bước trên: `https://<username>.github.io/love-gift/`
2. Truy cập trang tạo QR miễn phí như: [me-qr.com](https://me-qr.com/) hoặc [qr-code-generator.com](https://www.qr-code-generator.com/)
3. Dán URL vào -> Tạo mã QR -> Tải ảnh QR Code về máy.
4. Bạn có thể in mã QR ra thiệp, gửi qua tin nhắn hoặc làm quà tặng bất ngờ!

---

## ✅ Checklist Kiểm Tra Trước Khi Gửi Mã QR

- [ ] Đã thay đúng tên bạn và tên bạn gái trong `script.js`?
- [ ] Ngày bắt đầu yêu (`startDate`) trong `script.js` đã chính xác để bộ đếm nhảy đúng số ngày/giờ/phút?
- [ ] Đã thêm file ảnh vào `assets/images/` và file nhạc vào `assets/music/`?
- [ ] Đã test thử trên điện thoại (mở link GitHub Pages bằng Safari/Chrome di động)?
- [ ] Đã bấm thử nút "Mở món quà ❤️" xem nhạc có phát không?
- [ ] Đã thử bấm nút "Để em suy nghĩ..." xem nút có né nhẹ và đổi thành câu siêu đáng yêu không?
- [ ] Đã bấm thử 5 lần vào trái tim nhỏ góc trái xem Easter Egg bí mật xuất hiện không?
- [ ] Giao diện có bị tràn ngang hay vỡ chữ không? (Website đã được tối ưu mobile-first chuẩn 375px–430px).
