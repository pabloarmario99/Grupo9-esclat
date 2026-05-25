<script lang="ts" setup>


</script>

<template>
<div class="home-container">
    <div class="live-debug-badge">LIVE DEBUG OK 24-05 V4</div>
    <div class="home-heading">
      <img
        class="home-logo"
        src="/images/logof%20white.svg"
        alt="Esclat"
      />
      <p class="home-subtitle text-white">FESTIVAL DE MÚSICA, PENSAMENT I CREATIVITAT</p>
    </div>

    <nav class="home-menu">
      <router-link to="/esclat">
        <button class="home-button text-white">Qué es ESCLAT?</button>
      </router-link>
      
      <router-link to="/programa">
        <button class="home-button text-white">Programa</button>
      </router-link>
      
      <router-link to="/artistas">
        <button class="home-button text-white">Artdskjfbsdfstas</button>
      </router-link>
      
      <router-link to="/entradas-acceso">
        <button class="home-button text-white">Entradas / Acceso</button>
      </router-link>
    </nav>
  </div>



</template>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ef5da2;
  text-align: center;
  padding: 2rem;
}

.live-debug-badge {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 50;
  padding: 0.45rem 0.8rem;
  border-radius: 9999px;
  background: #ffffff;
  color: #ef5da2;
  font-weight: 800;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
}

.home-logo {
  width: clamp(28rem, 75vw, 56
  rem);
  height: auto;
}

.home-heading {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.home-subtitle {
  margin: 0;
  font-size: 1.2rem;
  font-family: "Mona Sans Var", ui-sans-serif, system-ui, sans-serif;
  font-weight: 500;
  text-transform: uppercase;
}

.home-menu {
  width: min(1200px, 100%);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin: 2rem auto;
}

.home-button {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  font-family: "Mona Sans Var", ui-sans-serif, system-ui, sans-serif;
  font-weight: 200;
  text-transform: uppercase;
  cursor: pointer;
}
</style>