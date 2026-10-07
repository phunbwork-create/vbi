# BÁO CÁO REVIEW UC-NK-001 — VÒNG r1 (TECH LEAD REVIEW)

> **Mã Use Case:** UC-NK-001 — Quản lý Nhập kho (Inbound Warehouse Management)  
> **Tuyến Review:** `tech-lead-review` (Tech Lead Reviewer)  
> **Thời điểm Review:** 2026-08-02 10:18  
> **Agent thực hiện:** `tech-lead-review`  
> **Kết luận (Verdict):** `APPROVED_DRAFT` *(Đề xuất chuyển bước tiếp theo: `50-PENDING-APPROVAL`)*  
> *Lưu ý: Verdict của Agent chỉ là ĐỀ XUẤT DRAFT. Quyết định `60-APPROVED` cuối cùng thuộc về BA con người.*

---

## 1. Bảng Checklist Đánh Giá Kiến Trúc & Kỹ Thuật (5 Tiêu chí Tech Lead)

| Mã | Tiêu chí Kiểm tra | Kết quả | Ghi chú / Đánh giá Chi tiết từ Tech Lead |
|---|---|---|---|
| TL.1 | **Tính khả thi Kỹ thuật (Feasibility)** | **PASS** | Luồng giao dịch M1–M8 khả thi cao trên kiến trúc Microservices/RESTful API backend. Không phát hiện thuật toán nghẽn cổ chai. Thời gian phản hồi API yêu cầu `< 200ms`. |
| TL.2 | **Chuẩn hóa Data Model & Thực thể** | **PASS** | Mục 10 trong Spec định nghĩa đầy đủ các thực thể: `InboundReceiptHeader`, `InboundReceiptDetail`, `LotMaster`, `BinLocation`, `InventoryTransaction`. Ràng buộc khóa ngoại và kiểu dữ liệu (Decimal 10,2) chính xác. |
| TL.3 | **Hiệu năng & Xử lý Đồng thời (Concurrency)** | **PASS** | Quy định rõ cơ chế Khóa tồn kho (Optimistic Stock Locking tại cấp Bin Location) ngăn chặn kịch bản 2 Thủ kho cùng lúc cất 2 lô hàng khác nhau vào 1 ô Bin quá tải trọng. |
| TL.4 | **Tích hợp Thiết bị & Hệ thống ngoài** | **PASS** | Hỗ trợ chuẩn mã vạch GS1-128/QR Code. Tích hợp PDA Offline Caching (IndexedDB/SQLite mã hóa AES-256) tối đa 30 phút. Chuẩn kết nối Webhook/REST API đồng bộ 2 chiều với ERP (FAST/MISA). |
| TL.5 | **An toàn Dữ liệu & Audit Trail Logging** | **PASS** | Yêu cầu lưu vết Immutable Audit Log vĩnh viễn không thể sửa/xóa đối với mọi thao tác cất hàng, rollback xả kệ và phê duyệt phiếu kho (ghi kèm Timestamp ms, User ID, Device MAC/IP, GPS). |

---

## 2. Thẩm định Chi tiết Mô hình Dữ liệu & Kiến trúc API

### 1. Structure Schema & Entity Relationships
- **Header Table (`inbound_receipt_header`):**
  - Primary Key: `receipt_id` (UUID)
  - Business Code: `ma_phieu_nhap` (`NK-PO-YYYYMMDD-XXXX`)
  - Status Enum: `DRAFT`, `PENDING_APPROVAL`, `APPROVED`, `CANCELLED`
  - Integration Sync Status: `ERP_SYNCED`, `ERP_PENDING`, `ERP_FAILED`
- **Detail Table (`inbound_receipt_detail`):**
  - Primary Key: `detail_id` (UUID)
  - Foreign Keys: `receipt_id`, `sku_id`, `lot_id`, `bin_id`
  - Validation Constraints: `so_luong_thuc_nhap > 0`, `tolerance_percent <= 3.0`

### 2. Xử lý Kịch bản Ngoại lệ Kỹ thuật (System Edge Cases)
- **Kịch bản Network Outage (Edge Case E3):** PDA lưu trữ bản nháp cất hàng tại IndexedDB local. Khi khôi phục Wifi, ứng dụng gọi API `/api/v1/inbound/sync-offline` kèm Transaction Sequence Number để xử lý Idempotency (chống trùng lặp dữ liệu khi sync lại).
- **Kịch bản Rollback Xả Kệ (Edge Case E4):** Khi Hủy phiếu cất dở dang, Backend thực hiện Saga Pattern / Database Transaction tự động nhả kho tạm tại các ô Bin Location đã ghi nhận.

---

## 3. Khuyến nghị Kỹ thuật cho Đội Dev (Dev Team Implementation Guidelines)

1. **Idempotency Key:** Mọi request POST/PUT từ thiết bị PDA cất hàng phải gửi kèm `Idempotency-Key` (UUID) để tránh duplicate transaction khi mạng chập chờn.
2. **Database Indexing:** Đánh chỉ mục Index cho các trường tìm kiếm tần suất cao: `(ma_lo_san_xuat, han_su_dung)`, `(ma_bin_location)`, `(ma_po_erp)`.
3. **Event-driven ERP Sync:** Sử dụng Message Queue (RabbitMQ/Kafka) để đẩy dữ liệu phiếu kho đã Duyệt sang ERP bất đồng bộ, tránh làm treo UI của Thủ kho khi ERP xử lý chậm.

---

## 4. Tóm tắt Kết luận & Đề xuất Hành động

- **Kết luận (Verdict):** `APPROVED_DRAFT`
- **Lý do tóm tắt:** Bản Spec `UC-NK-001` đạt tính khả thi kỹ thuật 100%, Data Model thiết kế chuẩn hóa, giải quyết triệt để bài toán đồng bộ PDA Offline, xử lý đồng thời Concurrency Control và bảo mật Immutable Audit Log.
- **3 Việc đề xuất tiếp theo:**
  1. Cập nhật trạng thái Use Case sang `47-TECH-REVIEW` trên `UC-Registry.md`.
  2. Báo cáo BA con người thông qua kết quả thẩm định kỹ thuật Tech Lead.
  3. Trình BA con người thực hiện duyệt chính thức `/uc-approve UC-NK-001` để chuyển UC sang trạng thái `50-PENDING-APPROVAL` hoặc `60-APPROVED`.
