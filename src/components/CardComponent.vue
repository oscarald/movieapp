<script setup>
const props = defineProps({
  title: String,
  poster: String,
  genre: String,
  id: String,
  showDetails: Function
})
</script>
<template>
  <div class="card w-64 bg-base-100 shadow-xl">
    <figure>
      <img :src="props.poster === 'N/A'
          ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png'
          : props.poster
        " alt="movie" class="object-cover h-64 w-64" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ props.title }}</h2>
      <p class="badge badge-neutral text-xs" v-if="genre">{{ props.genre }}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-accent" :disabled="!id" @click="showDetails">Ver más</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
