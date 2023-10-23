<template>
  <div class="flex flex-col items-center justify-center">
    <div class="absolute inset-0 bg-black opacity-50 z-10" @click.capture="$emit('close')"></div>
    <div class="absolute top-20 bg-white z-20 p-4 rounded-md">
      <form class="text-14" @submit.prevent="handleSubmit">
        <div class="text-red-500" v-if="message">{{ message }}</div>
        <div class="form-row">
          <label class="label" for="eventTitle">Title</label>
          <input class="w-full" type="text" v-model="title" id="eventTitle" />
        </div>
        <div class="form-row">
          <label class="label" for="eventStartDate">Type</label>
          <select class="w-full" v-model="type">
            <option v-for="evtType in eventTypes" :key="evtType.name" :value="evtType.name">
              {{ evtType.name }}
            </option>
          </select>
        </div>
        <div class="form-row">
          <label class="label" for="eventStartDate">Start date</label>
          <input class="w-full text-sm" type="date" v-model="startDate" id="eventStartDate" />
        </div>
        <div class="form-row">
          <label class="label" for="eventStartTime">Start time</label>
          <div>
            <input class="" type="time" v-model="startTime" id="eventStartTime" />
            <UIButton type="button" button-style="link" @click="startTime = ''">Remove</UIButton>
          </div>
        </div>
        <div class="flex justify-end mt-10">
          <UIButton type="submit">Save</UIButton>
          <UIButton type="button" button-style="link" @click="$emit('close')">Cancel</UIButton>
          <UIButton type="button" button-style="danger" @click="$emit('delete')">Delete</UIButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { getDateString, getTimeString, getDateSaveStr } from '@/utils/dateTime';
import { eventTypes } from '@/utils/events';
import UIButton from '@/components/ui/UIButton.vue';

export default {
  components: { UIButton },
  props: {
    event: {
      type: Object
    }
  },
  data() {
    return {
      eventTypes,
      title: '',
      startDate: '',
      startTime: '',
      type: eventTypes[0].name,
      message: ''
    }
  },
  methods: {
    handleSubmit() {
      this.message = '';
      if (this.title.trim().length === 0) {
        this.message = 'Please fill in event title';
        return;
      }
      if (this.startDate.trim().length === 0) {
        this.message = 'Please fill in start date';
        return;
      }
      const dateSaveStr = getDateSaveStr(this.startDate, this.startTime);
      const event = {
        id: this.event.id,
        title: this.title,
        start: dateSaveStr,
        type: this.type
      }
      this.$emit('save-event', event);
    }
  },
  watch: {
    event: function (val) {
      this.title = val && val.title || '';
      this.startDate = val && val.start ? getDateString(val.start) : '';
      this.startTime = val && val.start ? getTimeString(val.start) : '';
      this.type = val && val.type || eventTypes[0].name;
    }
  }
}
</script>

<style scoped>
.form-row {
  @apply grid grid-cols-[1fr_2fr] items-center h-6 m-2;
}
.label {
  @apply text-sm font-semibold text-gray-500 mr-2;
}
</style>