<template>
  <i class="rounded-full h-6 w-6" :class="{'border': bgColor === '#fff'}" :style="`color: ${textColor}; backgroundColor: ${bgColor}`">
    <svg v-if="selected" class="mx-auto w-3/4 mt-[2px]" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>check</title><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>
  </i>
</template>

<script>
export default {
  props: {
    bgColor: String,
    textColor: String,
    selected: {
      type: Boolean,
      default: true
    }
  }
}
</script>