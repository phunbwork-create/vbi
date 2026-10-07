# BỘ CÂU HỎI KHẢO SÁT UC-NK-001 — VÒNG r1

> **Use Case:** UC-NK-001 — Quản lý Nhập kho (Inbound Warehouse Management)  
> **Ngày tạo:** 2026-08-02 | **Agent thực hiện:** `ba-khao-sat` | **Tổng số câu hỏi:** 11 câu *(Blocker: 5 | Major: 6)*  
> **Hướng dẫn cho BA con người:** BA sao chép nội dung câu hỏi này sang file `answers-r1.md` trong thư mục `uc/UC-NK-001/survey/` và điền câu trả lời vào 2 cột cuối. **Không xóa hoặc sửa cột nội dung câu hỏi gốc.**

---

## 1. Phân nhóm A — Luồng Nghiệp vụ Chuẩn (5W1H & BACCM)
*Tập trung làm rõ bối cảnh, tác nhân thực hiện, trình tự thao tác và giá trị nghiệp vụ mang lại.*

| Mã Q-ID | Khía cạnh | Nội dung Câu hỏi Làm rõ | Căn cứ Trích dẫn (File + Dòng) | Mức độ | Người trả lời gợi ý | Phương án Đề xuất (Giả định) | Phản hồi Doanh nghiệp (BA điền) | Nguồn Chốt (BA điền) |
|---|---|---|---|---|---|---|---|---|
| `Q-UC-NK-001-01` | WHAT / HSD | Quy định Hạn sử dụng (EXP Date) tối thiểu còn lại của nguyên liệu/thành phẩm Ô mai khi nhập kho là bao nhiêu % tổng HSD? | `inputs/khao-sat-nhap-kho-hong-lam.md` Mục Q-03 | Blocker | Quản lý QA/QC / Kho | **PA1:** Còn tối thiểu 70% tổng HSD.<br>**PA2:** Còn tối thiểu 50% tổng HSD.<br>**PA3:** Áp dụng theo từng danh mục SKU riêng. | | |
| `Q-UC-NK-001-02` | WHAT / Document | Hệ thống WMS nên sử dụng chung 1 Mẫu Phiếu Nhập Kho cho cả 4 loại hình hay tách thành 4 mẫu phiếu nghiệp vụ riêng? | `inputs/khao-sat-nhap-kho-hong-lam.md` Mục Q-01 | Major | Thủ kho trưởng / Kế toán | **PA1:** Tách 4 loại phiếu riêng (NK-PO, NK-TP, NK-TH, NK-CK) để phân quyền và hạch toán kế toán chuẩn.<br>**PA2:** Dùng 1 phiếu chung, chỉ chọn Loại giao dịch. | | |
| `Q-UC-NK-001-03` | WHAT / Tolerance | Quy định tỷ lệ dung sai số lượng (Tolerance %) cho phép khi nhập nông sản thô (sấu, mơ, gừng) từ NCC là bao nhiêu? | `inputs/khao-sat-nhap-kho-hong-lam.md` Mục Q-01 | Major | Bộ phận Mua hàng / QA | **PA1:** Dung sai cho phép ±3% số lượng PO.<br>**PA2:** Dung sai cho phép ±5% số lượng PO.<br>**PA3:** Không cho phép dung sai (phải nhập đúng số PO). | | |
| `Q-UC-NK-001-04` | WHEN / SLA | Quy định SLA thời gian tối đa từ khi xe giao hàng đến cửa kho cho tới khi hoàn tất cất hàng (Put-away) vào Bin Location? | `inputs/khao-sat-nhap-kho-hong-lam.md` Mục Q-04 | Major | Giám đốc Logistics | **PA1:** Trong vòng 2 giờ kể từ khi xe cập kho.<br>**PA2:** Trong vòng 4 giờ đối với đơn hàng lớn.<br>**PA3:** Hoàn thành trong ngày làm việc. | | |

---

## 2. Phân nhóm B — Trường hợp Ngoại lệ & Kịch bản Bất thường (Edge Cases)
*Tập trung làm rõ luồng xử lý sai lệch số lượng, lỗi hàng hóa, sự cố thiết bị/hạ tầng kho.*

| Mã Q-ID | Loại Ngoại lệ | Nội dung Câu hỏi Xử lý Sự cố | Căn cứ Trích dẫn (File + Dòng) | Mức độ | Người trả lời gợi ý | Phương án Đề xuất (Giả định) | Phản hồi Doanh nghiệp (BA điền) | Nguồn Chốt (BA điền) |
|---|---|---|---|---|---|---|---|---|
| `Q-UC-NK-001-05` | Sai lệch PO | Khi số lượng đếm thực tế ÍT HƠN hoặc NHIỀU HƠN so với PO (ngoài dung sai), WMS xử lý thế nào? | `inputs/khao-sat-nhap-kho-hong-lam.md` Mục Q-01, Q-05 | Blocker | Kế toán kho / Thủ kho | **PA1:** Cho phép nhập theo thực tế (Partial Inbound), tự đóng PO hoặc giữ PO mở để giao tiếp.<br>**PA2:** Khóa không cho nhập, bắt buộc sửa PO trên ERP trước. | | |
| `Q-UC-NK-001-06` | Lỗi QC Partial | Khi lô hàng có một phần ĐẠT QC và một phần KHÔNG ĐẠT (móp bao bì/ẩm mốc), WMS hỗ trợ tách phiếu nhập như thế nào? | `inputs/khao-sat-nhap-kho-hong-lam.md` Mục Q-02 | Blocker | QA/QC / Thủ kho | **PA1:** Tự động tách thành 2 phiếu: 1 Phiếu nhập kho chính thức (hàng Đạt) và 1 Phiếu nhập Biệt trữ/Trả NCC (hàng Lỗi).<br>**PA2:** Từ chối toàn bộ lô hàng nếu có sản phẩm lỗi. | | |
| `Q-UC-NK-001-07` | Sự cố PDA | Khi thiết bị quét mã Handheld PDA mất mạng Wifi trong lòng kho, WMS có cho phép quét cất hàng Offline không? | `inputs/khao-sat-nhap-kho-hong-lam.md` Mục Q-03 | Major | Đội IT / Thủ kho | **PA1:** Cho phép quét lưu tạm trên bộ nhớ PDA Offline, tự đồng bộ lại khi có mạng.<br>**PA2:** Cảnh báo dừng quét, bắt buộc có Wifi mới cho thao tác. | | |
| `Q-UC-NK-001-08` | Hủy phiếu dở dang | Nếu Thủ kho đã quét cất 50% số hàng vào kệ Bin Location mà bấm HỦY phiếu nhập giữa chừng thì WMS rollback dữ liệu ra sao? | `inputs/khao-sat-nhap-kho-hong-lam.md` Mục Q-04 | Major | IT Lead / Thủ kho | **PA1:** Tự động nhả vị trí Bin Location và xóa tồn kho tạm thời khỏi các kệ đã quét.<br>**PA2:** Không cho Hủy nếu đã có sản phẩm quét cất hàng (bắt buộc làm quy trình Xuất điều chỉnh). | | |

