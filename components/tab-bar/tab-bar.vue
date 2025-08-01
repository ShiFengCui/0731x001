<template>
	<view class="tab-bar" :class="{ 'tab-bar-safe-area': safeArea }">
		<view 
			v-for="(item, index) in tabList" 
			:key="item.id || index"
			class="tab-item"
			:class="{ 'tab-item-active': currentIndex === index }"
			@click="handleTabClick(item, index)"
		>
			<!-- 徽章显示 -->
			<view class="tab-badge-wrapper">
				<!-- 图标显示 -->
				<view class="tab-icon" v-if="item.icon || item.image">
					<!-- 自定义图片图标 -->
					<image 
						v-if="item.image" 
						:src="currentIndex === index ? (item.activeImage || item.image) : item.image"
						class="tab-icon-image"
						:style="{ width: iconSize + 'rpx', height: iconSize + 'rpx' }"
					/>
					
					<!-- uni-icons 图标 -->
					<uni-icons 
						v-else-if="item.icon"
						:type="item.icon"
						:size="iconSize / 2"
						:color="currentIndex === index ? activeColor : inactiveColor"
					/>
				</view>
				
				<!-- 徽章数字或红点 -->
				<view 
					v-if="item.badge && (item.badge.count > 0 || item.badge.dot)"
					class="tab-badge"
					:class="{ 'tab-badge-dot': item.badge.dot }"
				>
					<text v-if="!item.badge.dot && item.badge.count" class="tab-badge-text">
						{{ item.badge.count > 99 ? '99+' : item.badge.count }}
					</text>
				</view>
			</view>
			
			<!-- 标题显示 -->
			<text 
				v-if="item.text && showText"
				class="tab-text"
				:style="{ 
					color: currentIndex === index ? activeColor : inactiveColor,
					fontSize: textSize + 'rpx'
				}"
			>
				{{ item.text }}
			</text>
		</view>
	</view>
</template>

<script>
	/**
	 * TabBar 底部导航栏组件
	 * @description 通用的底部导航栏组件，支持图标、文字、徽章等功能
	 * @tutorial https://github.com/your-repo/tab-bar
	 * @property {Array} tabList - 标签页列表数据
	 * @property {Number} current - 当前选中的标签页索引，默认为0
	 * @property {String} activeColor - 激活状态的颜色，默认为#007aff
	 * @property {String} inactiveColor - 未激活状态的颜色，默认为#999999
	 * @property {Boolean} showText - 是否显示文字，默认为true
	 * @property {Number} iconSize - 图标大小（单位rpx），默认为48
	 * @property {Number} textSize - 文字大小（单位rpx），默认为22
	 * @property {Boolean} safeArea - 是否适配底部安全区域，默认为true
	 * @property {String} backgroundColor - 背景颜色，默认为#ffffff
	 * @property {Boolean} border - 是否显示顶部边框，默认为true
	 * @event {Function} change - 切换标签页时触发，返回当前选中的标签页数据和索引
	 */
	export default {
		name: 'TabBar',
		components: {},
		props: {
			// 标签页列表
			tabList: {
				type: Array,
				default: () => []
			},
			// 当前选中的索引
			current: {
				type: Number,
				default: 0
			},
			// 激活状态颜色
			activeColor: {
				type: String,
				default: '#007aff'
			},
			// 未激活状态颜色
			inactiveColor: {
				type: String,
				default: '#999999'
			},
			// 是否显示文字
			showText: {
				type: Boolean,
				default: true
			},
			// 图标大小
			iconSize: {
				type: Number,
				default: 48
			},
			// 文字大小
			textSize: {
				type: Number,
				default: 22
			},
			// 是否适配底部安全区域
			safeArea: {
				type: Boolean,
				default: true
			},
			// 背景颜色
			backgroundColor: {
				type: String,
				default: '#ffffff'
			},
			// 是否显示顶部边框
			border: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				currentIndex: this.current
			}
		},
		watch: {
			current(newVal) {
				this.currentIndex = newVal
			}
		},
		methods: {
			/**
			 * 处理标签页点击事件
			 * @param {Object} item - 标签页数据
			 * @param {Number} index - 标签页索引
			 */
			handleTabClick(item, index) {
				if (this.currentIndex === index) {
					return
				}
				
				this.currentIndex = index
				
				// 触发change事件
				this.$emit('change', {
					item: item,
					index: index
				})
				
				// 处理页面跳转
				if (item.pagePath) {
					this.navigateToPage(item.pagePath)
				}
			},
			
			/**
			 * 页面跳转
			 * @param {String} path - 页面路径
			 */
			navigateToPage(path) {
				// 如果路径以 / 开头，使用 switchTab 或 navigateTo
				if (path.startsWith('/')) {
					// 检查是否为 tabBar 页面
					if (this.isTabBarPage(path)) {
						uni.switchTab({
							url: path,
							fail: (err) => {
								console.error('switchTab failed:', err)
							}
						})
					} else {
						uni.navigateTo({
							url: path,
							fail: (err) => {
								console.error('navigateTo failed:', err)
							}
						})
					}
				}
			},
			
			/**
			 * 判断是否为 tabBar 页面
			 * @param {String} path - 页面路径
			 */
			isTabBarPage(path) {
				// 这里可以根据实际的 tabBar 配置来判断
				// 简单示例，实际使用时可以传入 tabBar 页面列表
				const tabBarPages = [
					'/pages/index/index',
					'/pages/activity-demo/activity-demo',
					'/pages/business-demo/business-demo',
					'/pages/member-demo/member-demo'
				]
				return tabBarPages.includes(path)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		background-color: v-bind(backgroundColor);
		border-top: 1px solid #e5e5e5;
		z-index: 999;
		
		&.tab-bar-safe-area {
			padding-bottom: env(safe-area-inset-bottom);
		}
	}
	
	.tab-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10rpx 0;
		position: relative;
		min-height: 100rpx;
		transition: all 0.3s ease;
		
		&:active {
			background-color: rgba(0, 0, 0, 0.05);
		}
	}
	
	.tab-badge-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 6rpx;
	}
	
	.tab-icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.tab-icon-image {
		border-radius: 8rpx;
	}
	
	.tab-badge {
		position: absolute;
		top: -6rpx;
		right: -12rpx;
		background-color: #ff3333;
		color: #ffffff;
		border-radius: 20rpx;
		min-width: 32rpx;
		height: 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		transform: scale(0.8);
		
		&.tab-badge-dot {
			min-width: 16rpx;
			height: 16rpx;
			border-radius: 50%;
			top: -4rpx;
			right: -8rpx;
		}
	}
	
	.tab-badge-text {
		font-size: 20rpx;
		line-height: 1;
		padding: 0 6rpx;
	}
	
	.tab-text {
		line-height: 1.2;
		transition: color 0.3s ease;
	}
</style>