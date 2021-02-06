<template>
  <v-card>
    <v-card-title primary-title>
      Calendar
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="form"
              v-model="validForm"
              lazy-validation
              v-on:submit.prevent="validate">
        <v-row>
          <v-col cols="12" sm="4">
            <v-row>
              <v-col cols="12" sm="12">
                <span>Event <span class="required">*</span></span>
                <ValidationProvider name="Event"
                                        rules="required"
                                        immediate
                                        v-slot="{ errors }">
                  <v-text-field
                    label="My Events"
                    class="text-field-space"
                    solo
                    dense
                    :error-messages="errors.length > 0 ? [''] : ''"
                    v-model="formRequests.event"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <span>From <span class="required">*</span></span>
                <v-menu
                    v-model="dates.from"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px">
                  <template v-slot:activator="{ on }">
                    <ValidationProvider name="From"
                                        rules="required"
                                        immediate
                                        v-slot="{ errors }">
                      <v-text-field
                          v-model="formRequests.from"
                          label="From"
                          :error-messages="errors.length > 0 ? [''] : ''"
                          placeholder="From"
                          solo
                          dense
                          v-on="on"
                          autocomplete="off"
                          readonly
                      ></v-text-field>
                    </ValidationProvider>
                  </template>
                  <v-date-picker v-model="formRequests.from"
                                @input="dates.from = false"
                                :landscape="$vuetify.breakpoint.smAndUp">
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <span>To <span class="required">*</span></span>
                <v-menu
                    v-model="dates.to"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px">
                  <template v-slot:activator="{ on }">
                    <ValidationProvider name="To"
                                        rules="required"
                                        immediate
                                        v-slot="{ errors }">
                      <v-text-field
                          v-model="formRequests.to"
                          label="To"
                          :error-messages="errors.length > 0 ? [''] : ''"
                          placeholder="To"
                          solo
                          dense
                          v-on="on"
                          autocomplete="off"
                          readonly
                      ></v-text-field>
                    </ValidationProvider>
                  </template>
                  <v-date-picker v-model="formRequests.to"
                                @input="dates.to = false"
                                :min="formRequests.from"
                                :landscape="$vuetify.breakpoint.smAndUp">
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                v-for="name in dayNames"
                :key="name"
                cols="12"
                sm="2"
                class="custom7cols"
              >
                <v-checkbox
                  :label="capitalize(name)"
                  v-model="formRequests.days"
                  :value="name"
                  hide-details
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn
                    type="submit"
                    :disabled="!validForm"
                    color="blue"
                    class="white--text">
                    Save
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="8">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      {{ new Date() | moment("MMM YYYY") }}
                    </th>
                    <th class="text-left">
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(day, key) in days"
                    :key="key"
                    v-bind:class="{ 'green lighten-5': checkEventDays(day) }"
                  >
                    <td>{{ day | moment('DD ddd') }}</td>
                    <td>
                      {{ checkEventDays(day) }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'

export default {
  name: 'Calendar',
  data () {
    return {
      validForm: false,
      days: [],
      currentDate: moment().format('YYYY-MM-DD'),
      dayNames: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
      year: moment().format('YYYY'),
      month: moment().format('MM'),
      dates: {
        from: false,
        to: false
      },
      formRequests: {
        id: '',
        event: '',
        from: '',
        to: '',
        days: []
      },
      savedEvent: {},
      userCalendar: {}
    }
  },
  mounted () {
    const year = this.year
    const month = this.month

    this.getDaysInMonth(year, month)
    this.getUserCalendar()
  },
  methods: {
    ...mapActions({
      eventSave: 'calendar/store',
      loader: 'response/loader',
      snackbar: 'response/snackbar'
    }),

    /**
     * Check event days if belongs to user.
     */
    checkEventDays (day) {
      const savedEvent = this.savedEvent
      const subsDay = moment(day).format('DD ddd').substr(3).toLowerCase()
      const from = savedEvent.from
      const to = savedEvent.to

      if ((Object.keys(savedEvent).length !== 0 && // Check if savedEvent has data
          savedEvent.days.indexOf(subsDay) !== -1 && // Check if has the same with "day"(param)
          this.daysOfTwoDates(from, to, day)) ||
            (Object.keys(savedEvent).length !== 0 &&
            savedEvent.days.length === 0 &&
            this.daysOfTwoDates(from, to, day)) // Check if the dates is within the "day"{param}
      ) {
        return savedEvent.event
      }

      return null
    },

    /**
     * Get and check the days if belongs to user
     */
    daysOfTwoDates (from, to, day) {
      var moment = require('moment')

      var dateFrom = moment(from)
      var dateTo = moment(to).add(1, 'days')
      var days = []

      for (var m = moment(dateFrom); m.isBefore(dateTo); m.add(1, 'days')) {
        days.push(m.format('YYYY-MM-DD'))
      }

      return days.indexOf(day) !== -1
    },

    /**
     * Get user calendar event
     */
    getUserCalendar () {
      const userCalendar = this.$store.getters['auth/user'].calendar
      this.userCalendar = userCalendar

      if (userCalendar) {
        this.formRequests = userCalendar
        this.getSavedEvent(userCalendar)
      }
    },

    getSavedEvent (event) {
      this.savedEvent = {
        id: event.id,
        event: event.event,
        from: event.from,
        to: event.to,
        days: event.days
      }
    },

    /**
     * Get all days in month
     */
    getDaysInMonth (year, month) {
      const monthIndex = month - 1 // 0..11 instead of 1..12
      const date = new Date(year, monthIndex, 1)
      const result = []

      while (date.getMonth() === monthIndex) {
        result.push(moment(date).format('YYYY-MM-DD'))
        date.setDate(date.getDate() + 1)
      }

      this.days = result
    },

    /**
     * Capitalize strings
     */
    capitalize (s) {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    },

    /**
     * Validate and store to server
     */
    validate () {
      if (this.$refs.form.validate()) {
        this.loader({
          show: true
        })

        this.eventSave(this.formRequests)
          .then((response) => {
            this.snackbar({
              show: true,
              color: 'success',
              message: 'Event successfully saved',
              closeButton: true
            })

            this.formRequests = response
            this.getSavedEvent(response)
          })
          .catch((error) => {
            const validationMessages = []
            const errors = Object.values(error.response.data.errors)

            errors.forEach(error => {
              validationMessages.push(error)
            })

            this.snackbar({
              show: true,
              color: 'error',
              message: error.response.status === 422 ? validationMessages.join(', <br >') : error.response.data.error.code,
              closeButton: true
            })
          }).finally(() => {
            this.loader({
              show: false
            })
          })
      }
    }
  }
}
</script>
