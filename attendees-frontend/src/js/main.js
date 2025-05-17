document.addEventListener('DOMContentLoaded', function() {
    // Khai báo biến API URL - sử dụng đường dẫn tương đối khi đi qua Nginx proxy
    const API_URL = 'http://localhost:8080/api/all-attendees';

    
    // Lấy các phần tử DOM
    const tableBody = document.getElementById('tableBody');
    const attendeeTable = document.getElementById('attendeeTable');
    const loadingIndicator = document.getElementById('loading');
    const errorMessage = document.getElementById('errorMessage');
    const searchInput = document.getElementById('searchInput');
    const schoolFilter = document.getElementById('schoolFilter');
    const schoolStats = document.getElementById('schoolStats');
    
    let attendees = [];
    let currentSort = { column: 'id', direction: 'asc' };
    
    // Fetch dữ liệu từ API
    async function fetchAttendees() {
        try {
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            attendees = data;
            
            // Hiển thị bảng dữ liệu
            renderTable(attendees);
            populateSchoolFilter(attendees);
            calculateSchoolStats(attendees);
            
            // Ẩn loading, hiện bảng
            loadingIndicator.style.display = 'none';
            attendeeTable.style.display = 'table';
        } catch (error) {
            console.error('Error fetching data:', error);
            
            // Hiển thị thông báo lỗi
            loadingIndicator.style.display = 'none';
            errorMessage.textContent = 'Không thể tải dữ liệu. Vui lòng kiểm tra kết nối và thử lại.';
            errorMessage.style.display = 'block';
        }
    }

    
    // Render bảng dữ liệu
    function renderTable(data) {
        tableBody.innerHTML = '';
        
        if (data.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Không có dữ liệu</td></tr>';
            return;
        }
        
        data.forEach(attendee => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${attendee.id}</td>
                <td>${attendee.name}</td>
                <td>${attendee.dob}</td>
                <td>${attendee.school}</td>
            `;
            
            tableBody.appendChild(row);
        });
    }
    
    // Điền dữ liệu vào bộ lọc trường
    function populateSchoolFilter(data) {
        const schools = [...new Set(data.map(attendee => attendee.school))];
        
        schools.sort().forEach(school => {
            const option = document.createElement('option');
            option.value = school;
            option.textContent = school;
            schoolFilter.appendChild(option);
        });
    }
    
    // Tính toán thống kê theo trường
    function calculateSchoolStats(data) {
        const schools = {};
        
        data.forEach(attendee => {
            if (!schools[attendee.school]) {
                schools[attendee.school] = 0;
            }
            schools[attendee.school]++;
        });
        
        // Sắp xếp theo số lượng học viên giảm dần
        const sortedSchools = Object.entries(schools)
            .sort((a, b) => b[1] - a[1]);
        
        schoolStats.innerHTML = '';
        
        sortedSchools.forEach(([school, count]) => {
            const div = document.createElement('div');
            div.className = 'school-count';
            div.textContent = `${school}: ${count} học viên`;
            schoolStats.appendChild(div);
        });
    }
    
    // Xử lý tìm kiếm
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            filterData();
        } else {
            const filteredData = attendees.filter(attendee => 
                attendee.name.toLowerCase().includes(searchTerm)
            );
            filterData(filteredData);
        }
    });
    
    // Xử lý lọc theo trường
    schoolFilter.addEventListener('change', function() {
        filterData();
    });
    
    // Lọc dữ liệu theo điều kiện
    function filterData(searchFiltered) {
        const selectedSchool = schoolFilter.value;
        let filteredData = searchFiltered || attendees;
        
        if (selectedSchool) {
            filteredData = filteredData.filter(attendee => 
                attendee.school === selectedSchool
            );
        }
        
        // Sắp xếp dữ liệu
        sortData(filteredData);
        
        // Hiển thị dữ liệu đã lọc
        renderTable(filteredData);
    }
    
    // Xử lý sắp xếp khi click vào header
    document.querySelectorAll('th[data-sort]').forEach(th => {
        th.addEventListener('click', function() {
            const column = this.dataset.sort;
            
            // Thay đổi hướng sắp xếp nếu click vào cùng một cột
            if (currentSort.column === column) {
                currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
            } else {
                currentSort.column = column;
                currentSort.direction = 'asc';
            }
            
            // Sắp xếp và hiển thị lại dữ liệu
            filterData();
        });
    });
    
    // Sắp xếp dữ liệu
    function sortData(data) {
        data.sort((a, b) => {
            let valueA = a[currentSort.column];
            let valueB = b[currentSort.column];
            
            // So sánh theo kiểu dữ liệu
            if (typeof valueA === 'string') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }
            
            if (valueA < valueB) {
                return currentSort.direction === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
                return currentSort.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }
    
    // Khởi tạo - load dữ liệu khi trang tải xong
    fetchAttendees();
});