<template>
  <div class="p-6">
    <h1>Nachricht bearbeiten</h1>

    <textarea v-model="message" rows="5" style="width:100%" />

    <div style="margin-top:10px">
      <button @click="save">Speichern</button>
      <router-link to="/">
        <button>Zurück</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: localStorage.getItem('message') || ''
    }
  },
  methods: {
    save() {
      localStorage.setItem('message', this.message)
      this.$router.push('/')
    }
  }
}
</script>