<template>
  <div id="app" class="max-w-10xl mx-auto">
    <img class="logo" alt="Logo" src="@/assets/eliis_logo.png" width="104" height="34">
    <CalendarView />
  </div>
</template>

<script>
import CalendarView from '@/components/CalendarView.vue';

export default {
  name: 'App',
  components: {
    CalendarView
  }
}
</script>

<style>
#app {
  font-family: Open Sans, sans-serif;
}
.logo {
  width: 104px;
  height: auto;
  margin: 1rem;
}
</style>
