<template>
	<page-skeleton 
		:layout="currentLayout"
		:title="pageTitle"
		:show-header="showHeader"
		:show-back="showBack"
		:background-color="backgroundColor"
		:header-text-color="headerTextColor"
		:loading="isLoading"
		:empty="isEmpty && !isLoading"
		empty-text="暂无数据，点击重试"
		empty-button-text="重新加载"
		:show-mask="showMask"
		@back="handleBack"
		@emptyAction="handleReload"
		@maskClick="handleMaskClick"
	>
		<!-- 自定义头部右侧 -->
		<template #headerRight>
			<view class="header-actions">
				<text class="header-icon" @click="showLayoutSelector">⋯</text>
			</view>
		</template>
		
		<!-- 搜索栏 -->
		<template #search>
			<view class="search-wrapper">
				<view class="search-bar">
					<text class="search-icon">🔍</text>
					<input 
						v-model="searchKeyword"
						class="search-input"
						placeholder="搜索示例内容"
						@confirm="handleSearch"
					/>
					<text v-if="searchKeyword" class="search-clear" @click="handleSearchCancel">✕</text>
				</view>
			</view>
		</template>
		
		<!-- 标签页（仅在tab布局时显示） -->
		<template #tabs v-if="currentLayout === 'tab'">
			<view class="tabs-wrapper">
				<view class="tab-container">
					<view 
						v-for="(tab, index) in tabItems" 
						:key="index"
						class="tab-item"
						:class="{ active: currentTab === index }"
						@click="onTabChange({ detail: { current: index } })"
					>
						{{ tab }}
					</view>
				</view>
			</view>
		</template>
		
		<!-- 主要内容区域 -->
		<view class="demo-content">
			<!-- 布局配置卡片 -->
			<custom-card 
				title="布局配置"
				description="点击切换不同的页面布局模式"
				:shadow="true"
				margin="20rpx"
				@click="showLayoutSelector"
			>
				<view class="config-section">
					<view class="config-item">
						<text class="config-label">当前布局：</text>
						<text class="config-value">{{ layoutNames[currentLayout] }}</text>
					</view>
					<view class="config-item">
						<text class="config-label">头部显示：</text>
						<switch :checked="showHeader" @change="onHeaderToggle" />
					</view>
					<view class="config-item">
						<text class="config-label">返回按钮：</text>
						<switch :checked="showBack" @change="onBackToggle" />
					</view>
				</view>
			</custom-card>
			
			<!-- 功能演示卡片 -->
			<custom-card 
				title="功能演示"
				description="测试各种状态和交互功能"
				:shadow="true"
				margin="20rpx"
			>
				<view class="demo-actions">
					<button 
						class="demo-btn" 
						type="primary" 
						size="mini"
						@click="toggleLoading"
					>
						{{ isLoading ? '停止加载' : '显示加载' }}
					</button>
					<button 
						class="demo-btn" 
						type="default" 
						size="mini"
						@click="toggleEmpty"
					>
						{{ isEmpty ? '隐藏空状态' : '显示空状态' }}
					</button>
					<button 
						class="demo-btn" 
						type="default" 
						size="mini"
						@click="toggleMask"
					>
						{{ showMask ? '隐藏遮罩' : '显示遮罩' }}
					</button>
				</view>
			</custom-card>
			
			<!-- 内容列表 -->
			<view v-if="!isEmpty" class="content-list">
				<custom-card 
					v-for="(item, index) in demoList"
					:key="item.id"
					:title="item.title"
					:description="item.description"
					:image="item.image"
					:shadow="true"
					margin="20rpx"
					@click="handleItemClick(item, index)"
				>
					<template #actions>
						<view class="item-actions">
							<button size="mini" type="default">编辑</button>
							<button size="mini" type="warn">删除</button>
						</view>
					</template>
				</custom-card>
			</view>
		</view>
		
		<!-- 侧边栏（仅在sidebar布局时显示） -->
		<template #sidebar v-if="currentLayout === 'sidebar'">
			<view class="sidebar-content">
				<view class="sidebar-title">侧边栏</view>
				<view class="sidebar-menu">
					<view 
						v-for="(menu, index) in sidebarMenus"
						:key="index"
						class="sidebar-menu-item"
						:class="{ active: menu.active }"
						@click="onSidebarMenuClick(menu, index)"
					>
						<text class="menu-icon">{{ getMenuIcon(menu.icon) }}</text>
						<text class="menu-text">{{ menu.title }}</text>
					</view>
				</view>
			</view>
		</template>
		
		<!-- 底部操作栏 -->
		<template #footer>
			<view class="footer-toolbar">
				<view class="toolbar-item" @click="handleToolbarAction('add')">
					<text class="toolbar-icon">+</text>
					<text class="toolbar-text">添加</text>
				</view>
				<view class="toolbar-item" @click="handleToolbarAction('filter')">
					<text class="toolbar-icon">⚹</text>
					<text class="toolbar-text">筛选</text>
				</view>
				<view class="toolbar-item" @click="handleToolbarAction('sort')">
					<text class="toolbar-icon">↑</text>
					<text class="toolbar-text">排序</text>
				</view>
				<view class="toolbar-item" @click="handleToolbarAction('more')">
					<text class="toolbar-icon">⋯</text>
					<text class="toolbar-text">更多</text>
				</view>
			</view>
		</template>
		
		<!-- 悬浮按钮 -->
		<template #fab>
			<view class="fab-container">
				<view class="fab-btn main-fab" @click="handleFabClick">
					<text class="fab-icon">+</text>
				</view>
			</view>
		</template>
		
		<!-- 自定义遮罩内容 -->
		<template #mask v-if="showMask">
			<view class="custom-mask-content">
				<view class="mask-dialog">
					<text class="mask-title">提示</text>
					<text class="mask-message">这是一个自定义遮罩层</text>
					<view class="mask-actions">
						<button size="mini" @click="handleMaskClick">确定</button>
					</view>
				</view>
			</view>
		</template>
	</page-skeleton>
