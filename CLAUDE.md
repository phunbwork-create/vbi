# DỰ ÁN CÔNG TY Ô MAI HỒNG LAM - HỆ AGENT QUẢN LÝ VÒNG ĐỜI USE CASE

> Tài liệu hướng dẫn tích hợp và kích hoạt Slash Commands cho Claude Code & AI Assistants.
> Toàn bộ quy tắc cốt lõi được tham chiếu trực tiếp từ Hiến pháp hệ Agent: [AGENTS.md](file:///c:/Users/Admin/Desktop/02_Dao%20tao%20&%20Mentoring/Multi%20Agent%20BA%20demo/AGENTS.md).

---

## 1. Danh sách Slash Commands Hỗ trợ

Hệ thống cung cấp 8 Slash Commands đại diện cho từng bước trong vòng đời Use Case (State Machine):

| Slash Command | Tham số | Mô tả ngắn | Trạng thái chuyển đổi |
|---|---|---|---|
| `/uc-clarify` | `[file-input]` | Nạp danh sách chức năng, phân loại CLEAR/AMBIGUOUS/DUPLICATE/INFEASIBLE | `00-INTAKE` → `10-CLARIFYING` |
| `/uc-survey` | `<mã-UC> [vòng]` | Lập bộ câu hỏi khảo sát 4 khung (BACCM, 5W1H, Edge Cases, Fraud Risk) | `10-CLARIFYING` → `20-SURVEYING` |
| `/uc-draft` | `<mã-UC>` | Soạn thảo bộ 4 tài liệu Spec (.md/.docx), Activity (.drawio), Wireframe (.html) | `20-SURVEYING` → `30-DRAFTING` → `40-BA-REVIEW` |
| `/uc-ba-review` | `<mã-UC> [vòng]` | BA Lead thẩm định chất lượng Spec, trích dẫn Grounding, Edge Cases | `40-BA-REVIEW` → `45-UIUX-REVIEW` |
| `/uc-uiux-review` | `<mã-UC> [vòng]` | UI/UX Master thẩm định Wireframe HTML, trải nghiệm thao tác kho | `45-UIUX-REVIEW` → `47-TECH-REVIEW` |
| `/uc-tech-review` | `<mã-UC> [vòng]` | Tech Lead thẩm định Data Model, Concurrency, Stock Locking & Audit Log | `47-TECH-REVIEW` → `50-PENDING-APPROVAL` |
| `/uc-qc-review` | `<mã-UC> [vòng]` | QC thẩm định tính kiểm thử (Testability), Boundary Value & AC | Đánh giá độc lập test coverage |
| `/uc-approve` | `<mã-UC>` | BA con người phê duyệt chính thức UC | `50-PENDING-APPROVAL` → `60-APPROVED` |

---

## 2. Quy trình Vận hành Chuẩn (Workflow Stream)

```
/uc-clarify ➔ /uc-survey ➔ [Nạp answers-r1.md] ➔ /uc-draft ➔ /uc-ba-review ➔ /uc-uiux-review ➔ /uc-tech-review ➔ /uc-approve
```

---

## 3. Quy tắc Bắt buộc (Mandatory Rules)

1. **Grounding:** Chỉ trích dẫn thông tin từ `inputs/` và `decisions/`. Nếu thiếu căn cứ, lập mã câu hỏi `Q-<UC>-<##>`. KHÔNG BỊA THÔNG TIN.
2. **Cập nhật RTM & Log:** Sau mỗi lệnh slash command thành công, agent phải cập nhật file `UC-Registry.md` và ghi nhật ký vào `logs/Log-UC-<MOD>-<###>.md`.
3. **Phê duyệt:** Trạng thái `60-APPROVED` chỉ được set bởi BA (con người) thông qua `/uc-approve`.
