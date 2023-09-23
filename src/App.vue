<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import LoginComponent from "./components/LoginComponent.vue"
import RegisterComponent from "./components/RegisterComponent.vue"
const login = ref(false)
const register = ref(false)

const changeLogin = () => {
  login.value = !login.value
}
const changeRegister = () => {
  register.value = !register.value
}
</script>

<template>
  <div class="container mx-auto">
    <header>
      <div class="navbar bg-neutral text-neutral-content h-[5rem] px-[2rem]">
        <div class="flex-1">
          <RouterLink to="/">MovieAPP</RouterLink>
        </div>
        <div class="flex justify-center items-center gap-4">
          <button class="btn btn-accent ">
            <RouterLink to="/movies">Mis Películas</RouterLink>
          </button>
          <button @click="changeLogin" class="btn btn-outline btn-accent ">
            Iniciar Sesión
          </button>
        </div>
      </div>
    </header>

    <RouterView />
    <div class="modal" :class="{ 'modal-open': login }">
      <LoginComponent :changeLogin="changeLogin" :changeRegister="changeRegister" />
    </div>
    <div class="modal" :class="{ 'modal-open': register }">
      <RegisterComponent :changeLogin="changeLogin" :changeRegister="changeRegister" />
    </div>
  </div>
</template>

