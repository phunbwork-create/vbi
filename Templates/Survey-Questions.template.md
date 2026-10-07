# BỘ CÂU HỎI KHẢO SÁT {{UC-ID}} — VÒNG r{{n}}

> **Use Case:** {{UC-ID}} — {{TÊN UC}}  
> **Ngày tạo:** YYYY-MM-DD \| **Agent thực hiện:** `ba-khao-sat` \| **Tổng số câu hỏi:** {{N}} câu *(Blocker: {{X}})*  
> **Hướng dẫn cho BA con người:** BA sao chép nội dung câu hỏi này sang file `answers-r{{n}}.md` trong thư mục `uc/{{UC-ID}}/survey/` và điền câu trả lời vào 2 cột cuối. **Không xóa hoặc sửa cột nội dung câu hỏi gốc.**

---

## 1. Phân nhóm A — Luồng Nghiệp vụ Chuẩn (5W1H & BACCM)
*Tập trung làm rõ bối cảnh, tác nhân thực hiện, trình tự thao tác và giá trị nghiệp vụ mang lại.*

| Mã Q-ID | Khía cạnh | Nội dung Câu hỏi Làm rõ | Căn cứ Trích dẫn (File + Dòng) | Mức độ | Người trả lời gợi ý | Phương án Đề xuất (Giả định) | Phản hồi Doanh nghiệp (BA điền) | Nguồn Chốt (BA điền) |
|---|---|---|---|---|---|---|---|---|
| `Q-{{UC}}-01` | WHO / SoD | Ai là người duy nhất có quyền hủy phiếu nhập kho sau khi đã ghi nhận? | `inputs/danh-sach-chuc-nang.md` L28 | Blocker | Kế toán kho / Quản lý kho | **PA1:** Quản lý kho duyệt.<br>**PA2:** Kế toán trưởng duyệt. | | |
| `Q-{{UC}}-02` | WHAT / HSD | Quy định hạn sử dụng tối thiểu còn lại của Ô mai khi nhập xưởng là bao nhiêu tháng? | `decisions/SOP-Kho-2024.md` §3.1 | Major | QA/QC Hồng Lam | **PA1:** Còn >= 6 tháng.<br>**PA2:** Còn >= 50% tổng HSD. | | |

---

## 2. Phân nhóm B — Trường hợp Ngoại lệ & Kịch bản Bất thường (Edge Cases)
*Tập trung làm rõ luồng xử lý sai lệch số lượng, lỗi hàng hóa, sự cố thiết bị/hạ tầng kho.*

| Mã Q-ID | Loại Ngoại lệ | Nội dung Câu hỏi Xử lý Sự cố | Căn cứ Trích dẫn (File + Dòng) | Mức độ | Người trả lời gợi ý | Phương án Đề xuất (Giả định) | Phản hồi Doanh nghiệp (BA điền) | Nguồn Chốt (BA điền) |
|---|---|---|---|---|---|---|---|---|
| `Q-{{UC}}-03` | Sai lệch số lượng | Khi số lượng kiểm đếm thực tế ít hơn trên PO, hệ thống xử lý như thế nào? | `inputs/khao-sat-kho.md` L14 | Blocker | Thủ kho / Kế toán | **PA1:** Nhập theo thực tế, tạo phiếu thiếu.<br>**PA2:** Từ chối toàn bộ lô hàng. | | |
| `Q-{{UC}}-04` | Sự cố PDA | Khi thiết bị quét PDA bị mất kết nối Wifi trong kho, hệ thống cho phép quét Offline không? | `decisions/SLA-Kho.md` §2.4 | Major | Đội IT / Thủ kho | **PA1:** Cho phép lưu tạm Offline trên PDA.<br>**PA2:** Khóa không cho quét. | | |

---

## 3. Phân nhóm C — Rủi ro Gian lận & Kiểm soát Nội bộ (Fraud Risks & Internal Controls)
*Tập trung xoáy sâu vào các khe hở gian lận kho hàng, phân tách trách nhiệm (SoD) và quy trình phê duyệt.*

| Mã Q-ID | Loại Rủi ro | Nội dung Câu hỏi Kiểm soát Gian lận | Căn cứ Trích dẫn (File + Dòng) | Mức độ | Người trả lời gợi ý | Phương án Đề xuất (Giả định) | Phản hồi Doanh nghiệp (BA điền) | Nguồn Chốt (BA điền) |
|---|---|---|---|---|---|---|---|---|
| `Q-{{UC}}-05` | Gian lận kiểm kê | Quy định chống việc Thủ kho tự ý điều chỉnh giảm tồn kho với lý do "hàng hư hỏng/mất mát"? | `decisions/Quy-dinh-Ke-toan.md` §5.2 | Blocker | Kế toán trưởng | **PA1:** Bắt buộc có biên bản có chữ ký QA.<br>**PA2:** Phải có phê duyệt từ Ban GĐ. | | |
| `Q-{{UC}}-06` | Tráo tem HSD | Làm sao để ngăn chặn việc tráo đổi tem nhãn mã lô của Ô mai cận date? | `decisions/SOP-Kho-2024.md` §4.3 | Major | Quản lý Kho | **PA1:** Dùng tem niêm phong QR code nhảy.<br>**PA2:** Đối soát số lô trực tiếp từ hệ thống. | | |

---

## 4. Danh sách Giả định Chờ Xác nhận (Assumptions)
*Nếu doanh nghiệp chưa phản hồi kịp, hệ thống tạm thời áp dụng Giả định bên dưới để xây dựng Spec.*

| Mã Q-ID | Nội dung Giả định Tạm thời | Rủi ro nếu Giả định này SAI | Trạng thái Chốt |
|---|---|---|---|
| `Q-{{UC}}-01` | Giả định chỉ có Quản lý kho mới có quyền duyệt hủy phiếu kho. | Nếu Kế toán trưởng yêu cầu duyệt → Phải sửa lại phân quyền hệ thống. | Chờ duyệt |