</template><script>
import PageSkeleton from '@/components/page-skeleton/page-skeleton.vue';
import CustomCard from '@/components/custom-card/custom-card.vue';

export default {
	name: 'SkeletonDemo',
	components: {
		PageSkeleton,
		CustomCard
	},
	data() {
		return {
			// 布局相关
			currentLayout: 'normal',
			layoutNames: {
				normal: '普通布局',
				sidebar: '侧边栏布局',
				tab: '标签页布局',
				flow: '流式布局'
			},
			layoutOptions: [
				{ text: '普通布局', value: 'normal' },
				{ text: '侧边栏布局', value: 'sidebar' },
				{ text: '标签页布局', value: 'tab' },
				{ text: '流式布局', value: 'flow' }
			],
			
			// 页面配置
			showHeader: true,
			showBack: true,
			backgroundColor: '#f5f5f5',
			headerTextColor: '#333333',
			
			// 状态控制
			isLoading: false,
			isEmpty: false,
			showMask: false,
			
			// 搜索相关
			searchKeyword: '',
			
			// 标签页相关
			currentTab: 0,
			tabItems: ['全部', '最新', '热门', '推荐'],
			
			// 侧边栏菜单
			sidebarMenus: [
				{ title: '首页', icon: 'home', active: true },
				{ title: '分类', icon: 'list', active: false },
				{ title: '收藏', icon: 'heart', active: false },
				{ title: '设置', icon: 'gear', active: false }
			],
			
			// 示例数据
			demoList: [
				{
					id: 1,
					title: '页面骨架组件示例',
					description: '这是一个功能完整的页面骨架组件，支持多种布局模式和自定义配置',
					image: '/static/logo.png'
				},
				{
					id: 2,
					title: '普通布局模式',
					description: '最常用的页面布局，包含头部、内容区域和底部操作栏',
					image: '/static/logo.png'
				},
				{
					id: 3,
					title: '侧边栏布局模式',
					description: '适用于需要侧边导航的页面，如管理后台或复杂应用',
					image: '/static/logo.png'
				},
				{
					id: 4,
					title: '标签页布局模式',
					description: '适用于内容分类展示的页面，支持标签页切换',
					image: '/static/logo.png'
				},
				{
					id: 5,
					title: '流式布局模式',
					description: '适用于长页面或信息流页面，头部和底部不固定',
					image: '/static/logo.png'
				}
			]
		};
	},
	computed: {
		pageTitle() {
			return `页面骨架 - ${this.layoutNames[this.currentLayout]}`;
		}
	},
	methods: {
		// 获取菜单图标
		getMenuIcon(iconType) {
			const iconMap = {
				'home': '🏠',
				'person': '👤',
				'gear': '⚙️',
				'chatbubble': '💬',
				'heart': '❤️',
				'star': '⭐',
				'bookmark': '🔖',
				'notification': '🔔'
			};
			return iconMap[iconType] || '📋';
		},
		
		// 返回处理
		handleBack() {
			uni.showToast({
				title: '返回按钮被点击',
				icon: 'none'
			});
		},
		
		// 重新加载
		handleReload() {
			this.isEmpty = false;
			this.isLoading = true;
			setTimeout(() => {
				this.isLoading = false;
			}, 2000);
		},
		
		// 遮罩点击
		handleMaskClick() {
			this.showMask = false;
		},
		
		// 显示布局选择器
		showLayoutSelector() {
			uni.showActionSheet({
				itemList: this.layoutOptions.map(item => item.text),
				success: (res) => {
					const selectedLayout = this.layoutOptions[res.tapIndex];
					this.currentLayout = selectedLayout.value;
					uni.showToast({
						title: `切换到${selectedLayout.text}`,
						icon: 'none'
					});
				}
			});
		},
		
		// 头部显示切换
		onHeaderToggle(e) {
			this.showHeader = e.detail.value;
		},
		
		// 返回按钮切换
		onBackToggle(e) {
			this.showBack = e.detail.value;
		},
		
		// 加载状态切换
		toggleLoading() {
			this.isLoading = !this.isLoading;
			if (this.isLoading) {
				setTimeout(() => {
					this.isLoading = false;
				}, 3000);
			}
		},
		
		// 空状态切换
		toggleEmpty() {
			this.isEmpty = !this.isEmpty;
		},
		
		// 遮罩切换
		toggleMask() {
			this.showMask = !this.showMask;
		},
		
		// 搜索处理
		handleSearch() {
			uni.showToast({
				title: `搜索：${this.searchKeyword}`,
				icon: 'none'
			});
		},
		
		// 搜索取消
		handleSearchCancel() {
			this.searchKeyword = '';
		},
		
		// 标签页切换
		onTabChange(e) {
			this.currentTab = e.currentIndex;
			uni.showToast({
				title: `切换到：${this.tabItems[this.currentTab]}`,
				icon: 'none'
			});
		},
		
		// 侧边栏菜单点击
		onSidebarMenuClick(menu, index) {
			this.sidebarMenus.forEach((item, idx) => {
				item.active = idx === index;
			});
			uni.showToast({
				title: `选择：${menu.title}`,
				icon: 'none'
			});
		},
		
		// 列表项点击
		handleItemClick(item, _index) {
			uni.showModal({
				title: '提示',
				content: `点击了：${item.title}`,
				showCancel: false
			});
		},
		
		// 底部工具栏操作
		handleToolbarAction(action) {
			const actionNames = {
				add: '添加',
				filter: '筛选',
				sort: '排序',
				more: '更多'
			};
			uni.showToast({
				title: `${actionNames[action]}操作`,
				icon: 'none'
			});
		},
		
		// 悬浮按钮点击
		handleFabClick() {
			uni.showToast({
				title: '悬浮按钮被点击',
				icon: 'none'
			});
		}
	}
};
</script><style lang="scss" scoped>
.header-actions {
	display: flex;
	align-items: center;
	padding: 10rpx;
	border-radius: 8rpx;
	
	&:active {
		background-color: rgba(0, 0, 0, 0.05);
	}
}

