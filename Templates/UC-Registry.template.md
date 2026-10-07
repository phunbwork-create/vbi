# UC REGISTRY — HỆ THỐNG QUẢN LÝ KHO CÔNG TY Ô MAI HỒNG LAM

> **Nguồn sự thật duy nhất (RTM Tổng)** về trạng thái của từng Use Case theo quy định tại `AGENTS.md`.  
> Cập nhật lần cuối: {{YYYY-MM-DD HH:mm}} bởi {{AGENT/NGƯỜI}}

---

## 1. Thống kê Trạng thái Vòng đời UC

| Trạng thái Vòng đời UC | Số lượng UC | Mô tả Giai đoạn |
|---|---|---|
| `00-INTAKE` | 0 | Tiếp nhận yêu cầu thô từ `inputs/` |
| `10-CLARIFYING` | 0 | Phân tích thiếu sót & đối chiếu `decisions/` |
| `20-SURVEYING` | 0 | Đã xuất `questions-r<n>.md`, chờ nạp `answers-r<n>.md` |
| `30-DRAFTING` | 0 | Đang soạn thảo bộ 4 artifact Spec, Diagram, Wireframe |
| `40-BA-REVIEW` | 0 | `ba-lead-review` đang thẩm định Grounding & Nghiệp vụ |
| `45-UIUX-REVIEW` | 0 | `uiux-master` đang thẩm định Wireframe & Trải nghiệm kho |
| `47-TECH-REVIEW` | 0 | `tech-lead-review` đang thẩm định Data Model & Concurrency |
| `50-PENDING-APPROVAL` | 0 | Đã qua 4 tuyến review, chờ BA con người duyệt |
| `60-APPROVED` | 0 | BA con người đã duyệt chính thức |
| `90/91/92` | 0 | Nhánh thoát: Loại / Gộp / Thay thế |

---

## 2. Ma trận Truy xuất Yêu cầu & Trạng thái UC (RTM Bảng chính)

| Mã UC | Tên Use Case | Phân hệ Kho | Trạng thái | Nguồn Yêu cầu | Căn cứ SOP | Số BR | Open Q | ISS Mở | Spec (.md/.docx) | Diagram (.drawio) | Screens (.html) | Review Cuối | Ngày Cập nhật |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `UC-NK-001` | Nhập kho Mua hàng | `NK` | `00-INTAKE` | `inputs/danh-sach.md` | `decisions/SOP-Kho.md` | 0 | 0 | 0 | – | – | – | – | YYYY-MM-DD |

---

## 3. Ma trận Trùng lặp & Thay thế UC
| Mã UC Gốc | Quan hệ | Mã UC Đích | % Chồng lấn | Quyết định của BA Con người | Ngày Chốt |
|---|---|---|---|---|---|
| `UC-NK-002` | MERGED | `UC-NK-001` | 85% | Gộp quy trình Nhập trả hàng vào UC Nhập mua | YYYY-MM-DD |

---

## 4. Danh sách Quyết định Chờ BA Con người Phê duyệt
| STT | Nội dung Cần Quyết định | Liên quan Mã UC | Ngày Yêu cầu | Trạng thái Chốt |
|---|---|---|---|---|
| 1 | Xác nhận duyệt trạng thái `60-APPROVED` cho UC-NK-001 | `UC-NK-001` | YYYY-MM-DD | CHỜ DUYỆT |
