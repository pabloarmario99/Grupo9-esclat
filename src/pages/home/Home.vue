<script lang="ts" setup>


</script>

<template>
<div class="home-container">
    
    <div class="home-heading">
      <img
        class="home-logo home-logo-mobile"
        src="/images/logo white.svg"
        alt="Esclat"
      />
      <img
        class="home-logo home-logo-mid"
        src="/images/logov white.svg"
        alt="Esclat"
      />
      <img
        class="home-logo home-logo-desktop"
        src="/images/logoh white.svg"
        alt="Esclat"
      />
    </div>

    <nav class="home-menu">
      <router-link to="/esclat">
        <button class="home-button text-white">Qué es ESCLAT?</button>
      </router-link>
      
      <router-link to="/programa">
        <button class="home-button text-white">Programa</button>
      </router-link>
      
      <router-link to="/artistas">
        <button class="home-button text-white">ARTISTAS</button>
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
  width: clamp(80rem, 120vw, 100rem);
  height: auto;
  transform: translateY(-0.6rem);
}

.home-logo-mobile,
.home-logo-mid {
  display: none;
}

.home-logo-desktop {
  display: block;
}

@media (max-width: 1023px) {
  .home-logo-desktop {
    display: none;
  }

  .home-logo-mid {
    display: block;
  }
}

@media (max-width: 767px) {
  .home-logo-mid {
    display: none;
  }

  .home-logo-mobile {
    display: block;
  }
}

.home-heading {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.home-subtitle {
  margin: 0;
  font-size: 1.8rem;
  font-family: "Mona Sans Var", ui-sans-serif, system-ui, sans-serif;
  font-weight: 500;
  text-transform: uppercase;
}

.home-menu {
  width: min(1200px, 100%);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin: 1.1rem auto 2rem;
}

@media (max-width: 767px) {
  .home-menu {
    width: min(560px, 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .home-menu > a {
    width: 100%;
  }

  .home-menu .home-button {
    font-size: 1.25rem;
  }
}

.home-button {
  width: 100%;
  padding: 1rem;
  font-size: 1.5rem;
  font-family: "Mona Sans Var", ui-sans-serif, system-ui, sans-serif;
  font-weight: 300;
  text-transform: uppercase;
  cursor: pointer;
}

@media (min-width: 1024px) {
  .home-button {
    font-size: 1.8rem;
  }
}
</style>