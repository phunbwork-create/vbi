# BỘ CÂU HỎI KHẢO SÁT UC-XK-001 — VÒNG r1

> **Use Case:** UC-XK-001 — Quản lý Xuất kho (Outbound Warehouse Management)  
> **Ngày tạo:** 2026-10-07 | **Agent thực hiện:** `ba-khao-sat` | **Tổng số câu hỏi:** 11 câu *(Blocker: 5 | Major: 6)*  
> **Hướng dẫn cho BA con người:** BA sao chép nội dung câu hỏi này sang file `answers-r1.md` trong thư mục `uc/UC-XK-001/survey/` và điền câu trả lời vào 2 cột cuối. **Không xóa hoặc sửa cột nội dung câu hỏi gốc.**

---

## 1. Phân nhóm A — Luồng Nghiệp vụ Chuẩn (5W1H & BACCM)
*Tập trung làm rõ chiến lược FEFO, nguyên tắc giữ chỗ tồn kho (Stock Reservation) và phân loại phiếu xuất.*

| Mã Q-ID | Khía cạnh | Nội dung Câu hỏi Làm rõ | Căn cứ Trích dẫn | Mức độ | Người trả lời gợi ý | Phương án Đề xuất (Giả định) | Phản hồi Doanh nghiệp (BA điền) | Nguồn Chốt (BA điền) |
|---|---|---|---|---|---|---|---|---|
| `Q-UC-XK-001-01` | WHAT / Document | Hệ thống WMS nên tổ chức thành bao nhiêu Mẫu Phiếu Xuất Kho nghiệp vụ riêng biệt? | `inputs/khao-sat-xuat-kho-hong-lam.md` Mục Q-01 | Major | Kế toán kho / Thủ kho trưởng | **PA1:** Tách 4 mẫu phiếu: `XK-SO` (Bán hàng), `XK-EC` (Thương mại điện tử), `XK-CK` (Chuyển kho), `XK-TH` (Xuất tiêu hủy).<br>**PA2:** Dùng 1 phiếu chung, chỉ chọn Loại giao dịch. | | |
| `Q-UC-XK-001-02` | HOW / FEFO | Khi hệ thống áp dụng nguyên tắc FEFO, nếu một khách hàng siêu thị yêu cầu HSD còn lại $\ge 75\%$ mà lô cận date nhất trong kho chỉ còn $60\%$, WMS xử lý ra sao? | `inputs/khao-sat-xuat-kho-hong-lam.md` Mục Q-02 | Blocker | Trưởng phòng Bán hàng / QA | **PA1:** WMS cho phép cấu hình quy tắc HSD theo từng Khách hàng/Kênh bán; hệ thống tự động nhảy qua lô $60\%$ và chỉ định lô $\ge 75\%$ cho khách này.<br>**PA2:** Bắt buộc Thủ kho làm thủ tục ngoại lệ xin duyệt tay từ Ban Giám đốc. | | |
| `Q-UC-XK-001-03` | HOW / Picking | Với đơn hàng Thương mại điện tử (Shopee/TikTok), hệ thống gom bao nhiêu đơn hàng thành 1 đợt Wave Picking? | `inputs/khao-sat-xuat-kho-hong-lam.md` Mục Q-03 | Major | Trưởng nhóm E-commerce / Thủ kho | **PA1:** Gom tối đa 50 đơn hàng/đợt wave (tùy thuộc số ngăn của xe đẩy hàng).<br>**PA2:** Gom theo từng Đơn vị vận chuyển (GHN/Viettel Post riêng biệt). | | |
| `Q-UC-XK-001-04` | WHEN / SLA | Quy định SLA thời gian xử lý từ khi nhận đơn SO từ ERP đến khi hoàn tất đóng gói và bàn giao cho Đơn vị vận chuyển là bao lâu? | `inputs/khao-sat-xuat-kho-hong-lam.md` Mục Q-03 | Major | Giám đốc Logistics | **PA1:** Đơn TMĐT cùng ngày: Hoàn tất trước 16h00 hàng ngày. Đơn đại lý/siêu thị: Tối đa 24h kể từ khi SO được duyệt.<br>**PA2:** Tối đa 4 giờ đối với mọi loại đơn. | | |

