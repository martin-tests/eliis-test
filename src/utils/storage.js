import localForage from 'localforage'

const EVENTS_KEY = 'et-events';

const persistedEventFields = ['id', 'title', 'start', 'type'];

const storageInstance = localForage.createInstance({
  name: 'eliis-test',
  storeName: 'el-test-store'
});

export const persistEvents = (events) => { 
  const harmonizedEvents = events.map(event => {
    const harmonizedEvent = {};
    for (const field of persistedEventFields) {
      harmonizedEvent[field] = event[field];
    }
    return harmonizedEvent;
  });
  storageInstance.setItem(EVENTS_KEY, JSON.stringify(harmonizedEvents));
}
export const loadPersistedEvents = async () => { 
  const events = await storageInstance.getItem(EVENTS_KEY);
  return events ? JSON.parse(events) : [];
}