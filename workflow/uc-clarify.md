---
description: Nạp danh sách chức năng, làm rõ phạm vi/khả thi/trùng lặp, đề xuất UC thay thế (Bước 10-CLARIFYING)
---
# /uc-clarify $ARGUMENTS

**Tham số:** `$ARGUMENTS` = `[đường-dẫn-file-input]` (Không bắt buộc. Nếu để trống, mặc định đọc toàn bộ file trong thư mục `inputs/`).

### Các bước thực hiện:
1. Đọc nội dung file input được truyền qua `$ARGUMENTS` (hoặc quét toàn bộ file markdown/docx/xlsx trong `inputs/`).
2. Gọi agent **uc-intake-analyst** thực hiện đúng quy trình A→D trong `agents/uc-intake-analyst.md`.
3. Tuân thủ nghiêm ngặt **NGUYÊN TẮC GROUNDING** (Mục 2 - `AGENTS.md`), chỉ trích dẫn thông tin từ `inputs/` và `decisions/`.
4. Phân loại danh sách chức năng thành 4 nhóm: `CLEAR`, `AMBIGUOUS`, `DUPLICATE`, `INFEASIBLE`.
5. Tạo hoặc cập nhật file báo cáo `inputs/intake-report.md`.
6. Cập nhật `UC-Registry.md` (chuyển trạng thái sang `10-CLARIFYING` cho các mục hợp lệ) và append nhật ký vào `logs/Log-UC-*.md`.
7. DỪNG và báo cáo kết quả cho BA con người. Không tự ý loại bỏ hay gộp UC khi chưa có phản hồi từ BA.

