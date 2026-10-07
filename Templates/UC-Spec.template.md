# {{UC-ID}} — {{TÊN USE CASE}}

| Trường | Giá trị |
|---|---|
| **Phân hệ Kho** | `NK` (Nhập kho) \| `XK` (Xuất kho) \| `KK` (Kiểm kê) \| `LC` (Vị trí) \| `BC` (Báo cáo) |
| **Trạng thái UC** | `30-DRAFTING` *(Chờ trình review)* |
| **Phiên bản** | `0.1` |
| **Tác giả (BA Writer)** | `ba-writing` (draft) / BA con người: {{TÊN_BA}} |
| **Nguồn yêu cầu thô** | `inputs/{{FILE_YÊU_CẦU}}` — dòng {{DÒNG}} |
| **Căn cứ SOP / Kế toán** | `decisions/{{FILE_DECISION}}` — Mục {{MỤC}}, Điều {{ĐIỀU}} |
| **Phản hồi Khảo sát** | `uc/{{UC-ID}}/survey/answers-r{{n}}.md` |

---

## 1. Mô tả Tổng quan
(Mô tả từ 2–4 câu: Mục tiêu nghiệp vụ kho, giá trị quản lý mang lại, bối cảnh vận hành thực tế tại Công ty Ô mai Hồng Lam).

---

## 2. Tác nhân Tham gia (Actors)
| Actor | Vai trò trong Use Case | Quyền hạn & Nguyên tắc SoD | Nguồn trích dẫn |
|---|---|---|---|
| Thủ kho | Lập phiếu, thực nhập/xuất, quét mã vạch | Không được tự duyệt phiếu kiểm kê kho | `decisions/SOP-Kho-2024.md` §2.1 |
| Kế toán kho | Đối soát số liệu, ghi sổ kế toán | Kiểm tra chứng từ và số tiền | `decisions/SOP-Ketoan-Kho.md` §3.4 |
| Nhân viên bốc xếp | Đóng gói, xếp hàng vào vị trí kệ (Bin) | Chỉ thao tác theo lệnh trên thiết bị PDA | `inputs/danh-sach-chuc-nang.md` L45 |

---

## 3. Điều kiện Tiền đề / Hậu đề / Kích hoạt (Precondition / Postcondition / Trigger)
- **Precondition (Điều kiện tiên quyết):**
  - Hệ thống ở trạng thái sẵn sàng.
  - Vị trí kho (Bin Location) hoặc Danh mục SKU sản phẩm đã tồn tại.
- **Postcondition (Kết quả đo đạc được):**
  - Số lượng tồn kho tức thời (Real-time Stock) được cập nhật chính xác.
  - Nhật ký thao tác (Audit Log) được ghi nhận không thể sửa xóa.
- **Trigger (Sự kiện kích hoạt):**
  - Đơn mua hàng (PO) đến kho / Đơn xuất bán (SO) được duyệt / Đột xuất có lệnh kiểm kê từ Quản lý.

---

## 4. Luồng chính (Happy Path)
| Bước | Tác nhân | Hành động | Màn hình áp dụng | Business Rules áp dụng |
|---|---|---|---|---|
| M1 | Thủ kho | Chọn chức năng và quét mã vạch / nhập mã phiếu | `SCR-{{UC}}-01` | `BR-{{UC}}-01` |
| M2 | Hệ thống | Kiểm tra thông tin, hiển thị danh sách SKU và vị trí kệ | `SCR-{{UC}}-01` | `BR-{{UC}}-02` |
| M3 | Thủ kho | Quét mã lô/HSD ô mai, nhập số lượng thực tế | `SCR-{{UC}}-02` | `BR-{{UC}}-03` |
| M4 | Hệ thống | Ghi nhận giao dịch, cập nhật tồn kho, xuất thông báo thành công | `SCR-{{UC}}-02` | `BR-{{UC}}-04` |

---

## 5. Luồng thay thế (Alternate Flows)
### A1 — {{Tên luồng rẽ nhánh}} (Rẽ từ bước M{{n}}, điều kiện: {{điều kiện}})
| Bước | Tác nhân | Hành động | Điểm quay lại / Kết thúc |
|---|---|---|---|
| A1.1 | Thủ kho | Chọn nhập thủ công khi mã vạch bị rách/hỏng | Quay lại bước M3 |

---

## 6. Luồng ngoại lệ & Trường hợp đặc biệt (Edge Cases & Exception Flows)
### E1 — Sai lệch số lượng thực tế so với PO/SO (Rẽ từ bước M{{n}})
- **Điều kiện phát sinh:** Số lượng kiểm đếm thực tế ít hơn hoặc nhiều hơn chứng từ.
- **Hành động hệ thống:** Cảnh báo đỏ, yêu cầu lập Biên bản sai lệch và ghi lý do hao hụt/thừa.

### E2 — Sự cố mất kết nối mạng / Thiết bị quét mã hỏng (Edge Case hạ tầng)
- **Hành động hệ thống:** Cho phép lưu bản nháp Offline trên PDA, tự động đồng bộ (Sync) khi có kết nối trở lại.

---

## 7. Quy tắc Kiểm soát Mã Lô & Hạn Sử Dụng (Đặc thù Ô mai Hồng Lam)
- **Quản lý Mã lô (Batch/Lot):** Mọi mặt hàng Ô mai khi nhập/xuất kho bắt buộc phải gắn liền với Mã lô sản xuất.
- **Quy tắc Hạn sử dụng (HSD / Expiry Date):** 
  - Khống chế nhập kho: Ô mai nhập mua/nhập xưởng phải có HSD còn lại tối thiểu {{X}}% tổng HSD.
  - Khống chế xuất kho: Áp dụng nghiêm ngặt nguyên tắc **FEFO (First Expired, First Out)** — Hàng cận date phải xuất trước.

