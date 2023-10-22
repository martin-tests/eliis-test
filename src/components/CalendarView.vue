<template>
  <div>
    <p>Click on a date to create an event on that day</p>
    <EventEditor v-show="showModal" :event="editingEvent" @save-event="handleEventSave" @close="closeEventEdit" @delete="deleteEvent" />
    <FullCalendar :options="computedOptions" />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import EventEditor from '@/components/EventEditor.vue'

export default {
  components: {
    FullCalendar,
    EventEditor 
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        customButtons: {
          addEventButton: {
            text: 'Add event',
            click: this.handleNewEvent
          }
        },
        headerToolbar: {
          left: 'addEventButton',
          center: 'title',
          right: 'prev,next'
        },
        eventTimeFormat: {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        },
        timeZone: 'local',
        editable: true,
        selectable: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick
      },
      showModal: false,
      emptyEvent: {
        id: '',
        title: '',
        start: '',
        type: ''
      },
      editingEvent: this.emptyEvent
    }
  },
  computed: {
    computedOptions() {
      return {
        ...this.calendarOptions,
        events: this.$store.getters.getEventsForCalendar
      }
    }
  },
  methods: {
    openEventEdit(event) {
      this.editingEvent = event || { ...this.emptyEvent };
      this.showModal = true;
    },
    closeEventEdit() {
      this.showModal = false;
      this.editingEvent = this.emptyEvent;
    },
    handleNewEvent() {
      this.openEventEdit();
    },
    handleDateSelect(selectInfo) {
      this.openEventEdit({start: selectInfo.startStr});
    },
    handleEventClick(clickInfo) {
      const event = this.$store.getters.getEventById(clickInfo.event.id);
      this.openEventEdit(event);
    },
    handleEventSave(event) {
      this.$store.dispatch('addOrModifyEvent', event);
      this.closeEventEdit();
    },
    deleteEvent() {
      this.$store.dispatch('deleteEvent', this.editingEvent.id);
      this.closeEventEdit();
    }
  }
}
</script>