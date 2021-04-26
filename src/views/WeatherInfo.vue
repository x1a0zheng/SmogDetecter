<template>
  <div class="weather-info">
    <div id="weatherGraph" ref="weatherGraph" :style="{width : '100%', height: '500px'}"></div>
  </div>
  <div>Loading....</div>
  <div>{{dataIndex}}</div>
</template>

<script>
import * as echarts from 'echarts'
import { createGetAPICall } from '@/API'

export default {
  name: 'WeatherInfo',
  data () {
    return {
      dataIndex: 0
    }
  },
  methods: {
    getWeatherData () {
      console.log(this.$store.state.key, this.$store.state.location)
      const pos = this.$store.state.location
      return createGetAPICall('https://devapi.qweather.com/v7/weather/3d', {
        key: this.$store.state.key,
        location: pos
      })
    },
    changeTempInfo (event) {
      if (event.componentType === 'series') {
        this.dataIndex = event.dataIndex
      }
    }
  },
  mounted () {
    const req = this.getWeatherData()
    req.then(res => {
      const maxTemp = []; const minTemp = []
      for (const item of res.daily) {
        maxTemp.push(parseInt(item.tempMax))
        minTemp.push(parseInt(item.tempMin))
      }
      const weatherGraph = this.$refs.weatherGraph
      const chart = echarts.init(weatherGraph)
      const option = {
        title: {
          text: '未来3天气温变化'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['最高气温', '最低气温']
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
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
      chart.on('click', 'series', this.changeTempInfo)
    })
  }
}
</script>

<style scoped>

</style>
