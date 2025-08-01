<template>
	<view class="list-group" :class="listGroupClass">
		<!-- 自定义头部 -->
		<view v-if="title || $slots.header" class="list-group-header">
			<slot name="header">
				<text class="list-group-title">{{ title }}</text>
			</slot>
		</view>
		
		<!-- 列表项 -->
		<view 
			v-for="(item, index) in items" 
			:key="getItemKey(item, index)"
			class="list-group-item"
			:class="getItemClass(item, index)"
			@click="handleItemClick(item, index)"
		>
			<!-- 左侧图标/头像 -->
			<view v-if="showIcon && (item.icon || item.avatar)" class="list-group-item-icon">
				<image 
					v-if="item.avatar" 
					:src="item.avatar" 
					class="list-group-item-avatar"
					mode="aspectFill"
				/>
				<text 
					v-else-if="item.icon" 
					class="list-group-item-icon-text"
					:style="{ color: item.iconColor || '#666' }"
				>
					{{ item.icon }}
				</text>
			</view>
			
			<!-- 内容区域 -->
			<view class="list-group-item-content">
				<!-- 主要内容 -->
				<view class="list-group-item-main">
					<!-- 标题 -->
					<text class="list-group-item-title">{{ item.title || item.name }}</text>
					
					<!-- 描述 -->
					<text 
						v-if="item.description" 
						class="list-group-item-description"
					>
						{{ item.description }}
					</text>
					
					<!-- 标签 -->
					<view v-if="item.tags && item.tags.length" class="list-group-item-tags">
						<text 
							v-for="tag in item.tags" 
							:key="tag" 
							class="list-group-item-tag"
						>
							{{ tag }}
						</text>
					</view>
				</view>
				
				<!-- 右侧区域 -->
				<view class="list-group-item-right">
					<!-- 徽章 -->
					<view v-if="item.badge" class="list-group-item-badge" :class="getBadgeClass(item.badge)">
						<text class="list-group-item-badge-text">{{ item.badge.text || item.badge }}</text>
					</view>
					
					<!-- 价格 -->
					<view v-if="item.price !== undefined" class="list-group-item-price">
						<text class="list-group-item-price-symbol">¥</text>
						<text class="list-group-item-price-value">{{ item.price }}</text>
					</view>
					
					<!-- 状态文本 -->
					<text 
						v-if="item.status" 
						class="list-group-item-status"
						:class="getStatusClass(item.status)"
					>
						{{ item.statusText || item.status }}
					</text>
					
					<!-- 右侧箭头 -->
					<text 
						v-if="showArrow && !item.hideArrow" 
						class="list-group-item-arrow"
					>
						&gt;
					</text>
				</view>
			</view>
			
			<!-- 操作按钮 -->
			<view v-if="item.actions && item.actions.length" class="list-group-item-actions">
				<button 
					v-for="action in item.actions"
					:key="action.key"
					class="list-group-item-action-btn"
					:class="getActionClass(action)"
					size="mini"
					@click.stop="handleActionClick(action, item, index)"
				>
					{{ action.text }}
				</button>
			</view>
		</view>
		
		<!-- 空状态 -->
		<view v-if="!items || items.length === 0" class="list-group-empty">
			<slot name="empty">
				<text class="list-group-empty-text">{{ emptyText }}</text>
			</slot>
		</view>
		
		<!-- 自定义底部 -->
		<view v-if="$slots.footer" class="list-group-footer">
			<slot name="footer"></slot>
		</view>
	</view>
</template>

