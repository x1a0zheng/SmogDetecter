<template>
  <div class='future-weather-info-item'>
    <weather-icon
      :icon="dayIcon"
    >
    </weather-icon>
    |
    <weather-icon
      :icon="nightIcon"
    >
    </weather-icon>
    <div>{{ text }}</div>
    <div class="item-right">{{ maxTemp }}° / {{ minTemp }}°</div>
  </div>
</template>

<script>
import WeatherIcon from './WeatherIcon.vue'
export default {
  components: { WeatherIcon },
  name: 'FutureWeatherInfoItem',
  props: {
    text: String,
    maxTemp: String,
    minTemp: String,
    dayIcon: String,
    nightIcon: String
  },
  methods: {}
}
</script>

<style scoped>
.future-weather-info-item{
  display: flex;
  flex-direction: row;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  line-height: 32pt;
}

.item-right{
  margin-left: auto;
}
</style>
