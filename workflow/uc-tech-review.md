---
description: Tech Lead thẩm định tính khả thi kỹ thuật, Data Model, Concurrency, Stock Locking & Audit Trail (Bước 47-TECH-REVIEW)
---
# /uc-tech-review $ARGUMENTS

**Tham số:** `$ARGUMENTS` = `<mã-UC> [vòng-review]` (Ví dụ: `UC-NK-001` hoặc `UC-NK-001 r1`). Mặc định vòng review là `r1`.

### Các bước thực hiện:
1. Kiểm tra trạng thái UC trong `UC-Registry.md` (phải ở `45-UIUX-REVIEW` hoặc `47-TECH-REVIEW`).
2. Gọi agent **tech-lead-review** thực hiện quy trình thẩm định kiến trúc trong `agents/tech-lead-review.md`.
3. Rà soát Data Model, API Payload, cơ chế khóa tồn kho (Stock Locking) và Immutable Audit Log.
4. Tạo báo cáo review tại `uc/UC-<MOD>-<###>/review/review-tech-r<n>.md` kèm Verdict:
   - Nếu `APPROVED_DRAFT`: Đề xuất chuyển lên `50-PENDING-APPROVAL`.
   - Nếu `REJECTED_NEED_REFIX`: Trả về `30-DRAFTING` cho `ba-writing` sửa lại.
5. Cập nhật `UC-Registry.md` và append lịch sử vào `logs/Log-UC-<MOD>-<###>.md`.
6. DỪNG báo cáo BA con người kết quả thẩm định kỹ thuật trước khi phê duyệt `/uc-approve <mã-UC>`.

