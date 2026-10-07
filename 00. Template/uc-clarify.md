---
description: Nạp danh sách chức năng, làm rõ phạm vi/khả thi/trùng lặp, đề xuất UC thay thế (Bước 1-2)
---
# /uc-clarify [đường-dẫn-file-inputs cụ thể, mặc định toàn bộ inputs/]

1. Gọi agent **uc-intake-analyst** thực hiện đúng quy trình A→D trong `agents/uc-intake-analyst.md`.
2. Sau khi agent xong: hiển thị cho BA bảng tóm tắt CLEAR/AMBIGUOUS/DUPLICATE/INFEASIBLE + các quyết định đang chờ BA.
3. DỪNG chờ BA. Không tự chuyển các mục DUPLICATE/INFEASIBLE thành trạng thái cuối khi BA chưa xác nhận.
4. Khi BA xác nhận (trả lời trong chat hoặc sửa file intake-report): cập nhật Registry + log tương ứng, cấp mã UC cho các mục được duyệt, chuyển trạng thái `10-CLARIFYING` → sẵn sàng `/uc-survey`.
