<template>
  <form @submit.prevent="handleSubmit">
    <div v-if="message">{{ message }}</div>
    <div>
      <label for="eventTitle">Event title</label>
      <input type="text" v-model="title" id="eventTitle" />
    </div>
    <div>
      <label for="eventStartDate">Event type</label>
      <select v-model="type">
        <option v-for="evtType in eventTypes" :key="evtType.name" :value="evtType.name">
          {{ evtType.name }}
        </option>
      </select>
    </div>
    <div>
      <label for="eventStartDate">Start date</label>
      <input type="date" v-model="startDate" id="eventStartDate" />
    </div>
    <div>
      <label for="eventStartTime">Start time</label>
      <input type="time" v-model="startTime" id="eventStartTime" />
      <button type="button" @click="startTime = ''">Remove time</button>
    </div>
    <div>
      <input type="submit" value="Save" />
      <button type="button" @click="$emit('close')">Cancel</button>
      <button type="button" @click="$emit('delete')">Delete</button>
    </div>
  </form>
</template>

<script>
import { getDateString, getTimeString, getDateSaveStr } from '@/utils/dateTime';
import { eventTypes } from '@/utils/events';

export default {
  props: {
    event: {
      type: Object
    }
  },
  data() {
    return {
      title: '',
      startDate: '',
      startTime: '',
      type: '',
      eventTypes,
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
      this.type = val && val.type || '';
    }
  }
}
</script>