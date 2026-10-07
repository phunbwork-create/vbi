# BIÊN BẢN KHẢO SÁT NGHIỆP VỤ NHẬP KHO — CÔNG TY Ô MAI HỒNG LAM

> **Dự án:** Hệ thống Quản lý Kho Công ty Ô mai Hồng Lam (WMS)  
> **Người cung cấp thông tin:** Ông Nguyễn Phú Yên — Tổng Giám đốc (CEO) Công ty Ô mai Hồng Lam  
> **Người thực hiện khảo sát:** Chuyên viên Phân tích Nghiệp vụ (BA Project Lead)  
> **Ngày thực hiện:** 2026-08-02  
> **Địa điểm / Phương thức:** Phỏng vấn trực tiếp tại Trụ sở Hồng Lam & Biên bản xác nhận qua Email  

---

## NỘI DUNG TRẢ LỜI CÂU HỎI KHOẢO SÁT (OPEN QUESTIONS)

### `Q-UC-NK-001-01`: Phân hệ Nhập kho của Hồng Lam bao gồm những loại hình nhập kho nào?

**Trả lời từ CEO (Ông Nguyễn Phú Yên):**
> *"Đặc thù ngành chế biến thực phẩm và hệ thống chuỗi bán lẻ ô mai Hồng Lam yêu cầu quy trình nhập kho rất chặt chẽ. Hệ thống WMS mới phải đáp ứng đầy đủ **4 loại hình nhập kho** sau đây:*
> 1. **Nhập mua từ Nhà cung cấp (Inbound PO):** Nhập nguyên phụ liệu thô (sấu, mơ, mận, gừng, đường, muối...), phụ gia thực phẩm, và vật tư bao bì (hũ nhựa, hũ thủy tinh, túi nhôm, hộp quà, tem nhãn).
> 2. **Nhập thành phẩm từ Nhà máy / Xưởng sản xuất:** Nhập các sản phẩm ô mai, mứt, kẹo đã hoàn thiện đóng gói từ Nhà máy sản xuất Hoài Đức về Kho tổng phân phối.
> 3. **Nhập trả hàng từ Chuỗi Cửa hàng & Đại lý (Inbound Return):** Nhập hàng thu hồi từ các cửa hàng chính hãng / đại lý nhượng quyền (hàng sắp hết hạn cần luân chuyển, hàng hư hỏng bao bì trong quá trình vận chuyển, hoặc hàng thừa sau mùa cao điểm Tết).
> 4. **Nhập chuyển kho nội bộ (Internal Stock Transfer In):** Nhập điều chuyển hàng hóa giữa Kho tổng và các Kho chi nhánh khu vực (Miền Bắc, Miền Nam).*

---

### `Q-UC-NK-001-02`: Quy trình kiểm tra chất lượng (QA/QC / Kiểm định hàng nhập) có diễn ra trước khi nhập kho không? Ai là người chịu trách nhiệm phê duyệt phiếu nhập kho?

**Trả lời từ CEO (Ông Nguyễn Phú Yên):**
> *"Vấn đề an toàn vệ sinh thực phẩm là sống còn với thương hiệu Hồng Lam. Do đó:*
> - **100% lô hàng nhập mua (nguyên liệu, bao bì) và thành phẩm từ nhà máy BẮT BUỘC phải qua bước Kiểm tra chất lượng (QC) trước khi thực nhập vào ô kệ kho.**
> - Đội QC sẽ lấy mẫu kiểm nghiệm (độ ẩm, cảm quan, vi sinh, quy cách bao bì). Kết quả QC sẽ là: **Đạt (Passed)**, **Không đạt (Rejected)**, hoặc **Nhập biệt trữ / Chờ xử lý (Hold/Pending)**.
> - **Phê duyệt phiếu nhập kho:**
>   - Đối với đơn hàng đạt QC thông thường: **Thủ kho trưởng** có quyền duyệt Phiếu nhập kho chính thức.
>   - Đối với lô hàng bị rách vỡ bao bì, nhập trả lỗi từ đại lý hoặc lô hàng nhập mua trị giá trên 500 triệu đồng: Cần thêm xác nhận phê duyệt từ **Giám đốc Logistics / Giám đốc Vận hành** trên hệ thống."*

