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

  const contentDB = await openDB('jate', 1);

  const tx = contentDB.transaction('jate', 'readwrite');

  const store  = tx.objectStore('jate');

  const request = store.add({content});

  const result = await request;

  console.error('putDb not implemented');
  console.log('Data putted to the database', result);
  return result;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  const contentDB = await openDB('jate', 1);

  const tx = contentDB.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;

  console.error('getDb not implemented');
  console.log('result.value', result);

  const content = result[result.length -1].content;
  return content;
};

initdb();
