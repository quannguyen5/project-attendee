FROM nginx:1.22.0-alpine

# Xóa cấu hình mặc định của Nginx
RUN rm -rf /etc/nginx/conf.d/*

# Sao chép cấu hình Nginx tùy chỉnh
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Sao chép mã nguồn frontend vào thư mục html của Nginx
COPY src/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Chạy Nginx với foreground để container không tự tắt
CMD ["nginx", "-g", "daemon off;"]