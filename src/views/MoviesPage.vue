<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CardComponent from '../components/CardComponent.vue'
import DetailMovie from '../components/DetailMovie.vue'

import { useAuthStore } from '../stores/authStore.js'

const authStore = useAuthStore()

const loading = ref(false)
const modal = ref(false)
const movies = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get('http://localhost:4000/api/movie/favorites', {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })
    movies.value = data
    // console.log(data)
  } catch (error) {
    console.log(error)
    //console.log(error.response.data.error)
  }
})

const changeModal = () => {
  modal.value = !modal.value
}
</script>
<template>
  <div class="my-5">
    <div class="flex justify-center">Mis Películas favoritas</div>
    <span v-if="loading" class="loading loading-dots loading-lg"></span>
    <div class="my-10 flex flex-wrap gap-8 justify-center">
      <div v-for="movie in movies" :key="movie.movieId._id">
        <CardComponent
          :title="movie.movieId.title"
          :poster="movie.movieId.poster"
          :genre="movie.movieId.genre"
          :id="movie.movieId.imdbID"
          :showDetails="changeModal"
        />
        <div class="modal" :class="{ 'modal-open': modal }">
          <DetailMovie
            :close="changeModal"
            :title="movie.movieId.title"
            :poster="movie.movieId.poster"
            :genre="movie.movieId.genre"
            :id="movie.movieId.imdbID"
            :director="movie.movieId.director"
            :actors="movie.movieId.actors"
            :year="movie.movieId.year"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.input:focus {
  box-shadow: 0 0 3px #1a9389;
  outline: none;
}
</style>
