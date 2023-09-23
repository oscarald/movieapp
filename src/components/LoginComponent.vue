<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import { useAuthStore } from '../stores/authStore.js'

const authStore = useAuthStore()
const props = defineProps({
  changeLogin: Function,
  changeRegister: Function
})
const username = ref('')
const password = ref('')
const loading = ref(false)
const onSubmit = async () => {
  try {
    loading.value = true
    const { data } = await axios.post('http://localhost:4000/api/user/login', {
      username: username.value,
      password: password.value
    })
    console.log(data)
    toast.success(`Bienvenido ${data.names}`)
    authStore.saveUser(data)
    username.value = ''
    password.value = ''
    props.changeLogin()
    loading.value = false
  } catch (error) {
    loading.value = false
    toast.error(error.response.data.error)
    // console.log(error.response.data)
  }
}
</script>
<template>
  <div class="card w-96 bg-base-100 shadow-xl">
    <button
      @click="props.changeLogin"
      class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
    >
      ✕
    </button>
    <div class="card-body">
      <h2 class="card-title">Iniciar sesión</h2>
      <p v-if="loading" class="loading loading-dots loading-lg"></p>
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
          <button type="submit" class="btn btn-accent btn-sm">Ingresar</button>
        </div>
        <span class="flex justify-between mt-4">
          ¿No tienes cuenta?
          <span class="text-[#1a9389] cursor-pointer" @click="props.changeRegister"
            >Regístrate</span
          >
        </span>
      </form>
    </div>
  </div>
</template>

<style scoped>
.btn-sm {
  /* padding: 20px 20px !important; */
  height: 40px !important;
  padding: 0 1.5rem;
}
</style>
