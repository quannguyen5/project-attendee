CREATE DATABASE IF NOT EXISTS attendeevdt;
USE attendeevdt;

DROP TABLE IF EXISTS attendee;

CREATE TABLE attendee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    dob VARCHAR(20) NOT NULL,
    school VARCHAR(255)
);

INSERT INTO attendee (name, dob, school) VALUES
('Nguyễn Đăng Quân', '11/05/2004', 'Đại học Công nghệ (UET)'),
('Trịnh Vinh Tuấn Đạt', '05/10/2003', 'Học viện Công nghệ Bưu chính Viễn thông - Cơ sở phía Bắc'),
('Ngô Xuân Hòa', '27/07/2004', 'Học viện Công nghệ Bưu chính Viễn thông - Cơ sở phía Bắc'),
('Bùi Đức Hùng', '31/07/2004', 'Đại học Bách Khoa Hà Nội (HUST)'),
('Nguyễn Tuấn Anh', '25/01/2003', 'Đại học Bách Khoa Hà Nội (HUST)'),
('Lương Nhật Hào', '09/07/2003', 'Đại học Công nghệ (UET)'),
('Nguyễn Đức Anh', '23/01/2003', 'Học viện Công nghệ Bưu chính Viễn thông - Cơ sở phía Bắc'),
('Đinh Trường Lãm', '23/02/2001', 'Đại học tổng hợp ITMO'),
('Nguyễn Đăng Bảo Lâm', '17/08/2004', 'Đại học Bách Khoa Hà Nội (HUST)'),
('Phạm Ngọc Hải Dương', '20/03/2005', 'Đại học Công nghệ (UET)'),
('Nguyễn Minh Quân', '05/01/2004', 'Đại học Bách Khoa Hà Nội (HUST)'),
('Nguyễn Sỹ Tân', '07/07/2004', 'Đại học Công nghệ (UET)'),
('Mai Xuân Duy Quang', '04/07/2003', 'Đại học Bách Khoa Hà Nội (HUST)'),
('Lê Tấn Phát', '15/12/2004', 'ĐH Mở Tp.HCM'),
('Nguyễn Quang Ninh', '24/04/2004', 'Đại học Công nghệ (UET)'),
('Nguyễn Trung Vương', '03/10/2003', 'Đại học Bách Khoa - ĐHQG TPHCM (HCMUT)'),
('Nguyễn Phước Ngưỡng Long', '18/10/2005', 'Đại học Công nghệ (UET)'),
('Nguyễn Văn Dương', '30/10/2003', 'Đại học Công nghệ (UET)'),
('Lê Minh Hoàng', '17/05/2004', 'Đại học Khoa học tự nhiên - ĐHQG TPHCM (HCMUS)'),
('Nguyễn Đức Thịnh', '10/09/2001', 'Đại học Thủy Lợi'),
('Hoàng Minh Thắng', '09/06/1999', 'Đại học tổng hợp ITMO'),
('Vũ Đình Ngọc Bảo', '29/01/2005', 'Đại học Khoa học tự nhiên - ĐHQG TPHCM (HCMUS)'),
('Nguyễn Hồng Lĩnh', '08/12/2003', 'Đại học Công nghệ (UET)');