---
description: BA Lead thẩm định chất lượng Specification, trích dẫn Grounding, Edge Cases và Rủi ro gian lận (Bước 40-BA-REVIEW)
---
# /uc-ba-review $ARGUMENTS

**Tham số:** `$ARGUMENTS` = `<mã-UC> [vòng-review]` (Ví dụ: `UC-NK-001` hoặc `UC-NK-001 r1`). Mặc định vòng review là `r1`.

### Các bước thực hiện:
1. Kiểm tra trạng thái UC trong `UC-Registry.md` (phải ở `30-DRAFTING` hoặc `40-BA-REVIEW`).
2. Gọi agent **ba-lead-review** thực hiện quy trình thẩm định theo 5 tiêu chí trong `agents/ba-lead-review.md`.
3. Phân tích đối chiếu grounding với `inputs/` và `decisions/`, phát hiện sai sót và lập danh sách lỗi `ISS-UC-<MOD>-<###>-<##>`.
4. Tạo báo cáo review tại `uc/UC-<MOD>-<###>/review/review-ba-lead-r<n>.md` kèm Verdict:
   - Nếu `APPROVED_DRAFT`: Đề xuất chuyển lên `45-UIUX-REVIEW`.
   - Nếu `REJECTED_NEED_REFIX`: Trả về `30-DRAFTING` cho `ba-writing` sửa lại.
5. Cập nhật `UC-Registry.md` và append lịch sử vào `logs/Log-UC-<MOD>-<###>.md`.
6. DỪNG chờ BA con người duyệt báo cáo review trước khi chuyển sang `/uc-uiux-review <mã-UC>`.

