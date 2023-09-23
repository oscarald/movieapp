import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref({})
  const token = ref('')
  function saveUser(us) {
    console.log(us)
    user.value = us
    token.value = us.token
    //otro.value = us
  }
  function logout() {
    user.value = {}
    token.value = ''
  }

  return { user, token, saveUser, logout }
})
