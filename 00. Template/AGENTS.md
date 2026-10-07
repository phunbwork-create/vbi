# HỆ AGENT QUẢN LÝ VÒNG ĐỜI USE CASE — DỰ ÁN DOMAIN CHÍNH PHỦ

> File này là "hiến pháp" của toàn bộ đàn agent. Mọi agent, mọi workflow đều phải tuân thủ.
> Áp dụng cho cả Claude Code (đọc qua CLAUDE.md) và Google Antigravity (đọc trực tiếp AGENTS.md).

## 1. Bối cảnh & Ngôn ngữ

- Dự án thuộc domain chính phủ Việt Nam (ví dụ: Bộ Tư pháp — hộ tịch, lý lịch tư pháp, thi hành án...).
- Toàn bộ tài liệu đầu ra viết bằng **tiếng Việt**, thuật ngữ kỹ thuật giữ tiếng Anh khi cần (actor, precondition, business rule...).
- Người vận hành là **BA (con người)** — agent là trợ lý, KHÔNG phải người quyết định cuối.

## 2. NGUYÊN TẮC GROUNDING — QUAN TRỌNG NHẤT, KHÔNG ĐƯỢC VI PHẠM

1. **Chỉ được trích dẫn từ tài liệu BA đã nạp** trong hai thư mục:
   - `inputs/` — danh sách chức năng, mô tả yêu cầu, tài liệu khảo sát.
   - `decisions/` — văn bản pháp luật, biên bản họp, quyết định của khách hàng.
2. **KHÔNG bịa** văn bản pháp luật, điều khoản, số liệu, quy trình nghiệp vụ. Không suy diễn nội dung một Nghị định/Thông tư nếu file đó không có trong `decisions/`.
3. Khi thiếu căn cứ → ghi thành **OPEN QUESTION** với mã `Q-<UC>-<##>`, KHÔNG tự trả lời thay khách hàng.
4. Mọi trích dẫn phải kèm **đường dẫn file + vị trí** (mục/điều/khoản hoặc số dòng), ví dụ:
   `Căn cứ: decisions/ND-xx-2023.md — Điều 12, Khoản 2` hoặc `inputs/danh-sach-chuc-nang.md — dòng 45`.
5. Nếu BA yêu cầu điều gì mâu thuẫn với tài liệu nguồn → nêu rõ mâu thuẫn, đề nghị BA xác nhận, KHÔNG lẳng lặng chọn một phía.

## 3. Cấu trúc thư mục dự án (do /uc-init sinh ra)

```
<project-root>/
├── AGENTS.md / CLAUDE.md        # file này
├── inputs/                      # BA nạp: danh sách chức năng (xlsx/md/docx), mô tả yêu cầu
├── decisions/                   # BA nạp: văn bản pháp luật, biên bản họp, email chốt
├── UC-Registry.md               # RTM tổng — nguồn sự thật duy nhất về trạng thái
├── uc/
│   └── UC-<MOD>-<###>/
│       ├── UC-<MOD>-<###>-spec.md
│       ├── UC-<MOD>-<###>-activity.drawio
│       ├── screens/             # wireframe .html (low-fi → hi-fi)
│       ├── survey/              # questions-r1.md, answers-r1.md, questions-r2.md...
│       └── review/              # review-ba-lead-r1.md, review-uiux-r1.md, review-tech-r1.md
└── logs/
    └── Log-UC-<MOD>-<###>.md    # nhật ký tiến trình từng UC
```

## 4. Quy ước đánh mã

| Loại | Mẫu | Ví dụ |
|---|---|---|
| Use Case | `UC-<PHÂNHỆ>-<###>` | UC-HT-001 (Hộ tịch), UC-LLTP-004 |
| Business Rule | `BR-<UC>-<##>` | BR-UC-HT-001-03 |
| Open Question | `Q-<UC>-<##>` | Q-UC-HT-001-05 |
| Issue review | `ISS-<UC>-<##>` | ISS-UC-HT-001-02 |
| Màn hình | `SCR-<UC>-<##>` | SCR-UC-HT-001-01 |
| Vòng lặp | hậu tố `-r<n>` | questions-r2.md, review-ba-lead-r3.md |

Mã đã cấp KHÔNG tái sử dụng kể cả khi mục đó bị loại (giữ dấu vết audit).

## 5. Vòng đời UC (state machine)

```
00-INTAKE → 10-CLARIFYING → 20-SURVEYING → 30-DRAFTING → 40-BA-REVIEW
  → 45-UIUX-REVIEW → 47-TECH-REVIEW → 50-PENDING-APPROVAL → 60-APPROVED
Nhánh thoát: 90-REJECTED (không khả thi) | 91-MERGED (trùng, gộp vào UC khác) | 92-REPLACED (bị thay bằng UC mới)
```

Quy tắc chuyển trạng thái:
- Chỉ workflow tương ứng mới được đổi trạng thái (xem `workflows/`).
- `60-APPROVED` **chỉ được set bởi con người** qua lệnh `/uc-approve`. Agent tối đa chỉ đề xuất `50-PENDING-APPROVAL`.
- Mọi lần đổi trạng thái phải cập nhật đồng thời: (a) `UC-Registry.md`, (b) `logs/Log-<UC>.md`.

## 6. Nghĩa vụ ghi log — BẮT BUỘC sau MỖI lần agent chạy trên một UC

Append (không ghi đè) vào `logs/Log-<UC>.md` theo template `templates/Log-UC.template.md`:
thời điểm, agent/workflow, hành động, đầu vào, kết quả, số Open Question còn lại, trạng thái trước → sau, việc kế tiếp.

## 7. Human-in-the-loop

- Các agent reviewer (ba-lead-reviewer, uiux-master, tech-lead) chỉ **DRAFT** báo cáo review. Verdict của agent tối đa là `APPROVED_DRAFT` — nghĩa là "đề xuất duyệt, chờ người thật xác nhận".
- Không tự động chạy chuỗi write→review→fix→approve khép kín mà không có điểm dừng cho BA đọc. Sau mỗi workflow, dừng và báo cáo.

## 8. Định dạng đầu ra

- Spec UC: theo `templates/UC-Spec.template.md` (BABOK v3, có thể thay bằng template dự án).
- Activity diagram: file `.drawio` (XML mxGraph), chuẩn UML Activity, swimlane theo actor — xem quy tắc trong `agents/ba-writer.md`.
- Màn hình: `.html` tự chứa (không CDN), pha 1 low-fi grayscale; pha 2 hi-fi chỉ sau khi UC `60-APPROVED`.
- Registry: theo `templates/UC-Registry.template.md`.

## 9. Điều cấm chung

- Không xoá file trong `inputs/`, `decisions/`, `logs/` (chỉ append/tạo mới).
- Không sửa spec của UC đang ở `50-PENDING-APPROVAL` hoặc `60-APPROVED` nếu chưa có lệnh của BA (nếu sửa sau APPROVED → tạo changelog trong spec và hạ trạng thái về 40-BA-REVIEW).
- Không gộp nhiều UC vào một lần chạy nếu BA không yêu cầu rõ.
