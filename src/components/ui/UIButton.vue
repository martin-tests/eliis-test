<template>
  <button class="button" :class="computedClasses" :type="type" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button'
    },
    buttonStyle: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    computedClasses() {
      return `button-${this.buttonStyle}`;
    }
  }
}
</script>

<style scoped>
.button {
  @apply text-sm rounded-sm py-1 px-3 mx-1;
}
.button-primary {
  @apply text-white bg-primary;
}
.button-link {
  @apply underline text-gray-600;
}
.button-danger {
  @apply text-white bg-red-400;
}
</style>