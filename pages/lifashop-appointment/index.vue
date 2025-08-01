<template>
  <page-skeleton 
    title="在线预约" 
    :show-header="true"
    :show-back="true"
    @back="onBack"
  >
    <view class="lifashop-appointment">
      <appointment-system
        title="理发预约"
        subtitle="请选择您的预约时间和发型师"
        :appointment-slots="appointmentSlots"
        :show-my-appointments="true"
        :my-appointments="myAppointments"
        @appointmentSuccess="onAppointmentSuccess"
        @appointmentCancel="onAppointmentCancel"
      />
    </view>
  </page-skeleton>
</template>

<script>
import PageSkeleton from '@/components/page-skeleton/page-skeleton.vue'
import AppointmentSystem from '@/components/appointment-system/appointment-system.vue'

export default {
  name: 'LifashopAppointment',
  components: {
    PageSkeleton,
    AppointmentSystem
  },
  data() {
    return {
      appointmentSlots: [
        {
          date: '2024-01-15',
          available: true,
          slots: [
            { time: '09:00', available: 3, stylist: 'Tony老师' },
            { time: '10:00', available: 2, stylist: 'Kevin' },
            { time: '11:00', available: 1, stylist: 'Amy' },
            { time: '14:00', available: 4, stylist: 'David' },
            { time: '15:00', available: 2, stylist: 'Tony老师' },
            { time: '16:00', available: 3, stylist: 'Kevin' }
          ]
        },
        {
          date: '2024-01-16',
          available: true,
          slots: [
            { time: '09:00', available: 2, stylist: 'Amy' },
            { time: '10:00', available: 3, stylist: 'David' },
            { time: '11:00', available: 1, stylist: 'Tony老师' },
            { time: '14:00', available: 2, stylist: 'Kevin' },
            { time: '15:00', available: 4, stylist: 'Amy' },
            { time: '16:00', available: 1, stylist: 'David' }
          ]
        },
        {
          date: '2024-01-17',
          available: true,
          slots: [
            { time: '09:00', available: 3, stylist: 'Kevin' },
            { time: '10:00', available: 2, stylist: 'Tony老师' },
            { time: '11:00', available: 4, stylist: 'Amy' },
            { time: '14:00', available: 1, stylist: 'David' },
            { time: '15:00', available: 3, stylist: 'Kevin' },
            { time: '16:00', available: 2, stylist: 'Tony老师' }
          ]
        }
      ],
      myAppointments: [
        {
          id: 1,
          date: '2024-01-12',
          time: '14:00',
          stylist: 'Tony老师',
          service: '精致洗剪吹',
          status: 'confirmed',
          phone: '138****8888'
        },
        {
          id: 2,
          date: '2024-01-08',
          time: '10:00',
          stylist: 'Kevin',
          service: '时尚烫发',
          status: 'completed',
          phone: '138****8888'
        }
      ]
    }
  },
  onLoad(options) {
    // 如果从其他页面传入了发型师或服务ID，可以预选
    if (options.stylistId) {
      this.preselectStylist(options.stylistId)
    }
    if (options.serviceId) {
      this.preselectService(options.serviceId)
    }
  },
  methods: {
    onBack() {
      uni.navigateBack()
    },
    onAppointmentSuccess(appointmentData) {
      console.log('预约成功:', appointmentData)
      uni.showToast({
        title: '预约成功',
        icon: 'success'
      })
      
      // 可以跳转到预约确认页面或返回首页
      setTimeout(() => {
        uni.navigateTo({
          url: '/pages/lifashop-appointment/success'
        })
      }, 1500)
    },
    onAppointmentCancel(appointmentId) {
      console.log('取消预约:', appointmentId)
      uni.showModal({
        title: '确认取消',
        content: '确定要取消这个预约吗？',
        success: (res) => {
          if (res.confirm) {
            // 处理取消预约的逻辑
            this.cancelAppointment(appointmentId)
          }
        }
      })
    },
    preselectStylist(stylistId) {
      // 根据传入的发型师ID预选发型师
      console.log('预选发型师:', stylistId)
    },
    preselectService(serviceId) {
      // 根据传入的服务ID预选服务
      console.log('预选服务:', serviceId)
    },
    cancelAppointment(appointmentId) {
      // 取消预约的API调用
      const index = this.myAppointments.findIndex(item => item.id === appointmentId)
      if (index !== -1) {
        this.myAppointments[index].status = 'cancelled'
        uni.showToast({
          title: '预约已取消',
          icon: 'success'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.lifashop-appointment {
  padding: 24rpx;
}
</style>