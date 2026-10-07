# SPECIFICATION: UC-NK-001 — QUẢN LÝ NHẬP KHO (INBOUND WAREHOUSE MANAGEMENT)

| Trường | Giá trị |
|---|---|
| **Phân hệ Kho** | `NK` (Nhập kho / Inbound Management) |
| **Trạng thái UC** | `40-BA-REVIEW` *(Cập nhật theo CR-01: Hạ ngưỡng duyệt Thủ kho trưởng < 100M)* |
| **Phiên bản** | `1.1 (CR-01)` |
| **Tác giả (BA Writer)** | `ba-writing` (draft) / BA Project Lead |
| **Nguồn yêu cầu thô** | `inputs/intake-report.md` |
| **Căn cứ SOP / Kế toán** | `inputs/khao-sat-nhap-kho-hong-lam.md` (Biên bản chốt từ CEO Ô mai Hồng Lam) |
| **Phản hồi Khảo sát** | `uc/UC-NK-001/survey/answers-r1.md` (Chốt với 7 Trưởng bộ phận) |

---

## 1. Mô tả Tổng quan

Use Case `UC-NK-001` quy định toàn bộ quy trình nghiệp vụ tiếp nhận, kiểm định chất lượng (QA/QC), phân loại, cất hàng vào vị trí kệ kho (Bin Location Put-away) và ghi nhận tăng tồn kho cho hệ thống Kho Công ty Ô mai Hồng Lam. 

Chức năng xử lý 4 loại hình nhập kho chính: (1) Nhập mua nguyên phụ liệu & bao bì từ Nhà cung cấp, (2) Nhập thành phẩm từ Nhà máy sản xuất Hoài Đức, (3) Nhập hàng thu hồi / trả lại từ Chuỗi Cửa hàng & Đại lý, và (4) Nhập chuyển kho nội bộ. Hệ thống WMS tích hợp thiết bị quét mã vạch cầm tay (Handheld PDA), áp dụng nghiêm ngặt quy tắc quản lý Mã Lô (Lot/Batch), Hạn sử dụng (EXP Date), gán Vị trí kho tự động, quy tắc xuất kho FEFO/FIFO, phân tách trách nhiệm (SoD) và tự động đối soát 3 bên (3-Way Matching) với hệ thống Kế toán / ERP (FAST/MISA).

---

## 2. Tác nhân Tham gia (Actors)

| Actor | Vai trò trong Use Case | Quyền hạn & Nguyên tắc SoD | Nguồn trích dẫn |
|---|---|---|---|
| **Thủ kho** | Tiếp nhận hàng, quét mã vạch/QR tại cửa kho, cất hàng vào ô Bin Location, lập phiếu nhập nháp. | Chỉ được quét hàng và trình duyệt phiếu; **CẤM TỰ DUYỆT** phiếu kho do chính mình lập. | `answers-r1.md` Q-09 |
| **Thủ kho trưởng** | Kiểm tra danh sách phiếu cất hàng, phê duyệt các Phiếu nhập kho chuẩn có giá trị < 100 triệu VNĐ. | Có quyền phê duyệt phiếu nhập thường; không duyệt đơn lỗi QC hoặc đơn >= 100 triệu. | `answers-r1.md` Q-02, Q-09 |
| **Quản lý QA/QC** | Kiểm tra an toàn thực phẩm/cảm quan, phát hành Biên bản QC điện tử (Đạt / Lỗi), quyết định cho phép nhập. | Có quyền phát hành/khóa tem QC status; có quyền cấp OTP sửa thông tin lô đặc biệt. | `answers-r1.md` Q-01, Q-06, Q-10 |
| **Kế toán kho** | Phê duyệt phiếu nhập về mặt tài chính, hạch toán tăng tồn kho và công nợ trên hệ thống Kế toán / ERP. | Kiểm tra đối soát 3 bên (3-Way Matching); duyệt hóa đơn/chứng từ giao nhận. | `answers-r1.md` Q-05, Q-11 |
| **Giám đốc Logistics / COO** | Phê duyệt cấp cao đối với các lô hàng bị QC lỗi, phiếu nhập thu hồi hoặc lô hàng trị giá >= 100 triệu VNĐ. | Quyền phê duyệt cao nhất đối với các phiếu ngoại lệ / điều chỉnh tồn kho lớn. | `answers-r1.md` Q-04, Q-09 |
| **IT Lead** | Quản trị hạ tầng kết nối PDA, cấu hình đồng bộ Sync WMS-ERP và xử lý sự cố cache Offline. | Quản trị hệ thống, không tham gia luồng giao dịch nghiệp vụ hàng ngày. | `answers-r1.md` Q-07, Q-08 |
| **Kiểm toán nội bộ** | Giám sát lịch sử Audit Trail, nhận cảnh báo tự động khi có bất thường (lệch số lượng > 3% hoặc lệch > 10M). | Xem và xuất báo cáo kiểm soát rủi ro, không có quyền sửa/xóa dữ liệu giao dịch. | `answers-r1.md` Q-11 |

