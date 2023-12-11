import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}

document.addEventListener('click', async () => {
  const content = document.getElementById('editor').value;

  try {
    await addItem(content);
    console.log('Content saved to IndexedDB');
  } catch (error) {
    console.error('Error saving content:', error);
  }
});

window.addEventListener('load', async () => {
  try {
    const content = await getItem();
    if (content) {
      document.getElementById('editor').value = content;
    }
  } catch (error) {
    console.error('Error retrieving content:', error);
  }
});