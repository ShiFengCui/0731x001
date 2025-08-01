# 在线预约系统组件 (AppointmentSystem)

## 组件介绍

在线预约系统组件是一个功能完整的预约管理组件，支持预约排期查看、预约成功和取消等核心功能。组件采用现代化的UI设计，提供流畅的用户体验。

## 功能特性

- ✅ **日历选择**: 月份切换，日期选择，显示可预约日期
- ✅ **时间段管理**: 灵活的时间段配置，显示剩余名额
- ✅ **预约表单**: 姓名、手机号、备注信息填写
- ✅ **预约确认**: 确认预约信息，提交预约请求
- ✅ **我的预约**: 查看个人预约记录，支持取消预约
- ✅ **状态管理**: 预约状态跟踪（已预约、已取消、已完成等）
- ✅ **响应式设计**: 适配不同屏幕尺寸
- ✅ **动画效果**: 平滑的交互动画

## 使用方法

### 基础用法

```vue
<template>
  <appointment-system
    title="医生预约"
    subtitle="请选择您的预约时间"
    :appointment-slots="appointmentSlots"
    :show-my-appointments="true"
    :my-appointments="myAppointments"
    @appointmentSuccess="onAppointmentSuccess"
    @appointmentCancel="onAppointmentCancel"
    @dateSelect="onDateSelect"
    @slotSelect="onSlotSelect"
  />
</template>

<script>
import AppointmentSystem from '@/components/appointment-system/appointment-system.vue'

export default {
  components: {
    AppointmentSystem
  },
  data() {
    return {
      // 时间段配置
      appointmentSlots: [
        { startTime: '09:00', endTime: '10:00', maxCount: 3 },
        { startTime: '10:00', endTime: '11:00', maxCount: 3 },
        { startTime: '14:00', endTime: '15:00', maxCount: 5 },
        { startTime: '15:00', endTime: '16:00', maxCount: 5 }
      ],
      // 我的预约数据
      myAppointments: [
        {
          id: 1,
          date: '2024-12-15',
          startTime: '09:00',
          endTime: '10:00',
          name: '张三',
          phone: '13812345678',
          remark: '定期检查',
          status: 'confirmed'
        }
      ]
    }
  },
  methods: {
    onAppointmentSuccess(appointment) {
      console.log('预约成功:', appointment)
      // 添加到我的预约列表
      this.myAppointments.push(appointment)
    },
    onAppointmentCancel(appointment) {
      console.log('取消预约:', appointment)
    },
    onDateSelect(date) {
      console.log('选择日期:', date)
    },
    onSlotSelect(slot) {
      console.log('选择时间段:', slot)
    }
  }
}
</script>
```

## 属性配置

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| title | String | '在线预约' | 组件标题 |
| subtitle | String | '请选择预约时间' | 组件副标题 |
| appointment-slots | Array | [] | 可预约时间段配置 |
| show-my-appointments | Boolean | true | 是否显示我的预约列表 |
| my-appointments | Array | [] | 我的预约列表数据 |

### appointment-slots 时间段配置格式

```javascript
[
  {
    startTime: '09:00',    // 开始时间
    endTime: '10:00',      // 结束时间
    maxCount: 5            // 最大预约人数
  }
]
```

### my-appointments 预约数据格式

```javascript
[
  {
    id: 1,                    // 预约ID
    date: '2024-12-15',       // 预约日期
    startTime: '09:00',       // 开始时间
    endTime: '10:00',         // 结束时间
    name: '张三',             // 预约人姓名
    phone: '13812345678',     // 手机号
    remark: '定期检查',       // 备注
    status: 'confirmed'       // 状态：confirmed|cancelled|completed|expired
  }
]
```

## 事件回调

| 事件名 | 参数 | 说明 |
|--------|------|------|
| appointmentSuccess | appointment | 预约成功时触发 |
| appointmentCancel | appointment | 取消预约时触发 |
| dateSelect | date | 选择日期时触发 |
| slotSelect | slot | 选择时间段时触发 |

## 预约状态说明

- **confirmed**: 已预约（用户可以取消）
- **cancelled**: 已取消
- **completed**: 已完成
- **expired**: 已过期

## 样式定制

组件支持通过CSS变量进行样式定制：

```css
.appointment-system {
  --primary-color: #667eea;
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --success-color: #4caf50;
  --error-color: #f44336;
  --border-radius: 12rpx;
  --shadow-color: rgba(0, 0, 0, 0.08);
}
```

## 注意事项

1. 组件依赖 `uni-icons` 组件，请确保已安装
2. 实际项目中需要对接后端API获取真实预约数据
3. 组件内置了表单验证，确保数据的有效性
4. 支持响应式布局，在不同设备上都有良好表现

## 版本更新

### v1.0.0
- 初始版本发布
- 支持基础预约功能
- 日历选择和时间段管理
- 预约表单和状态管理