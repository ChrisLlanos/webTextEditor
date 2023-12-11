import { openDB } from 'idb';

export const initdb = async () => {
  try {
    const db = await openDB('jate', 1);
    if (!db.objectStoreNames.contains('jate')) {
      const versionChange = db.transaction.versionchange;
      versionChange.addEventListener('complete', (event) => {
        const upgradedDB = event.target.result;
        upgradedDB.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
        console.log('jate database created');
      });
    } else {
      console.log('jate database already exists');
    }
  } catch (error) {
    console.error('Error initializing the database:', error);
    throw error; // Re-throw the error
  }
};

// Save content to IndexedDB
export const addItem = async (content) => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  try {
    const entry = { content };
    const id = await store.add(entry);
    console.log(`Added content with ID: ${id}`);
  } catch (error) {
    console.error('Error adding content:', error);
  }
};

// Retrieve content from IndexedDB
export const getItem = async () => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  try {
    const entries = await store.getAll();
    if (entries.length > 0) {
      return entries[entries.length - 1].content;
    }
    return null;
  } catch (error) {
    console.error('Error getting content:', error);
    return null;
  }
};

// Export the getDb and putDb functions
export const getDb = getItem;
export const putDb = addItem;
