import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, onValue } from 'firebase/database';

const firebaseConfig = {
    apiKey: '你的API金鑰',
    authDomain: '你的專案.firebaseapp.com',
    databaseURL: 'https://你的專案.firebaseio.com',
    projectId: '你的專案ID',
    storageBucket: '你的專案.appspot.com',
    messagingSenderId: '...',
    appId: '...'
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export { ref, get, set, onValue };
