<template>
	<view class="profile-page">
		<page-skeleton title="我的" :show-header="true">
			<!-- 账户管理 -->
			<view class="profile-section">
				<account-manager 
					:account-data="accountData"
					@avatarChange="onAvatarChange"
					@nicknameChange="onNicknameChange"
					@passwordChange="onPasswordChange"
					@biometricToggle="onBiometricToggle"
				/>
			</view>
			
			<!-- 地址管理 -->
			<view class="profile-section">
				<address-manager 
					:address-list="addressList"
					@add="onAddAddress"
					@edit="onEditAddress"
					@delete="onDeleteAddress"
					@setDefault="onSetDefaultAddress"
				/>
			</view>
			
			<!-- 收藏管理 -->
			<view class="profile-section">
				<favorite-list
					:favorite-list="favoriteList"
					@removeFavorite="onRemoveFavorite"
					@viewProduct="onViewProduct"
					@itemClick="onFavoriteItemClick"
				/>
			</view>
			
			<!-- 客服服务 -->
			<view class="profile-section">
				<customer-service
					:show-title="true"
					title="客服中心"
					:online-available="true"
					phone-number="400-123-4567"
					@online-service="onOnlineService"
					@phone-call="onPhoneCall"
				/>
			</view>
			
			<!-- 底部导航栏 -->
			<tab-bar 
				:tab-list="tabBarList" 
				:current="4"
				active-color="#00B578"
				@change="onTabChange"
			/>
		</page-skeleton>
	</view>
</template>

<script>
	import PageSkeleton from '@/components/page-skeleton/page-skeleton.vue'
	import AccountManager from '@/components/account-manager/account-manager.vue'
	import AddressManager from '@/components/address-manager/address-manager.vue'
	import FavoriteList from '@/components/favorite-list/favorite-list.vue'
	import CustomerService from '@/components/customer-service/customer-service.vue'
	import TabBar from '@/components/tab-bar/tab-bar.vue'
	
	export default {
		name: 'ProfilePage',
		components: {
			PageSkeleton,
			AccountManager,
			AddressManager,
			FavoriteList,
			CustomerService,
			TabBar
		},
		data() {
			return {
				accountData: {
					avatar: '/static/avatar.jpg',
					nickname: '张三',
					phone: '138****8888',
					email: 'zhang***@example.com',
					loginDays: 365,
					securityLevel: 'high'
				},
				addressList: [
					{
						id: 1,
						name: '张三',
						phone: '13888888888',
						province: '北京市',
						city: '北京市',
						district: '朝阳区',
						detail: '国贸中心A座1008室',
						isDefault: true
					},
					{
						id: 2,
						name: '李四',
						phone: '13999999999',
						province: '上海市',
						city: '上海市',
						district: '浦东新区',
						detail: '陆家嘴金融中心',
						isDefault: false
					}
				],
				favoriteList: [
					{
						id: 1,
						name: '生椰拿铁',
						image: '/static/products/latte1.jpg',
						price: '27.00',
						originalPrice: '32.00',
						category: '咖啡',
						description: '香浓椰浆遇见意式浓缩',
						addTime: '2024-01-01'
					},
					{
						id: 2,
						name: '陨石拿铁',
						image: '/static/products/latte2.jpg',
						price: '29.00',
						category: '咖啡',
						description: '黑巧克力与咖啡的完美融合',
						addTime: '2023-12-28'
					}
				],
				tabBarList: [
					{
						id: 'home',
						text: '首页',
						icon: 'home',
						pagePath: '/pages/luckin-home/luckin-home'
					},
					{
						id: 'menu',
						text: '点餐',
						icon: 'shop',
						pagePath: '/pages/menu/index'
					},
					{
						id: 'order',
						text: '订单',
						icon: 'list',
						pagePath: '/pages/order/list'
					},
					{
						id: 'member',
						text: '会员',
						icon: 'person',
						pagePath: '/pages/member/center'
					},
					{
						id: 'profile',
						text: '我的',
						icon: 'person-filled',
						pagePath: '/pages/profile/index'
					}
				]
			}
		},
		methods: {
			// 账户管理相关方法
			onAvatarChange(avatar) {
				console.log('头像变更:', avatar)
				this.accountData.avatar = avatar
			},
			onNicknameChange(nickname) {
				console.log('昵称变更:', nickname)
				this.accountData.nickname = nickname
			},
			onPasswordChange() {
				console.log('密码变更')
				uni.showToast({
					title: '密码修改成功',
					icon: 'success'
				})
			},
			onBiometricToggle(enabled) {
				console.log('生物识别切换:', enabled)
			},
			
			// 地址管理相关方法
			onAddAddress() {
				uni.navigateTo({
					url: '/pages/address/add'
				})
			},
			onEditAddress(address) {
				uni.navigateTo({
					url: `/pages/address/edit?id=${address.id}`
				})
			},
			onDeleteAddress(address) {
				uni.showModal({
					title: '确认删除',
					content: '确定要删除这个地址吗？',
					success: (res) => {
						if (res.confirm) {
							const index = this.addressList.findIndex(item => item.id === address.id)
							if (index > -1) {
								this.addressList.splice(index, 1)
							}
							uni.showToast({
								title: '地址已删除',
								icon: 'success'
							})
						}
					}
				})
			},
			onSetDefaultAddress(address) {
				this.addressList.forEach(item => {
					item.isDefault = item.id === address.id
				})
				uni.showToast({
					title: '已设为默认地址',
					icon: 'success'
				})
			},
			
			// 收藏管理相关方法
			onRemoveFavorite(product) {
				const index = this.favoriteList.findIndex(item => item.id === product.id)
				if (index > -1) {
					this.favoriteList.splice(index, 1)
				}
				uni.showToast({
					title: '已取消收藏',
					icon: 'success'
				})
			},
			onViewProduct(product) {
				uni.navigateTo({
					url: `/pages/product/detail?id=${product.id}`
				})
			},
			onFavoriteItemClick(product) {
				this.onViewProduct(product)
			},
			
			// 客服相关方法
			onOnlineService() {
				uni.showToast({
					title: '正在连接客服...',
					icon: 'loading'
				})
			},
			onPhoneCall() {
				uni.makePhoneCall({
					phoneNumber: '400-123-4567'
				})
			},
			
			// 导航相关
			onTabChange(tab) {
				if (tab.item.pagePath) {
					uni.switchTab({
						url: tab.item.pagePath
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.profile-page {
		background-color: #f5f5f5;
		min-height: 100vh;
		padding-bottom: 100rpx;
	}
	
	.profile-section {
		margin-bottom: 20rpx;
		background-color: #ffffff;
		
		&:last-child {
			margin-bottom: 0;
		}
	}
</style> 