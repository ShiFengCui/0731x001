<template>
	<view class="appointment-container">
		<!-- 服务选择区域 -->
		<view class="service-selection" v-if="!selectedService">
			<view class="section-title">
				<text class="title-text">选择服务项目</text>
				<text class="title-desc">请选择您需要的服务</text>
			</view>
			<product-list
				:product-list="servicesList"
				title=""
				layout="single"
				@product-click="onServiceSelect"
			/>
		</view>
		
		<!-- 理发师选择区域 -->
		<view class="barber-selection" v-else-if="!selectedBarber">
			<view class="selected-service">
				<view class="service-info">
					<text class="service-name">{{selectedService.name}}</text>
					<text class="service-price">{{selectedService.price}}</text>
				</view>
				<button class="change-btn" @click="changeService">更换</button>
			</view>
			
			<view class="section-title">
				<text class="title-text">选择理发师</text>
				<text class="title-desc">专业技师为您服务</text>
			</view>
			<product-list
				:product-list="barbersList"
				title=""
				layout="single"
				@product-click="onBarberSelect"
			/>
		</view>
		
		<!-- 预约系统 -->
		<view class="appointment-system" v-else>
			<view class="selected-info">
				<view class="info-row">
					<text class="label">服务项目：</text>
					<text class="value">{{selectedService.name}} ({{selectedService.price}})</text>
					<button class="change-btn" @click="changeService">更换</button>
				</view>
				<view class="info-row">
					<text class="label">理发师：</text>
					<text class="value">{{selectedBarber.name}} ({{selectedBarber.level}})</text>
					<button class="change-btn" @click="changeBarber">更换</button>
				</view>
			</view>
			
			<appointment-system
				:title="'预约 ' + selectedService.name"
				:subtitle="'理发师：' + selectedBarber.name"
				:appointment-slots="appointmentSlots"
				:show-my-appointments="true"
				:my-appointments="myAppointments"
				@appointmentSuccess="onAppointmentSuccess"
				@appointmentCancel="onAppointmentCancel"
			/>
		</view>
	</view>
</template>

<script>
import ProductList from '@/components/product-component/product-list.vue'
import AppointmentSystem from '@/components/appointment-system/appointment-system.vue'

