---
description: Soạn thảo bộ 4 tài liệu Specification (.md/.docx), Activity Diagram (.drawio) và Wireframe low-fi (.html) (Bước 30-DRAFTING)
---
# /uc-draft $ARGUMENTS

**Tham số:** `$ARGUMENTS` = `<mã-UC>` (Ví dụ: `UC-NK-001`).

### Các bước thực hiện:
1. Kiểm tra trạng thái của UC trong `UC-Registry.md`. UC phải ở trạng thái `20-SURVEYING` và đã có file phản hồi `answers-r<n>.md`.
2. Gọi agent **ba-writing** thực hiện quy trình soạn thảo trong `agents/ba-writing.md`.
3. Agent đọc grounding từ `inputs/`, `decisions/`, và `answers-r<n>.md`, tạo bộ 4 artifacts:
   - `uc/UC-<MOD>-<###>/UC-<MOD>-<###>-spec.md`
   - `uc/UC-<MOD>-<###>/UC-<MOD>-<###>-spec.docx`
   - `uc/UC-<MOD>-<###>/UC-<MOD>-<###>-activity.drawio`
   - `uc/UC-<MOD>-<###>/screens/SCR-UC-<MOD>-<###>-<##>.html`
4. Cập nhật trạng thái UC từ `20-SURVEYING` → `30-DRAFTING` → đề xuất `40-BA-REVIEW` trong `UC-Registry.md`.
5. Append nhật ký tiến trình vào `logs/Log-UC-<MOD>-<###>.md`.
6. DỪNG hiển thị danh sách file đã sinh cho BA kiểm tra và sẵn sàng bước `/uc-ba-review <mã-UC>`.