<script>
export default {
	name: 'ListGroup',
	props: {
		// 数据列表
		items: {
			type: Array,
			default: () => []
		},
		// 标题
		title: {
			type: String,
			default: ''
		},
		// 是否显示图标
		showIcon: {
			type: Boolean,
			default: true
		},
		// 是否显示右侧箭头
		showArrow: {
			type: Boolean,
			default: true
		},
		// 列表组类型
		type: {
			type: String,
			default: 'default', // default, bordered, flush
			validator: value => ['default', 'bordered', 'flush'].includes(value)
		},
		// 列表项大小
		size: {
			type: String,
			default: 'medium', // small, medium, large
			validator: value => ['small', 'medium', 'large'].includes(value)
		},
		// 空状态文本
		emptyText: {
			type: String,
			default: '暂无数据'
		},
		// 是否可选择
		selectable: {
			type: Boolean,
			default: false
		},
		// 选中的项
		selectedItems: {
			type: Array,
			default: () => []
		},
		// 自定义样式类
		customClass: {
			type: String,
			default: ''
		}
	},
	computed: {
		listGroupClass() {
			return [
				`list-group--${this.type}`,
				`list-group--${this.size}`,
				this.customClass
			].filter(Boolean)
		}
	},
	methods: {
		// 获取项的key
		getItemKey(item, index) {
			return item.id || item.key || index
		},
		
		// 获取项的样式类
		getItemClass(item, _index) {
			const classes = []
			
			// 选中状态
			if (this.selectable && this.isSelected(item)) {
				classes.push('list-group-item--selected')
			}
			
			// 禁用状态
			if (item.disabled) {
				classes.push('list-group-item--disabled')
			}
			
			// 激活状态
			if (item.active) {
				classes.push('list-group-item--active')
			}
			
			// 自定义样式
			if (item.class) {
				classes.push(item.class)
			}
			
			return classes
		},
		
		// 获取徽章样式类
		getBadgeClass(badge) {
			if (typeof badge === 'object' && badge.type) {
				return `list-group-item-badge--${badge.type}`
			}
			return ''
		},
		
		// 获取状态样式类
		getStatusClass(status) {
			return `list-group-item-status--${status}`
		},
		
		// 获取操作按钮样式类
		getActionClass(action) {
			return action.type ? `list-group-item-action-btn--${action.type}` : ''
		},
		
		// 判断是否选中
		isSelected(item) {
			return this.selectedItems.some(selected => 
				selected.id === item.id || selected === item
			)
		},
		
		// 处理项点击
		handleItemClick(item, index) {
			if (item.disabled) return
			
			// 如果是可选择的，切换选中状态
			if (this.selectable) {
				this.toggleSelection(item)
			}
			
			// 触发点击事件
			this.$emit('item-click', {
				item,
				index,
				selected: this.isSelected(item)
			})
		},
		
		// 切换选择状态
		toggleSelection(item) {
			const selected = [...this.selectedItems]
			const index = selected.findIndex(s => s.id === item.id || s === item)
			
			if (index > -1) {
				selected.splice(index, 1)
			} else {
				selected.push(item)
			}
			
			this.$emit('update:selectedItems', selected)
			this.$emit('selection-change', selected)
		},
		
		// 处理操作按钮点击
		handleActionClick(action, item, index) {
			this.$emit('action-click', {
				action,
				item,
				index
			})
		}
	}
}
</script>

<style scoped>
/* 列表组容器 */
.list-group {
	width: 100%;
	background-color: #ffffff;
	border-radius: 12rpx;
	overflow: hidden;
}

/* 列表组变体 */
.list-group--bordered {
	border: 2rpx solid #e5e5e5;
}

.list-group--flush {
	border-radius: 0;
}

/* 列表头部 */
.list-group-header {
	padding: 24rpx 32rpx 16rpx;
	background-color: #f8f9fa;
	border-bottom: 2rpx solid #e5e5e5;
}

.list-group-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #333333;
}

/* 列表项 */
.list-group-item {
	display: flex;
	align-items: center;
	padding: 24rpx 32rpx;
	border-bottom: 2rpx solid #f0f0f0;
	background-color: #ffffff;
	transition: background-color 0.2s;
}

.list-group-item:last-child {
	border-bottom: none;
}

.list-group-item:active {
	background-color: #f8f9fa;
}

/* 列表项状态 */
.list-group-item--selected {
	background-color: #e3f2fd;
	border-left: 8rpx solid #2196f3;
}

