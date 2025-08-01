<template>
	<view class="member-center">
		<!-- 会员等级展示 -->
		<view class="member-header">
			<view class="member-avatar">
				<image :src="memberData.avatar || '/static/logo.png'" class="avatar-img"></image>
			</view>
			<view class="member-info">
				<view class="member-name">{{ memberData.nickname || '用户' }}</view>
				<view class="member-level">
					<text class="level-badge" :class="'level-' + memberData.level">
						{{ memberData.levelName }}
					</text>
					<text class="level-desc">{{ memberData.levelDesc }}</text>
				</view>
			</view>
		</view>

		<!-- 积分余额 -->
		<view class="points-balance">
			<view class="balance-card">
				<view class="balance-title">积分余额</view>
				<view class="balance-amount">{{ memberData.points }}</view>
				<view class="balance-desc">累计获得 {{ memberData.totalPoints }} 积分</view>
			</view>
		</view>

		<!-- 会员权益说明 -->
		<view class="member-benefits">
			<view class="section-title">
				<text class="title-text">会员权益</text>
			</view>
			<view class="benefits-list">
				<view class="benefit-item" 
					v-for="(benefit, index) in memberBenefits" 
					:key="index"
					:class="{ disabled: !benefit.available }">
					<view class="benefit-icon">
						<uni-icons :type="benefit.icon" size="24" :color="benefit.available ? '#007AFF' : '#C0C4CC'"></uni-icons>
					</view>
					<view class="benefit-content">
						<view class="benefit-title">{{ benefit.title }}</view>
						<view class="benefit-desc">{{ benefit.desc }}</view>
					</view>
					<view class="benefit-status" v-if="benefit.available">
						<text class="status-text">{{ benefit.status }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 积分兑换 -->
		<view class="points-exchange">
			<view class="section-title">
				<text class="title-text">积分兑换</text>
				<text class="more-text" @click="onViewMoreExchange">查看更多</text>
			</view>
			<view class="exchange-list">
				<view class="exchange-item" 
					v-for="(item, index) in exchangeList" 
					:key="index"
					@click="onExchangeItem(item)">
					<view class="exchange-image">
						<image :src="item.image" class="item-img"></image>
					</view>
					<view class="exchange-info">
						<view class="exchange-title">{{ item.title }}</view>
						<view class="exchange-desc">{{ item.desc }}</view>
						<view class="exchange-points">
							<text class="points-text">{{ item.points }}</text>
							<text class="points-unit">积分</text>
						</view>
					</view>
					<view class="exchange-btn">
						<button class="btn-exchange" 
							:disabled="memberData.points < item.points"
							@click.stop="onExchange(item)">
							{{ memberData.points >= item.points ? '兑换' : '积分不足' }}
						</button>
					</view>
				</view>
			</view>
		</view>

		<!-- 积分记录 -->
		<view class="points-record">
			<view class="section-title">
				<text class="title-text">积分记录</text>
				<text class="more-text" @click="onViewMoreRecord">查看更多</text>
			</view>
			<view class="record-list">
				<view class="record-item" 
					v-for="(record, index) in pointsRecords" 
					:key="index">
					<view class="record-content">
						<view class="record-title">{{ record.title }}</view>
						<view class="record-time">{{ record.time }}</view>
					</view>
					<view class="record-points" :class="record.type">
						<text class="points-change">
							{{ record.type === 'earn' ? '+' : '-' }}{{ record.points }}
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'MemberCenter',
		props: {
			// 会员数据
			memberData: {
				type: Object,
				default: () => ({
					nickname: '会员用户',
					avatar: '/static/logo.png',
					level: 1,
					levelName: '普通会员',
					levelDesc: '享受基础会员权益',
					points: 1580,
					totalPoints: 3200
				})
			},
			// 会员权益列表
			memberBenefits: {
				type: Array,
				default: () => ([
					{
						icon: 'gift',
						title: '生日礼包',
						desc: '生日当月可领取专属礼包',
						available: true,
						status: '可领取'
					},
					{
						icon: 'vip',
						title: '专属客服',
						desc: '享受1对1专属客服服务',
						available: true,
						status: '已开通'
					},
					{
						icon: 'heart',
						title: '积分翻倍',
						desc: '消费积分获得翻倍奖励',
						available: false,
						status: '升级解锁'
					},
					{
						icon: 'wallet',
						title: '免费包邮',
						desc: '全场商品免费包邮',
						available: true,
						status: '已享受'
					}
				])
			},
			// 积分兑换列表
			exchangeList: {
				type: Array,
				default: () => ([
					{
						id: 1,
						title: '10元优惠券',
						desc: '全场通用，无门槛使用',
						points: 1000,
						image: '/static/logo.png'
					},
					{
						id: 2,
						title: '20元优惠券',
						desc: '满100元可用',
						points: 1800,
						image: '/static/logo.png'
					},
					{
						id: 3,
						title: '50元优惠券',
						desc: '满300元可用',
						points: 4500,
						image: '/static/logo.png'
					}
				])
			},
			// 积分记录列表
			pointsRecords: {
				type: Array,
				default: () => ([
					{
						title: '每日签到',
						points: 10,
						type: 'earn',
						time: '2024-12-12 09:00'
					},
					{
						title: '购买商品',
						points: 50,
						type: 'earn',
						time: '2024-12-11 15:30'
					},
					{
						title: '兑换优惠券',
						points: 1000,
						type: 'spend',
						time: '2024-12-10 14:20'
					},
					{
						title: '邀请好友',
						points: 100,
						type: 'earn',
						time: '2024-12-09 11:45'
					},
					{
						title: '完善资料',
						points: 20,
						type: 'earn',
						time: '2024-12-08 16:15'
					}
				])
			}
		},
		methods: {
			// 兑换商品
			onExchange(item) {
				if (this.memberData.points < item.points) {
					uni.showToast({
						title: '积分不足',
						icon: 'none'
					});
					return;
				}
				
				uni.showModal({
					title: '确认兑换',
					content: `确定要用 ${item.points} 积分兑换 ${item.title} 吗？`,
					success: (res) => {
						if (res.confirm) {
							this.$emit('exchange', item);
							uni.showToast({
								title: '兑换成功',
								icon: 'success'
							});
						}
					}
				});
			},
			
			// 点击兑换商品
			onExchangeItem(item) {
				this.$emit('exchangeItemClick', item);
			},
			
			// 查看更多兑换商品
			onViewMoreExchange() {
				this.$emit('viewMoreExchange');
			},
			
			// 查看更多积分记录
			onViewMoreRecord() {
				this.$emit('viewMoreRecord');
			}
		}
	};
