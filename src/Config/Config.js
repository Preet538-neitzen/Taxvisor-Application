import firebase from 'firebase';

 var config = {
    apiKey: "Enter your api key here along with the other credentials",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};
const fire = firebase.initializeApp(config);
export default  fire