.list-group-item--disabled {
	opacity: 0.6;
	background-color: #f5f5f5;
}

.list-group-item--active {
	background-color: #007aff;
	color: #ffffff;
}

.list-group-item--active .list-group-item-title,
.list-group-item--active .list-group-item-description {
	color: #ffffff;
}

/* 列表项大小变体 */
.list-group--small .list-group-item {
	padding: 16rpx 24rpx;
}

.list-group--large .list-group-item {
	padding: 32rpx 40rpx;
}

/* 图标区域 */
.list-group-item-icon {
	margin-right: 24rpx;
	flex-shrink: 0;
}

.list-group-item-avatar {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
}

.list-group-item-icon-text {
	font-size: 32rpx;
	color: #666666;
}

/* 内容区域 */
.list-group-item-content {
	flex: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;
	min-width: 0;
}

.list-group-item-main {
	flex: 1;
	min-width: 0;
}

.list-group-item-title {
	font-size: 30rpx;
	font-weight: 500;
	color: #333333;
	display: block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.list-group-item-description {
	font-size: 26rpx;
	color: #666666;
	margin-top: 8rpx;
	display: block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

/* 标签 */
.list-group-item-tags {
	margin-top: 12rpx;
	display: flex;
	flex-wrap: wrap;
	gap: 8rpx;
}

.list-group-item-tag {
	padding: 4rpx 12rpx;
	background-color: #f0f0f0;
	color: #666666;
	font-size: 22rpx;
	border-radius: 8rpx;
}

/* 右侧区域 */
.list-group-item-right {
	display: flex;
	align-items: center;
	gap: 16rpx;
	flex-shrink: 0;
}

/* 徽章 */
.list-group-item-badge {
	padding: 4rpx 12rpx;
	border-radius: 12rpx;
	background-color: #ff4757;
}

.list-group-item-badge--primary {
	background-color: #007aff;
}

.list-group-item-badge--success {
	background-color: #28a745;
}

.list-group-item-badge--warning {
	background-color: #ffc107;
}

.list-group-item-badge--danger {
	background-color: #dc3545;
}

.list-group-item-badge--info {
	background-color: #17a2b8;
}

.list-group-item-badge-text {
	color: #ffffff;
	font-size: 22rpx;
	font-weight: 500;
}

/* 价格 */
.list-group-item-price {
	display: flex;
	align-items: baseline;
}

.list-group-item-price-symbol {
	font-size: 24rpx;
	color: #ff4757;
}

.list-group-item-price-value {
	font-size: 32rpx;
	font-weight: 600;
	color: #ff4757;
}

/* 状态 */
.list-group-item-status {
	font-size: 26rpx;
	color: #666666;
}

.list-group-item-status--success {
	color: #28a745;
}

.list-group-item-status--warning {
	color: #ffc107;
}

.list-group-item-status--danger {
	color: #dc3545;
}

/* 箭头 */
.list-group-item-arrow {
	font-size: 28rpx;
	color: #cccccc;
	margin-left: 16rpx;
}

/* 操作按钮 */
.list-group-item-actions {
	margin-top: 16rpx;
	display: flex;
	gap: 16rpx;
}

.list-group-item-action-btn {
	padding: 8rpx 16rpx;
	font-size: 24rpx;
	border-radius: 8rpx;
}

.list-group-item-action-btn--primary {
	background-color: #007aff;
	color: #ffffff;
}

.list-group-item-action-btn--success {
	background-color: #28a745;
	color: #ffffff;
}

.list-group-item-action-btn--danger {
	background-color: #dc3545;
	color: #ffffff;
}

/* 空状态 */
.list-group-empty {
	padding: 80rpx 32rpx;
	text-align: center;
}

.list-group-empty-text {
	font-size: 28rpx;
	color: #999999;
}

/* 列表底部 */
.list-group-footer {
	padding: 16rpx 32rpx;
	background-color: #f8f9fa;
	border-top: 2rpx solid #e5e5e5;
}
</style>