.search-wrapper {
	padding: 20rpx;
	background-color: #ffffff;
	border-bottom: 1rpx solid #eee;
}

.search-bar {
	display: flex;
	align-items: center;
	background-color: #f7f7f7;
	border-radius: 20rpx;
	padding: 12rpx 20rpx;
}

.search-icon {
	font-size: 28rpx;
	color: #999;
	margin-right: 12rpx;
}

.search-input {
	flex: 1;
	font-size: 28rpx;
	color: #333;
	background: transparent;
	border: none;
	outline: none;
}

.search-clear {
	font-size: 24rpx;
	color: #999;
	padding: 8rpx;
	margin-left: 12rpx;
}

.header-icon {
	font-size: 32rpx;
	color: #666;
	padding: 8rpx;
}

.tabs-wrapper {
	padding: 20rpx;
	background-color: #ffffff;
	border-bottom: 1rpx solid #eee;
}

.tab-container {
	display: flex;
	background-color: #f7f7f7;
	border-radius: 6rpx;
	padding: 6rpx;
}

.tab-item {
	flex: 1;
	text-align: center;
	padding: 16rpx 20rpx;
	font-size: 28rpx;
	color: #666;
	border-radius: 4rpx;
	transition: all 0.3s;
}

.tab-item.active {
	background-color: #ffffff;
	color: #007aff;
	box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
}

