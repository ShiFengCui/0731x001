# MembershipCard 会员卡组件

## 组件描述
MembershipCard 是一个精美的会员卡展示组件，用于显示用户的会员信息、等级、权益和积分等信息。

## 功能特性
- 🎨 支持多种会员等级样式（青铜、银卡、金卡、白金、钻石）
- 👤 显示用户头像、姓名和会员号
- 🏆 支持会员权益展示
- 💎 精美的渐变背景和装饰元素
- 📱 响应式设计，适配不同屏幕尺寸
- ⚡ 支持自定义操作按钮

## 使用方法

### 基础用法
```vue
<template>
  <membership-card
    :username="'张三'"
    :member-id="'MB202412001'"
    :level-name="'黄金会员'"
    :card-type="'gold'"
    :points="2580"
    :benefits="memberBenefits"
    @upgrade="onUpgrade"
    @viewDetails="onViewDetails"
  />
</template>

<script>
import MembershipCard from '@/components/membership-card/membership-card.vue'

export default {
  components: {
    MembershipCard
  },
  data() {
    return {
      memberBenefits: [
        { icon: 'gift', text: '生日礼包', color: '#ff6b35' },
        { icon: 'vip', text: '专属客服', color: '#ffa726' },
        { icon: 'heart', text: '积分翻倍', color: '#42a5f5' }
      ]
    }
  },
  methods: {
    onUpgrade() {
      console.log('升级会员')
    },
    onViewDetails() {
      console.log('查看详情')
    }
  }
}
</script>
```

## Props 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| cardType | String | 'bronze' | 卡片类型：bronze/silver/gold/platinum/diamond |
| logoImage | String | '' | 品牌logo图片地址 |
| logoText | String | '会员卡' | 品牌logo文字（无图片时显示） |
| levelName | String | '普通会员' | 会员等级名称 |
| showCrown | Boolean | false | 是否显示皇冠图标 |
| username | String | 必填 | 用户名 |
| memberId | String | 必填 | 会员号 |
| userAvatar | String | '' | 用户头像 |
| points | Number | 0 | 积分数量 |
| expiryDate | String | '' | 有效期 |
| benefits | Array | [] | 会员权益列表 |
| shadow | Boolean | true | 是否显示阴影 |
| showActions | Boolean | true | 是否显示操作按钮 |

## Events 事件

| 事件名 | 说明 | 参数 |
|--------|------|------|
| upgrade | 升级会员时触发 | - |
| viewDetails | 查看详情时触发 | - |

## 卡片类型说明

- **bronze**: 青铜卡 - 棕色渐变
- **silver**: 银卡 - 银色渐变  
- **gold**: 金卡 - 金色渐变
- **platinum**: 白金卡 - 铂金色渐变
- **diamond**: 钻石卡 - 蓝色渐变

## 权益数据格式

```javascript
benefits: [
  {
    icon: 'gift',      // uni-icons 图标名称
    text: '生日礼包',   // 权益文字
    color: '#ff6b35'   // 图标颜色
  }
]
```

## 注意事项

1. username 和 memberId 为必填参数
2. 权益列表最多显示 3 个项目
3. 建议为不同等级的会员卡设置不同的 cardType
4. 组件依赖 uni-icons，请确保项目中已安装