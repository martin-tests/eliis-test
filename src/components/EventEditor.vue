<template>
  <div class="flex flex-col items-center justify-center">
    <div class="absolute inset-0 bg-black opacity-50 z-10" @click.capture="$emit('close')"></div>
    <div class="absolute top-20 bg-white z-20 p-4 rounded-md">
      <form class="text-14" @submit.prevent="handleSubmit">
        <div class="text-red-500" v-if="message">{{ message }}</div>
        <div class="form-row">
          <label class="label" for="eventTitle">Title</label>
          <input class="w-full pl-1" type="text" v-model="title" id="eventTitle" />
        </div>
        <div class="form-row">
          <label class="label" for="eventStartDate">Type</label>
          <select class="w-full" v-model="type">
            <option v-for="evtType in eventTypes" :key="evtType.name" :value="evtType.name">
              {{ evtType.name }}
            </option>
          </select>
        </div>
        <div class="form-row-datetime">
          <span class="label">Start</span>
          <div>
            <label class="label-sm" for="eventStartDate">Date</label>
            <input class="text-sm w-fit h-6" type="date" v-model="startDate" id="eventStartDate" />
          </div>
          <div class="flex flex-col ml-2">
            <label class="label-sm" for="eventStartTime">Time</label>
            <div class="flex items-center">
              <input class="w-fit h-6" type="time" v-model="startTime" id="eventStartTime" />
              <UITimeOff title="Clear time" @click="startTime = ''" />
            </div>
          </div>
        </div>
        <div class="form-row-datetime">
          <span class="label">End</span>
          <div>
            <label class="label-sm" for="eventEndDate">Date</label>
            <input class="text-sm w-fit h-6" type="date" v-model="endDate" id="eventEndDate" />
          </div>
          <div class="flex flex-col ml-2">
            <label class="label-sm" for="eventEndTime">Time</label>
            <div class="flex items-center">
              <input class="w-fit h-6" type="time" v-model="endTime" id="eventEndTime" />
              <UITimeOff title="Clear time" @click="endTime = ''" />
            </div>
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
import UITimeOff from '@/components/ui/UITimeOff.vue';

export default {
  components: { UIButton, UITimeOff },
  props: {
    event: {
      type: Object
    }
  },
  data() {
    return {
      eventTypes,
      title: this.event.title || '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      type: eventTypes[0].name,
      message: ''
    }
  },
  methods: {
    populateForm(val) {
      this.title = val && val.title || '';
      this.startDate = val && val.start ? getDateString(val.start) : '';
      this.endDate = val && val.end ? getDateString(val.end) : '';
      this.startTime = val && val.start ? getTimeString(val.start) : '';
      this.endTime = val && val.end ? getTimeString(val.end) : '';
      this.type = val && val.type || eventTypes[0].name;
    },
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
      const dateStartSaveStr = getDateSaveStr(this.startDate, this.startTime);
      const dateEndSaveStr = getDateSaveStr(this.endDate, this.endTime);
      const event = {
        id: this.event.id,
        title: this.title,
        start: dateStartSaveStr,
        end: dateEndSaveStr,
        type: this.type
      }
      this.$emit('save-event', event);
    }
  },
  created() {
    this.populateForm(this.event);
  },
  watch: {
    event: function (val) {
      this.populateForm(val);
    }
  }
}
</script>

<style scoped>
.form-row {
  @apply grid grid-cols-[1fr_4fr] items-center h-6 mx-2 my-3;
}
.form-row-datetime {
  @apply grid grid-cols-[1fr_2fr_2fr] items-center mx-2 my-3;
}
.label {
  @apply text-right text-sm font-roboto font-semibold text-gray-500 mr-4;
}
.label-sm {
  @apply block text-xs font-semibold text-gray-500 mr-2;
}
</style>