---

## 3. Điều kiện Tiền đề / Hậu đề / Kích hoạt (Precondition / Postcondition / Trigger)

- **Precondition (Điều kiện tiên quyết):**
  1. Danh mục SKU sản phẩm, danh mục Nhà cung cấp / Cửa hàng, và Sơ đồ Vị trí kho (Bin Location: Dãy-Kệ-Tầng-Ô) đã được khai báo trên WMS.
  2. Thiết bị Handheld PDA của Thủ kho đã đăng nhập và được kết nối Wifi kho (hoặc sẵn sàng chế độ Cache Offline).
  3. Lệnh giao hàng / Đơn mua hàng (PO) hoặc Lệnh sản xuất đã được đồng bộ từ ERP sang WMS.
- **Postcondition (Kết quả đo đạc được):**
  1. Số lượng tồn kho tức thời (Real-time Stock) tại ô Bin Location và tồn kho khả dụng (Available Stock) được cập nhật chính xác.
  2. Dữ liệu phiếu nhập hoàn tất (Status: `APPROVED`) được tự động đồng bộ đẩy sang phần mềm Kế toán / ERP để hạch toán ghi Nợ TK 152/155/156.
  3. Lịch sử thao tác (Audit Trail) ghi lại Timestamp, User ID, Device ID, GPS/IP không thể chỉnh sửa.
- **Trigger (Sự kiện kích hoạt):**
  - Xe vận chuyển chở hàng cập bãi cửa kho (Dock Arrival) và Thủ kho chọn chức năng "Nhập Kho" trên màn hình WMS.

---

## 4. Luồng chính (Happy Path — Main Flow)

Luồng áp dụng cho trường hợp hàng nhập đúng PO/Hóa đơn, qua QC đạt 100%, cất hàng thành công và được phê duyệt chuẩn.