---

## 3. Phân nhóm C — Rủi ro Gian lận & Kiểm soát Nội bộ (Fraud Risks & Internal Controls)
*Tập trung xoáy sâu vào các khe hở gian lận kho hàng, phân tách trách nhiệm (SoD) và quy trình phê duyệt.*

| Mã Q-ID | Loại Rủi ro | Nội dung Câu hỏi Kiểm soát Gian lận | Căn cứ Trích dẫn (File + Dòng) | Mức độ | Người trả lời gợi ý | Phương án Đề xuất (Giả định) | Phản hồi Doanh nghiệp (BA điền) | Nguồn Chốt (BA điền) |
|---|---|---|---|---|---|---|---|---|
| `Q-UC-NK-001-09` | Phân tách SoD | Có cho phép 1 tài khoản người dùng vừa thực hiện quét mã cất hàng (Thủ kho) vừa tự phê duyệt Phiếu nhập kho không? | `inputs/khao-sat-nhap-kho-hong-lam.md` Mục Q-02 | Blocker | Kế toán trưởng / COO | **PA1:** Nghiêm cấm tuyệt đối (Tách biệt quyền: Thủ kho chỉ cất hàng, Thủ kho trưởng hoặc Giám đốc mới được duyệt).<br>**PA2:** Cho phép với đơn hàng dưới 20 triệu. | | |
| `Q-UC-NK-001-10` | Sửa Mã Lô/EXP | Làm sao để ngăn chặn việc Nhân viên kho cố tình gõ sửa Mã Lô (Lot/Batch) hoặc Hạn sử dụng (EXP Date) trên hệ thống WMS để hợp thức hóa hàng cận Date? | `inputs/khao-sat-nhap-kho-hong-lam.md` Mục Q-03 | Blocker | Quản lý QA / IT | **PA1:** Mã Lô và EXP bắt buộc tự động sinh hoặc lấy cố định từ dữ liệu QC/Lệnh sản xuất, không cho phép chỉnh sửa tay tại kho.<br>**PA2:** Nếu sửa tay phải có phê duyệt của QA Lead. | | |
| `Q-UC-NK-001-11` | Gian lận Nhập khống | Cơ chế đối soát 3 bên (PO ERP - Biên bản giao nhận hàng - Phiếu nhập WMS) để chống thông đồng nhập khống hàng hóa với tài xế? | `inputs/khao-sat-nhap-kho-hong-lam.md` Mục Q-05 | Major | Kế toán kho / Kiểm toán nội bộ | **PA1:** WMS tự đối soát số lượng scan thực tế với PO; nếu vượt quá ngưỡng dung sai sẽ tự động khóa và gửi cảnh báo tới Kế toán trưởng.<br>**PA2:** Yêu cầu đính kèm ảnh chụp phiếu giao hàng có chữ ký tài xế lên phiếu nhập WMS. | | |

---

## 4. Danh sách Giả định Chờ Xác nhận (Assumptions)
*Nếu doanh nghiệp chưa phản hồi kịp, hệ thống tạm thời áp dụng Giả định bên dưới để xây dựng bản thảo Spec.*

| Mã Q-ID | Nội dung Giả định Tạm thời | Rủi ro nếu Giả định này SAI | Trạng thái Chốt |
|---|---|---|---|
| `Q-UC-NK-001-01` | HSD tối thiểu khi nhập kho phải còn >= 70% tổng hạn sử dụng. | Nhập hàng cận Date làm tăng tỷ lệ hàng hư hỏng/hết hạn tại cửa hàng. | Chờ duyệt |
| `Q-UC-NK-001-05` | Nhập thiếu/thừa ngoài dung sai cho phép nhập theo thực tế (Partial Inbound) và giữ PO ở trạng thái chờ giao tiếp. | Kế toán không hạch toán kịp công nợ hoặc treo PO vĩnh viễn trên ERP. | Chờ duyệt |
| `Q-UC-NK-001-09` | Phân tách trách nhiệm (SoD) 100%: Người tạo/quét hàng không được tự duyệt phiếu. | Rủi ro gian lận khai khống hàng nhập kho mà không có kiểm soát. | Chờ duyệt |
| `Q-UC-NK-001-10` | Khóa không cho sửa tay Mã Lô và HSD tại kho; dữ liệu lây từ phiếu QC/PO. | Rủi ro sửa Date hàng cũ thành hàng mới. | Chờ duyệt |