---

## 2. Phân nhóm B — Trường hợp Ngoại lệ & Kịch bản Bất thường (Edge Cases)
*Tập trung làm rõ luồng xử lý thiếu hàng trên kệ, hàng bị hư hỏng lúc nhặt, hủy đơn khi đã lấy hàng ra khỏi kệ.*

| Mã Q-ID | Loại Ngoại lệ | Nội dung Câu hỏi Xử lý Sự cố | Căn cứ Trích dẫn | Mức độ | Người trả lời gợi ý | Phương án Đề xuất (Giả định) | Phản hồi Doanh nghiệp (BA điền) | Nguồn Chốt (BA điền) |
|---|---|---|---|---|---|---|---|---|
| `Q-UC-XK-001-05` | Sai lệch Tồn kệ | Khi PDA dẫn đường đến vị trí Bin Location nhưng thực tế trên kệ KHÔNG ĐỦ số lượng hoặc hàng bị móp vỡ không thể xuất, WMS xử lý thế nào? | `inputs/khao-sat-xuat-kho-hong-lam.md` Mục Q-02, Q-03 | Blocker | Thủ kho trưởng / IT Lead | **PA1:** Thủ kho bấm "Báo thiếu/Lỗi kệ" trên PDA. WMS tự động gợi ý ngay Vị trí Bin kế tiếp có cùng SKU/Lô đạt chuẩn để nhặt bù, đồng thời tạo Lệnh kiểm kê đột xuất cho ô kệ bị thiếu.<br>**PA2:** Dừng toàn bộ lệnh xuất kho, chờ kiểm kê xong mới cho xuất tiếp. | | |
| `Q-UC-XK-001-06` | Khách hủy đơn dở dang | Khi khách hàng hủy đơn hàng trên ERP/Shopee trong lúc Thủ kho đang cầm PDA nhặt dở hàng trong kho, WMS rollback ra sao? | `inputs/khao-sat-xuat-kho-hong-lam.md` Mục Q-03 | Blocker | IT Lead / Kế toán kho | **PA1:** ERP bắn Webhook hủy sang WMS; PDA lập tức phát tín hiệu cảnh báo đỏ "Đơn hàng đã bị hủy". PDA kích hoạt luồng "Return-to-Bin" chỉ dẫn thủ kho trả hàng lại đúng các vị trí ô kệ ban đầu.<br>**PA2:** Tiếp tục nhặt xong đơn rồi đưa vào khu vực Hàng hoàn để xử lý sau. | | |
| `Q-UC-XK-001-07` | Lỗi mạng PDA khi nhặt hàng | Nếu PDA mất kết nối Wifi trong lòng kho khi đang trong phiên nhặt hàng (Pick Session), WMS có cho phép tiếp tục quét mã không? | `inputs/khao-sat-xuat-kho-hong-lam.md` Mục Q-03 | Major | IT Lead / Đội hạ tầng | **PA1:** Cho phép hoàn tất danh sách nhặt hàng Offline trong phiên hiện tại, lưu kết quả trên bộ nhớ đệm PDA và tự động đồng bộ khi về lại vùng có sóng Wifi.<br>**PA2:** Khóa không cho quét tiếp, yêu cầu di chuyển ra khu vực có sóng. | | |
| `Q-UC-XK-001-08` | Cân nặng chênh lệch tại Packing | Tại Bàn đóng gói (Packing Station), nếu trọng lượng thực tế gói hàng sau khi đóng lệch so với trọng lượng định mức chuẩn của hệ thống, WMS xử lý thế nào? | `inputs/khao-sat-xuat-kho-hong-lam.md` Mục Q-03 | Major | QA / Quản lý đóng gói | **PA1:** Cho phép dung sai trọng lượng $\pm 2\%$. Nếu vượt quá dung sai, hệ thống khóa không cho in Phiếu giao hàng / Vận đơn, bắt buộc nhân viên mở gói kiểm tra lại từng hũ hàng.<br>**PA2:** Chỉ cảnh báo, cho phép nhân viên bấm xác nhận bỏ qua. | | |

---

