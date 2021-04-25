<template>
  <div class="city-component" @click="relocate">
    {{ cityName }}
  </div>
</template>

<script>
import { createGetAPICall } from '@/API'

export default {
  name: 'CityComponent',
  data () {
    return {
      cityName: '未知城市',
      geolocationTimeStamp: 0,
      allowRelocate: true
    }
  },
  mounted () {
    if (this.$store.state.location === '') {
      this.allowRelocate = false
      this.getLocationPos()
    } else if (this.$store.state.cityInfo === null) {
      this.getCityInfo()
    } else {
      this.cityName = this.$store.state.cityInfo.name
    }
  },
  unmounted () {
  },
  methods: {
    relocate () {
      if (this.allowRelocate) {
        this.getLocationPos()
      }
    },
    getLocationPos () {
      this.cityName = '正在获取城市...'
      this.allowRelocate = false
      const that = this
      setTimeout(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
          console.log('yes: ')
          console.log(pos)
          try {
            this.onLocationDetected(pos)
          } catch (err) {
            console.error(err)
          }
        }, (err) => {
          const errNameMap = {
            1: '位置服务拒绝',
            2: '获取不到位置信息',
            3: '超时',
            4: '未知错误'
          }
          console.error('Can\'t get the location: ')
          console.error(err.code)
          that.cityName = '尝试基于IP获取城市...'
          that.$message({
            message: '无法通过位置服务获取当前位置。' + `[${err.code}]: ${errNameMap[err.code]}`,
            type: 'warning',
            duration: 3000
          })
          that.getCityNameByIP()
        }, {
          enableHighAccuracy: false,
          timeout: 10000
        })
      }, 0)
    },
    onLocationDetected (pos) {
      if (this.geolocationTimeStamp > pos.timestamp) {
        return
      }
      this.allowRelocate = true
      this.geolocationTimeStamp = pos.timestamp
      this.$store.commit('setLocation', String(pos.coords.longitude) + ',' + String(pos.coords.latitude))
      this.getCityInfo()
    },
    getCityNameByIP () {
      const that = this
      createGetAPICall('https://mc.raiix.com:8082/api/v1/mycity').then((res) => {
        console.log('ip: ')
        console.log(res)
        this.allowRelocate = true
        that.$store.commit('setLocation', res.locationID)
        that.getCityInfo()
      }).catch((err) => {
        console.error(err)
        that.$message({
          message: '无法通过IP获取城市信息。' + err,
          type: 'error',
          duration: 10000,
          showClose: true
        })
        that.allowRelocate = true
        that.cityName = '获取位置失败'
      })
    },
    getCityInfo () {
      const that = this
      createGetAPICall('https://geoapi.qweather.com/v2/city/lookup', {
        location: this.$store.state.location,
        key: this.$store.state.key
      }).then((res) => {
        if (res.location.length > 0) {
          that.cityName = res.location[0].name
          that.$store.commit('setCityInfo', res.location[0])
        } else {
          console.error('Unkown location.')
          that.$message({
            message: '当前位置不知道是哪。',
            type: 'warning',
            duration: 10000,
            showClose: true
          })
          that.cityName = '未知城市'
          that.$store.commit('clearCityInfo')
        }
      }).catch((err) => {
        console.error('Fail to get city info.' + err)
        that.$message({
          message: '无法获取当前城市信息。' + err,
          type: 'error',
          duration: 10000,
          showClose: true
        })
        that.cityName = '未知城市'
      })
    }
  }
}
</script>

<style scoped>
.city-component{
  font-size: 24pt;
}
</style>
