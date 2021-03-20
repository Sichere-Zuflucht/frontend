<template>
  <v-container>
    <v-form v-model="valid">
      <v-text-field v-model="name" label="Name" required></v-text-field>
      <v-text-field v-model="surName" label="Vorname" required></v-text-field>
      <v-text-field v-model="password" label="Passwort" required></v-text-field>
      <v-text-field
        v-model="password2"
        label="Passwort wiederholen"
        required
      ></v-text-field>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'ProfileInformation',
  data() {
    return {
      valid: false,
      name: '',
      surName: '',
      password: '',
      password2: '',
      passwordRules: [(v) => !!v || 'Passwort nicht vergessen'],
      passwordRules2: [
        (v) => !!v || 'Passwort nicht vergessen',
        (v) =>
          (!v && v === this.password) || 'Passwörter müssen übereinstimmen',
      ],
    }
  },
  methods: {
    updateProfile() {
      return ''
    },
  },
}
</script>