.demo-content {
	padding-bottom: 40rpx;
}

.config-section {
	margin-top: 20rpx;
}

.config-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #f0f0f0;
	
	&:last-child {
		border-bottom: none;
	}
}

.config-label {
	font-size: 28rpx;
	color: #333;
}

.config-value {
	font-size: 28rpx;
	color: #666;
	font-weight: 500;
}

.demo-actions {
	display: flex;
	flex-wrap: wrap;
	gap: 20rpx;
	margin-top: 20rpx;
}

.demo-btn {
	flex: 1;
	min-width: 140rpx;
}

.content-list {
	margin-top: 20rpx;
}

.item-actions {
	display: flex;
	gap: 20rpx;
	justify-content: flex-end;
	padding: 20rpx 0 0;
}

.sidebar-content {
	padding: 30rpx 20rpx;
	height: 100%;
	overflow-y: auto;
}

.sidebar-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #333;
	margin-bottom: 30rpx;
	text-align: center;
}

.sidebar-menu {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.sidebar-menu-item {
	display: flex;
	align-items: center;
	padding: 20rpx 16rpx;
	border-radius: 12rpx;
	transition: background-color 0.2s;
	
	&:active {
		background-color: rgba(0, 122, 255, 0.1);
	}
	
	&.active {
		background-color: rgba(0, 122, 255, 0.15);
		
		.menu-text {
			color: #007AFF;
			font-weight: 500;
		}
	}
}

.menu-icon {
	font-size: 32rpx;
	margin-right: 16rpx;
}

.menu-text {
	margin-left: 16rpx;
	font-size: 28rpx;
	color: #333;
}

.footer-toolbar {
	display: flex;
	align-items: center;
	padding: 20rpx 30rpx;
	background-color: #ffffff;
	border-top: 1rpx solid #eee;
}

.toolbar-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10rpx;
	border-radius: 8rpx;
	
	&:active {
		background-color: rgba(0, 122, 255, 0.1);
	}
}

.toolbar-icon {
	font-size: 36rpx;
	color: #007AFF;
	font-weight: bold;
}

.toolbar-text {
	font-size: 22rpx;
	color: #007AFF;
	margin-top: 8rpx;
}

.fab-container {
	position: relative;
}

.fab-btn {
	width: 112rpx;
	height: 112rpx;
	border-radius: 56rpx;
	background: linear-gradient(135deg, #007AFF, #5AC8FA);
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 8rpx 24rpx rgba(0, 122, 255, 0.3);
	
	&:active {
		transform: scale(0.95);
	}
	
	&.main-fab {
		background: linear-gradient(135deg, #007AFF, #5AC8FA);
	}
}

.fab-icon {
	font-size: 48rpx;
	color: #ffffff;
	font-weight: bold;
}

.custom-mask-content {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}

.mask-dialog {
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 40rpx 30rpx;
	margin: 0 40rpx;
	max-width: 500rpx;
	width: 100%;
}

.mask-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #333;
	text-align: center;
	margin-bottom: 20rpx;
	display: block;
}

.mask-message {
	font-size: 28rpx;
	color: #666;
	text-align: center;
	line-height: 1.5;
	margin-bottom: 30rpx;
	display: block;
}

.mask-actions {
	display: flex;
	justify-content: center;
}
</style>