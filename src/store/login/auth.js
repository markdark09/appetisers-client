import axios from 'axios'

export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
    selectOption: null
  },
  getters: {
    authenticated (state) {
      return state.token
    },
    selectOption (state) {
      return state.selectOption
    },
    user (state) {
      return state.user
    }
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_SELECT_OPTION (state, selectOption) {
      state.selectOption = selectOption
    },
    SET_USER (state, user) {
      state.user = user
    }
  },
  actions: {
    // Validating their login credentials
    async login ({ dispatch }, credentials) {
      const response = await axios.post('api/auth/login', credentials)

      return dispatch('attempt', response.data.data.token)
    },

    // Validating token if valid or not.
    async attempt ({ commit }, token) {
      if (token) {
        commit('SET_TOKEN', token)
      } else {
        return
      }

      try {
        const response = await axios.get('api/auth/me')
        commit('SET_USER', response.data.data.user)
        commit('SET_SELECT_OPTION', response.data.data.selectOption)
      } catch (e) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
      }
    },

    // Logout and set all credentials to null
    async logout ({ commit }) {
      return await axios.post('api/auth/logout')
        .then(() => {
          commit('SET_TOKEN', null)
          commit('SET_USER', null)
        })
    }
  }
}
