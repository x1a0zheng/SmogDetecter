<template>
  <div class="weather-info-containor" v-if="weatherData">
    <div class="weather-info-item" v-for="(value, name) in index" v-bind:key="name">
      <div class="center">{{value}} : </div>
      <div class="center">{{weatherData[name]}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherInfoPlugin',
  data () {
    return {
      index: {
        textDay: '日间天气',
        textNight: '夜间天气',
        sunrise: '日出时间',
        sunset: '日落时间',
        windScaleDay: '风力',
        uvIndex: '紫外线强度',
        humidity: '相对湿度',
        pressure: '大气压强'
      }
    }
  },
  props: {
    weatherData: Object
  }
}
</script>

<style scoped>
.weather-info-containor {
  display: flex;
  flex-wrap: wrap;
}
.weather-info-item {
  flex-basis: 25%;
  height: 50px;
  display: flex;
  justify-content: center;
}
.center {
  line-height: 50px;
}
</style>
