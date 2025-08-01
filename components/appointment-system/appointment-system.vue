<template>
	<view class="appointment-system">
		<!-- 预约标题 -->
		<view class="appointment-header">
			<view class="header-title">
				<text class="title-text">{{ title }}</text>
			</view>
			<view v-if="subtitle" class="header-subtitle">
				<text class="subtitle-text">{{ subtitle }}</text>
			</view>
		</view>
		
		<!-- 日期选择器 -->
		<view class="appointment-calendar">
			<view class="calendar-header">
				<view class="calendar-nav" @click="previousMonth">
					<uni-icons type="left" size="20" color="#666"></uni-icons>
				</view>
				<view class="calendar-title">
					<text class="calendar-month">{{ currentMonthText }}</text>
				</view>
				<view class="calendar-nav" @click="nextMonth">
					<uni-icons type="right" size="20" color="#666"></uni-icons>
				</view>
			</view>
			
			<!-- 星期标题 -->
			<view class="calendar-weekdays">
				<view 
					v-for="(day, index) in weekdays" 
					:key="`weekday-${index}`"
					class="weekday"
				>
					<text class="weekday-text">{{ day }}</text>
				</view>
			</view>
			
			<!-- 日期网格 -->
			<view class="calendar-days">
				<view 
					v-for="(day, index) in calendarDays" 
					:key="`day-${index}-${day.dateString || 'empty'}`"
					class="calendar-day"
					:class="getDayClasses(day)"
					@click="selectDate(day)"
				>
					<text class="day-text">{{ day.day }}</text>
					<view v-if="day.available && !day.disabled" class="day-status">
						<text class="status-text">{{ day.availableSlots }}个空位</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 时间段选择 -->
		<view v-if="selectedDate" class="appointment-slots">
			<view class="slots-title">
				<text class="slots-title-text">选择时间段</text>
				<text class="slots-date">{{ selectedDateText }}</text>
			</view>
			
			<view class="slots-list">
				<view 
					v-for="slot in availableSlots" 
					:key="`slot-${slot.startTime}-${slot.endTime}`"
					class="slot-item"
					:class="getSlotClasses(slot)"
					@click="selectSlot(slot)"
				>
					<view class="slot-time">
						<text class="time-text">{{ slot.startTime }} - {{ slot.endTime }}</text>
					</view>
					<view class="slot-info">
						<text class="info-text" v-if="slot.remainingCount > 0">
							剩余{{ slot.remainingCount }}个名额
						</text>
						<text class="info-text info-text--full" v-else>
							已满
						</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 预约信息填写 -->
		<view v-if="selectedSlot" class="appointment-form">
			<view class="form-title">
				<text class="form-title-text">预约信息</text>
			</view>
			
			<view class="form-group">
				<text class="form-label">姓名 <text class="required">*</text></text>
				<input 
					class="form-input" 
					placeholder="请输入您的姓名" 
					v-model="appointmentForm.name"
					:disabled="submitting"
					maxlength="20"
				/>
			</view>
			
			<view class="form-group">
				<text class="form-label">手机号 <text class="required">*</text></text>
				<input 
					class="form-input" 
					placeholder="请输入手机号码" 
					v-model="appointmentForm.phone"
					type="number"
					:disabled="submitting"
					maxlength="11"
				/>
			</view>
			
			<view class="form-group">
				<text class="form-label">备注（可选）</text>
				<textarea 
					class="form-textarea" 
					placeholder="请输入备注信息" 
					v-model="appointmentForm.remark"
					:disabled="submitting"
					maxlength="200"
				/>
			</view>
			
			<!-- 预约确认 -->
			<view class="appointment-confirm">
				<view class="confirm-info">
					<text class="confirm-text">
						预约时间：{{ selectedDateText }} {{ selectedSlot.startTime }}-{{ selectedSlot.endTime }}
					</text>
				</view>
				
				<view class="confirm-actions">
					<button 
						class="confirm-btn confirm-btn--cancel" 
						@click="cancelAppointment"
						:disabled="submitting"
					>
						取消
					</button>
					<button 
						class="confirm-btn confirm-btn--submit" 
						@click="submitAppointment"
						:disabled="!isFormValid || submitting"
						:loading="submitting"
					>
						{{ submitting ? '提交中...' : '确认预约' }}
					</button>
				</view>
			</view>
		</view>
		
		<!-- 我的预约列表 -->
		<view v-if="showMyAppointments && myAppointments.length > 0" class="my-appointments">
			<view class="appointments-title">
				<text class="appointments-title-text">我的预约</text>
			</view>
			
			<view class="appointments-list">
				<view 
					v-for="(appointment, index) in myAppointments" 
					:key="`appointment-${appointment.id || index}`"
					class="appointment-item"
					:class="`appointment-item--${appointment.status}`"
				>
					<view class="appointment-info">
						<view class="appointment-time">
							<text class="time-info">
								{{ appointment.date }} {{ appointment.startTime }}-{{ appointment.endTime }}
							</text>
						</view>
						<view class="appointment-details">
							<text class="detail-text">预约人：{{ appointment.name }}</text>
							<text class="detail-text">手机号：{{ appointment.phone }}</text>
							<text v-if="appointment.remark" class="detail-text">
								备注：{{ appointment.remark }}
							</text>
						</view>
					</view>
					
					<view class="appointment-status">
						<text class="status-badge" :class="`status-badge--${appointment.status}`">
							{{ getStatusText(appointment.status) }}
						</text>
					</view>
					
					<view v-if="appointment.status === 'confirmed'" class="appointment-actions">
						<button 
							class="action-btn action-btn--cancel" 
							@click="cancelMyAppointment(appointment)"
							:disabled="appointment.canceling"
						>
							{{ appointment.canceling ? '取消中...' : '取消预约' }}
						</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * AppointmentSystem 在线预约系统组件
	 * @description 支持预约排期查看、预约成功和取消等功能的完整预约系统
	 * @property {String} title 组件标题
	 * @property {String} subtitle 组件副标题
	 * @property {Array} appointmentSlots 可预约时间段配置
	 * @property {Boolean} showMyAppointments 是否显示我的预约列表
	 * @property {Array} myAppointments 我的预约列表数据
	 * @event {Function} appointmentSuccess 预约成功回调
	 * @event {Function} appointmentCancel 取消预约回调
	 * @event {Function} dateSelect 日期选择回调
	 * @event {Function} slotSelect 时间段选择回调
	 */
	export default {
		name: 'AppointmentSystem',
		emits: ['appointmentSuccess', 'appointmentCancel', 'dateSelect', 'slotSelect'],
		props: {
			// 组件标题
			title: {
				type: String,
				default: '在线预约'
			},
			// 组件副标题
			subtitle: {
				type: String,
				default: '请选择预约时间'
			},
			// 可预约时间段配置
			appointmentSlots: {
				type: Array,
				default: () => [
					{ startTime: '09:00', endTime: '10:00', maxCount: 5 },
					{ startTime: '10:00', endTime: '11:00', maxCount: 5 },
					{ startTime: '11:00', endTime: '12:00', maxCount: 3 },
					{ startTime: '14:00', endTime: '15:00', maxCount: 5 },
					{ startTime: '15:00', endTime: '16:00', maxCount: 5 },
					{ startTime: '16:00', endTime: '17:00', maxCount: 3 },
					{ startTime: '17:00', endTime: '18:00', maxCount: 2 }
				],
				validator: (value) => {
					return Array.isArray(value) && value.every(slot => 
						slot.startTime && slot.endTime && typeof slot.maxCount === 'number'
					)
				}
			},
			// 是否显示我的预约列表
			showMyAppointments: {
				type: Boolean,
				default: true
			},
			// 我的预约列表数据
			myAppointments: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				// 当前月份
				currentDate: new Date(),
				// 选中的日期
				selectedDate: null,
				// 选中的时间段
				selectedSlot: null,
				// 预约表单数据
				appointmentForm: {
					name: '',
					phone: '',
					remark: ''
				},
				// 是否正在提交
				submitting: false,
				// 星期标题
				weekdays: ['日', '一', '二', '三', '四', '五', '六'],
				// 模拟预约数据（实际项目中应该从后端获取）
				appointmentsData: this.initAppointmentsData()
			}
		},
		computed: {
			// 当前月份文本
			currentMonthText() {
				const year = this.currentDate.getFullYear();
				const month = this.currentDate.getMonth() + 1;
				return `${year}年${month}月`;
			},
			// 选中日期文本
			selectedDateText() {
				if (!this.selectedDate) return '';
				const year = this.selectedDate.getFullYear();
				const month = this.selectedDate.getMonth() + 1;
				const day = this.selectedDate.getDate();
				return `${year}年${month}月${day}日`;
			},
			// 日历天数数组
			calendarDays() {
				const year = this.currentDate.getFullYear();
				const month = this.currentDate.getMonth();
				const firstDay = new Date(year, month, 1);
				const lastDay = new Date(year, month + 1, 0);
				const firstDayWeek = firstDay.getDay();
				
				const days = [];
				const today = new Date();
				today.setHours(0, 0, 0, 0); // 确保只比较日期
				
				// 添加上个月的日期（空白）
				for (let i = 0; i < firstDayWeek; i++) {
					days.push({ day: '', disabled: true });
				}
				
				// 添加当月的日期
				for (let day = 1; day <= lastDay.getDate(); day++) {
					const currentDate = new Date(year, month, day);
					const dateString = this.formatDate(currentDate);
					const isToday = this.isSameDay(currentDate, today);
					const isPast = currentDate < today && !isToday;
					const availableSlots = this.getAvailableSlotsCount(dateString);
					
					days.push({
						day,
						date: currentDate,
						dateString,
						isToday,
						disabled: isPast,
						available: availableSlots > 0,
						availableSlots,
						selected: this.selectedDate && this.isSameDay(currentDate, this.selectedDate)
					});
				}
				
				return days;
			},
			// 可用时间段
			availableSlots() {
				if (!this.selectedDate) return [];
				
				const dateString = this.formatDate(this.selectedDate);
				const dayData = this.appointmentsData[dateString] || {};
				
							return this.appointmentSlots.map(slot => {
				const slotKey = `${slot.startTime}-${slot.endTime}`;
				const bookedCount = (dayData[slotKey] && dayData[slotKey].bookedCount) || 0;
				const remainingCount = slot.maxCount - bookedCount;
					
					return {
						...slot,
						bookedCount,
						remainingCount,
						disabled: remainingCount <= 0,
						selected: this.selectedSlot && 
							this.selectedSlot.startTime === slot.startTime && 
							this.selectedSlot.endTime === slot.endTime
					};
				});
			},
			// 表单是否有效
			isFormValid() {
				const { name, phone } = this.appointmentForm;
				const phoneRegex = /^1[3-9]\d{9}$/;
				return name.trim().length >= 2 && 
					   phone.trim().length === 11 && 
					   phoneRegex.test(phone.trim());
			}
		},
		methods: {
			// 初始化预约数据
			initAppointmentsData() {
				// 模拟数据，实际项目中从 API 获取
				return {
					'2024-12-15': {
						'09:00-10:00': { bookedCount: 2 },
						'10:00-11:00': { bookedCount: 1 },
						'14:00-15:00': { bookedCount: 4 },
						'15:00-16:00': { bookedCount: 3 }
					},
					'2024-12-16': {
						'09:00-10:00': { bookedCount: 5 },
						'11:00-12:00': { bookedCount: 2 },
						'16:00-17:00': { bookedCount: 1 }
					}
				};
			},
			
			// 获取日期样式类
			getDayClasses(day) {
				return {
					'calendar-day--disabled': day.disabled,
					'calendar-day--selected': day.selected,
					'calendar-day--today': day.isToday,
					'calendar-day--available': day.available && !day.disabled
				};
			},
			
			// 获取时间段样式类
			getSlotClasses(slot) {
				return {
					'slot-item--selected': slot.selected,
					'slot-item--disabled': slot.disabled,
					'slot-item--full': slot.remainingCount === 0
				};
			},
			
			// 上一个月
			previousMonth() {
				const newDate = new Date(this.currentDate);
				newDate.setMonth(newDate.getMonth() - 1);
				this.currentDate = newDate;
				this.resetSelection();
			},
			
			// 下一个月
			nextMonth() {
				const newDate = new Date(this.currentDate);
				newDate.setMonth(newDate.getMonth() + 1);
				this.currentDate = newDate;
				this.resetSelection();
			},
			
			// 重置选择状态
			resetSelection() {
				this.selectedDate = null;
				this.selectedSlot = null;
			},
			
			// 选择日期
			selectDate(day) {
				if (day.disabled || !day.available) return;
				
				this.selectedDate = day.date;
				this.selectedSlot = null;
				this.$emit('dateSelect', day.date);
			},
			
			// 选择时间段
			selectSlot(slot) {
				if (slot.disabled) return;
				
				this.selectedSlot = slot;
				this.$emit('slotSelect', slot);
			},
			
			// 取消预约
			cancelAppointment() {
				this.resetSelection();
				this.resetAppointmentForm();
			},
			
			// 重置预约表单
			resetAppointmentForm() {
				this.appointmentForm = {
					name: '',
					phone: '',
					remark: ''
				};
			},
			
			// 提交预约
			async submitAppointment() {
				if (!this.isFormValid || this.submitting) return;
				
				this.submitting = true;
				
				try {
					// 模拟API调用
					await this.delay(1500);
					
					// 创建预约数据
					const appointmentData = {
						id: Date.now(),
						date: this.formatDate(this.selectedDate),
						startTime: this.selectedSlot.startTime,
						endTime: this.selectedSlot.endTime,
						name: this.appointmentForm.name.trim(),
						phone: this.appointmentForm.phone.trim(),
						remark: this.appointmentForm.remark.trim(),
						status: 'confirmed',
						createTime: new Date().toISOString()
					};
					
					// 更新预约数据
					this.updateAppointmentData(appointmentData);
					
					// 显示成功提示
					uni.showToast({
						title: '预约成功！',
						icon: 'success',
						duration: 2000
					});
					
					// 触发成功回调
					this.$emit('appointmentSuccess', appointmentData);
					
					// 重置表单
					this.resetForm();
					
				} catch (error) {
					console.error('预约失败:', error);
					uni.showToast({
						title: '预约失败，请重试',
						icon: 'error'
					});
				} finally {
					this.submitting = false;
				}
			},
			
			// 取消我的预约
			async cancelMyAppointment(appointment) {
				const result = await this.showConfirmDialog('确认取消', '确定要取消这个预约吗？');
				if (!result) return;
				
				appointment.canceling = true;
				
				try {
					// 模拟API调用
					await this.delay(1000);
					
					// 更新预约状态
					appointment.status = 'cancelled';
					appointment.canceling = false;
					
					// 更新预约数据（释放名额）
					this.releaseSlot(appointment);
					
					uni.showToast({
						title: '取消成功！',
						icon: 'success'
					});
					
					this.$emit('appointmentCancel', appointment);
					
				} catch (error) {
					appointment.canceling = false;
					console.error('取消预约失败:', error);
					uni.showToast({
						title: '取消失败，请重试',
						icon: 'error'
					});
				}
			},
			
			// 显示确认对话框
			showConfirmDialog(title, content) {
				return new Promise((resolve) => {
					uni.showModal({
						title,
						content,
						success: (res) => resolve(res.confirm)
					});
				});
			},
			
			// 释放时间段
			releaseSlot(appointment) {
				const dateString = appointment.date;
				const slotKey = `${appointment.startTime}-${appointment.endTime}`;
				
				if (this.appointmentsData[dateString] && this.appointmentsData[dateString][slotKey]) {
					this.appointmentsData[dateString][slotKey].bookedCount = 
						Math.max(0, this.appointmentsData[dateString][slotKey].bookedCount - 1);
				}
			},
			
			// 格式化日期
			formatDate(date) {
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const day = String(date.getDate()).padStart(2, '0');
				return `${year}-${month}-${day}`;
			},
			
			// 判断是否同一天
			isSameDay(date1, date2) {
				return date1.getFullYear() === date2.getFullYear() &&
					   date1.getMonth() === date2.getMonth() &&
					   date1.getDate() === date2.getDate();
			},
			
			// 获取指定日期的可用时间段数量
			getAvailableSlotsCount(dateString) {
				const dayData = this.appointmentsData[dateString] || {};
				let availableCount = 0;
				
				this.appointmentSlots.forEach(slot => {
					const slotKey = `${slot.startTime}-${slot.endTime}`;
					const bookedCount = (dayData[slotKey] && dayData[slotKey].bookedCount) || 0;
					const remainingCount = slot.maxCount - bookedCount;
					if (remainingCount > 0) {
						availableCount += remainingCount;
					}
				});
				
				return availableCount;
			},
			
			// 更新预约数据
			updateAppointmentData(appointmentData) {
				const dateString = appointmentData.date;
				const slotKey = `${appointmentData.startTime}-${appointmentData.endTime}`;
				
				if (!this.appointmentsData[dateString]) {
					this.appointmentsData[dateString] = {};
				}
				
				if (!this.appointmentsData[dateString][slotKey]) {
					this.appointmentsData[dateString][slotKey] = { bookedCount: 0 };
				}
				
				this.appointmentsData[dateString][slotKey].bookedCount += 1;
			},
			
			// 重置表单
			resetForm() {
				this.resetSelection();
				this.resetAppointmentForm();
			},
			
			// 获取状态文本
			getStatusText(status) {
				const statusMap = {
					'confirmed': '已预约',
					'cancelled': '已取消',
					'completed': '已完成',
					'expired': '已过期'
				};
				return statusMap[status] || status;
			},
			
			// 延迟函数
			delay(ms) {
				return new Promise(resolve => setTimeout(resolve, ms));
			}
		}
	}
