import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // database connection & version currently being used.
  const contactDB = await openDB('jate', 1);
  // transaction and data priviledges; this is what will allow the method to accept the content.
  const tx = contactDB.transaction('jate', 'readwrite');
  // setup of the object store.
  const store = tx.objectStore('jate');
  // this updates the data in the database.
  const request = store.put({ id: 1, value: content });
  // confirm the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
  // this log will appear if the request didn't go through.
  console.error('putDb not implemented')
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // database connection & version currently being used.
  const contactDB = await openDB('jate', 1);
  // transaction and data priviledges; this will only allow 'read' priviledges to the transaction.
  const tx = contactDB.transaction('jate', 'readonly');
  // setup of the object store.
  const store = tx.objectStore('jate');
  // this retrieves all the data in the database.
  const request = store.getAll();
  // confirm the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
  // this log will appear if the request didn't go through.
  console.error('getDb not implemented')
};

initdb();
