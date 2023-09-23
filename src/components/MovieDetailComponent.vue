<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

const info = ref({})
const props = defineProps({
  id: String,
  close: Function
})

watch(props, async () => {
  try {
    const { data } = await axios.get(`http://www.omdbapi.com/?apikey=6e3aea5b&i=${props.id}`)
    info.value = data
  } catch (error) {
    console.log(error)
  }
})
onMounted(async () => {})
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
          info.Poster === 'N/A'
            ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png'
            : info.Poster
        "
        alt="Movie"
        class="object-cover h-72 w-72"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ info.Title }}</h2>
      <p><span class="text-gray-700">Año: </span>{{ info.Year }}</p>
      <p><span class="text-gray-700">Director: </span>{{ info.Director }}</p>
      <p><span class="text-gray-700">Actores: </span>{{ info.Actors }}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Añadir a mis películas</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
