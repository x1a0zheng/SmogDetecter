<template>
  <div class="home">
    <div class="background">
      <div class="gradient">
        <div class="main-container">
          <div class="city">
            西安
          </div>

          <div class="middle-container">
            <div class="temperature-container">
              <div class="temperature-number"> 12 </div>
              <div class="temperature-sign"> ℃ </div>
            </div>
            <div class="middle-weather-container">
              <div class="weather-icon"></div>
              <div class="weather-text">阵雨</div>
            </div>
          </div>

          <div class="bottom-container">
            <div class="tody-aoi">空气指数50 一级</div>

            <div class="bottom-container-list">
              <div class="bottom-container-list-item">
                <div class="weather-icon"></div>
                <div>今天 · 晴朗 · 空气指数50</div>
                <div class="bottom-container-list-item-right">12° / 9°</div>
              </div>

              <div class="bottom-container-list-item">
                <div class="weather-icon"></div>
                <div>明天 · 小雨 · 空气指数500</div>
                <div class="bottom-container-list-item-right">32° / 8°</div>
              </div>

              <div class="bottom-container-list-item">
                <div class="weather-icon"></div>
                <div>后天 · 暴雨 · 空气指数10</div>
                <div class="bottom-container-list-item-right">19° / 1°</div>
              </div>
            </div>

            <div class="info-button" @click="$router.push('/info')">天气详情</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home'
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

.city{
  font-size: 24pt;
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

.weather-icon{
  width: 32px;
  height: 32px;
  background-image:url("../assets/weather_icons/64/303.png");
  background-repeat:no-repeat;
  background-size:cover;
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

.bottom-container-list-item{
  display: flex;
  flex-direction: row;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
}

.bottom-container-list-item-right{
  margin-left: auto;
}

.info-button{
  margin-top: 35px;
  font-size: 24pt;
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
