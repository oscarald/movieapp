<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify';

const props = defineProps({
    changeLogin: Function,
    changeRegister: Function
})
const info = ref({
    username: '',
    names: '',
    firstLastname: '',
    secondLastname: '',
    password: '',
})
const onSubmit = async () => {
    try {
        const { data } = await axios.post('http://localhost:4000/api/user/register', info.value)
        console.log(data)
        toast('Wow so easy !');
    } catch (error) {
        console.log(error)
    }
}

</script>
<template>
    <div class="card w-96 bg-base-100 shadow-xl">
        <button @click="props.changeLogin" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">
            ✕
        </button>
        <div class="card-body">
            <h2 class="card-title">Iniciar sesión</h2>
            <form @submit.prevent="onSubmit">
                <input v-model="info.username" type="text" placeholder="Nombre de usuario"
                    class="input input-bordered w-full max-w-xs" />
                <input v-model="info.names" type="text" placeholder="Nombres"
                    class="input input-bordered w-full max-w-xs mt-4" />
                <input v-model="info.firstLastname" type="text" placeholder="Primer Apellido"
                    class="input input-bordered w-full max-w-xs mt-4" />
                <input v-model="info.secondLastname" type="text" placeholder="Segundo Apellido"
                    class="input input-bordered w-full max-w-xs mt-4" />
                <input v-model="info.password" type="password" placeholder="Contraseña"
                    class="input input-bordered w-full max-w-xs mt-4" />
                <div class="card-actions justify-end">
                    <button type="submit" class="btn btn-accent btn-sm ">Ingresar</button>
                </div>
                <span class="flex justify-between mt-4">
                    ¿No tienes cuenta? <span class="text-[#1a9389] cursor-pointer"
                        @click="props.changeRegister">Regístrate</span>
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