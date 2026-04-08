<template>
  <div class="page">
    <h1>💌 Romantisches Couvert</h1>

    <div class="envelope" @click="toggleOpen" :class="{ open: isOpen }">

      <div class="base"></div>

      <div class="letter" v-if="isOpen">
        <p>{{ message }}</p>
      </div>

      <div class="front"></div>
      <div class="flap"></div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      message: localStorage.getItem('message') || 'Ich denke an dich 💖'
    }
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style>
.page {
  text-align: center;
  padding: 40px;
  background: linear-gradient(to bottom, #ffe6f0, #fff);
  min-height: 100vh;
}

/* Container */
.envelope {
  position: relative;
  width: 320px;
  height: 220px;
  margin: 60px auto;
  perspective: 1200px;
}

/* Base */
.base {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #e0c097;
  border-radius: 6px;
  z-index: 1;
}

/* Letter (JETZT über Base, aber unter Flap) */
.letter {
  position: absolute;
  width: 90%;
  height: 80%;
  top: 10%;
  left: 5%;
  background: white;
  border-radius: 4px;
  padding: 15px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  z-index: 2;
  animation: slideUp 0.6s ease;
}

/* Front */
.front {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #f5deb3;
  clip-path: polygon(0 0, 100% 0, 50% 60%);
  z-index: 3;
}

/* Flap */
.flap {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #d8b98a;
  clip-path: polygon(0 0, 100% 0, 50% 60%);
  transform-origin: top;
  transition: transform 0.8s ease;
  z-index: 4;
}

/* Open animation */
.envelope.open .flap {
  transform: rotateX(180deg);
}

.envelope.open .letter {
  z-index: 5; /* Brief kommt nach vorne */
}

/* Animation */
@keyframes slideUp {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>