| Bước | Tác nhân | Hành động | Màn hình áp dụng | Business Rules áp dụng |
|---|---|---|---|---|
| **M1** | Thủ kho | Đăng nhập ứng dụng WMS trên PDA, mở màn hình Danh sách Nhập kho `SCR-UC-NK-001-01`, chọn Loại phiếu (NK-PO / NK-TP / NK-TH / NK-CK) và chọn Đơn hàng PO tương ứng. | `SCR-UC-NK-001-01` | `BR-UC-NK-001-01` |
| **M2** | Hệ thống | Kiểm tra thông tin PO từ ERP, hiển thị danh sách mặt hàng SKU cần nhập, số lượng theo chứng từ và Trạng thái kiểm định QC (`QC Passed`). | `SCR-UC-NK-001-01` | `BR-UC-NK-001-03` |
| **M3** | Thủ kho | Đến khu vực hạ hàng, dùng máy Handheld PDA quét mã vạch (Barcode/QR GS1) trên từng thùng/túi Ô mai. Hệ thống tự động điền Mã Lô sản xuất (Lot/Batch) và Hạn sử dụng (EXP Date). | `SCR-UC-NK-001-02` | `BR-UC-NK-001-02`, `BR-UC-NK-001-07` |
| **M4** | Thủ kho | Nhập số lượng thực tế kiểm đếm. Hệ thống tự động đối soát dung sai với PO. | `SCR-UC-NK-001-02` | `BR-UC-NK-001-04` |
| **M5** | Hệ thống | Tính toán và tự động gợi ý Vị trí kho tối ưu (Bin Location: Dãy-Kệ-Tầng-Ô) dựa trên khu vực bảo quản (Khô/Mát) và quy tắc FEFO/FIFO. | `SCR-UC-NK-001-02` | `BR-UC-NK-001-05` |
| **M6** | Thủ kho | Di chuyển hàng đến ô Bin Location được gợi ý, quét mã vạch gắn trên Ô kệ để xác nhận vị trí cất hàng (Put-away Completed). | `SCR-UC-NK-001-02` | `BR-UC-NK-001-05` |
| **M7** | Thủ kho | Kiểm tra lại thông tin tổng thể, chụp ảnh biên bản giao nhận/phiếu xuất xưởng và bấm "Trình duyệt Phiếu nhập kho". Status phiếu chuyển sang `PENDING_APPROVAL`. | `SCR-UC-NK-001-02` | `BR-UC-NK-001-06`, `BR-UC-NK-001-09` |
| **M8** | Thủ kho trưởng | Đăng nhập WMS trên máy tính/tablet, kiểm tra dữ liệu 3-Way Matching và bấm "Phê duyệt" phiếu nhập kho. Hệ thống chuyển Status sang `APPROVED`, ghi tăng tồn kho WMS và đẩy dữ liệu đồng bộ ERP. | Màn hình Quản lý | `BR-UC-NK-001-06`, `BR-UC-NK-001-09` |

---

## 5. Luồng thay thế (Alternate Flows)

### A1 — Nhập thành phẩm từ Xưởng sản xuất Hoài Đức (`NK-TP`)
- **Điểm rẽ:** Tại bước **M1**, Thủ kho chọn Loại phiếu `NK-TP`.
- **Luồng xử lý:** Hệ thống tải dữ liệu Lệnh sản xuất (WO). Dữ liệu Mã Lô và HSD được tự động đồng bộ từ Hệ thống Quản lý Sản xuất (MES). Thủ kho tiến hành quét mã QR trên pallet thành phẩm và cất hàng vào Khu Vực Kho Thành Phẩm.

### A2 — Nhập hàng thu hồi / Trả lại từ Chuỗi Cửa hàng (`NK-TH`)
- **Điểm rẽ:** Tại bước **M1**, Thủ kho chọn Loại phiếu `NK-TH`.
- **Luồng xử lý:** Hệ thống yêu cầu quét Mã Phiếu Trả Hàng từ cửa hàng. Toàn bộ hàng thu hồi bắt buộc tự động định tuyến cất vào **Khu Vực Hàng Chờ Phân Loại / Biệt Trữ**. Phiếu nhập `NK-TH` bắt buộc chuyển Giám đốc Logistics / COO duyệt.

### A3 — Nhập chuyển kho nội bộ từ Kho Chi nhánh (`NK-CK`)
- **Điểm rẽ:** Tại bước **M1**, Thủ kho chọn Loại phiếu `NK-CK`.
- **Luồng xử lý:** Hệ thống đối soát với Phiếu Xuất Chuyển Kho từ kho đi. Thủ kho quét mã vạch niêm phong niêm xe (Seal ID). Nếu Seal khớp, tiến hành quét cất hàng và cập nhật nhận chuyển kho.

---

## 6. Luồng ngoại lệ & Trường hợp đặc biệt (Edge Cases & Exception Flows)

