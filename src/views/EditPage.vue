<template>
  <div class="message-editor-container">
    <h3>Nachricht bearbeiten</h3>

    <div class="text-area-container">
      <textarea v-model="message" rows="5" style="width:100%" />
    </div>
  </div>

  <div class="message-editor-container">
    <h3>Bilder hinzufügen</h3>

    <p>Maximal 3 Bilder möglich ({{ images.length }}/3)</p>

    <input 
      type="file" 
      multiple 
      accept="image/*" 
      @change="handleImages"
      :disabled="images.length >= 3"
    />

    <div v-if="images.length" class="preview">
      <div v-for="(img, index) in images" :key="index" class="preview-img">
        
        <img :src="img" />

        <button class="delete-btn" @click="removeImage(index)">
          ❌
        </button>

      </div>
    </div>
  </div>

  <div class="controlls-container">
    <button @click="save">Speichern</button>
    <router-link to="/">
      <button>Zurück</button>
    </router-link>
  </div>

</template>

<script>
export default {
  data() {
    return {
      message: localStorage.getItem('message') || '',
      images: JSON.parse(localStorage.getItem('images') || '[]')
    }
  },
  methods: {
    handleImages(event) {
      const files = Array.from(event.target.files)

      const combined = [...this.images, ...files]
      const limited = combined.slice(0, 3)

      this.images = []

      limited.forEach(file => {
        if (typeof file === 'string') {
          this.images.push(file)
        } else {
          const reader = new FileReader()
          reader.onload = (e) => {
            this.images.push(e.target.result)
          }
          reader.readAsDataURL(file)
        }
      })

      if (combined.length > 3) {
        alert('Es sind maximal 3 Bilder erlaubt.')
      }
    },

    removeImage(index) {
      this.images.splice(index, 1)
    },

    save() {
      localStorage.setItem('message', this.message)

      if (this.images.length > 0) {
        localStorage.setItem('images', JSON.stringify(this.images))
      } else {
        localStorage.removeItem('images')
      }

      this.$router.push('/')
    }
  }
}
</script>

<style>
.preview {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
  margin-left: 15%;
  margin-right: 15%;
}

.preview-img img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.preview-img {
  position: relative;
}

.delete-btn {
  position: absolute;
  top: -5px;
  right: -5px;
  border: none;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  font-size: 12px;
  width: 22px;
  height: 22px;
}

.text-area-container {
  margin-left: 15%;
  margin-right: 15%;
}

.controlls-container {
  margin-top: 20px;
  border: 1px solid var(--border);
  padding: 10px;
}

</style>