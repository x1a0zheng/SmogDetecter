<template>
  <div class="weather-info-containor" v-if="weatherData">
    <div class="weather-info-item" v-for="(value, name) in index" v-bind:key="name">
      <div class="item-containor">
        <div class="center">{{value}} :</div>
        <div class="center"> {{weatherData[name]}}</div>
      </div>
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
  align-content: flex-start;
}
.item-containor {
  display: flex;
  justify-content: center;
  line-height: 50px;
  width: 150px;
  margin: 0 auto;
  color: white;
  background: #fc4a1a;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, rgb(252, 74, 26), rgb(247, 183, 51));  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, rgb(252, 74, 26), rgb(247, 183, 51)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  border-radius: 15px;
  font-weight: bold;
}
.weather-info-item {
  flex-basis: 25%;
  height: 50px;
  min-width: 180px;
  margin: 10px 0;
}
</style>
