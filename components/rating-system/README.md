# 评价系统组件 (RatingSystem)

## 组件描述

评价系统组件是一个功能完整的评价管理系统，支持发表评价、查看评价、筛选排序和评价互动等功能。

## 主要功能

### 1. 评价展示
- 整体评分展示（平均分、总数、分布图）
- 评价列表展示（用户信息、评分、内容、媒体文件）
- 评价互动显示（点赞数、评论数）

### 2. 发表评价
- 评分选择（1-5星）
- 文字评价输入（支持字数限制）
- 图片/视频上传（最多9个文件）
- 评价提交和验证

### 3. 查看他人评价
- 筛选功能（全部、有图、按星级筛选）
- 排序功能（最新、最早、评分高低、点赞数）
- 分页加载更多评价

### 4. 评价互动
- 点赞/取消点赞
- 评论回复功能
- 查看更多回复
- 媒体文件预览

## 使用方法

### 基础用法
```vue
<template>
  <rating-system 
    :target-id="productId"
    :can-add-review="true"
    @submitReview="handleSubmitReview"
    @like="handleLike"
    @reply="handleReply"
  />
</template>

<script>
import RatingSystem from '@/components/rating-system/rating-system.vue'

export default {
  components: {
    RatingSystem
  },
  data() {
    return {
      productId: 'product_123'
    }
  },
  methods: {
    handleSubmitReview(reviewData) {
      console.log('提交评价:', reviewData)
      // 调用API提交评价
    },
    handleLike(likeData) {
      console.log('点赞操作:', likeData)
      // 调用API更新点赞状态
    },
    handleReply(replyData) {
      console.log('回复评价:', replyData)
      // 调用API提交回复
    }
  }
}
</script>
```

### 高级用法
```vue
<template>
  <rating-system 
    :target-id="serviceId"
    rating-type="service"
    :can-add-review="userCanReview"
    :initial-reviews="reviewsList"
    @submitReview="handleSubmitReview"
    @like="handleLike"
    @reply="handleReply"
    @loadMore="loadMoreReviews"
    @loadMoreReplies="loadMoreReplies"
  />
</template>
```

## Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| target-id | String | - | 评价目标ID（必填） |
| rating-type | String | 'product' | 评价类型 |
| can-add-review | Boolean | true | 是否可以添加评价 |
| initial-reviews | Array | [] | 初始评价数据 |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| submitReview | reviewData | 提交评价时触发 |
| like | likeData | 点赞/取消点赞时触发 |
| reply | replyData | 回复评价时触发 |
| loadMore | - | 加载更多评价时触发 |
| loadMoreReplies | reviewId | 加载更多回复时触发 |

## 数据结构

### 评价数据结构 (Review)
```javascript
{
  id: 'review_001',           // 评价ID
  username: '用户昵称',        // 用户昵称
  avatar: '/path/to/avatar',  // 用户头像
  rating: 5,                  // 评分 (1-5)
  content: '评价内容',        // 评价文字内容
  date: '2024-12-12 14:30:00', // 评价时间
  media: [                    // 媒体文件数组
    {
      type: 'image',          // 文件类型: image | video
      url: '/path/to/file'    // 文件地址
    }
  ],
  likeCount: 10,              // 点赞数
  isLiked: false,             // 当前用户是否已点赞
  replyCount: 3,              // 回复数
  replies: [                  // 回复列表
    {
      id: 'reply_001',
      username: '回复用户',
      content: '回复内容',
      date: '2024-12-12 15:00:00'
    }
  ]
}
```

### 提交评价数据结构
```javascript
{
  targetId: 'product_123',    // 评价目标ID
  rating: 5,                  // 评分
  content: '评价内容',        // 评价内容
  media: [                    // 媒体文件
    {
      type: 'image',
      url: '/temp/path'
    }
  ]
}
```

## 样式自定义

组件使用SCSS编写样式，支持以下CSS变量自定义：

```scss
.rating-system {
  // 主色调
  --primary-color: #409EFF;
  --star-color: #FFB400;
  --like-color: #F56C6C;
  
  // 背景色
  --bg-color: #f5f5f5;
  --card-bg: white;
  
  // 文字颜色
  --text-primary: #303133;
  --text-regular: #606266;
  --text-secondary: #909399;
}
```

## 注意事项

1. 需要依赖 `uni-rate`、`uni-icons`、`uni-popup`、`uni-load-more` 等 uni-ui 组件
2. 媒体文件上传需要配置对应的上传API
3. 评价数据的增删改查需要对接后端API
4. 图片预览功能需要确保图片URL可访问
5. 视频播放需要注意平台兼容性

## 兼容性

- 支持 uni-app 多平台编译
- 兼容 Vue 2.x 语法
- 适配移动端和PC端显示