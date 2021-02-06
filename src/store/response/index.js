export default {
  namespaced: true,
  state: {
    loader: {
      show: false
    },
    snackbar: {
      show: false,
      message: '',
      color: '',
      closeButton: true
    }
  },
  getters: {
    loader (state) {
      return state.loader
    },
    snackbar (state) {
      return state.snackbar
    }
  },
  mutations: {
    SET_LOADER (state, data) {
      state.loader.show = data.show
    },
    SET_SNACKBAR (state, data) {
      state.snackbar.show = data.show
      state.snackbar.message = data.message
      state.snackbar.color = data.color
      state.snackbar.closeButton = data.closeButton
    }
  },
  actions: {
    // Logout and set all credentials to null
    async loader ({ commit }, data) {
      commit('SET_LOADER', data)
    },
    async snackbar ({ commit }, data) {
      commit('SET_SNACKBAR', data)
    }
  }
}