---

### `Q-UC-NK-001-03`: Việc quản lý Lô sản xuất (Lot/Batch), Hạn sử dụng (EXP), và Mã vạch (Barcode/QR code) trên sản phẩm ô mai/bánh kẹo khi nhập kho có bắt buộc không?

**Trả lời từ CEO (Ông Nguyễn Phú Yên):**
> *"BẮT BUỘC 100%. Ô mai và mứt Hồng Lam có hạn sử dụng thường từ 6 đến 12 tháng. Nếu không quản lý theo Lô và Hạn dùng thì rất dễ dẫn đến tồn hàng hết hạn gây thiệt hại lớn.*
> - Khi lập phiếu nhập kho, bắt buộc nhập thông tin: **Mã Lô sản xuất (Batch/Lot No.)**, **Ngày sản xuất (MFG Date)**, và **Hạn sử dụng (EXP Date)**.
> - Đơn vị tính phải quản lý đa cấp: Thùng/Két -> Túi/Hũ -> Gói lẻ.
> - Hệ thống mới phải hỗ trợ **quét mã vạch (Barcode/QR Code)** bằng thiết bị cầm tay (Handheld/PDA) ngay tại cửa kho để nhân viên kho thao tác nhanh, tránh gõ tay thủ công gây sai sót lô hàng."*

---

### `Q-UC-NK-001-04`: Hệ thống có tự động gợi ý/gán Vị trí kho (Bin Location / Kệ hàng) theo quy tắc FIFO hoặc khu vực bảo quản đặc thù không?

**Trả lời từ CEO (Ông Nguyễn Phú Yên):**
> *"Có, đây là tính năng chúng tôi rất kỳ vọng ở hệ thống mới.*
> - Kho Hồng Lam được chia thành các khu vực rõ ràng: **Khu hàng khô thường**, **Khu bảo quản mát (dành cho sấu tươi, mứt đặc thù)**, **Khu bao bì**, **Khu hàng chờ QC**, và **Khu hàng lỗi/hàng chờ tiêu hủy**.
> - Hệ thống WMS phải **tự động gợi ý Vị trí kho (Bin Location / Kệ - Tầng - Ô)** trống và phù hợp với loại mặt hàng khi nhân viên tiến hành cất hàng (Put-away).
> - Đồng thời, dữ liệu vị trí này sẽ phục vụ cho quy tắc xuất kho bắt buộc là **FEFO (First Expired, First Out - Hàng hết hạn trước xuất trước)** và **FIFO (First In, First Out)**."*

---

### `Q-UC-NK-001-05`: Chức năng nhập kho có cần tích hợp đồng bộ dữ liệu với phần mềm Kế toán / ERP hiện tại của Hồng Lam không?

**Trả lời từ CEO (Ông Nguyễn Phú Yên):**
> *"Bắt buộc phải tích hợp 2 chiều realtime (hoặc gần realtime).*
> - Hiện tại bộ phận Kế toán của Hồng Lam đang dùng phần mềm Kế toán/ERP. Khi phiếu nhập kho hoàn tất và được duyệt trên WMS, hệ thống WMS phải tự động đẩy dữ liệu sang ERP để Kế toán kho ghi nhận tăng tồn kho và hạch toán công nợ nhà cung cấp / giá thành sản xuất.
> - Ngược lại, các Đơn đặt hàng mua (PO) hoặc Yêu cầu nhập kho tạo từ ERP phải tự động đẩy sang WMS để Thủ kho chuẩn bị tiếp nhận hàng."*

---

## TỔNG KẾT & XÁC NHẬN CỦA BAN GIÁM ĐỐC

- **Trạng thái tài liệu:** Đã chốt nghiệp vụ khảo sát đầu vào cho Phân hệ Nhập kho (`NK`).
- **Căn cứ pháp lý/vận hành:** Văn bản trả lời chính thức từ Giám đốc Điều hành Công ty Ô mai Hồng Lam.
- **Hành động tiếp theo dành cho BA:** Cập nhật tài liệu này làm căn cứ Grounding chính thức cho `UC-NK-001` và chuyển đổi các Open Questions từ `AMBIGUOUS` sang `CLEAR` để viết Use Case Specification.
