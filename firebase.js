const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, get } = require('firebase/database');

const firebaseConfig = {
  apiKey: "AIzaSyCTTvjswX0o1lmCj_g8y2z4ysWXSeu-deM",
  authDomain: "iot-grio9-52213.firebaseapp.com",
  databaseURL: "https://iot-grio9-52213-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iot-grio9-52213",
  storageBucket: "iot-grio9-52213.appspot.com",
  messagingSenderId: "809861422355",
  appId: "1:809861422355:web:d66e279013b8aa63ff4ee6"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

module.exports = { database, ref, set, get };
