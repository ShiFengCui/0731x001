<template>
	<view class="page">
		<view class="page-header">
			<text class="page-title">List Group 组件示例</text>
			<text class="page-subtitle">仿Bootstrap列表组组件，支持多种样式和交互</text>
		</view>
		
		<!-- 基础列表组示例 -->
		<view class="demo-section">
			<view class="demo-title">基础列表组</view>
			<list-group
				title="系统功能"
				:items="basicListData"
				@item-click="onItemClick"
				@action-click="onActionClick"
			/>
		</view>
		
		<!-- 不同样式变体 -->
		<view class="demo-section">
			<view class="demo-title">样式变体</view>
			
			<!-- 边框样式 -->
			<view class="demo-item">
				<text class="demo-label">边框样式 (bordered)</text>
				<list-group
					:items="styleListData"
					type="bordered"
					:show-arrow="false"
					@item-click="onItemClick"
				/>
			</view>
			
			<!-- flush样式 -->
			<view class="demo-item">
				<text class="demo-label">Flush样式 (无圆角)</text>
				<list-group
					:items="styleListData"
					type="flush"
					:show-arrow="false"
					@item-click="onItemClick"
				/>
			</view>
		</view>
		
		<!-- 不同尺寸 -->
		<view class="demo-section">
			<view class="demo-title">不同尺寸</view>
			
			<!-- 小尺寸 -->
			<view class="demo-item">
				<text class="demo-label">小尺寸 (small)</text>
				<list-group
					:items="sizeListData"
					size="small"
					@item-click="onItemClick"
				/>
			</view>
			
			<!-- 大尺寸 -->
			<view class="demo-item">
				<text class="demo-label">大尺寸 (large)</text>
				<list-group
					:items="sizeListData"
					size="large"
					@item-click="onItemClick"
				/>
			</view>
		</view>
		
		<!-- 多选功能 -->
		<view class="demo-section">
			<view class="demo-title">多选功能</view>
			<list-group
				title="可选择的列表"
				:items="selectableListData"
				:selectable="true"
				:selected-items="selectedItems"
				@selection-change="onSelectionChange"
				@item-click="onItemClick"
			/>
			
			<view class="selected-info">
				<text class="selected-text">已选择 {{ selectedItems.length }} 项</text>
				<button 
					v-if="selectedItems.length > 0" 
					class="clear-btn" 
					size="mini" 
					@click="clearSelection"
				>
					清空选择
				</button>
			</view>
		</view>
		
		<!-- 自定义插槽 -->
		<view class="demo-section">
			<view class="demo-title">自定义插槽</view>
			<list-group :items="customListData" @item-click="onItemClick">
				<!-- 自定义头部 -->
				<template #header>
					<view class="custom-header">
						<text class="custom-header-title">📋 自定义头部</text>
						<button class="custom-header-btn" size="mini" type="primary">操作</button>
					</view>
				</template>
				
				<!-- 自定义底部 -->
				<template #footer>
					<view class="custom-footer">
						<text class="custom-footer-text">共 {{ customListData.length }} 项数据</text>
					</view>
				</template>
			</list-group>
		</view>
		
		<!-- 空状态 -->
		<view class="demo-section">
			<view class="demo-title">空状态</view>
			<list-group 
				title="空列表示例"
				:items="[]"
				@item-click="onItemClick"
			>
				<template #empty>
					<view class="custom-empty">
						<text class="empty-icon">📭</text>
						<text class="empty-text">暂无数据，请稍后再试</text>
						<button class="empty-btn" size="mini" @click="loadData">重新加载</button>
					</view>
				</template>
			</list-group>
		</view>
	</view>
</template>

<script>
import ListGroup from '@/components/list-group/list-group.vue'

