# UC REGISTRY — BẢNG QUẢN LÝ TRẠNG THÁI USE CASE (RTM TỔNG)

> **Dự án:** Hệ thống Quản lý Kho Công ty Ô mai Bá Phú  
> **Nguồn sự thật duy nhất** về trạng thái của từng Use Case (UC) theo quy định tại `AGENTS.md`.

## 1. Danh sách Phân hệ Kho (`<MOD>`)
- **NK**: Nhập kho (Purchase Order / Inbound / Nhập mua, Nhập trả hàng, Nhập chuyển kho)
- **XK**: Xuất kho (Sales Order / Outbound / Xuất bán, Xuất huỷ, Xuất chuyển kho)
- **KK**: Kiểm kê kho (Stocktake / Inventory Count / Kiểm kê định kỳ, Kiểm kê đột xuất)
- **LC**: Quản lý Vị trí / Sơ đồ kho (Bin / Location / Kệ hàng / Mã vạch / Lô sản xuất)
- **BC**: Báo cáo & Thống kê (Reporting / Báo cáo tồn kho, Thẻ kho, Báo cáo SLA, Đối soát kế toán)

---

## 2. Ma trận Truy xuất Yêu cầu & Vòng đời Use Case

| Mã UC | Tên Use Case | Phân hệ | Trạng thái | Ngày cập nhật | Phụ trách | Ghi chú / Open Questions |
|---|---|---|---|---|---|---|
| `UC-NK-001` | Quản lý Nhập kho (Inbound Management) | NK | `40-BA-REVIEW` | 2026-08-02 | BA Con người | Đã cập nhật CR-01: Hạ ngưỡng duyệt Thủ kho trưởng từ < 200M xuống < 100M VNĐ. Chờ BA phê duyệt lại. |
| `UC-XK-001` | Quản lý Xuất kho (Outbound Management) | XK | `20-SURVEYING` | 2026-10-07 | ba-khao-sat | Đã lập bộ 11 câu hỏi khảo sát r1 (questions-r1.md: FEFO, Edge Cases, Fraud Risks). Chờ BA nạp answers-r1.md. |

---

## 3. Quy trình Chuyển trạng thái (State Machine)

```
00-INTAKE → 10-CLARIFYING → 20-SURVEYING → 30-DRAFTING → 40-BA-REVIEW
  → 45-UIUX-REVIEW → 47-TECH-REVIEW → 50-PENDING-APPROVAL → 60-APPROVED
```
*(Nhánh thoát: `90-REJECTED` \| `91-MERGED` \| `92-REPLACED`)*

---

## 4. Nguyên tắc Cập nhật Registry
1. **Chỉ update:** Khi UC đổi trạng thái hoặc có thay đổi quan trọng về phạm vi / mã open question.
2. **Quyền hạn `60-APPROVED`:** Chỉ có BA (con người) mới được cấp quyền set trạng thái `60-APPROVED`.
3. **Đồng bộ Log:** Mọi lần cập nhật file này đều phải được ghi tương ứng vào `logs/Log-<UC>.md`.