---

## 8. Kiểm soát Rủi ro Gian lận & Phân quyền (Fraud Risks & Segregation of Duties)
- **Phân tách trách nhiệm (SoD):** 
  - Thủ kho thực hiện nhập/xuất KHÔNG ĐƯỢC đồng thời đóng vai trò Kế toán duyệt phiếu.
  - Nhân viên bốc xếp KHÔNG có quyền thay đổi trạng thái tồn kho trên hệ thống.
- **Kiểm soát ngưỡng (Approval Limit Thresholds):** Giao dịch điều chỉnh tồn kho vượt quá {{X}} triệu VNĐ hoặc quá {{Y}}% sản lượng phải có sự phê duyệt cấp Quản lý Kho trở lên.
- **Audit Trail Logging:** Lưu vết vĩnh viễn IP, Device ID, User ID và timestamp của mọi thao tác sửa/hủy phiếu kho.

---

## 9. Danh sách Quy tắc Nghiệp vụ (Business Rules — `BR-*`)
| Mã BR | Phát biểu Quy tắc | Loại BR | Áp dụng tại bước | Căn cứ pháp lý / Nguồn trích dẫn |
|---|---|---|---|---|
| `BR-{{UC}}-01` | Mã vạch quét vào phải khớp với SKU trong hệ thống | Validation | M1 | `decisions/SOP-Kho-2024.md` §3.2 |
| `BR-{{UC}}-02` | Hạn sử dụng Ô mai nhập kho phải còn trên 6 tháng | Validation | M3 | `decisions/Quy-dinh-Chat-luong.md` Điều 5 |
| `BR-{{UC}}-03` | Tự động cảnh báo đỏ khi số lượng xuất vượt tồn khả dụng | Calculation | M3 | `answers-r1.md` Q-{{UC}}-02 |

---

## 10. Yêu cầu Dữ liệu & Structural Schema
| Tên trường | Kiểu dữ liệu | Bắt buộc | Ràng buộc / Validation | Mã BR liên quan |
|---|---|---|---|---|
| `ma_lo_san_xuat` | String (20) | Có | Định dạng: `LOT-YYYYMMDD-XX` | `BR-{{UC}}-02` |
| `han_su_dung` | Date | Có | Nằm trong tương lai | `BR-{{UC}}-02` |
| `so_luong_thuc_te` | Decimal (10,2) | Có | > 0 | `BR-{{UC}}-03` |

---

## 11. Danh sách Màn hình (Screens — `SCR-*`)
| Mã Màn hình | Tên Màn hình | Phục vụ bước | Đường dẫn File Wireframe |
|---|---|---|---|
| `SCR-{{UC}}-01` | Màn hình Chọn & Quét phiếu | M1, M2 | `screens/SCR-{{UC}}-01.html` |
| `SCR-{{UC}}-02` | Màn hình Nhập chi tiết Mã Lô & HSD | M3, M4 | `screens/SCR-{{UC}}-02.html` |

---

## 12. Tiêu chí Nghiệm thu (Acceptance Criteria — AC)
### AC1 — Kiểm thử Luồng nhập chuẩn (Happy Path)
- **Given:** Thủ kho đăng nhập vào hệ thống PDA và chọn phiếu nhập PO-1002.
- **When:** Thủ kho quét mã QR trên lô Ô mai Sấu Xào Gừng và nhập số lượng 500 hộp.
- **Then:** Hệ thống ghi nhận phiếu nhập, cập nhật tồn kho lô LOT-20260802 tăng 500, hiển thị thông báo thành công.

### AC2 — Kiểm thử Cảnh báo Hạn sử dụng (Negative / Boundary Path)
- **Given:** Thủ kho thực hiện quét lô Ô mai chỉ còn HSD 30 ngày (dưới ngưỡng quy định 180 ngày).
- **When:** Bấm "Xác nhận nhập kho".
- **Then:** Hệ thống ngăn chặn giao dịch, hiển thị popup lỗi đỏ: `"Lô hàng không đủ HSD tối thiểu theo BR-{{UC}}-02"`.

---

## 13. Truy vết Khảo sát (Survey Traceability)
| Mục trong Spec | Nguồn trích dẫn (Mã Q-ID / File nguồn) |
|---|---|
| §7 — Quy tắc HSD FEFO | `answers-r1.md` — Q-{{UC}}-01 |
| §8 — Ngưỡng duyệt điều chỉnh | `decisions/SOP-Ketoan-Kho.md` — Mục 4.1 |

---

## 14. Open Questions còn lại & Giả định Chờ xác nhận
| Mã Q-ID | Nội dung Vấn đề chưa rõ | Mức độ | Trạng thái |
|---|---|---|---|
| `Q-{{UC}}-01` | Thời gian cho phép hủy phiếu kho sau khi đã ghi nhận? | Blocker | OPEN (Chờ chốt với Kế toán trưởng) |

---

## 15. Nhật ký Thay đổi (Changelog)
| Phiên bản | Ngày | Tác giả / Agent | Nội dung thay đổi |
|---|---|---|---|
| 0.1 | YYYY-MM-DD | `ba-writing` | Khởi tạo dự thảo Spec từ kết quả khảo sát `answers-r1.md` |
