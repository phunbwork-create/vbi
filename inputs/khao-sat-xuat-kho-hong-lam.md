# BIÊN BẢN KHẢO SÁT NGHIỆP VỤ XUẤT KHO — CÔNG TY Ô MAI HỒNG LAM

> **Dự án:** Hệ thống Quản lý Kho Công ty Ô mai Hồng Lam (WMS)  
> **Người cung cấp thông tin:** Ông Nguyễn Phú Yên (CEO) & Ông Vũ Đức Cường (Giám đốc Logistics)  
> **Người thực hiện khảo sát:** Chuyên viên Phân tích Nghiệp vụ (BA Project Lead)  
> **Ngày thực hiện:** 2026-10-07  
> **Địa điểm / Phương thức:** Họp phân tích nghiệp vụ tại Văn phòng Ô mai Hồng Lam  

---

## NỘI DUNG KHẢO SÁT VÀ PHẢN HỒI NGHIỆP VỤ XUẤT KHO (OUTBOUND)

### `Q-UC-XK-001-01`: Phân hệ Xuất kho của Hồng Lam bao gồm những loại hình xuất kho nào?

**Trả lời từ Ban Giám đốc (CEO & Giám đốc Logistics):**
> *"Hệ thống WMS phân hệ Xuất kho (`XK`) phải đáp ứng đầy đủ **4 loại hình xuất kho** sau:*
> 1. **Xuất bán buôn cho Chuỗi Cửa hàng chính hãng & Hệ thống Đại lý / Siêu thị:** Xuất số lượng lớn theo thùng/két dựa trên Đơn đặt hàng bán (Sales Order - SO) đẩy từ ERP.
> 2. **Xuất bán lẻ đơn Thương mại điện tử (Shopee, TikTok Shop, Website Hồng Lam):** Đơn hàng lẻ đóng gói từng hũ/túi gửi các đơn vị vận chuyển (GHN, Viettel Post, Shopee Xpress).
> 3. **Xuất điều chuyển kho nội bộ (Internal Stock Transfer Out):** Xuất điều chuyển hàng hóa từ Kho tổng Miền Bắc vào Kho chi nhánh Miền Nam hoặc điều chuyển giữa các cụm kho.
> 4. **Xuất tiêu hủy / Xử lý hàng lỗi (Scrap / Disposal Outbound):** Xuất tiêu hủy các lô hàng hết hạn, hàng ẩm mốc, hàng biến chất sau kiểm kê có biên bản hội đồng tiêu hủy."*

---

### `Q-UC-XK-001-02`: Chiến lược lấy hàng (Picking) và quản lý Lô/Hạn sử dụng tuân theo quy tắc nào?

**Trả lời từ Ban Giám đốc (CEO & Giám đốc Logistics):**
> *"Đặc thù ô mai và bánh mứt có hạn sử dụng hữu hạn (6-12 tháng):*
> - **Chiến lược bắt buộc 100% là FEFO (First Expired, First Out — Hàng có hạn dùng gần nhất xuất trước):** Hệ thống WMS phải tự động chỉ định chính xác Mã Lô (Lot No.) và Vị trí Kệ hàng (Bin Location) có date gần nhất trên Phiếu lấy hàng (Pick-list).
> - **Cơ chế Khóa cưỡng bức trên Handheld PDA:** Nếu nhân viên kho quét mã vạch của một lô hàng có HSD xa hơn trong khi lô hàng cận hạn vẫn còn trên kệ, thiết bị PDA phải lập tức rung/báo lỗi đỏ và **từ chối nhận lệnh (Hard Stop)**, không cho phép nhặt sai nguyên tắc FEFO.
> - Riêng với đơn hàng xuất bán cho Siêu thị lớn (như WinMart, Co.opmart), họ yêu cầu Date hàng giao phải còn tối thiểu 75% HSD. Do đó hệ thống phải cho phép cấu hình ngoại lệ (Customer Specific Shelf-life Rule)."*

---

### `Q-UC-XK-001-03`: Quy trình lấy hàng (Picking), đóng gói (Packing) và kiểm soát thực tế diễn ra như thế nào?

