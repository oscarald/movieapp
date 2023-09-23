<script setup>
import { ref } from 'vue'
import axios from 'axios'
import CardComponent from '../components/CardComponent.vue'
import MovieDetailsComponent from '../components/MovieDetailComponent.vue'
const search = ref('')
const info = ref({
  Title: 'Película no encontrada',
  Poster:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png'
})
const loading = ref(false)
const modal = ref(false)
let timer = null
const getMovie = async () => {
  try {
    loading.value = true
    const { data } = await axios.get(`http://www.omdbapi.com/?apikey=6e3aea5b&t=${search.value}`)
    if (data.Response === 'False') {
      info.value = {
        Title: 'Película no encontrada',
        Poster:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png'
      }
    } else {
      info.value = data
    }
    loading.value = false
  } catch (error) {
    console.log(error)
  }
}
const changeModal = () => {
  modal.value = !modal.value
}
const startSearch = () => {
  if (search.value.length > 2) {
    clearTimeout(timer)
    timer = setTimeout(performSearch, 500)
  }
}
const performSearch = () => {
  getMovie()
}
</script>
<template>
  <div class="my-5">
    <div class="flex justify-center">
      <input
        v-model="search"
        type="text"
        placeholder="Buscar Películas"
        class="input input-bordered w-full max-w-xs center"
        @input="startSearch"
      />
    </div>
    <span v-if="loading" class="loading loading-dots loading-lg"></span>
    <div class="my-10 grid grid-cols-4 gap-4">
      <CardComponent
        :title="info.Title"
        :poster="info.Poster"
        :genre="info.Genre"
        :id="info.imdbID"
        :showDetails="changeModal"
      />
    </div>
  </div>
  <div class="modal" :class="{ 'modal-open': modal }">
    <MovieDetailsComponent :close="changeModal" :id="info.imdbID" />
  </div>
</template>

<style></style>
