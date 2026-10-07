---
description: Phê duyệt chính thức Use Case và chuyển trạng thái 60-APPROVED (Dành riêng cho BA con người)
---
# /uc-approve $ARGUMENTS

**Tham số:** `$ARGUMENTS` = `<mã-UC>` (Ví dụ: `UC-NK-001`).

### Các bước thực hiện:
1. Kiểm tra trạng thái UC trong `UC-Registry.md`. UC phải ở trạng thái `50-PENDING-APPROVAL` và đã thông qua các báo cáo review.
2. Hiển thị bảng tổng hợp kết quả review từ BA Lead, UI/UX Master, Tech Lead và QC cho BA con người chốt.
3. DỪNG chờ lệnh xác nhận cuối cùng từ BA con người. Agent KHÔNG ĐƯỢC tự ý duyệt.
4. Khi BA con người phát lệnh phê duyệt:
   - Cập nhật trạng thái UC thành `60-APPROVED` trong `UC-Registry.md`.
   - Chuyển Wireframe từ pha 1 Low-fi Grayscale sang pha 2 Hi-fi (nếu có yêu cầu).
   - Append nhật ký phê duyệt chính thức vào `logs/Log-UC-<MOD>-<###>.md`.

