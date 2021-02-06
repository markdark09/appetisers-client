<template>
  <v-navigation-drawer
    v-model="navBar"
    :width="250"
    :stateless="navBar"
    absolute
    bottom
    temporary
    >
    <v-list dense>
      <v-col class="text-right">
        <v-btn class="mr-2"
          @click="navBar = !navBar"
          small>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-col>
      <template>
        <v-container fluid fill-height>
          <v-img src="@/assets/company-logo.png"
            max-height="120"
            contain
          ></v-img>
        </v-container>
        <v-divider/>
        <v-list shaped :class="!navBar ? 'pa-2' : ''">
          <v-list-item-group v-model="listItem"
                              color="primary">
            <v-list-item v-for="(item, i) in items"
                         :key="i"
                         :to="item.linkTo || ''"
                         style="text-decoration: none;"
                         link>
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: [
    'drawer'
  ],
  data () {
    return {
      navBar: false,
      listItem: 1,
      items: [
        {
          icon: 'mdi-calendar',
          text: 'Calendar',
          linkTo: {
            name: 'calendar',
            url: '/calendar'
          }
        }
      ]
    }
  },
  computed: {
    userScreen () {
      return this.$vuetify.breakpoint.name
    }
  },
  watch: {
    drawer: {
      handler: function (newVal) {
        this.navBar = newVal
      }
    },
    navBar: {
      handler: function (newVal) {
        if (newVal === false) {
          this.$emit('closeDrawer', newVal)
        }
      }
    }
  }
}
</script>
