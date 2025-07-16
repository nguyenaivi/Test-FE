# EduShop - React Frontend

## Yêu cầu

- Node.js >= 14
- npm >= 6

## Cài đặt

1. Cài đặt các package cần thiết:
   ```
   npm install
   ```

2. Cài đặt json-server (nếu chưa có):
   ```
   npm install -g json-server
   ```

## Chạy ứng dụng

### 1. Chạy API giả lập (json-server)

- Mở terminal tại thư mục dự án.
- Chạy lệnh sau để khởi động API với dữ liệu từ `src/data/Recomment.json`:
  ```
  json-server --watch src/data/Recomment.json --port 3001
  ```
- API sẽ chạy tại: [http://localhost:3001/view](http://localhost:3001/view)

### 2. Chạy ứng dụng React

- Mở terminal mới tại thư mục dự án.
- Chạy lệnh:
  ```
  npm start
  ```
- Ứng dụng sẽ chạy tại: [http://localhost:3000](http://localhost:3000)

## Ghi chú

- Đảm bảo cả hai terminal (json-server và React) đều đang chạy để ứng dụng hoạt động đầy đủ.
- Nếu muốn reset dữ liệu API, chỉ cần xóa nội dung mảng `"view"` trong file `src/data/Recomment.json`.

---