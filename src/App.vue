<template>
    <v-app id="inspire" class="app-background">
        <vue-confirm-dialog></vue-confirm-dialog>
        <loader :overlay="loader.show"/>

        <snackbar :snackbar="snackbar.show"
                  :message="snackbar.message"
                  :color="snackbar.color"
                  :closeButton="snackbar.closeButton"
                  @snackbarResponse="(value) => snackbar.show = value"/>

        <template v-if="authenticated && user">
            <side-bar :drawer="drawer" @closeDrawer="(data) => drawer = data"/>

            <navigation-bar @clicked="openAndCloseDrawer"
                            :authenticatedUser="user"
                            :drawer="drawer"/>

            <main-content/>
        </template>
        <template v-else>
            <router-view></router-view>
        </template>
    </v-app>
</template>
<script>
import SideBar from './components/layouts/SideBar'
import NavigationBar from './components/layouts/navigation-bar/Index'
import MainContent from './components/layouts/MainContent'
import { mapGetters } from 'vuex'
import './styles/index.scss'

export default {
  name: 'App',
  components: {
    SideBar,
    NavigationBar,
    MainContent
  },
  data () {
    return {
      drawer: false
    }
  },
  watch: {
    user: function (newVal) {
      this.authenticateRedirections(newVal)
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      loader: 'response/loader',
      snackbar: 'response/snackbar'
    }),
    breakpoints () {
      return this.$vuetify.breakpoint.name
    }
  },
  methods: {
    /**
      * Check and redirect user if authenticated
      * or not.
      */
    authenticateRedirections: function (user) {
      if (user != null) {
        this.$router.replace({
          name: 'calendar'
        })
      } else {
        this.$router.replace({
          name: 'login'
        })
      }
    },

    /**
      * Open and close drawer and pass
      * it to the side-bar component
      */
    openAndCloseDrawer: function (data) {
      this.drawer = data
    }
  }
}
</script>