### E1 — Sai lệch số lượng thực tế so với PO (Partial Inbound / Over Delivery)
- **Rẽ từ bước:** **M4** (Khi số lượng kiểm đếm thực tế KHÁC số lượng trên PO).
- **Xử lý hệ thống:**
  1. *Trường hợp giao THIẾU:* Nếu số lượng ít hơn PO, hệ thống chấp nhận nhập theo số thực tế (`Partial Inbound`), tự động cập nhật PO trên ERP là `Partial Received`. Thủ kho ghi lý do thiếu.
  2. *Trường hợp giao THỪA trong dung sai (±3% nông sản, ±1% bao bì):* WMS tự động điều chỉnh tăng số lượng nhận và cập nhật PO.
  3. *Trường hợp giao THỪA ngoài dung sai:* WMS khóa không cho cất hàng phần vượt quá, tự động tạo "Biên bản Hàng Thừa Ngoại Lệ", thông báo đến Phòng Mua hàng để làm phụ lục PO hoặc trả lại NCC.

### E2 — Lỗi Chất lượng hàng hóa một phần (QC Partial Defect)
- **Rẽ từ bước:** **M2** (Khi Biên bản QC ghi nhận có một phần hàng không đạt chuẩn an toàn/bao bì móp).
- **Xử lý hệ thống:** WMS tự động **tách lô nhập thành 2 phiếu nghiệp vụ song song**:
  - *Phiếu A (Hàng Đạt QC):* Tiếp tục luồng cất hàng bán chuẩn (M3 → M8).
  - *Phiếu B (Hàng Lỗi QC):* Tự động gán vị trí cất vào **Khu Vực Biệt Trữ / Hàng Lỗi (Quarantine Area)**, dán nhãn tem đỏ `REJECTED`, gửi thông báo tới Trưởng phòng QA và COO xử lý trả lại NCC.

### E3 — Sự cố thiết bị PDA mất kết nối Wifi kho (Offline Caching)
- **Rẽ từ bước:** Bất kỳ bước nào trên PDA.
- **Xử lý hệ thống:**
  - PDA tự động chuyển sang chế độ **Offline Storage** (cho phép lưu tối đa 30 phút hoặc 500 lượt quét trong bộ nhớ mã hóa trên PDA).
  - Giao diện PDA hiển thị biểu tượng Cảnh báo Offline màu cam.
  - Khi thiết bị khôi phục mạng Wifi, ứng dụng tự động thực hiện **Auto-Sync** đẩy dữ liệu về Server WMS, thực hiện đối soát xung đột vị trí Bin Location và ghi log khôi phục.

### E4 — Hủy phiếu nhập dở dang khi đã cất hàng vào kệ (Rollback Put-away)
- **Rẽ từ bước:** **M6/M7** (Khi Thủ kho phát hiện sai sót hoặc bấm HỦY phiếu sau khi đã quét cất một số sản phẩm vào ô Bin Location).
- **Xử lý hệ thống:**
  - WMS nghiêm cấm hủy phiếu trực tiếp khi tồn kho tạm đã được ghi nhận tại ô Bin.
  - WMS kích hoạt luồng **"Rollback Xả Kệ"**: Hiển thị danh sách các ô Bin Location đã quét cất. Thủ kho bắt buộc mang PDA đến từng ô Bin, quét mã xác nhận nhả hàng khỏi kệ.
  - Sau khi toàn bộ hàng đã được quét nhả về Cửa kho (Dock Area), hệ thống mới cho phép đổi trạng thái phiếu sang `CANCELLED`.

---

## 7. Quy tắc Kiểm soát Mã Lô & Hạn Sử Dụng (Đặc thù Ô mai Hồng Lam)

