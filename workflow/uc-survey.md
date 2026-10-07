---
description: Khảo sát yêu cầu, phát hiện thiếu sót/Edge Cases/Fraud Risks và lập bộ câu hỏi khảo sát (Bước 20-SURVEYING)
---
# /uc-survey $ARGUMENTS

**Tham số:** `$ARGUMENTS` = `<mã-UC> [vòng-khảo-sát]` (Ví dụ: `UC-NK-001` hoặc `UC-NK-001 r2`). Mặc định vòng khảo sát là `r1`.

### Các bước thực hiện:
1. Kiểm tra trạng thái của UC trong `UC-Registry.md`. UC phải ở trạng thái `10-CLARIFYING` hoặc `20-SURVEYING`.
2. Gọi agent **ba-khao-sat** thực hiện quy trình khảo sát theo `agents/ba-khao-sat.md`.
3. Agent phân tích theo 4 bộ khung (BACCM, 5W1H, Edge Cases, Fraud Risk & Internal Control), lập file `uc/UC-<MOD>-<###>/survey/questions-r<n>.md` chứa danh sách các câu hỏi `Q-<UC>-<##>`.
4. Cập nhật trạng thái UC lên `20-SURVEYING` trong `UC-Registry.md` và append lịch sử vào `logs/Log-UC-<MOD>-<###>.md`.
5. DỪNG chờ BA con người làm việc với doanh nghiệp và nạp file phản hồi `uc/UC-<MOD>-<###>/survey/answers-r<n>.md`. Sau khi có file answers, BA có thể chạy `/uc-draft <mã-UC>`.

