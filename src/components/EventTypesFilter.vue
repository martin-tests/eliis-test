
<template>
  <div>
    <h3 class="uppercase font-bold">Types</h3>
    <div>
      <div v-for="evtType of eventTypesFilter" class="flex my-1 cursor-pointer" :key="evtType.name" @click="toggle(evtType.name)">
        <UIBadge :type="evtType.name" :bg-color="evtType.bgColor" :text-color="evtType.textColor" :selected="evtType.selected"  />
        <div class="ml-2" :class="{'opacity-70': !evtType.selected}">{{ evtType.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import UIBadge from './ui/UIBadge.vue';

export default {
  components: { UIBadge },
  computed: {
    eventTypesFilter() {
      return this.$store.getters.getEventTypesFilter;
    }
  },
  methods: {
    toggle(evtType) {
      this.$store.commit('toggleEventTypeFilter', evtType);
    }
  }
}
</script>