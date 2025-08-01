<template>
	<view class="membership-card" :class="[`membership-card--${cardType}`, { 'membership-card--shadow': shadow }]">
		<!-- 背景装饰 -->
		<view class="membership-card__background">
			<view class="membership-card__decoration"></view>
			<view class="membership-card__pattern"></view>
		</view>
		
		<!-- 卡片内容 -->
		<view class="membership-card__content">
			<!-- 卡片头部 -->
			<view class="membership-card__header">
				<view class="membership-card__logo">
					<image v-if="logoImage" class="membership-card__logo-image" :src="logoImage" mode="aspectFit" />
					<text v-else class="membership-card__logo-text">{{ logoText || '会员卡' }}</text>
				</view>
				<view class="membership-card__level">
					<text class="membership-card__level-text">{{ levelName }}</text>
					<uni-icons v-if="showCrown" type="crown" :size="20" :color="crownColor" />
				</view>
			</view>
			
			<!-- 用户信息 -->
			<view class="membership-card__user">
				<view class="membership-card__avatar">
					<image class="membership-card__avatar-image" :src="userAvatar || '/static/logo.png'" mode="aspectFill" />
				</view>
				<view class="membership-card__user-info">
					<text class="membership-card__username">{{ username }}</text>
					<text class="membership-card__user-id">会员号：{{ memberId }}</text>
				</view>
			</view>
			
			<!-- 会员权益 -->
			<view class="membership-card__benefits">
				<view class="membership-card__benefit-item" v-for="(benefit, index) in displayBenefits" :key="index">
					<uni-icons :type="benefit.icon" :size="16" :color="benefit.color" />
					<text class="membership-card__benefit-text">{{ benefit.text }}</text>
				</view>
			</view>
			
			<!-- 底部信息 -->
			<view class="membership-card__footer">
				<view class="membership-card__points">
					<text class="membership-card__points-label">积分</text>
					<text class="membership-card__points-value">{{ points }}</text>
				</view>
				<view class="membership-card__expiry" v-if="expiryDate">
					<text class="membership-card__expiry-text">有效期至：{{ expiryDate }}</text>
				</view>
			</view>
		</view>
		
		<!-- 卡片操作按钮 -->
		<view class="membership-card__actions" v-if="showActions">
			<button class="membership-card__action-btn" type="primary" size="mini" @click="onUpgrade">
				升级会员
			</button>
			<button class="membership-card__action-btn" type="default" size="mini" @click="onViewDetails">
				查看详情
			</button>
		</view>
	</view>
</template>

