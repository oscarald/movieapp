<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import { useAuthStore } from '../stores/authStore.js'

const authStore = useAuthStore()

const info = ref({})
const props = defineProps({
  close: Function,
  title: String,
  year: String,
  genre: String,
  director: String,
  poster: String,
  actors: String,
  imdbID: String
})

const addFavorite = async () => {
  const favorite = {
    title: info.value.Title,
    year: info.value.Year,
    genre: info.value.Genre,
    director: info.value.Director,
    poster: info.value.Poster,
    actors: info.value.Actors,
    imdbID: info.value.imdbID
  }
  try {
    const { data } = await axios.post('http://localhost:4000/api/movie/addfavorite', favorite, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    toast.success(`${data.message}`)
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <div class="card w-72 bg-base-100 shadow-xl">
    <button
      @click="props.close"
      class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-slate-100"
    >
      ✕
    </button>
    <figure>
      <img
        :src="
          props.poster === 'N/A'
            ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png'
            : props.poster
        "
        alt="Movie"
        class="object-cover h-72 w-72"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ props.title }}</h2>
      <p><span class="text-gray-700">Año: </span>{{ props.year }}</p>
      <p><span class="text-gray-700">Director: </span>{{ props.director }}</p>
      <p><span class="text-gray-700">Actores: </span>{{ props.actors }}</p>
      <div class="card-actions justify-end">
        <button v-if="authStore.token" class="btn btn-accent" @click="addFavorite">
          Quitar favoritos
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