- **BR-UC-NK-001-02 (Quản lý Hạn sử dụng tối thiểu khi nhập):**
  - Thành phẩm Ô mai / Mứt đóng gói nhập kho tổng phải có HSD còn lại **>= 70%** so với tổng HSD ghi trên bao bì.
  - Vật tư bao bì (hũ nhựa, túi nhôm, hộp quà) phải có HSD/thời hạn lưu trữ còn lại **>= 80%**.
  - Nông sản thô tươi (sấu tươi, mơ tươi mùa vụ) phải được cất kho mát và đưa vào chế biến trong vòng **48 giờ**.
- **BR-UC-NK-001-05 (Nguyên tắc FEFO / FIFO):**
  - Hệ thống WMS bắt buộc gợi ý gán Vị trí Bin Location dựa trên Ngày hết hạn (EXP Date). Hàng có EXP Date ngắn hơn bắt buộc cất tại các kệ ưu tiên phía ngoài để đảm bảo quy tắc **FEFO (First Expired, First Out)** khi xuất kho.
- **BR-UC-NK-001-07 (Khóa chỉnh sửa tay Mã Lô & EXP Date):**
  - Trên giao diện PDA/WMS của Thủ kho, trường `Mã Lô sản xuất (Lot/Batch ID)` và `Hạn sử dụng (EXP Date)` bị **KHÓA 100% KHÔNG CHO GÕ TAY**.
  - Dữ liệu Lô & EXP bắt buộc kế thừa tự động từ Biên bản QC điện tử phát hành trực tuyến hoặc mã quét QR GS1 (chứa định dạng chuẩn GS1-128). Trường hợp đặc thù cần sửa phải có mã OTP phê duyệt từ Trưởng phòng QA.

---

## 8. Kiểm soát Rủi ro Gian lận & Phân quyền (Fraud Risks & Segregation of Duties)

- **BR-UC-NK-001-06 (Phân tách trách nhiệm SoD & Ngưỡng phê duyệt):**
  - **SoD:** Nghiêm cấm 100% tài khoản Thủ kho tự phê duyệt phiếu nhập kho do chính mình lập/quét cất hàng.
  - **Phân cấp duyệt (Approval Limit Thresholds):**
    - Phiếu nhập kho chuẩn < 100 triệu VNĐ: **Thủ kho trưởng** duyệt.
    - Phiếu nhập kho >= 100 triệu VNĐ, phiếu nhập có hàng Lỗi QC, hoặc phiếu nhập thu hồi `NK-TH`: Bắt buộc **Giám đốc Logistics / COO** duyệt.
- **BR-UC-NK-001-09 (Thủ tục Đối soát 3 Bên — 3-Way Matching):**
  - Hệ thống WMS tự động kiểm tra đối soát 3 chiều trước khi cho phép bấm Duyệt phiếu:
    1. Số lượng trên Đơn mua hàng PO (từ ERP).
    2. Số lượng đếm thực tế qua máy quét WMS.
    3. Ảnh đính kèm Biên bản giao nhận hàng hóa có chữ ký của Tài xế / Nhà cung cấp.
  - Nếu tỷ lệ sai lệch > 3% hoặc giá trị chênh lệch > 10,000,000 VNĐ, WMS tự động **KHÓA PHIẾU** và gửi Alert cảnh báo tức thì tới Kế toán trưởng và Kiểm toán nội bộ.
- **Audit Trail Logging (Nhật ký không thể sửa xóa):**
  - Mọi thao tác tạo, quét mã, sửa nháp, nhả kệ rollback, trình duyệt và phê duyệt đều được lưu vết chi tiết: `User ID`, `Role`, `Timestamp (miligiây)`, `Device ID (PDA MAC/IP)`, `GPS Location` và `Dữ liệu trước/sau thay đổi`. Nhật ký này chỉ đọc (Read-only) và lưu trữ vĩnh viễn trên Server.

---

## 9. Danh sách Quy tắc Nghiệp vụ (Business Rules — `BR-*`)

