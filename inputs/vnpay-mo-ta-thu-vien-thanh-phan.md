# TÀI LIỆU VNPAY OPEN PLATFORM (VOP) — MÔ TẢ THƯ VIỆN THÀNH PHẦN

> Nguồn: https://vop-docs.vnpay.vn/docs/component%2Fthu-vien-thanh-phan%2Fmo-ta-thu-vien-thanh-phan
> Tiêu đề: VNPAY Open Platform Framework
> Ngày nạp vào inputs/: 2026-10-07T10:05:59.984Z

---

Tài liệu
Component
API
Demo

 Thư viện thành phần

 Mô tả thư viện thành phần

 Trang Meta

 Common

 Sự kiện

 Xem vùng chứa

 Thành phần cơ bản

 Thành phần biểu mẫu

 Skyline

 Trình điều hướng

 Thành phần truyền thông

 Canvas

 Khả năng mở

Mô tả thư viện thành phần

​

VNMF sử dụng  thư viện thành phần ứng dụng MiniApp ﻿﻿làm tiêu chuẩn và kết hợp jsxcác đặc tả ngữ pháp để tùy chỉnh một bộ đặc tả thư viện thành phần của riêng nó.

​Dựa trên các nguyên tắc trên, về mặt chương trình mini, chúng tôi có thể sử dụng tất cả các thành phần gốc của chương trình mini, trong khi về mặt khác, chúng tôi cung cấp triển khai thư viện thành phần tương ứng




​

​Bên H5, @vnxjs/components, cũng là thư viện thành phần chuẩn mặc định cần được giới thiệu.

Khi sử dụng, trong React chúng ta cần @vnxjs/componentstham chiếu đến thành phần từ thư viện thành phần chuẩn VNMF trước khi sử dụng, chẳng hạn như sử dụng <View />, <Text />thành phần, nhưng trong Vue chúng ta không cần giới thiệu.







Mã mẫu:

import React, { Component } from 'react'
import { View, Text } from '@vnxjs/components'
export default class C extends Component {
  render() {
    return (
      <View className="c">
        <Text>c component</Text>
      </View>
    )
  }
}





<template>
  <view class="c">
    <text>c component</text>
  </view>
</template>




Note:

Mức độ hỗ trợ cho thành phần ở các đầu khác nhau, cũng như các ví dụ sử dụng cơ bản, được liệt kê trong tài liệu chi tiết của thành phần. Đối với một số thành phần không được liệt kê như ví dụ, bạn có thể tham khảo trực tiếp tài liệu thành phần về MiniApp để biết cách sử dụng .

Cần lưu ý rằng các thông số kỹ thuật phát triển của Vnmf vẫn cần phải được tuân theo:







Viết hoa và camel:

Ví dụ: sử dụng thành phần map chưa được hỗ trợ ở phía H5

import React, { Component } from 'react'
import Vnmf from '@vnxjs/vnmf'
import { Map } from '@vnxjs/components'
class App extends Components {
  onTap() {}
  render() {
    return <Map onClick={this.onTap} />
  }
}



Powered by VNPAY