export default {
	components: {
		ListGroup
	},
	data() {
		return {
			// 基础列表数据
			basicListData: [
				{
					id: 'basic_001',
					title: '用户管理',
					description: '管理系统用户，包括用户注册、权限分配等',
					icon: '👤',
					iconColor: '#007aff',
					badge: {
						type: 'primary',
						text: '管理'
					},
					actions: [
						{ key: 'view', text: '查看', type: 'primary' },
						{ key: 'edit', text: '编辑', type: 'default' }
					]
				},
				{
					id: 'basic_002',
					title: '订单系统',
					description: '处理用户订单，包括订单创建、支付、发货等流程',
					icon: '📋',
					iconColor: '#28a745',
					price: 1299.00,
					tags: ['热门', '必备']
				},
				{
					id: 'basic_003',
					title: '数据统计',
					description: '系统数据分析和报表展示',
					icon: '📊',
					iconColor: '#17a2b8',
					badge: {
						type: 'info',
						text: '新功能'
					}
				},
				{
					id: 'basic_004',
					title: '已禁用功能',
					description: '此功能暂时不可用',
					icon: '🚫',
					iconColor: '#dc3545',
					disabled: true,
					status: 'danger',
					statusText: '已禁用'
				}
			],
			
			// 样式变体数据
			styleListData: [
				{
					id: 'style_001',
					title: '项目 1',
					description: '这是第一个项目的描述'
				},
				{
					id: 'style_002',
					title: '项目 2',
					description: '这是第二个项目的描述'
				},
				{
					id: 'style_003',
					title: '项目 3',
					description: '这是第三个项目的描述'
				}
			],
			
			// 尺寸示例数据
			sizeListData: [
				{
					id: 'size_001',
					title: '示例项目',
					description: '项目描述信息',
					icon: '⚡',
					iconColor: '#ffc107'
				},
				{
					id: 'size_002',
					title: '另一个项目',
					description: '另一个项目的描述',
					icon: '🚀',
					iconColor: '#007aff'
				}
			],
			
			// 可选择列表数据
			selectableListData: [
				{
					id: 'select_001',
					title: '选项 1',
					description: '这是第一个可选择的选项',
					icon: '✅',
					iconColor: '#28a745'
				},
				{
					id: 'select_002',
					title: '选项 2',
					description: '这是第二个可选择的选项',
					icon: '✅',
					iconColor: '#28a745'
				},
				{
					id: 'select_003',
					title: '选项 3',
					description: '这是第三个可选择的选项',
					icon: '✅',
					iconColor: '#28a745'
				},
				{
					id: 'select_004',
					title: '禁用选项',
					description: '这个选项被禁用了',
					icon: '❌',
					iconColor: '#dc3545',
					disabled: true
				}
			],
			
			// 自定义插槽数据
			customListData: [
				{
					id: 'custom_001',
					title: '自定义项 1',
					description: '带有自定义头部和底部的列表项'
				},
				{
					id: 'custom_002',
					title: '自定义项 2',
					description: '展示插槽功能的强大之处'
				}
			],
			
			// 选中的项
			selectedItems: []
		}
	},
	methods: {
		onItemClick(data) {
			console.log('点击项目:', data)
			uni.showToast({
				title: `点击了: ${data.item.title}`,
				icon: 'none',
				duration: 1500
			})
		},
		
		onActionClick(data) {
			console.log('点击操作:', data)
			uni.showToast({
				title: `${data.action.text}: ${data.item.title}`,
				icon: 'none',
				duration: 1500
			})
		},
		
		onSelectionChange(selectedItems) {
			console.log('选择变化:', selectedItems)
			this.selectedItems = selectedItems
		},
		
		clearSelection() {
			this.selectedItems = []
			uni.showToast({
				title: '已清空选择',
				icon: 'success',
				duration: 1000
			})
		},
		
		loadData() {
			uni.showToast({
				title: '正在加载数据...',
				icon: 'loading',
				duration: 1000
			})
		}
	}
}
</script>

<style scoped>
.page {
	padding: 32rpx 24rpx;
	background-color: #f5f5f5;
	min-height: 100vh;
}

.page-header {
	text-align: center;
	margin-bottom: 60rpx;
}

.page-title {
	display: block;
	font-size: 48rpx;
	font-weight: bold;
	color: #333333;
	margin-bottom: 16rpx;
}

.page-subtitle {
	font-size: 28rpx;
	color: #666666;
}

.demo-section {
	margin-bottom: 60rpx;
}

.demo-title {
	font-size: 36rpx;
	font-weight: 600;
	color: #333333;
	margin-bottom: 32rpx;
	padding-left: 16rpx;
	border-left: 8rpx solid #007aff;
}

.demo-item {
	margin-bottom: 40rpx;
}

.demo-label {
	display: block;
	font-size: 28rpx;
	color: #666666;
	margin-bottom: 16rpx;
	padding-left: 8rpx;
}

/* 选择信息 */
.selected-info {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 24rpx;
	padding: 16rpx 24rpx;
	background-color: #f8f9fa;
	border-radius: 12rpx;
}

.selected-text {
	font-size: 28rpx;
	color: #333333;
}

.clear-btn {
	background-color: #ff4757;
	color: #ffffff;
	border: none;
	padding: 8rpx 16rpx;
	border-radius: 8rpx;
}

/* 自定义头部 */
.custom-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 24rpx 32rpx;
	background: linear-gradient(135deg, #667eea, #764ba2);
	color: #ffffff;
}

.custom-header-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #ffffff;
}

.custom-header-btn {
	background-color: rgba(255, 255, 255, 0.2);
	color: #ffffff;
	border: 2rpx solid rgba(255, 255, 255, 0.3);
}

/* 自定义底部 */
.custom-footer {
	padding: 16rpx 32rpx;
	background-color: #f8f9fa;
	text-align: center;
}

.custom-footer-text {
	font-size: 26rpx;
	color: #666666;
}

/* 自定义空状态 */
.custom-empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 80rpx 32rpx;
}

.empty-icon {
	font-size: 80rpx;
	margin-bottom: 24rpx;
}

.empty-text {
	font-size: 28rpx;
	color: #999999;
	margin-bottom: 32rpx;
}

.empty-btn {
	background-color: #007aff;
	color: #ffffff;
	border: none;
	padding: 12rpx 24rpx;
	border-radius: 8rpx;
}
</style>