| Mã BR | Phát biểu Quy tắc | Loại BR | Áp dụng tại bước | Căn cứ trích dẫn / Nguồn |
|---|---|---|---|---|
| `BR-UC-NK-001-01` | Mã vạch/QR quét vào PDA phải khớp 100% với Mã SKU trên PO/Lệnh sản xuất từ ERP. | Validation | M1, M3 | `answers-r1.md` Q-02 |
| `BR-UC-NK-001-02` | Hạn sử dụng (EXP Date) Ô mai nhập kho phải còn >= 70% tổng HSD; Bao bì >= 80%. | Validation | M3 | `answers-r1.md` Q-01 |
| `BR-UC-NK-001-03` | 100% lô hàng nhập mua và nhập xưởng phải có Biên bản QC trạng thái PASS mới được cất hàng bán. Lô lỗi tự động tách 2 phiếu. | Constraint | M2, E2 | `answers-r1.md` Q-06 |
| `BR-UC-NK-001-04` | Dung sai số lượng cho phép nhập kho tự động là ±3% đối với nông sản thô và ±1% đối với vật tư bao bì. | Calculation | M4, E1 | `answers-r1.md` Q-03 |
| `BR-UC-NK-001-05` | Hệ thống tự động gợi ý Vị trí Bin Location theo vùng bảo quản (Khô/Mát) và quy tắc ưu tiên FEFO/FIFO. | Action/Rule | M5, M6 | `answers-r1.md` Q-04 |
| `BR-UC-NK-001-06` | Nghiêm cấm Thủ kho tự duyệt phiếu do mình lập (SoD). Phân cấp duyệt: < 100M (Thủ kho trưởng); >= 100M hoặc Hàng Lỗi / Thu hồi (COO/Logistics Director). | Permission | M7, M8 | `answers-r1.md` Q-09 |
| `BR-UC-NK-001-07` | Khóa 100% không cho gõ tay Mã Lô và HSD tại giao diện Thủ kho; bắt buộc lấy tự động từ QC/QR GS1. | Security | M3 | `answers-r1.md` Q-10 |
| `BR-UC-NK-001-08` | Hủy phiếu nhập khi đã quét cất hàng dở dang bắt buộc trải qua luồng Rollback xả kệ để nhả tồn ô Bin Location. | Integrity | E4 | `answers-r1.md` Q-08 |
| `BR-UC-NK-001-09` | Bắt buộc đối soát 3-Way Matching (PO ERP - Quét WMS - Ảnh biên bản giao nhận). Cảnh báo nếu lệch > 3% hoặc > 10M VNĐ. | Control | M7, M8 | `answers-r1.md` Q-11 |
| `BR-UC-NK-001-10` | Hỗ trợ quét cất hàng Offline trên PDA tối đa 30 phút (500 scans) và tự động Auto-Sync khi có kết nối Wifi trở lại. | Exception | E3 | `answers-r1.md` Q-07 |

---

## 10. Yêu cầu Dữ liệu & Structural Schema

