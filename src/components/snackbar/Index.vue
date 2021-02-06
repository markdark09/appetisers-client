<template>
    <v-snackbar
      v-model="snackbarLocal"
      :right="x"
      :timeout="timeout"
      :top="y"
      :color="color"
    >
      {{ message }}
      <v-layout row wrap justify-end>
        <v-btn href="#"
            @click="snackbarLocal = false"
            v-show="closeButton"
            text>
            <span style="color:white">Close</span>
        </v-btn>
      </v-layout>
    </v-snackbar>
</template>
<script>
export default {
  props: ['snackbar', 'message', 'color', 'closeButton'],
  data () {
    return {
      y: 'top',
      x: 'right',
      timeout: 6000
    }
  },
  computed: {
    snackbarLocal: {
      get: function () {
        return this.snackbar
      },
      set: function (value) {
        this.$emit('snackbarResponse', value)
      }
    }
  }
}
</script>