<script>
	/**
	 * MembershipCard 会员卡组件
	 * @description 展示用户会员信息的卡片组件，支持不同等级样式和权益展示
	 * @property {String} cardType 卡片类型：bronze, silver, gold, platinum, diamond
	 * @property {String} logoImage 品牌logo图片地址
	 * @property {String} logoText 品牌logo文字，当没有图片时显示
	 * @property {String} levelName 会员等级名称
	 * @property {Boolean} showCrown 是否显示皇冠图标
	 * @property {String} username 用户名
	 * @property {String} memberId 会员号
	 * @property {String} userAvatar 用户头像
	 * @property {Number} points 积分数量
	 * @property {String} expiryDate 有效期
	 * @property {Array} benefits 会员权益列表
	 * @property {Boolean} shadow 是否显示阴影
	 * @property {Boolean} showActions 是否显示操作按钮
	 * @event {Function} upgrade 升级会员触发
	 * @event {Function} viewDetails 查看详情触发
	 */
	export default {
		name: 'MembershipCard',
		emits: ['upgrade', 'viewDetails'],
		props: {
			// 卡片类型
			cardType: {
				type: String,
				default: 'bronze',
				validator: (value) => ['bronze', 'silver', 'gold', 'platinum', 'diamond'].includes(value)
			},
			// 品牌logo图片
			logoImage: {
				type: String,
				default: ''
			},
			// 品牌logo文字
			logoText: {
				type: String,
				default: '会员卡'
			},
			// 会员等级名称
			levelName: {
				type: String,
				default: '普通会员'
			},
			// 是否显示皇冠
			showCrown: {
				type: Boolean,
				default: false
			},
			// 用户名
			username: {
				type: String,
				required: true
			},
			// 会员号
			memberId: {
				type: String,
				required: true
			},
			// 用户头像
			userAvatar: {
				type: String,
				default: ''
			},
			// 积分
			points: {
				type: Number,
				default: 0
			},
			// 有效期
			expiryDate: {
				type: String,
				default: ''
			},
			// 会员权益
			benefits: {
				type: Array,
				default: () => []
			},
			// 是否显示阴影
			shadow: {
				type: Boolean,
				default: true
			},
			// 是否显示操作按钮
			showActions: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			// 皇冠颜色
			crownColor() {
				const colorMap = {
					bronze: '#CD7F32',
					silver: '#C0C0C0',
					gold: '#FFD700',
					platinum: '#E5E4E2',
					diamond: '#B9F2FF'
				};
				return colorMap[this.cardType] || '#CD7F32';
			},
			// 显示的权益（最多显示3个）
			displayBenefits() {
				return this.benefits.slice(0, 3);
			}
		},
		methods: {
			// 升级会员
			onUpgrade() {
				this.$emit('upgrade');
			},
			// 查看详情
			onViewDetails() {
				this.$emit('viewDetails');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.membership-card {
		position: relative;
		width: 100%;
		height: 360rpx;
		border-radius: 16rpx;
		overflow: hidden;
		margin: 20rpx 0;
		
		&--shadow {
			box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.12);
		}
		
		// 青铜卡
		&--bronze {
			background: linear-gradient(135deg, #CD7F32 0%, #A0522D 100%);
		}
		
		// 银卡
		&--silver {
			background: linear-gradient(135deg, #C0C0C0 0%, #A9A9A9 100%);
		}
		
		// 金卡
		&--gold {
			background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
		}
		
		// 白金卡
		&--platinum {
			background: linear-gradient(135deg, #E5E4E2 0%, #D3D3D3 100%);
		}
		
		// 钻石卡
		&--diamond {
			background: linear-gradient(135deg, #B9F2FF 0%, #87CEEB 100%);
		}
	}
	
	.membership-card__background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
	}
	
	.membership-card__decoration {
		position: absolute;
		top: -50rpx;
		right: -50rpx;
		width: 200rpx;
		height: 200rpx;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.1);
	}
	
	.membership-card__pattern {
		position: absolute;
		bottom: -30rpx;
		left: -30rpx;
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.05);
	}
	
	.membership-card__content {
		position: relative;
		z-index: 2;
		padding: 24rpx;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.membership-card__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}
	
	.membership-card__logo {
		display: flex;
		align-items: center;
	}
	
	.membership-card__logo-image {
		width: 60rpx;
		height: 60rpx;
	}
	
	.membership-card__logo-text {
		font-size: 28rpx;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.9);
	}
	
	.membership-card__level {
		display: flex;
		align-items: center;
		gap: 8rpx;
	}
	
	.membership-card__level-text {
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.8);
	}
	
	.membership-card__user {
		display: flex;
		align-items: center;
		gap: 16rpx;
		margin-bottom: 20rpx;
	}
	
	.membership-card__avatar {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		overflow: hidden;
		border: 2rpx solid rgba(255, 255, 255, 0.3);
	}
	
	.membership-card__avatar-image {
		width: 100%;
		height: 100%;
	}
	
	.membership-card__user-info {
		flex: 1;
	}
	
	.membership-card__username {
		display: block;
		font-size: 32rpx;
		font-weight: 600;
		color: white;
		margin-bottom: 4rpx;
	}
	
	.membership-card__user-id {
		font-size: 22rpx;
		color: rgba(255, 255, 255, 0.7);
	}
	
	.membership-card__benefits {
		display: flex;
		flex-wrap: wrap;
		gap: 16rpx;
		margin-bottom: 20rpx;
	}
	
	.membership-card__benefit-item {
		display: flex;
		align-items: center;
		gap: 6rpx;
		padding: 4rpx 12rpx;
		background: rgba(255, 255, 255, 0.15);
		border-radius: 20rpx;
	}
	
	.membership-card__benefit-text {
		font-size: 20rpx;
		color: rgba(255, 255, 255, 0.9);
	}
	
	.membership-card__footer {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}
	
	.membership-card__points {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	
	.membership-card__points-label {
		font-size: 20rpx;
		color: rgba(255, 255, 255, 0.7);
		margin-bottom: 4rpx;
	}
	
	.membership-card__points-value {
		font-size: 32rpx;
		font-weight: 600;
		color: white;
	}
	
	.membership-card__expiry {
		text-align: right;
	}
	
	.membership-card__expiry-text {
		font-size: 20rpx;
		color: rgba(255, 255, 255, 0.7);
	}
	
	.membership-card__actions {
		position: absolute;
		bottom: 16rpx;
		right: 24rpx;
		display: flex;
		gap: 12rpx;
		z-index: 3;
	}
	
	.membership-card__action-btn {
		font-size: 22rpx !important;
		padding: 8rpx 16rpx !important;
		border-radius: 20rpx !important;
		opacity: 0.9;
		
		&:active {
			opacity: 1;
		}
	}
</style>