import axios from 'axios'

export default {
  namespaced: true,
  state: {
    calendar: ''
  },
  getters: {
    calendar (state) {
      return state.calendar
    }
  },
  mutations: {
    SET_CALENDAR (state, event) {
      state.calendar = event
    }
  },
  actions: {
    // Store events
    async store (_, formRequests) {
      const response = await axios.post('api/calendar/save', formRequests)

      return (await response).data.data
    }
  }
}
