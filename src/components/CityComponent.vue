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
      locationWatcherID: -1,
      allowRelocate: false
    }
  },
  mounted () {
    this.getLocationPos()
  },
  unmounted () {
    navigator.geolocation.clearWatch(this.locationWatcherID)
  },
  methods: {
    relocate () {
      if (this.allowRelocate) {
        navigator.geolocation.clearWatch(this.locationWatcherID)
        this.getLocationPos()
      }
    },
    getLocationPos () {
      this.cityName = '正在获取城市...'
      this.allowRelocate = false
      const that = this
      setTimeout(() => {
        that.locationWatcherID = navigator.geolocation.watchPosition((pos) => {
          console.log('yes: ' + pos)
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
          that.allowRelocate = true
          that.cityName = '获取位置失败'
          that.$message({
            message: '无法获取当前位置。' + `[${err.code}]: ${errNameMap[err.code]}`,
            type: 'error',
            duration: 10000,
            showClose: true
          })
        }, {
          enableHighAccuracy: false,
          timeout: 1000
        })
      }, 0)
    },
    onLocationDetected (pos) {
      if (this.geolocationTimeStamp > pos.timestamp) {
        return
      }
      this.allowRelocate = true
      this.geolocationTimeStamp = pos.timestamp
      this.$store.commit('setLocationPos', pos.coords)
      const that = this

      createGetAPICall('https://geoapi.qweather.com/v2/city/lookup', {
        location: String(pos.coords.longitude) + ',' + String(pos.coords.latitude),
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
