<template>
  <div class="mt-4 mx-2">
    <h1 class="text-3xl">Event calendar</h1>
    <p class="text-gray-400 mt-2">Click on a date to create an event on that day</p>
    <EventEditor v-show="showModal" :event="editingEvent" @save-event="handleEventSave" @close="closeEventEdit" @delete="deleteEvent" />
    <div class="flex mt-4">
      <EventTypesFilter class="hidden md:block p-4 border-r-[1px] border-r-gray-200" />
      <FullCalendar class="flex-grow p-4" :options="computedOptions" />
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import EventEditor from '@/components/EventEditor.vue'
import EventTypesFilter from '@/components/EventTypesFilter.vue'

export default {
  components: {
    FullCalendar,
    EventEditor,
    EventTypesFilter
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