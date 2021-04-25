<template>
  <div class="city-component">
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
      locationWatcherID: -1
    }
  },
  mounted () {
    this.getLocationPos()
  },
  unmounted () {
    navigator.geolocation.clearWatch(this.locationWatcherID)
  },
  methods: {
    getLocationPos () {
      const that = this
      this.locationWatcherID = navigator.geolocation.watchPosition(this.onLocationDetected, (err) => {
        console.error('Can\'t get the location: ')
        console.error(err)
        that.$message({
          message: '无法获取当前位置。' + err,
          type: 'error'
        })
      })
    },
    onLocationDetected (pos) {
      if (this.geolocationTimeStamp >= pos.timestamp) {
        return
      }
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
            type: 'warning'
          })
          that.$store.commit('clearCityInfo')
        }
      }).catch((err) => {
        console.error('Fail to get city info.' + err)
        that.$message({
          message: '无法获取当前城市信息。' + err,
          type: 'error'
        })
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
