<template>
  <div ref="box" class="weather-icon">
  </div>
</template>

<script>
export default {
  name: 'WeatherIcon',
  props: {
    icon: String
  },
  watch: {
    icon (v) {
      this.setIcon(v)
    }
  },
  mounted () {
    this.setIcon(this.icon)
  },
  methods: {
    setIcon (v) {
      this.$refs.box.style = `background-image:url("${this.$route.path}weather_icons/64/${v}.png");`
    }
  }
}
</script>

<style scoped>
.weather-icon{
  width: 32px;
  height: 32px;
  background-repeat:no-repeat;
  background-size:cover;
}
</style>
