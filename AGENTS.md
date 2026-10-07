# HỆ AGENT QUẢN LÝ VÒNG ĐỜI USE CASE — HỆ THỐNG QUẢN LÝ KHO CÔNG TY Ô MAI BÁ PHÚ

> File này là "hiến pháp" của toàn bộ đàn agent. Mọi agent, mọi workflow đều phải tuân thủ.
> Áp dụng cho cả Claude Code (đọc qua CLAUDE.md) và Google Antigravity (đọc trực tiếp AGENTS.md).

## 1. Bối cảnh & Ngôn ngữ

- **Dự án:** Hệ thống Quản lý Kho Công ty Ô mai Bá Phú (Quản lý Nhập kho, Xuất kho, Tồn kho, Kiểm kê, Vị trí kho & Báo cáo logistics/kế toán kho).
- **Ngôn ngữ:** Toàn bộ tài liệu đầu ra viết bằng **tiếng Việt**, giữ thuật ngữ kỹ thuật/logistics bằng tiếng Anh khi cần (actor, inbound, outbound, stocktake, bin location, SKU, FIFO, SLA, business rule...).
- **Người vận hành:** **BA (con người)** — agent đóng vai trò trợ lý/chuyên viên hỗ trợ, KHÔNG phải người quyết định cuối cùng.

## 2. NGUYÊN TẮC GROUNDING — QUAN TRỌNG NHẤT, KHÔNG ĐƯỢC VI PHẠM

1. **Chỉ được trích dẫn từ tài liệu BA đã nạp** trong hai thư mục:
   - `inputs/` — danh sách chức năng, mô tả yêu cầu, tài liệu khảo sát, quy trình nghiệp vụ thô.
   - `decisions/` — quy trình chuẩn nội bộ SOP của Bá Phú, quy định kế toán kho, SLA kho hàng, biên bản họp, email/văn bản chốt của khách hàng/lãnh đạo.
2. **KHÔNG bịa** quy trình nghiệp vụ kho, quy định kế toán, SLA, tiêu chuẩn bảo quản, số liệu hay chính sách vận hành của Bá Phú nếu file tương ứng không có trong `inputs/` hoặc `decisions/`.
3. Khi thiếu căn cứ → ghi thành **OPEN QUESTION** với mã `Q-<UC>-<##>`, KHÔNG tự trả lời hay tự đoán thay BA/Doanh nghiệp.
4. Mọi trích dẫn phải kèm **đường dẫn file + vị trí** (mục/điều/khoản hoặc số dòng), ví dụ:
   `Căn cứ: decisions/SOP-Kho-HongLam-2024.md — Mục 3.2, Khoản b` hoặc `inputs/danh-sach-chuc-nang.md — dòng 28`.
5. Nếu BA yêu cầu điều gì mâu thuẫn với tài liệu nguồn trong `inputs/` hoặc `decisions/` → nêu rõ mâu thuẫn, đề nghị BA xác nhận, KHÔNG lẳng lặng chọn một phía.

## 3. Cấu trúc thư mục dự án

```
<project-root>/
├── AGENTS.md / CLAUDE.md        # file này (Hiến pháp hệ agent)
├── inputs/                      # BA nạp: danh sách chức năng (xlsx/md/docx), mô tả yêu cầu khảo sát
├── decisions/                   # BA nạp: Quy trình SOP Hồng Lam, Quy định kế toán kho, SLA kho hàng, biên bản chốt
├── UC-Registry.md               # RTM tổng — nguồn sự thật duy nhất về trạng thái từng UC
├── uc/
│   └── UC-<MOD>-<###>/
│       ├── UC-<MOD>-<###>-spec.md     # Specification dạng Markdown
│       ├── UC-<MOD>-<###>-spec.docx   # Specification dạng Word (.docx)
│       ├── UC-<MOD>-<###>-activity.drawio  # Sơ đồ Activity Diagram (.drawio)
│       ├── screens/             # Wireframe .html (low-fi → hi-fi)
│       ├── survey/              # questions-r1.md, answers-r1.md, questions-r2.md...
│       └── review/              # review-ba-lead-r1.md, review-uiux-r1.md, review-tech-r1.md
└── logs/
    └── Log-UC-<MOD>-<###>.md    # Nhật ký tiến trình của từng UC
```

## 4. Quy ước đánh mã & Phân hệ (Modules)

