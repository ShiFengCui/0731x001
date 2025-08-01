# AddressManager 收货地址管理组件

一个功能完整的收货地址管理组件，基于uni-ui构建，支持地址列表展示、新增、编辑、删除、设置默认地址等功能。

## 功能特性

- ✅ 地址列表展示
- ✅ 新增地址
- ✅ 编辑地址
- ✅ 删除地址（带确认弹窗）
- ✅ 设置默认地址
- ✅ 地址选择模式
- ✅ 省市区三级联动选择
- ✅ 表单验证
- ✅ 响应式设计
- ✅ 空状态展示

## 快速开始

### 基础用法

```vue
<template>
  <view>
    <address-manager 
      :address-list="addressList"
      @add="onAddAddress"
      @edit="onEditAddress"
      @delete="onDeleteAddress"
      @setDefault="onSetDefaultAddress"
    />
  </view>
</template>

<script>
import AddressManager from '@/components/address-manager/address-manager.vue'

export default {
  components: {
    AddressManager
  },
  data() {
    return {
      addressList: [
        {
          id: 1,
          consigneeName: '张三',
          phone: '13812345678',
          province: '广东省',
          city: '深圳市',
          district: '南山区',
          detailAddress: '科技园南区深南大道10000号腾讯大厦',
          isDefault: true
        }
      ]
    }
  },
  methods: {
    onAddAddress(data) {
      console.log('新增地址:', data.address)
      // 处理新增地址逻辑
      this.addressList.push({
        ...data.address,
        id: Date.now()
      })
    },
    
    onEditAddress(data) {
      console.log('编辑地址:', data.address, '索引:', data.index)
      // 处理编辑地址逻辑
      this.addressList[data.index] = data.address
    },
    
    onDeleteAddress(data) {
      console.log('删除地址:', data.address, '索引:', data.index)
      // 处理删除地址逻辑
      this.addressList.splice(data.index, 1)
    },
    
    onSetDefaultAddress(data) {
      console.log('设置默认地址:', data.address, '索引:', data.index)
      // 处理设置默认地址逻辑
      this.addressList.forEach((item, index) => {
        item.isDefault = index === data.index
      })
    }
  }
}
</script>
```

### 地址选择模式

```vue
<template>
  <view>
    <address-manager 
      :address-list="addressList"
      :allow-select="true"
      @select="onSelectAddress"
    />
  </view>
</template>

<script>
export default {
  methods: {
    onSelectAddress(data) {
      console.log('选择地址:', data.address)
      // 处理地址选择逻辑
      uni.navigateBack()
    }
  }
}
</script>
```

## API 参考

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| addressList | Array | [] | 地址列表数据 |
| allowSelect | Boolean | false | 是否允许选择地址模式 |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| select | 选择地址时触发（allowSelect为true时） | { address, index } |
| add | 新增地址时触发 | { address } |
| edit | 编辑地址时触发 | { address, index } |
| delete | 删除地址时触发 | { address, index } |
| setDefault | 设置默认地址时触发 | { address, index } |

### 地址数据结构

```javascript
{
  id: Number,              // 地址ID（可选）
  consigneeName: String,   // 收货人姓名
  phone: String,           // 手机号
  province: String,        // 省份
  city: String,           // 城市
  district: String,       // 区县
  detailAddress: String,  // 详细地址
  isDefault: Boolean      // 是否为默认地址
}
```

## 样式自定义

组件使用SCSS编写，支持自定义主题色：

```scss
// 修改主色调
$primary-color: #007AFF;    // 主色
$danger-color: #FF3B30;     // 危险色（删除按钮）
$text-color: #333333;       // 主文本色
$border-color: #EBEEF5;     // 边框色
$background-color: #FFFFFF;  // 背景色
```

## 功能详解

### 地址列表

- 支持显示多个地址
- 默认地址有特殊标识
- 支持点击选择（在选择模式下）
- 每个地址都有编辑、删除、设为默认操作

### 地址编辑

- 表单包含收货人、手机号、地区、详细地址
- 支持省市区三级联动选择
- 完整的表单验证
- 支持设置默认地址开关

### 地区选择

- 内置常用省市区数据
- 三级联动选择
- 弹窗式选择器
- 支持取消和确认操作

### 表单验证

- 收货人姓名：必填，最大20个字符
- 手机号：必填，格式验证（1开头11位数字）
- 地区选择：必填
- 详细地址：必填，最大200个字符

## 注意事项

1. 组件需要在uni-app环境中使用
2. 地区数据可根据需要扩展更多省市区
3. 删除操作会弹出确认对话框
4. 设置默认地址时，其他地址的默认状态需要在父组件中处理
5. 组件采用事件驱动模式，数据变更需要在父组件中处理

## 兼容性

- ✅ H5
- ✅ 小程序（微信、支付宝、百度、字节跳动、QQ）
- ✅ App（Vue、nvue）

## 更新日志

### v1.0.0
- 初始版本
- 支持地址列表、新增、编辑、删除、设置默认
- 支持省市区三级联动选择
- 完整的表单验证功能