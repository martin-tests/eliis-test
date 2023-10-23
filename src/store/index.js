import Vue from 'vue';
import Vuex from 'vuex'; 
import { eventTypes } from '@/utils/events'
import { loadPersistedEvents, persistEvents } from '@/utils/storage'

Vue.use(Vuex)

const formatEventsForCalendar = (events) => {
  return events.map(event => {
    if (event.type && event.type.length) {
      event.backgroundColor = eventTypes.find(e => e.name === event.type).bgColor;
      event.textColor = eventTypes.find(e => e.name === event.type).textColor;
    }
    return event;
  });
}

const initializeEventTypeFilter = () => {
  return eventTypes.map(eventType => ({ ...eventType, selected: true }));
}

export default new Vuex.Store({
  state: {
    events: await loadPersistedEvents(),
    activeEventTypeFilter: initializeEventTypeFilter()
  },
  getters: {
    getEventsForCalendar: state => formatEventsForCalendar(state.events.filter(event => state.activeEventTypeFilter.find(eventType => eventType.name === event.type && eventType.selected))),
    getEventById: state => id => state.events.find(event => event.id === id),
    getEventTypesFilter: state => state.activeEventTypeFilter
  },
  mutations: {
    addEvent (state, event) {
      event.id = self.crypto.randomUUID();
      state.events.push(event);
      persistEvents(state.events);
    },
    modifyEvent (state, event) {
      const idx = state.events.findIndex(e => e.id === event.id);
      if (idx === -1) return;
      state.events.splice(idx, 1, event);
      persistEvents(state.events);
    },
    deleteEvent (state, id) {
      const idx = state.events.findIndex(event => event.id === id);
      if (idx === -1) return;
      state.events.splice(idx, 1);
      persistEvents(state.events);
    },
    toggleEventTypeFilter (state, name) { 
      const idx = state.activeEventTypeFilter.findIndex(eventType => eventType.name === name);
      if (idx === -1) return;
      state.activeEventTypeFilter[idx].selected = !state.activeEventTypeFilter[idx].selected;
    }
  },
  actions: {
    addOrModifyEvent ({ commit }, event) { 
      if (event.id && event.id.length) {
        commit('modifyEvent', event);
        return;
      } else {
        commit('addEvent', event);
      }
    },
    deleteEvent ({ commit }, id) {
      commit('deleteEvent', id);
    }
  }
})