**Trả lời từ Ban Giám đốc (CEO & Giám đốc Logistics):**
> *"Quy trình phải tối ưu hóa năng suất và giảm thiểu đi lại trong lòng kho:*
> - **Đối với đơn hàng lớn (Đại lý/Chuỗi cửa hàng):** Áp dụng **Discrete Picking (Lấy theo từng đơn)**. PDA dẫn đường theo lộ trình nhặt hàng ngắn nhất (Shortest Pick Path) từ Kệ thấp lên Kệ cao.
> - **Đối với đơn Thương mại điện tử (E-commerce):** Cho phép **Wave Picking / Cluster Picking (Gom nhiều đơn nhặt 1 lượt)**. Nhân viên mang xe đẩy chia ngăn nhặt 30-50 đơn cùng lúc, sau đó đưa về Bàn đóng gói (Packing Station) quét mã phân loại ra từng hộp hàng.
> - **Cơ chế Giữ chỗ tồn kho (Stock Reservation / Allocation):** Ngay khi Lệnh xuất kho được phát hành, hệ thống WMS phải lập tức khóa số lượng hàng dự kiến xuất (trạng thái Allocated), không cho phép đơn hàng khác hoặc quy trình chuyển kho tranh chấp cùng một số lượng trên ô kệ đó."*

---

### `Q-UC-XK-001-04`: Thẩm quyền phê duyệt Phiếu xuất kho và nguyên tắc Phân tách trách nhiệm (SoD)?

**Trả lời từ Ban Giám đốc (CEO & Giám đốc Logistics):**
> *"Áp dụng chặt chẽ quy định kiểm soát nội bộ tương tự Phân hệ Nhập kho:*
> - **Thủ kho:** Chỉ có quyền thực hiện quét mã lấy hàng (Picking) và xác nhận đóng gói (Packing) trên PDA. **Nghiêm cấm 100% Thủ kho tự phê duyệt Phiếu xuất kho do mình thực hiện.**
> - **Thủ kho trưởng:** Phê duyệt Phiếu xuất kho đối với các đơn hàng xuất bán thông thường có giá trị **`< 100 triệu VNĐ`**.
> - **Giám đốc Logistics / Giám đốc Vận hành (COO):** Phê duyệt các đơn hàng xuất bán **`>= 100 triệu VNĐ`**, đơn xuất điều chuyển kho liên miền, hoặc toàn bộ các đơn Xuất tiêu hủy (bắt buộc kèm chữ ký Kế toán trưởng)."*

---

### `Q-UC-XK-001-05`: Tích hợp dữ liệu xuất kho với phần mềm Kế toán / ERP hiện tại ra sao?

**Trả lời từ Ban Giám đốc (CEO & Giám đốc Logistics):**
> *- Khi đơn hàng bán (SO) được duyệt trên ERP, ERP tự động đẩy Lệnh xuất kho (Outbound Order) sang WMS qua API.*
> *- Khi Thủ kho trưởng / Giám đốc Logistics bấm nút "Duyệt Xuất kho" trên WMS và hàng rời cửa kho:*
>   1. WMS tự động trừ số lượng tồn kho vật lý và tồn kho khả dụng trên từng ô kệ (Bin Location).
>   2. WMS đẩy ngay tín hiệu trạng thái `COMPLETED` kèm chi tiết Mã Lô/Số lượng thực xuất sang ERP.
>   3. Phần mềm ERP căn cứ dữ liệu này để tự động hạch toán giảm kho (TK 155/156), ghi nhận Giá vốn hàng bán (TK 632) và phát hành Hóa đơn điện tử cho khách hàng."*

---

## TỔNG KẾT & XÁC NHẬN CỦA BAN GIÁM ĐỐC
- **Trạng thái tài liệu:** Đã chốt nghiệp vụ khảo sát đầu vào cho Phân hệ Xuất kho (`XK`).
- **Căn cứ pháp lý/vận hành:** Văn bản trả lời chính thức từ CEO Nguyễn Phú Yên & Giám đốc Logistics Vũ Đức Cường.
- **Hành động tiếp theo dành cho BA:** Cập nhật tài liệu này làm căn cứ Grounding chính thức cho `UC-XK-001`, kích hoạt workflow `/uc-survey UC-XK-001` để bước vào giai đoạn `20-SURVEYING`.