</script>

<style lang="scss" scoped>
	.appointment-system {
		background: #f8f9fa;
		border-radius: 16rpx;
		overflow: hidden;
	}
	
	.appointment-header {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		padding: 40rpx 30rpx;
		color: white;
		text-align: center;
	}
	
	.title-text {
		font-size: 36rpx;
		font-weight: 600;
	}
	
	.subtitle-text {
		font-size: 28rpx;
		opacity: 0.9;
		margin-top: 16rpx;
	}
	
	// 日历样式
	.appointment-calendar {
		background: white;
		margin: 20rpx;
		border-radius: 12rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
	}
	
	.calendar-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx;
		background: #f8f9fa;
		border-bottom: 1rpx solid #eee;
	}
	
	.calendar-nav {
		width: 60rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: white;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
		transition: all 0.2s ease;
		
		&:active {
			transform: scale(0.95);
		}
	}
	
	.calendar-month {
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
	}
	
	.calendar-weekdays {
		display: flex;
		background: #fafafa;
		padding: 20rpx 0;
	}
	
	.weekday {
		flex: 1;
		text-align: center;
	}
	
	.weekday-text {
		font-size: 28rpx;
		color: #666;
		font-weight: 500;
	}
	
	.calendar-days {
		display: flex;
		flex-wrap: wrap;
		padding: 0 15rpx 20rpx;
	}
	
	.calendar-day {
		width: calc(100% / 7);
		aspect-ratio: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		margin: 5rpx 0;
		border-radius: 12rpx;
		transition: all 0.2s ease;
		
		&--disabled {
			opacity: 0.3;
			pointer-events: none;
		}
		
		&--today {
			background: #e3f2fd;
			border: 2rpx solid #2196f3;
		}
		
		&--selected {
			background: #667eea;
			color: white;
			
			.day-status .status-text {
				color: rgba(255, 255, 255, 0.9);
			}
		}
		
		&--available:not(.calendar-day--selected) {
			background: #f0f8ff;
			border: 1rpx solid #e1f5fe;
			
			&:active {
				background: #e3f2fd;
				transform: scale(0.95);
			}
		}
	}
	
	.day-text {
		font-size: 28rpx;
		font-weight: 500;
		margin-bottom: 4rpx;
	}
	
	.day-status {
		position: absolute;
		bottom: 8rpx;
	}
	
	.status-text {
		font-size: 20rpx;
		color: #2196f3;
		background: rgba(33, 150, 243, 0.1);
		padding: 2rpx 8rpx;
		border-radius: 8rpx;
		white-space: nowrap;
	}
	
	// 时间段选择样式
	.appointment-slots {
		background: white;
		margin: 20rpx;
		border-radius: 12rpx;
		padding: 30rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
	}
	
	.slots-title {
		margin-bottom: 30rpx;
		text-align: center;
	}
	
	.slots-title-text {
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
		display: block;
		margin-bottom: 12rpx;
	}
	
	.slots-date {
		font-size: 28rpx;
		color: #667eea;
		font-weight: 500;
	}
	
	.slots-list {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20rpx;
	}
	
	.slot-item {
		padding: 24rpx;
		border: 2rpx solid #e0e0e0;
		border-radius: 12rpx;
		text-align: center;
		transition: all 0.2s ease;
		background: white;
		
		&--selected {
			border-color: #667eea;
			background: #667eea;
			color: white;
		}
		
		&--disabled,
		&--full {
			opacity: 0.5;
			pointer-events: none;
		}
		
		&:not(.slot-item--selected):not(.slot-item--disabled):not(.slot-item--full):active {
			border-color: #667eea;
			background: #f3f4ff;
			transform: scale(0.95);
		}
	}
	
	.time-text {
		font-size: 28rpx;
		font-weight: 600;
		display: block;
		margin-bottom: 8rpx;
	}
	
	.info-text {
		font-size: 24rpx;
		opacity: 0.8;
		
		&--full {
			color: #f44336;
		}
	}
	
	// 预约表单样式
	.appointment-form {
		background: white;
		margin: 20rpx;
		border-radius: 12rpx;
		padding: 30rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
	}
	
	.form-title-text {
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
		margin-bottom: 30rpx;
		text-align: center;
	}
	
	.form-group {
		margin-bottom: 30rpx;
	}
	
	.form-label {
		font-size: 28rpx;
		color: #333;
		font-weight: 500;
		display: block;
		margin-bottom: 16rpx;
	}
	
	.required {
		color: #f44336;
		font-weight: bold;
	}
	
	.form-input,
	.form-textarea {
		width: 100%;
		padding: 24rpx;
		border: 2rpx solid #e0e0e0;
		border-radius: 12rpx;
		font-size: 28rpx;
		background: #fafafa;
		box-sizing: border-box;
		transition: all 0.2s ease;
		
		&:focus {
			border-color: #667eea;
			background: white;
			outline: none;
		}
		
		&:disabled {
			opacity: 0.6;
			cursor: not-allowed;
		}
	}
	
	.form-textarea {
		min-height: 120rpx;
		resize: vertical;
	}
	
	// 预约确认样式
	.appointment-confirm {
		margin-top: 40rpx;
		padding-top: 30rpx;
		border-top: 1rpx solid #eee;
	}
	
	.confirm-info {
		background: #f3f4ff;
		padding: 24rpx;
		border-radius: 12rpx;
		margin-bottom: 30rpx;
		text-align: center;
	}
	
	.confirm-text {
		font-size: 28rpx;
		color: #667eea;
		font-weight: 500;
	}
	
	.confirm-actions {
		display: flex;
		gap: 20rpx;
	}
	
	.confirm-btn {
		flex: 1;
		height: 88rpx;
		border-radius: 44rpx;
		font-size: 28rpx;
		font-weight: 600;
		border: none;
		transition: all 0.2s ease;
		
		&--cancel {
			background: #f5f5f5;
			color: #666;
			
			&:active {
				background: #eeeeee;
			}
		}
		
		&--submit {
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			color: white;
			
			&:active {
				opacity: 0.9;
			}
		}
		
		&[disabled] {
			opacity: 0.6;
			cursor: not-allowed;
		}
	}
	
	// 我的预约样式
	.my-appointments {
		background: white;
		margin: 20rpx;
		border-radius: 12rpx;
		padding: 30rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
	}
	
	.appointments-title-text {
		font-size: 32rpx;
		font-weight: 600;
		color: #333;
		margin-bottom: 30rpx;
		text-align: center;
	}
	
	.appointment-item {
		padding: 30rpx;
		border: 1rpx solid #e0e0e0;
		border-radius: 12rpx;
		margin-bottom: 20rpx;
		position: relative;
		transition: all 0.2s ease;
		
		&:last-child {
			margin-bottom: 0;
		}
		
		&--confirmed {
			border-color: #4caf50;
			background: #f8fff8;
		}
		
		&--cancelled {
			border-color: #f44336;
			background: #fff5f5;
		}
		
		&:active {
			transform: translateY(-2rpx);
			box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
		}
	}
	
	.appointment-info {
		margin-bottom: 20rpx;
	}
	
	.time-info {
		font-size: 30rpx;
		font-weight: 600;
		color: #333;
		display: block;
		margin-bottom: 16rpx;
	}
	
	.detail-text {
		font-size: 26rpx;
		color: #666;
		display: block;
		margin-bottom: 8rpx;
	}
	
	.appointment-status {
		position: absolute;
		top: 30rpx;
		right: 30rpx;
	}
	
	.status-badge {
		font-size: 24rpx;
		padding: 8rpx 16rpx;
		border-radius: 20rpx;
		color: white;
		font-weight: 500;
		
		&--confirmed {
			background: #4caf50;
		}
		
		&--cancelled {
			background: #f44336;
		}
		
		&--completed {
			background: #2196f3;
		}
		
		&--expired {
			background: #9e9e9e;
		}
	}
	
	.appointment-actions {
		text-align: right;
	}
	
	.action-btn {
		padding: 16rpx 32rpx;
		border-radius: 24rpx;
		font-size: 26rpx;
		border: none;
		transition: all 0.2s ease;
		
		&--cancel {
			background: #ffebee;
			color: #f44336;
			
			&:active {
				background: #ffcdd2;
			}
		}
		
		&[disabled] {
			opacity: 0.6;
			cursor: not-allowed;
		}
	}
</style>