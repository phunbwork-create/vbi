---
description: UI/UX Master thẩm định thiết kế Wireframe, thao tác thực tế kho và trải nghiệm đa thiết bị (Bước 45-UIUX-REVIEW)
---
# /uc-uiux-review $ARGUMENTS

**Tham số:** `$ARGUMENTS` = `<mã-UC> [vòng-review]` (Ví dụ: `UC-NK-001` hoặc `UC-NK-001 r1`). Mặc định vòng review là `r1`.

### Các bước thực hiện:
1. Kiểm tra trạng thái UC trong `UC-Registry.md` (phải ở `40-BA-REVIEW` hoặc `45-UIUX-REVIEW`).
2. Gọi agent **uiux-master** thực hiện thẩm định giao diện theo 5 tiêu chí UI/UX kho trong `agents/uiux-master.md`.
3. Rà soát danh sách màn hình `SCR-*` và mã nguồn HTML wireframe trong `uc/UC-<MOD>-<###>/screens/`.
4. Tạo báo cáo review tại `uc/UC-<MOD>-<###>/review/review-uiux-r<n>.md` kèm Verdict:
   - Nếu `APPROVED_DRAFT`: Đề xuất chuyển lên `47-TECH-REVIEW`.
   - Nếu `REJECTED_NEED_REFIX`: Trả về `30-DRAFTING` để điều chỉnh spec/wireframe.
5. Cập nhật `UC-Registry.md` và append lịch sử vào `logs/Log-UC-<MOD>-<###>.md`.
6. DỪNG trình BA con người xác nhận kết quả UI/UX review trước khi sang `/uc-tech-review <mã-UC>`.
