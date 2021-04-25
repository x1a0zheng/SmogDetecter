<template>
  <div class="home">
    <div class="background">
      <div class="gradient">
        <div class="main-container">
          <city-component> </city-component>

          <div class="middle-container">
            <div class="temperature-container">
              <div class="temperature-number"> {{ weather.feelsLike }} </div>
              <div class="temperature-sign"> ℃ </div>
            </div>
            <div class="middle-weather-container">
              <weather-icon :icon="weather.icon"></weather-icon>
              <div class="weather-text"> {{ weather.text }}</div>
            </div>
          </div>

          <div class="bottom-container">
            <div class="tody-aoi">空气指数{{ air.aqi }} {{ air.category }}</div>

            <div class="bottom-container-list">
              <future-weather-info-item v-for="item in futureInfo" :key="item"
                :text="item.text"
                :maxTemp="item.maxTemp"
                :minTemp="item.minTemp"
                :dayIcon="item.dayIcon"
                :nightIcon="item.nightIcon"
              >
              </future-weather-info-item>
            </div>

            <div class="info-button" @click="$router.push('/info')">天气详情</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CityComponent from '@/components/CityComponent.vue'
import { createGetAPICall } from '@/API'
import FutureWeatherInfoItem from '@/components/FutureWeatherInfoItem.vue'
import WeatherIcon from '@/components/WeatherIcon.vue'

export default {
  name: 'Home',
  components: {
    'city-component': CityComponent,
    'future-weather-info-item': FutureWeatherInfoItem,
    'weather-icon': WeatherIcon
  },
  data () {
    return {
      weather: {
        feelsLike: '13',
        text: '神秘天气'
      },
      air: {
        aqi: 3,
        category: '还行'
      },
      futureInfo: []
    }
  },
  computed: {
    locationPos () {
      return this.$store.state.location
    }
  },
  watch: {
    locationPos (pos) {
      if (pos != null) {
        this.getCurrentCityWeatherInfo(pos)
        this.getCurrentCityAirInfo(pos)
        this.getFutureInfo(pos)
      }
    }
  },
  methods: {
    getCurrentCityWeatherInfo (pos) {
      const that = this
      createGetAPICall('https://devapi.qweather.com/v7/weather/now', {
        key: this.$store.state.key,
        location: pos
      }).then((res) => {
        that.weather = res.now
      }).catch((err) => {
        console.error('Can\'t get current city weather info.' + err)
        that.$message({
          message: '无法获取当前的天气信息。' + err,
          type: 'error',
          duration: 10000,
          showClose: true
        })
        that.weather.feelsLike = 'NA'
        that.weather.text = 'Unknown'
      })
    },
    getCurrentCityAirInfo (pos) {
      const that = this
      createGetAPICall('https://devapi.qweather.com/v7/air/now', {
        key: this.$store.state.key,
        location: pos
      }).then((res) => {
        that.air = res.now
      }).catch((err) => {
        console.error('Can\'t get current city air info.' + err)
        that.$message({
          message: '无法获取当前空气质量信息。' + err,
          type: 'error',
          duration: 10000,
          showClose: true
        })
        that.air.aqi = 'NA'
        that.air.category = 'Unknown'
      })
    },
    dateToString (date) {
      var m = String(date.getMonth() + 1)
      if (m.length === 1) {
        m = '0' + m
      }
      var d = String(date.getDate())
      if (d.length === 1) {
        d = '0' + d
      }
      return date.getFullYear() + '-' + m + '-' + d
    },
    getFutureInfo (pos) {
      const date = new Date()
      const today = this.dateToString(date)

      date.setDate(date.getDate() + 1)
      const tomorror = this.dateToString(date)

      date.setDate(date.getDate() + 1)
      const theDayAfterTomorror = this.dateToString(date)

      const dateNameMap = {}
      dateNameMap[today] = '今天'
      dateNameMap[tomorror] = '明天'
      dateNameMap[theDayAfterTomorror] = '后天'

      const that = this
      createGetAPICall('https://devapi.qweather.com/v7/weather/3d', {
        key: this.$store.state.key,
        location: pos
      }).then((res) => {
        var info = []
        for (const i of res.daily) {
          info.push({
            text: dateNameMap[i.fxDate] + ' · ' + i.textDay + '/' + i.textNight,
            maxTemp: i.tempMax,
            minTemp: i.tempMin,
            dayIcon: i.iconDay,
            nightIcon: i.iconNight
          })
        }
        that.futureInfo = info
      }).catch((err) => {
        console.error('Can\'t get future weather info.' + err)
        that.$message({
          message: '无法获取未来天气预报信息。' + err,
          type: 'error',
          duration: 10000,
          showClose: true
        })
        that.futureInfo = []
      })
    }
  }
}
</script>

<style scoped>
.home{
  width: 100%;
  height: 100%;
  color: white;
  font-size: 12pt;
}
.background{
  width: 100%;
  height: 100%;
  background-image:url("../assets/bg.jpg");
  background-repeat:no-repeat;
  background-size:cover;
}

.gradient{
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, rgba(30,39,54,1), rgba(30,39,54,0.8), rgba(30,39,54,0.5));
  background-repeat:no-repeat;
  background-size:cover;
}

.main-container{
  margin-left: auto;
  margin-right: auto;
  max-width: 375pt;
  padding-top: 25px;
  padding-bottom: 25px;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.temperature-container{
  margin-top: -150px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.temperature-number{
  font-size: 100pt;
}

.temperature-sign{
  margin-top: 15px;
  font-size: 24pt;
}

.middle-weather-container{
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.tody-aoi{
  width: 100%;
  text-align: left;
  margin-left: 25px;
}

.bottom-container{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bottom-container-list{
  width: 100%;
  margin-top: 15px;
}

.info-button{
  margin-top: 35px;
  font-size: 16pt;
  width: 200pt;
  height: 50pt;
  line-height: 50pt;
  background: #686B73;
  border-radius: 50px;
}

.info-button:hover{
  cursor: pointer;
}

.info-button:active{
  background: #7f838c;
}
</style>
