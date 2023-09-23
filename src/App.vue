<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
import axios from 'axios'

const username = ref('')
const password = ref('')
const modal = ref(false)

const changeModal = () => {
  modal.value = !modal.value
}
const onSubmit = async () => {
  try {
    const { data } = await axios.post('http://localhost:3000/api/user/login', {
      username: username.value,
      password: password.value
    })
    console.log(data)
  } catch (error) {
    // console.log(error.response.data)
  }
}
</script>

<template>
  <div class="container mx-auto">
    <header>
      <div class="navbar bg-neutral text-neutral-content">
        <div class="flex-1">
          <RouterLink to="/">MovieAPP</RouterLink>
        </div>
        <div class="flex-none">
          <ul class="menu menu-horizontal px-1">
            <li>
              <RouterLink to="/movies">Mis Películas</RouterLink>
            </li>
            <li>
              <button @click="changeModal" class="btn btn-outline btn-accent">
                Iniciar Sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <RouterView />
    <div class="modal" :class="{ 'modal-open': modal }">
      <div class="card w-96 bg-base-100 shadow-xl">
        <button
          @click="changeModal"
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-slate-100"
        >
          ✕
        </button>
        <div class="card-body">
          <h2 class="card-title">Iniciar sesión</h2>
          <form @submit.prevent="onSubmit">
            <input
              v-model="username"
              type="text"
              placeholder="Usuario"
              class="input input-bordered w-full max-w-xs"
            />
            <input
              v-model="password"
              type="password"
              placeholder="Contraseña"
              class="input input-bordered w-full max-w-xs my-4"
            />

            <div class="card-actions justify-end">
              <button type="submit" class="btn btn-primary">Ingresar</button>
            </div>
          </form>
          <div class="toast">
            <div class="alert alert-info">
              <span>asdasd</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.router-link-active {
  color: white;
  font-weight: bold;
  text-decoration: none;
}
a:link,
a:visited,
a:active {
  color: #ffffff;
  text-decoration: none;
}
</style>