## 3. Phân nhóm C — Rủi ro Gian lận & Kiểm soát Nội bộ (Fraud Risks & Internal Controls)
*Tập trung xoáy sâu vào các kịch bản thất thoát xuất khống, tráo đổi Date ô mai, và phân tách trách nhiệm (SoD).*

| Mã Q-ID | Loại Rủi ro | Nội dung Câu hỏi Kiểm soát Gian lận | Căn cứ Trích dẫn | Mức độ | Người trả lời gợi ý | Phương án Đề xuất (Giả định) | Phản hồi Doanh nghiệp (BA điền) | Nguồn Chốt (BA điền) |
|---|---|---|---|---|---|---|---|---|
| `Q-UC-XK-001-09` | Phân tách SoD | Có cho phép 1 tài khoản người dùng vừa thực hiện quét mã nhặt hàng (Thủ kho) vừa tự bấm "Phê duyệt Xuất kho" trên hệ thống không? | `inputs/khao-sat-xuat-kho-hong-lam.md` Mục Q-04 | Blocker | Kế toán trưởng / Kiểm toán nội bộ | **PA1:** Nghiêm cấm tuyệt đối (SoD 100%). Thủ kho chỉ nhặt/đóng gói; Thủ kho trưởng duyệt đơn `< 100M`; Giám đốc Logistics/COO duyệt đơn `\ge 100M` hoặc đơn tiêu hủy.<br>**PA2:** Cho phép Thủ kho tự duyệt với đơn lẻ TMĐT dưới 2 triệu. | | |
| `Q-UC-XK-001-10` | Gian lận Tráo Lô/Date | Làm thế nào ngăn chặn Thủ kho cố tình nhặt lô ô mai Date mới (HSD xa) đem bán ra ngoài hoặc tuồn cho người quen, trong khi trên hệ thống lại ghi xuất lô Date cũ? | `inputs/khao-sat-xuat-kho-hong-lam.md` Mục Q-02 | Blocker | Giám đốc Vận hành / IT | **PA1:** PDA bắt buộc quét mã Barcode/QR của từng Thùng/Hũ hàng. Hệ thống đối chiếu chính xác Mã Lô và Ngày SX; nếu sai lệch với Lô FEFO được chỉ định, PDA sẽ báo lỗi và không cho hoàn thành thao tác.<br>**PA2:** Cho phép thủ kho chọn lại lô trên màn hình nếu lô cũ bị kẹt. | | |
| `Q-UC-XK-001-11` | Xuất lén / Xuất không SO | Cơ chế nào ngăn chặn việc nhân viên đưa hàng ra khỏi cửa kho mà không có Lệnh xuất kho hợp lệ được duyệt từ ERP? | `inputs/khao-sat-xuat-kho-hong-lam.md` Mục Q-04, Q-05 | Major | Đội Bảo vệ / Kiểm toán nội bộ | **PA1:** Tích hợp Cổng kiểm soát bảo vệ (Security Gate Check): Bảo vệ cửa kho dùng máy quét Barcode quét Mã vận đơn/Mã phiếu xuất trên thùng hàng; chỉ khi hệ thống báo trạng thái "ĐÃ DUYỆT XUẤT" mới mở barrier cho xe rời kho.<br>**PA2:** Bảo vệ chỉ ký đối chiếu trên Phiếu xuất kho bản giấy. | | |

---

## 4. Danh sách Giả định Tạm thời (Assumptions)
- `Q-UC-XK-001-02`: WMS áp dụng FEFO tự động, hỗ trợ cấu hình Shelf-life tối thiểu theo từng nhóm khách hàng lớn.
- `Q-UC-XK-001-05`: Khi thiếu hàng trên kệ, WMS tự động gợi ý vị trí ô kệ kế tiếp và tạo lệnh kiểm kê đột xuất.
- `Q-UC-XK-001-09`: Tuân thủ SoD 100%, ngưỡng duyệt `< 100M` thuộc Thủ kho trưởng, `\ge 100M` thuộc Giám đốc Logistics/COO.
- `Q-UC-XK-001-11`: Bắt buộc quét mã xác thực tại Cổng bảo vệ trước khi hàng rời khỏi kho.