| Tên trường (Field Name) | Kiểu dữ liệu | Bắt buộc | Ràng buộc / Validation | Mã BR liên quan |
|---|---|---|---|---|
| `ma_phieu_nhap` | String (20) | Có | Chuẩn: `NK-PO-YYYYMMDD-XXXX` | `BR-UC-NK-001-01` |
| `loai_nhap_kho` | Enum | Có | `NK-PO` \| `NK-TP` \| `NK-TH` \| `NK-CK` | `BR-UC-NK-001-01` |
| `ma_po_erp` | String (30) | Có | Tồn tại trên hệ thống Kế toán ERP | `BR-UC-NK-001-01` |
| `ma_sku` | String (20) | Có | Khớp với danh mục Sản phẩm Hồng Lam | `BR-UC-NK-001-01` |
| `ma_lo_san_xuat` | String (25) | Có | Khóa gõ tay, định dạng `LOT-YYYYMMDD-XX` | `BR-UC-NK-001-07` |
| `ngay_san_xuat` | Date | Có | `<= Current Date` | `BR-UC-NK-001-07` |
| `han_su_dung` | Date | Có | Khóa gõ tay, HSD còn lại `>= 70%` | `BR-UC-NK-001-02` |
| `so_luong_po` | Decimal (10,2) | Có | `> 0` | `BR-UC-NK-001-04` |
| `so_luong_thuc_nhap` | Decimal (10,2) | Có | `> 0`, kiểm tra dung sai `±3%` | `BR-UC-NK-001-04` |
| `ma_bin_location` | String (15) | Có | Cấu trúc: `KHO-DAY-KE-TANG-O` | `BR-UC-NK-001-05` |
| `trang_thai_qc` | Enum | Có | `PASSED` \| `REJECTED` \| `HOLD` | `BR-UC-NK-001-03` |
| `trang_thai_phieu` | Enum | Có | `DRAFT` \| `PENDING_APPROVAL` \| `APPROVED` \| `CANCELLED` | `BR-UC-NK-001-06` |
| `anh_bien_ban_giao_nhan` | Image/URL | Có | File ảnh chụp đính kèm | `BR-UC-NK-001-09` |

---

## 11. Danh sách Màn hình (Screens — `SCR-*`)

