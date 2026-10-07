---
description: QC thẩm định tính kiểm thử (Testability), phân tích giá trị biên (BVA) và Acceptance Criteria (Bước QC Review)
---
# /uc-qc-review $ARGUMENTS

**Tham số:** `$ARGUMENTS` = `<mã-UC> [vòng-review]` (Ví dụ: `UC-NK-001` hoặc `UC-NK-001 r1`). Mặc định vòng review là `r1`.

### Các bước thực hiện:
1. Kiểm tra trạng thái UC trong `UC-Registry.md`.
2. Gọi agent **qc-review** thực hiện quy trình thẩm định QC trong `agents/qc-review.md`.
3. Phân tích tính kiểm thử của Business Rules `BR-*`, lập Ma trận Bao phủ Test Cases (Positive, Negative, Boundary, Fraud/SoD) và kiểm tra danh sách Acceptance Criteria (AC).
4. Tạo báo cáo review tại `uc/UC-<MOD>-<###>/review/review-qc-r<n>.md` kèm Verdict (`APPROVED_DRAFT` / `REJECTED_NEED_REFIX`).
5. Cập nhật `UC-Registry.md` và append lịch sử vào `logs/Log-UC-<MOD>-<###>.md`.
6. DỪNG báo cáo BA con người về ma trận test coverage và tiêu chí nghiệm thu.
