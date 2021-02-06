<template>
    <v-app-bar
        app
        class="primary"
        dark>

        <v-icon @click.stop="openAndCloseDrawer" class="mr-4">mdi-hamburger</v-icon>

        <v-spacer />

        <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-y>
            <template v-slot:activator="{ on: menu }">
              <v-tooltip bottom>
                  <template v-slot:activator="{ on: tooltip }">
                      <v-btn
                          v-on="{ ...tooltip, ...menu }"
                          icon>
                          <v-icon>mdi-chevron-down</v-icon>
                      </v-btn>
                  </template>
                  <span>Account Settings</span>
              </v-tooltip>
            </template>

            <v-card>
                <v-list>
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-avatar
                                color="primary"
                                size="62"
                                >
                                <span class="white--text headline">
                                    {{ userData.information.full_name
                                               .match(/\b(\w)/g)
                                               .join('') }}
                                </span>
                            </v-avatar>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>
                                {{ userData.information.full_name }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>

                <v-list>
                    <v-list-item
                        v-for="(item, index) in dropdownData.user"
                        :key="index"
                        @click="item.method"
                    >
                    <v-icon>{{ item.icon }}</v-icon>
                    <v-list-item-title class="pl-5" v-html="item.title"></v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-menu>

    </v-app-bar>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'NavigationBar',
  props: ['authenticatedUser', 'drawer'],
  data () {
    return {
      menu: false,
      navBar: false,
      dropdownData: {
        user: [
          {
            icon: 'mdi-logout',
            title: 'Logout',
            method: this.logoutSession
          }
        ]
      }
    }
  },
  watch: {
    drawer: {
      handler: function (newVal) {
        this.navBar = newVal
      }
    }
  },
  computed: {
    userData: function () {
      return this.authenticatedUser
    }
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
      loader: 'response/loader',
      snackbar: 'response/snackbar'
    }),
    showMyProfile () {
      console.log('My Profile')
    },
    showChangeMyPassword () {
      console.log('Change Password')
    },
    logoutSession () {
      this.loader({
        show: true
      })

      this.logout()
        .finally(() => {
          this.loader({
            show: false
          })

          this.snackbar({
            show: true,
            color: 'success',
            message: 'Successfully logged out',
            closeButton: true
          })
        })
    },
    openAndCloseDrawer: function () {
      this.navBar = !this.navBar
      this.$emit('clicked', this.navBar)
    }
  }
}
</script>
