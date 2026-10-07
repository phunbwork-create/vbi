# BÁO CÁO REVIEW {{UC-ID}} — VÒNG r{{n}}

> **Mã Use Case:** {{UC-ID}} — {{TÊN UC}}  
> **Tuyến Review:** `ba-lead-review` \| `uiux-master` \| `tech-lead-review` \| `qc-review`  
> **Thời điểm Review:** YYYY-MM-DD HH:mm  
> **Agent thực hiện:** {{TÊN_AGENT_REVIEW}}  
> **Kết luận (Verdict):** `APPROVED_DRAFT` *(Đề xuất chuyển bước tiếp theo)* \| `REJECTED_NEED_REFIX` *(Yêu cầu sửa lại)*  
> *Lưu ý: Verdict của Agent chỉ là ĐỀ XUẤT. Quyết định `60-APPROVED` cuối cùng thuộc về BA con người.*

---

## 1. Bảng Checklist Kiểm tra Theo Tuyến Review

### [Tuyến 1] Checklist BA Lead Reviewer (`ba-lead-review`)
| Mã | Tiêu chí Kiểm tra | Kết quả | Ghi chú / Chi tiết vi phạm |
|---|---|---|---|
| BL.1 | **Grounding**: 100% quy tắc `BR-*` và luồng nghiệp vụ có trích dẫn nguồn (`inputs/`, `decisions/`, `answers-r<n>.md`) | PASS / FAIL | |
| BL.2 | **Tính đầy đủ 5W1H & BACCM**: Đã mô tả đủ 6 khía cạnh 5W1H và 6 yếu tố BACCM | PASS / FAIL | |
| BL.3 | **Bao phủ Edge Cases**: Đã mô tả các luồng xử lý sai lệch số lượng, lỗi chất lượng, hỏng mạng | PASS / FAIL | |
| BL.4 | **Bao phủ Fraud Risks**: Đã bổ sung các quy tắc phân tách trách nhiệm (SoD) và kiểm soát gian lận kho | PASS / FAIL | |
| BL.5 | **Không bịa nghiệp vụ**: Không có phát biểu nào tự suy đoán khi chưa được doanh nghiệp chốt | PASS / FAIL | |

### [Tuyến 2] Checklist UI/UX Master Reviewer (`uiux-master`)
| Mã | Tiêu chí Kiểm tra | Kết quả | Ghi chú / Chi tiết vi phạm |
|---|---|---|---|
| UX.1 | **Tính rõ ràng thông tin**: SKU, Mã lô, HSD, Số lượng hiển thị nổi bật, dễ đọc trong môi trường kho | PASS / FAIL | |
| UX.2 | **Tối ưu thao tác kho**: Hỗ trợ quét mã vạch Barcode/QR liên tục, tối thiểu hóa số lần click trên PDA | PASS / FAIL | |
| UX.3 | **Đủ 5 trạng thái UI**: Đã thể hiện đủ 5 trạng thái (Default, Empty, Loading, Error, Success) | PASS / FAIL | |
| UX.4 | **Tương thích thiết bị**: Tương thích màn hình PDA/Handheld nhỏ và màn hình Desktop Kế toán | PASS / FAIL | |
| UX.5 | **Đồng bộ Design System**: Chuẩn hóa cấu trúc nút bấm, bảng biểu và màu sắc cảnh báo HSD | PASS / FAIL | |

### [Tuyến 3] Checklist Tech Lead Reviewer (`tech-lead-review`)
| Mã | Tiêu chí Kiểm tra | Kết quả | Ghi chú / Chi tiết vi phạm |
|---|---|---|---|
| TL.1 | **Tính khả thi Kỹ thuật**: Các quy tắc xử lý logic khả thi với hệ thống backend | PASS / FAIL | |
| TL.2 | **Chuẩn hóa Data Model**: Thực thể (Product, Lot, Bin, Transaction) đúng kiểu dữ liệu và ràng buộc | PASS / FAIL | |
| TL.3 | **Xử lý Đồng thời (Concurrency)**: Có cơ chế khóa tồn kho (Stock Lock) khi nhiều người quét cùng lúc | PASS / FAIL | |
| TL.4 | **Tích hợp Hệ thống**: Khả năng kết nối thiết bị PDA/Scanner và đồng bộ dữ liệu với ERP/POS | PASS / FAIL | |
| TL.5 | **Audit Trail Logging**: Yêu cầu lưu vết vĩnh viễn không thể xóa/sửa mọi giao dịch tồn kho | PASS / FAIL | |

### [Tuyến 4] Checklist QC Reviewer (`qc-review`)
| Mã | Tiêu chí Kiểm tra | Kết quả | Ghi chú / Chi tiết vi phạm |
|---|---|---|---|
| QC.1 | **Tính kiểm thử (Testability)**: Mọi yêu cầu và quy tắc `BR-*` đều rõ ràng, đo lường được | PASS / FAIL | |
| QC.2 | **Ma trận bao phủ Test Case**: Đủ các nhóm kịch bản Positive, Negative, Boundary, Fraud/SoD | PASS / FAIL | |
| QC.3 | **Phân tích Giá trị biên (BVA)**: Các điểm ngưỡng con số (HSD, Tồn tối thiểu, SLA) có điều kiện rõ | PASS / FAIL | |
| QC.4 | **Tiêu chí Nghiệm thu (AC)**: Danh sách Acceptance Criteria được viết theo cấu trúc Given-When-Then | PASS / FAIL | |

---

## 2. Danh sách Issue Phát hiện (`ISS-{{UC}}-<##>`)
| Mã Issue | Mức độ | Tiêu chí vi phạm | Mô tả chi tiết Vấn đề | Vị trí trong Spec / File | Hành động Khắc phục Yêu cầu | Trạng thái |
|---|---|---|---|---|---|---|
| `ISS-{{UC}}-01` | Critical | BL.1 (Grounding) | Quy tắc BR-02 thiếu trích dẫn nguồn | `spec.md` §9, dòng 45 | Bổ sung đường dẫn trích dẫn `decisions/...` | OPEN |
| `ISS-{{UC}}-02` | Major | QC.4 (AC) | Thiếu Tiêu chí Nghiệm thu cho trường hợp quét sai HSD | `spec.md` §12 | Soạn thêm AC2 theo dạng Given-When-Then | OPEN |

---

## 3. Kiểm tra Tiến độ Khắc phục Issue Vòng trước (Re-check)
| Mã ISS Cũ | Kết quả Khắc phục | Nhận xét của Reviewer | Trạng thái hiện tại |
|---|---|---|---|
| `ISS-{{UC}}-01` | ĐÃ SỬA | BA Writer đã bổ sung trích dẫn chính xác tại dòng 45 | CLOSED |

---

## 4. Tóm tắt Kết luận & Đề xuất Hành động cho BA
- **Kết luận (Verdict):** `{{APPROVED_DRAFT | REJECTED_NEED_REFIX}}`
- **Lý do tóm tắt:** (Tóm tắt từ 2–3 câu về chất lượng tài liệu và lý do đưa ra verdict).
- **3 Việc quan trọng nhất cần thực hiện tiếp theo:**
  1. {{Việc 1}}
  2. {{Việc 2}}
  3. {{Việc 3}}