export default {
	name: 'AppointmentPage',
	components: {
		ProductList,
		AppointmentSystem
	},
	data() {
		return {
			// 选中的服务和理发师
			selectedService: null,
			selectedBarber: null,
			
			// 服务项目数据
			servicesList: [
				{
					id: 1,
					name: '经典理发',
					image: '/static/services/haircut.png',
					description: '专业理发师精心设计，打造个性发型',
					price: '¥38',
					duration: 30,
					originalPrice: '¥48'
				},
				{
					id: 2,
					name: '时尚烫发',
					image: '/static/services/perm.png',
					description: '韩式烫发技术，塑造时尚卷发',
					price: '¥168',
					duration: 120,
					originalPrice: '¥198'
				},
				{
					id: 3,
					name: '个性染发',
					image: '/static/services/dye.png',
					description: '时尚色彩搭配，展现个性魅力',
					price: '¥128',
					duration: 90,
					originalPrice: '¥158'
				},
				{
					id: 4,
					name: '头发护理',
					image: '/static/services/care.png',
					description: '深层营养护理，恢复头发健康光泽',
					price: '¥88',
					duration: 45,
					originalPrice: '¥108'
				},
				{
					id: 5,
					name: '烫染套餐',
					image: '/static/services/combo.png',
					description: '烫发+染发组合，一次搞定造型',
					price: '¥268',
					duration: 180,
					originalPrice: '¥328',
					tag: '热门套餐'
				}
			],
			
			// 理发师数据
			barbersList: [
				{
					id: 1,
					name: '张师傅',
					image: '/static/barbers/zhang.jpg',
					level: '高级理发师',
					experience: '10年经验',
					specialties: ['经典理发', '商务发型'],
					rating: 4.8,
					price: '预约免费',
					description: '专业商务发型设计，经验丰富'
				},
				{
					id: 2,
					name: '李师傅',
					image: '/static/barbers/li.jpg',
					level: '首席设计师',
					experience: '8年经验',
					specialties: ['时尚烫发', '个性染发'],
					rating: 4.9,
					price: '预约免费',
					description: '时尚造型专家，烫染技术精湛'
				},
				{
					id: 3,
					name: '王师傅',
					image: '/static/barbers/wang.jpg',
					level: '资深理发师',
					experience: '12年经验',
					specialties: ['头发护理', '烫染套餐'],
					rating: 4.7,
					price: '预约免费',
					description: '护理专家，注重头发健康'
				}
			],
			
			// 预约时间段配置
			appointmentSlots: [
				{
					date: '2024-12-20',
					timeSlots: [
						{ time: '09:00', available: true, remaining: 2 },
						{ time: '10:00', available: true, remaining: 1 },
						{ time: '11:00', available: false, remaining: 0 },
						{ time: '14:00', available: true, remaining: 3 },
						{ time: '15:00', available: true, remaining: 2 },
						{ time: '16:00', available: true, remaining: 1 }
					]
				},
				{
					date: '2024-12-21',
					timeSlots: [
						{ time: '09:00', available: true, remaining: 3 },
						{ time: '10:00', available: true, remaining: 2 },
						{ time: '11:00', available: true, remaining: 1 },
						{ time: '14:00', available: true, remaining: 3 },
						{ time: '15:00', available: true, remaining: 2 },
						{ time: '16:00', available: false, remaining: 0 }
					]
				}
			],
			
			// 我的预约记录
			myAppointments: [
				{
					id: 'A202412001',
					service: '经典理发',
					barber: '张师傅',
					date: '2024-12-18',
					time: '14:00',
					status: 'completed',
					price: '¥38'
				},
				{
					id: 'A202412002',
					service: '时尚烫发',
					barber: '李师傅',
					date: '2024-12-22',
					time: '10:00',
					status: 'confirmed',
					price: '¥168'
				}
			]
		}
	},
	
	onLoad(options) {
		// 如果从首页跳转过来带了参数，直接选中对应的服务或理发师
		if (options.serviceId) {
			const service = this.servicesList.find(s => s.id == options.serviceId)
			if (service) {
				this.selectedService = service
			}
		}
		if (options.barberId) {
			const barber = this.barbersList.find(b => b.id == options.barberId)
			if (barber) {
				this.selectedBarber = barber
			}
		}
	},
	
	methods: {
		// 选择服务
		onServiceSelect(service) {
			console.log('选择服务：', service)
			this.selectedService = service
		},
		
		// 选择理发师
		onBarberSelect(barber) {
			console.log('选择理发师：', barber)
			this.selectedBarber = barber
		},
		
		// 更换服务
		changeService() {
			this.selectedService = null
			this.selectedBarber = null
		},
		
		// 更换理发师
		changeBarber() {
			this.selectedBarber = null
		},
		
		// 预约成功
		onAppointmentSuccess(appointmentData) {
			console.log('预约成功：', appointmentData)
			
			// 添加服务和理发师信息
			const fullAppointmentData = {
				...appointmentData,
				service: this.selectedService,
				barber: this.selectedBarber
			}
			
			uni.showToast({
				title: '预约成功！',
				icon: 'success'
			})
			
			// 跳转到订单页面
			setTimeout(() => {
				uni.switchTab({
					url: '/pages/orders/orders'
				})
			}, 1500)
		},
		
		// 取消预约
		onAppointmentCancel(appointmentId) {
			console.log('取消预约：', appointmentId)
			uni.showToast({
				title: '预约已取消',
				icon: 'success'
			})
			
			// 刷新我的预约数据
			this.myAppointments = this.myAppointments.filter(a => a.id !== appointmentId)
		}
	}
}
</script>

<style lang="scss" scoped>
.appointment-container {
	min-height: 100vh;
	background-color: #f8f8f8;
	padding: 20rpx;
}

.service-selection,
.barber-selection,
.appointment-system {
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.section-title {
	margin-bottom: 30rpx;
	text-align: center;
	
	.title-text {
		font-size: 36rpx;
		font-weight: bold;
		color: #8B4513;
		display: block;
		margin-bottom: 10rpx;
	}
	
	.title-desc {
		font-size: 28rpx;
		color: #999999;
		display: block;
	}
}

.selected-service,
.selected-info {
	background-color: #f9f9f9;
	border-radius: 12rpx;
	padding: 20rpx;
	margin-bottom: 30rpx;
	
	.service-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10rpx;
		
		.service-name {
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
		}
		
		.service-price {
			font-size: 32rpx;
			font-weight: bold;
			color: #8B4513;
		}
	}
	
	.info-row {
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
		
		.label {
			font-size: 28rpx;
			color: #666666;
			min-width: 120rpx;
		}
		
		.value {
			flex: 1;
			font-size: 28rpx;
			color: #333333;
			margin-right: 20rpx;
		}
	}
	
	.change-btn {
		background-color: #8B4513;
		color: #ffffff;
		border: none;
		border-radius: 8rpx;
		padding: 8rpx 16rpx;
		font-size: 24rpx;
		line-height: 1;
	}
}
</style>