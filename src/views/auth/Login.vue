<template>
    <v-main>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex lg3
                        xs12
                        sm6
                        md4>
                    <v-sheet
                        class="mx-auto">
                        <v-card
                            class="primary mx-auto"
                            dark>
                            <v-card-title>
                                <v-icon class="pr-3">mdi-login</v-icon> Login Form
                            </v-card-title>
                        </v-card>
                        <v-card-text class="pl-23 pr-23 rounded-card">
                            <v-flex xs12>
                                <v-container fluid fill-height>
                                    <v-layout align-center justify-center>
                                        <v-img
                                            class="mx-2"
                                            src="../../../src/assets/company-logo.png"
                                            contain
                                            aspect-ratio="2"
                                        ></v-img>
                                    </v-layout>
                                </v-container>
                                <v-divider></v-divider>
                                <v-form
                                    ref="form"
                                    v-model="valid"
                                    v-on:submit.prevent="validate"
                                    >
                                        <v-text-field
                                            v-model="formData.email"
                                            :rules="rules.email"
                                            label="E-mail/Username"
                                            required
                                        ></v-text-field>

                                        <v-text-field
                                            v-model="formData.password"
                                            type="password"
                                            :rules="rules.password"
                                            label="Password"
                                            autocomplete="off"
                                            required
                                        ></v-text-field>
                                        <v-spacer></v-spacer>
                                        <v-flex>
                                            <v-btn
                                                type="submit"
                                                :disabled="!valid"
                                                color="primary"
                                                width="100%"
                                                class="">
                                                Sign in
                                            </v-btn>
                                        </v-flex>
                                    </v-form>
                            </v-flex>
                        </v-card-text>
                    </v-sheet>
                </v-flex>
            </v-layout>
        </v-container>
    </v-main>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      formData: {
        email: '',
        password: ''
      },
      valid: false,
      lazy: false,
      rules: {
        email: [
          v => !!v || 'E-mail/Username is required'
        ],
        password: [
          v => !!v || 'Password is required',
          v => (v && v.length <= 20) || 'Password must be less than 20 characters'
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
      loader: 'response/loader',
      snackbar: 'response/snackbar'
    }),
    validate () {
      if (this.$refs.form.validate()) {
        this.loader({
          show: true
        })

        this.login(this.formData)
          .then(() => {
            this.snackbar({
              show: true,
              color: 'success',
              message: 'Successfully logged in',
              closeButton: true
            })
          })
          .catch((error) => {
            console.log(error.response)
            this.snackbar({
              show: true,
              color: 'error',
              message: error.response.status === 422 ? error.response.data.message : error.response.data.error.code,
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
