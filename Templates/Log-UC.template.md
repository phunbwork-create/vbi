# NHẬT KÝ TIẾN TRÌNH — {{UC-ID}}

> **Append-only log:** File nhật ký ghi vết hoạt động. Mỗi khi bất kỳ Agent nào (`ba-khao-sat`, `ba-writing`, `ba-lead-review`, `uiux-master`, `tech-lead-review`, `qc-review`) hoặc BA con người thực hiện thao tác trên Use Case này, **bắt buộc phải append (không ghi đè)** một mục mới vào CUỐI file.

---

## [{{YYYY-MM-DD HH:mm}}] {{TÊN_AGENT / BA_CON_NGƯỜI}} — {{HÀNH ĐỘNG NGẮN GỌN}}
- **Đầu vào:** (Ví dụ: `inputs/danh-sach.md`, `decisions/SOP-Kho.md`, `answers-r1.md`)
- **Kết quả thực hiện:** (Ví dụ: Đã tạo `questions-r1.md` gồm 5 câu hỏi; hoặc đã xuất bản thảo Spec `UC-NK-001-spec.md`)
- **Số Open Questions còn lại:** {{N}} câu | **Số Issue (`ISS-*`) chưa đóng:** {{X}} lỗi
- **Thay đổi Trạng thái UC:** `{{TRẠNG_THÁI_TRƯỚC}}` → `{{TRẠNG_THÁI_SAU}}`
- **Bước tiếp theo:** (Ví dụ: Chờ BA con người nạp file `answers-r1.md`; hoặc chuyển `uiux-master` review wireframe)
