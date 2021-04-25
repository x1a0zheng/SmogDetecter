import { createStore } from 'vuex'

export default createStore({
  state: {
    key: '215e1f6839c547e1ae69f1a88aefd915',
    locationPos: null,
    cityInfo: null
  },
  mutations: {
    setLocationPos (state, payload) {
      state.locationPos = payload
    },
    setCityInfo (state, payload) {
      state.cityInfo = payload
    },
    clearCityInfo (state) {
      state.cityInfo = null
    }
  },
  actions: {
  },
  modules: {
  }
})