### Danh sách Phân hệ Kho (`<MOD>`):
- `NK`: Nhập kho (Purchase Order / Inbound / Nhập mua, Nhập trả hàng, Nhập chuyển kho)
- `XK`: Xuất kho (Sales Order / Outbound / Xuất bán, Xuất huỷ, Xuất chuyển kho)
- `KK`: Kiểm kê kho (Stocktake / Inventory Count / Kiểm kê định kỳ, Kiểm kê đột xuất)
- `LC`: Quản lý Vị trí / Sơ đồ kho (Bin / Location / Kệ hàng / Mã vạch / Lô sản xuất)
- `BC`: Báo cáo & Thống kê (Reporting / Báo cáo tồn kho, Thẻ kho, Báo cáo SLA, Đối soát kế toán)

### Mã quy ước:

| Loại | Mẫu | Ví dụ |
|---|---|---|
| Use Case | `UC-<PHÂNHỆ>-<###>` | UC-NK-001 (Nhập kho mua hàng), UC-XK-002, UC-KK-001 |
| Business Rule | `BR-<UC>-<##>` | BR-UC-NK-001-01 (Quy tắc kiểm soát hạn sử dụng khi nhập) |
| Open Question | `Q-<UC>-<##>` | Q-UC-XK-002-03 (Hỏi lại về quy trình xuất lẻ ô mai) |
| Issue review | `ISS-<UC>-<##>` | ISS-UC-KK-001-02 |
| Màn hình | `SCR-<UC>-<##>` | SCR-UC-NK-001-01 (Màn hình lập phiếu nhập kho) |
| Vòng lặp | hậu tố `-r<n>` | questions-r2.md, review-ba-lead-r3.md |

*Lưu ý:* Mã đã cấp KHÔNG tái sử dụng kể cả khi mục đó bị loại (để giữ dấu vết audit).

## 5. Vòng đời UC (State Machine)

```
00-INTAKE → 10-CLARIFYING → 20-SURVEYING → 30-DRAFTING → 40-BA-REVIEW
  → 45-UIUX-REVIEW → 47-TECH-REVIEW → 50-PENDING-APPROVAL → 60-APPROVED
Nhánh thoát: 90-REJECTED (không khả thi) | 91-MERGED (trùng, gộp vào UC khác) | 92-REPLACED (bị thay bằng UC mới)
```

Quy tắc chuyển trạng thái:
- Chỉ workflow tương ứng mới được đổi trạng thái.
- `60-APPROVED` **chỉ được set bởi con người (BA)** qua lệnh xác nhận. Agent tối đa chỉ đề xuất `50-PENDING-APPROVAL`.
- Mọi lần đổi trạng thái phải cập nhật đồng thời: (a) `UC-Registry.md`, (b) `logs/Log-<UC>.md`.

## 6. Nghĩa vụ ghi log — BẮT BUỘC sau MỖI lần agent chạy trên một UC

Append (không ghi đè) vào `logs/Log-<UC>.md` theo cấu trúc:
Thời điểm, agent/workflow, hành động, đầu vào, kết quả, số Open Question còn lại, trạng thái trước → sau, việc kế tiếp.

## 7. Human-in-the-loop

- Các agent reviewer (ba-lead-reviewer, uiux-master, tech-lead) chỉ **DRAFT** báo cáo review. Verdict của agent tối đa là `APPROVED_DRAFT` — nghĩa là "đề xuất duyệt, chờ BA xác nhận".
- Không tự động chạy chuỗi write → review → fix → approve khép kín mà không có điểm dừng cho BA đọc. Sau mỗi workflow, dừng và báo cáo BA.

## 8. Định dạng đầu ra

- **Spec UC:** Xuất đồng thời 2 bản dưới dạng file Markdown (`.md`) và file Microsoft Word (`.docx`).
- **Activity Diagram:** File `.drawio` (định dạng XML mxGraph, chuẩn UML Activity Diagram, phân làn swimlane theo Actor/Hệ thống).
- **Màn hình (Wireframe):** File `.html` tự chứa (không dùng CDN ngoài), pha 1 low-fi grayscale; pha 2 hi-fi chỉ sau khi UC đạt `60-APPROVED`.
- **Registry:** Cập nhật bảng tổng hợp RTM trong `UC-Registry.md`.

## 9. Điều cấm chung

- Không xoá file trong `inputs/`, `decisions/`, `logs/` (chỉ append/tạo mới).
- Không sửa spec của UC đang ở `50-PENDING-APPROVAL` hoặc `60-APPROVED` nếu chưa có lệnh của BA (nếu sửa sau APPROVED → tạo changelog trong spec và hạ trạng thái về 40-BA-REVIEW).
- Không gộp nhiều UC vào một lần chạy nếu BA không yêu cầu rõ.
