import app from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyCuFtvR17QLC7vRkssdoBBTnEvOMh68Jfg",
    authDomain: "find-a-friend-6d4e9.firebaseapp.com",
    databaseURL: "https://find-a-friend-6d4e9-default-rtdb.firebaseio.com",
    projectId: "find-a-friend-6d4e9",
    storageBucket: "find-a-friend-6d4e9.appspot.com",
    messagingSenderId: "171588603071",
    appId: "1:171588603071:web:b1f4e93a422256de3e0a0a"
};

app.initializeApp(firebaseConfig);

class Firebase {
    constructor() {
        this.database = app.database();
        this.storage = app.storage();
        this.auth = app.auth();
    }

    debugError(error) {
        alert(`${error.code} error has occurred - ${error.message}`);
    }

    writeDatabase(root, json) {
        this.database.ref(root).set(json)
            .catch(this.debugError);
    }

    readDatabase(root, event, callback) {
        this.database.ref(root).on(event, callback);
    }

    onUserActive(callback, fallback=null) {
        this.auth.onAuthStateChanged((userInstance) => {
            if (userInstance != null) {
                callback(userInstance.uid);
            } else if (fallback != null) {
                fallback();
            }
        })
    }

}



export default Firebase