| Mã Màn hình | Tên Màn hình | Phục vụ bước | Đường dẫn File Wireframe HTML |
|---|---|---|---|
| `SCR-UC-NK-001-01` | Màn hình Danh sách & Tiếp nhận Phiếu nhập kho | M1, M2 | [screens/SCR-UC-NK-001-01.html](file:///c:/Users/Admin/Desktop/02_Dao%20tao%20&%20Mentoring/Multi%20Agent%20BA%20demo/uc/UC-NK-001/screens/SCR-UC-NK-001-01.html) |
| `SCR-UC-NK-001-02` | Màn hình Chi tiết Kiểm đếm & Quét cất hàng Bin Location | M3 → M7, E1-E4 | [screens/SCR-UC-NK-001-02.html](file:///c:/Users/Admin/Desktop/02_Dao%20tao%20&%20Mentoring/Multi%20Agent%20BA%20demo/uc/UC-NK-001/screens/SCR-UC-NK-001-02.html) |

---

## 12. Tiêu chí Nghiệm thu (Acceptance Criteria — AC)

### AC1 — Kiểm thử Luồng nhập mua PO chuẩn (Happy Path)
- **Given:** Thủ kho mở PDA, chọn phiếu nhập `NK-PO-20260802-001` (PO từ Nhà cung cấp mua 1,000 hũ Ô mai Sấu Xào Gừng, Biên bản QC đạt `PASSED`).
- **When:** Thủ kho quét mã QR lô hàng, nhập số lượng 1,000 hũ và di chuyển đến cất tại ô Bin `K1-A02-T3-O05` theo gợi ý WMS, chụp ảnh biên bản đính kèm và trình duyệt. Thủ kho trưởng bấm Duyệt.
- **Then:** Phiếu chuyển trạng thái `APPROVED`, tồn kho WMS tại ô `K1-A02-T3-O05` tăng 1,000 hũ, dữ liệu phiếu nhập tự động đẩy sang ERP hạch toán Nợ TK 156.

### AC2 — Kiểm thử Tách phiếu tự động khi Lô hàng có QC Lỗi một phần (Edge Case E2)
- **Given:** Lô hàng 500 thùng Ô mai Mơ Chùa Hương có 400 thùng QC `PASSED` và 100 thùng móp vỡ bao bì QC `REJECTED`.
- **When:** Thủ kho quét tải dữ liệu QC trên WMS.
- **Then:** WMS tự động tách thành 2 phiếu: Phiếu A (400 thùng) cho cất hàng bán; Phiếu B (100 thùng) gán vị trí vào Khu Vực Biệt Trữ dán tem đỏ `REJECTED`, khóa không cho xuất bán.

### AC3 — Kiểm thử Phân tách SoD & Ngăn chặn Tự duyệt (Security & Fraud Risk)
- **Given:** Thủ kho Nguyễn Văn A lập và quét cất hàng xong cho phiếu `NK-PO-20260802-005`.
- **When:** Nguyễn Văn A dùng tài khoản của mình mở phiếu để bấm "Phê duyệt".
- **Then:** Hệ thống chặn giao dịch, hiển thị cảnh báo đỏ: `"Vi phạm quy tắc BR-UC-NK-001-06: Tài khoản lập phiếu không có quyền tự phê duyệt"`.

### AC4 — Kiểm thử Luồng Rollback Xả Kệ khi Hủy phiếu dở dang (Edge Case E4)
- **Given:** Thủ kho đã quét cất 200/500 hộp vào ô Bin `K2-B01-T2-O01` và phát hiện sai PO nên bấm "Hủy phiếu".
- **When:** Nhấp vào nút "Hủy phiếu nhập".
- **Then:** Hệ thống không cho hủy ngay mà mở giao diện "Rollback Xả Kệ", bắt buộc Thủ kho quét mã xác nhận nhả 200 hộp khỏi ô `K2-B01-T2-O01` trước khi phiếu đổi sang `CANCELLED`.

---

## 13. Truy vết Khảo sát (Survey Traceability)

| Mục trong Spec | Nguồn trích dẫn (Mã Q-ID / File nguồn) |
|---|---|
| §1, §4 — 4 Loại hình nhập kho | `answers-r1.md` — Q-UC-NK-001-02 |
| §7 — Quy tắc HSD >= 70% | `answers-r1.md` — Q-UC-NK-001-01 |
| §6 (E1) — Partial Inbound & Dung sai | `answers-r1.md` — Q-UC-NK-001-03, Q-UC-NK-001-05 |
| §4 (M5) — SLA 2 giờ & FEFO | `answers-r1.md` — Q-UC-NK-001-04 |
| §6 (E2) — Tách phiếu QC Partial | `answers-r1.md` — Q-UC-NK-001-06 |
| §6 (E3) — PDA Offline 30 phút | `answers-r1.md` — Q-UC-NK-001-07 |
| §6 (E4) — Rollback xả kệ | `answers-r1.md` — Q-UC-NK-001-08 |
| §8 — SoD & Ngưỡng duyệt 100M (Cập nhật từ 200M theo CR-01) | `answers-r1.md` — Q-UC-NK-001-09 |
| §7 — Khóa gõ tay Mã Lô & EXP | `answers-r1.md` — Q-UC-NK-001-10 |
| §8 — 3-Way Matching & Alert | `answers-r1.md` — Q-UC-NK-001-11 |

---

## 14. Open Questions còn lại & Giả định Chờ xác nhận

| Mã Q-ID | Nội dung Vấn đề | Mức độ | Trạng thái |
|---|---|---|---|
| *(Không có)* | Tất cả 11 Open Questions khảo sát đã được giải đáp và chốt 100% với các Actor Hồng Lam tại `answers-r1.md`. | - | **CLOSED (11/11)** |

---

## 15. Nhật ký Thay đổi (Changelog)

| Phiên bản | Ngày | Tác giả / Agent | Nội dung thay đổi |
|---|---|---|---|
| 1.0 | 2026-08-02 | `ba-writing` | Khởi tạo bản thảo Specification đầy đủ cho UC-NK-001 dựa trên biên bản khảo sát `answers-r1.md`. |
| 1.1 | 2026-08-02 | BA Project Lead | Cập nhật CR-01: Hạ ngưỡng phê duyệt Phiếu nhập kho của Thủ kho trưởng từ < 200 triệu VNĐ xuống < 100 triệu VNĐ (Các đơn >= 100 triệu VNĐ chuyển Giám đốc Logistics/COO duyệt). Hạ trạng thái UC về 40-BA-REVIEW. |
