import { createStore } from 'vuex'

export default createStore({
  state: {
    key: '215e1f6839c547e1ae69f1a88aefd915',
    locationPos: null,
    location: '',
    cityInfo: null,
    homeWeatherInfo: null,
    homeAirInfo: null,
    homeFutureInfo: null
  },
  mutations: {
    setLocation (state, payload) {
      state.location = payload
    },
    setLocationPos (state, payload) {
      state.locationPos = payload
    },
    setCityInfo (state, payload) {
      state.cityInfo = payload
    },
    clearCityInfo (state) {
      state.cityInfo = null
    },
    setHomeData (state, payload) {
      state.homeWeatherInfo = payload.weather !== undefined ? payload.weather : state.homeWeatherInfo
      state.homeAirInfo = payload.air !== undefined ? payload.air : state.homeAirInfo
      state.homeFutureInfo = payload.futureInfo !== undefined ? payload.futureInfo : state.homeFutureInfo
    },
    clearHomeData (state) {
      state.homeWeatherInfo = null
      state.homeAirInfo = null
      state.homeFutureInfo = null
    }
  },
  actions: {
  },
  modules: {
  }
})