</script>

<style lang="scss">
	.member-center {
		background-color: #f5f5f5;
		
		.member-header {
			display: flex;
			align-items: center;
			padding: 40rpx 30rpx;
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			color: white;
			margin-bottom: 20rpx;
			
			.member-avatar {
				margin-right: 30rpx;
				
				.avatar-img {
					width: 120rpx;
					height: 120rpx;
					border-radius: 60rpx;
					border: 4rpx solid rgba(255, 255, 255, 0.3);
				}
			}
			
			.member-info {
				flex: 1;
				
				.member-name {
					font-size: 36rpx;
					font-weight: 600;
					margin-bottom: 16rpx;
				}
				
				.member-level {
					display: flex;
					align-items: center;
					
					.level-badge {
						display: inline-block;
						padding: 8rpx 16rpx;
						border-radius: 20rpx;
						font-size: 24rpx;
						margin-right: 16rpx;
						
						&.level-1 {
							background-color: rgba(255, 255, 255, 0.2);
						}
						&.level-2 {
							background-color: rgba(255, 215, 0, 0.3);
						}
						&.level-3 {
							background-color: rgba(255, 105, 180, 0.3);
						}
					}
					
					.level-desc {
						font-size: 26rpx;
						opacity: 0.8;
					}
				}
			}
		}
		
		.points-balance {
			margin: 0 30rpx 20rpx;
			
			.balance-card {
				background: white;
				border-radius: 20rpx;
				padding: 40rpx;
				text-align: center;
				box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
				
				.balance-title {
					font-size: 28rpx;
					color: #909399;
					margin-bottom: 20rpx;
				}
				
				.balance-amount {
					font-size: 72rpx;
					font-weight: 600;
					color: #FF6B35;
					margin-bottom: 16rpx;
				}
				
				.balance-desc {
					font-size: 26rpx;
					color: #909399;
				}
			}
		}
		
		.section-title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx 20rpx;
			
			.title-text {
				font-size: 32rpx;
				font-weight: 600;
				color: #303133;
			}
			
			.more-text {
				font-size: 26rpx;
				color: #007AFF;
			}
		}
		
		.member-benefits {
			margin-bottom: 40rpx;
			
			.benefits-list {
				background: white;
				margin: 0 30rpx;
				border-radius: 20rpx;
				padding: 20rpx 0;
				
				.benefit-item {
					display: flex;
					align-items: center;
					padding: 30rpx;
					border-bottom: 1rpx solid #f0f0f0;
					
					&:last-child {
						border-bottom: none;
					}
					
					&.disabled {
						opacity: 0.5;
					}
					
					.benefit-icon {
						margin-right: 24rpx;
					}
					
					.benefit-content {
						flex: 1;
						
						.benefit-title {
							font-size: 30rpx;
							color: #303133;
							margin-bottom: 8rpx;
						}
						
						.benefit-desc {
							font-size: 26rpx;
							color: #909399;
						}
					}
					
					.benefit-status {
						.status-text {
							font-size: 24rpx;
							color: #67C23A;
							background-color: rgba(103, 194, 58, 0.1);
							padding: 6rpx 12rpx;
							border-radius: 12rpx;
						}
					}
				}
			}
		}
		
		.points-exchange {
			margin-bottom: 40rpx;
			
			.exchange-list {
				background: white;
				margin: 0 30rpx;
				border-radius: 20rpx;
				padding: 20rpx 0;
				
				.exchange-item {
					display: flex;
					align-items: center;
					padding: 30rpx;
					border-bottom: 1rpx solid #f0f0f0;
					
					&:last-child {
						border-bottom: none;
					}
					
					.exchange-image {
						margin-right: 24rpx;
						
						.item-img {
							width: 80rpx;
							height: 80rpx;
							border-radius: 12rpx;
						}
					}
					
					.exchange-info {
						flex: 1;
						
						.exchange-title {
							font-size: 30rpx;
							color: #303133;
							margin-bottom: 8rpx;
						}
						
						.exchange-desc {
							font-size: 26rpx;
							color: #909399;
							margin-bottom: 12rpx;
						}
						
						.exchange-points {
							.points-text {
								font-size: 28rpx;
								color: #FF6B35;
								font-weight: 600;
							}
							
							.points-unit {
								font-size: 24rpx;
								color: #909399;
								margin-left: 4rpx;
							}
						}
					}
					
					.exchange-btn {
						.btn-exchange {
							font-size: 24rpx;
							padding: 12rpx 24rpx;
							border-radius: 20rpx;
							border: none;
							background-color: #007AFF;
							color: white;
							
							&:disabled {
								background-color: #C0C4CC;
								color: white;
							}
						}
					}
				}
			}
		}
		
		.points-record {
			.record-list {
				background: white;
				margin: 0 30rpx;
				border-radius: 20rpx;
				padding: 20rpx 0;
				
				.record-item {
					display: flex;
					align-items: center;
					padding: 30rpx;
					border-bottom: 1rpx solid #f0f0f0;
					
					&:last-child {
						border-bottom: none;
					}
					
					.record-content {
						flex: 1;
						
						.record-title {
							font-size: 30rpx;
							color: #303133;
							margin-bottom: 8rpx;
						}
						
						.record-time {
							font-size: 26rpx;
							color: #909399;
						}
					}
					
					.record-points {
						.points-change {
							font-size: 32rpx;
							font-weight: 600;
						}
						
						&.earn .points-change {
							color: #67C23A;
						}
						
						&.spend .points-change {
							color: #F56C6C;
						}
					}
				}
			}
		}
	}
</style>