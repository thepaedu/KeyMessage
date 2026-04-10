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

    <p v-if="isLoadingImages">Bilder werden verarbeitet...</p>

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
    <button @click="save" :disabled="isLoadingImages">
      {{ isLoadingImages ? 'Lade Bilder...' : 'Speichern' }}
    </button>

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
      images: JSON.parse(localStorage.getItem('images') || '[]'),
      isLoadingImages: false
    }
  },

  methods: {
    async handleImages(event) {
      const files = Array.from(event.target.files)

      if (!files.length) return

      this.isLoadingImages = true

      const remainingSlots = 3 - this.images.length

      if (remainingSlots <= 0) {
        alert('Maximal 3 Bilder erreicht.')
        event.target.value = null
        this.isLoadingImages = false
        return
      }

      const filesToProcess = files.slice(0, remainingSlots)
      const newImages = []

      for (let file of filesToProcess) {
        const compressed = await this.compressImage(file)
        newImages.push(compressed)
      }

      this.images = [...this.images, ...newImages]

      this.isLoadingImages = false

      // 🔥 wichtig für iPhone
      event.target.value = null

      if (files.length > remainingSlots) {
        alert('Nur die ersten ' + remainingSlots + ' Bilder wurden hinzugefügt.')
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
    },

    compressImage(file, maxWidth = 800, quality = 0.7) {
      return new Promise((resolve) => {
        const reader = new FileReader()

        reader.onload = (event) => {
          const img = new Image()

          img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            let width = img.width
            let height = img.height

            // Skalieren
            if (width > maxWidth) {
              height *= maxWidth / width
              width = maxWidth
            }

            canvas.width = width
            canvas.height = height

            ctx.drawImage(img, 0, 0, width, height)

            const compressed = canvas.toDataURL('image/jpeg', quality)
            resolve(compressed)
          }

          img.src = event.target.result
        }

        reader.readAsDataURL(file)
      })
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