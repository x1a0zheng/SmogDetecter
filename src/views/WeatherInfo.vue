<template >
  <div class="containor">
    <div class="title">
      <button class="back-btn" @click="returnHome">返回</button>
      <h2 class="title-text">未来3天天气变化</h2>
    </div>
    <div id="weatherGraph" ref="weatherGraph" :style="{width : '100%', height: '60vh'}"></div>
    <weather-info-plugin class="plugin" v-bind:weatherData="info"></weather-info-plugin>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { createGetAPICall } from '@/API'

import WeatherInfoPlugin from '@/components/WeatherInfoPlugin.vue'

export default {
  name: 'WeatherInfo',
  data () {
    return {
      dataIndex: 0,
      info: null,
      infoData: []
    }
  },
  components: {
    'weather-info-plugin': WeatherInfoPlugin
  },
  methods: {
    returnHome () {
      this.$router.push('/')
    },
    getWeatherData () {
      console.log(this.$store.state.key, this.$store.state.location)
      const pos = this.$store.state.location
      return createGetAPICall('https://devapi.qweather.com/v7/weather/3d', {
        key: this.$store.state.key,
        location: pos
      })
    },
    changeTempInfo (event) {
      if (event.batch) {
        this.dataIndex = event.batch[0].dataIndex
        this.info = this.infoData[event.batch[0].dataIndex]
      }
    }
  },
  mounted () {
    const req = this.getWeatherData()
    req.then(res => {
      console.log(res)
      this.infoData = res.daily
      this.info = this.infoData[0]
      const maxTemp = []; const minTemp = []
      for (const item of res.daily) {
        maxTemp.push(parseInt(item.tempMax))
        minTemp.push(parseInt(item.tempMin))
      }
      const weatherGraph = this.$refs.weatherGraph
      // const weatherGraph = document.getElementById('weatherGraph')
      const chart = echarts.init(weatherGraph)
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['最高气温', '最低气温']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['今天', '明天', '后天']
        },
        yAxis: {
          type: 'value',
          max: function (value) {
            return value.max + 2
          },
          min: function (value) {
            return value.min - 2
          },
          axisLabel: {
            formatter: '{value} °C'
          }
        },
        series: [
          {
            name: '最高气温',
            type: 'line',
            data: maxTemp,
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
          {
            name: '最低气温',
            type: 'line',
            data: minTemp,
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          }
        ]
      }
      chart.setOption(option)
      chart.on('highlight', 'series', this.changeTempInfo)
    })
  }
}
</script>

<style scoped>
.containor {
  overflow: auto;
}
.plugin {
  height: 30vh;
  overflow: auto;
}
.title {
  height: 10vh;
  text-align: center;
  display: flow-root;
}
.back-btn {
  float: left;
  margin-left: 1rem;
  margin-top: 20px;
  height: 30px;
  background-color: #0876e4;
  color: white;
  border-radius: 3px;
}
</style>
