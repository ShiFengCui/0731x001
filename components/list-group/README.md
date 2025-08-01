# List Group 列表组组件

仿Bootstrap List Groups的Vue组件，支持多种样式和交互功能。

## 功能特性

- 🎨 多种样式变体（默认、边框、flush）
- 📱 响应式设计，支持不同尺寸（small、medium、large）
- 🖼️ 支持图标和头像展示
- 🏷️ 支持徽章、标签、状态显示
- 💰 支持价格展示
- ⚡ 支持操作按钮
- ✅ 支持多选功能
- 🎯 灵活的自定义插槽
- 🔄 丰富的事件回调

## 基本用法

```vue
<template>
  <list-group
    title="用户列表"
    :items="userList"
    @item-click="handleItemClick"
  />
</template>

<script>
export default {
  data() {
    return {
      userList: [
        {
          id: 1,
          title: '张三',
          description: '前端开发工程师',
          avatar: '/static/avatar1.png',
          badge: { type: 'success', text: '在线' }
        },
        {
          id: 2,
          title: '李四',
          description: '后端开发工程师',
          avatar: '/static/avatar2.png',
          badge: { type: 'danger', text: '离线' }
        }
      ]
    }
  },
  methods: {
    handleItemClick(data) {
      console.log('点击项:', data.item)
    }
  }
}
</script>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| items | Array | [] | 列表数据 |
| title | String | '' | 列表标题 |
| showIcon | Boolean | true | 是否显示图标 |
| showArrow | Boolean | true | 是否显示右侧箭头 |
| type | String | 'default' | 列表组类型：default、bordered、flush |
| size | String | 'medium' | 列表项大小：small、medium、large |
| emptyText | String | '暂无数据' | 空状态文本 |
| selectable | Boolean | false | 是否可选择 |
| selectedItems | Array | [] | 选中的项 |
| customClass | String | '' | 自定义样式类 |

## 数据项结构

每个列表项支持以下属性：

```javascript
{
  id: '唯一标识',
  title: '主标题',
  name: '名称（与title二选一）',
  description: '描述文本',
  icon: '图标文本',
  iconColor: '图标颜色',
  avatar: '头像图片路径',
  price: 99.99, // 价格
  status: '状态值',
  statusText: '状态显示文本',
  tags: ['标签1', '标签2'], // 标签数组
  badge: {
    type: 'primary', // primary、success、warning、danger、info
    text: '徽章文本'
  },
  actions: [
    {
      key: 'edit',
      text: '编辑',
      type: 'primary'
    }
  ],
  disabled: false, // 是否禁用
  active: false, // 是否激活
  hideArrow: false, // 隐藏箭头
  class: '自定义样式类'
}
```

## 事件说明

| 事件名 | 参数 | 说明 |
|--------|------|------|
| item-click | { item, index, selected } | 点击列表项 |
| action-click | { action, item, index } | 点击操作按钮 |
| selection-change | selectedItems | 选择项变化（selectable=true时） |

## 插槽说明

| 插槽名 | 说明 |
|--------|------|
| header | 自定义头部内容 |
| empty | 自定义空状态内容 |
| footer | 自定义底部内容 |

## 样式变体示例

### 边框样式
```vue
<list-group
  type="bordered"
  :items="items"
/>
```

### flush样式（无圆角）
```vue
<list-group
  type="flush"
  :items="items"
/>
```

### 不同尺寸
```vue
<!-- 小尺寸 -->
<list-group size="small" :items="items" />

<!-- 大尺寸 -->
<list-group size="large" :items="items" />
```

## 多选功能

```vue
<template>
  <list-group
    :items="items"
    :selectable="true"
    :selectedItems.sync="selected"
    @selection-change="handleSelectionChange"
  />
</template>

<script>
export default {
  data() {
    return {
      selected: [],
      items: [...]
    }
  },
  methods: {
    handleSelectionChange(selectedItems) {
      console.log('选中项:', selectedItems)
    }
  }
}
</script>
```

## 自定义插槽示例

```vue
<template>
  <list-group :items="items">
    <!-- 自定义头部 -->
    <template #header>
      <view class="custom-header">
        <text class="header-title">自定义标题</text>
        <button size="mini">添加</button>
      </view>
    </template>
    
    <!-- 自定义空状态 -->
    <template #empty>
      <view class="custom-empty">
        <text>🔍 没有找到相关数据</text>
        <button>重新加载</button>
      </view>
    </template>
    
    <!-- 自定义底部 -->
    <template #footer>
      <view class="custom-footer">
        <text>共 {{ items.length }} 项</text>
      </view>
    </template>
  </list-group>
</template>
```