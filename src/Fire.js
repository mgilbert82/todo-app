import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAVXlhOw1anEYqNLoPQGBAq0ofeVCed1Cs",
  authDomain: "todo-list-family.firebaseapp.com",
  projectId: "todo-list-family",
  storageBucket: "todo-list-family.appspot.com",
  messagingSenderId: "750906072954",
  appId: "1:750906072954:web:efe59e4fe7a55f06fd00c3"
};

export default class Fire {
    constructor(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null);
            } else {
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error);
                });
            }
        })
    }

    get ref() {
        return firebase.firestore().collection("lists");
    }

    getLists(callback) {
        let ref = this.ref.orderBy("name");
        this.unsubscribe = ref.onSnapshot(snapshot => {
            let lists = [];
            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() })
            });
            callback(lists);
        }, function(error) {
            callback(error);
        });
    }

    addList(list) {
        this.ref.add(list);
    }

    deleteList(list) {
        this.ref.doc(list.id).delete();
    }

    updateList(list) {
        this.ref.doc(list.id).update(list);
    }

    detach() {
        this.unsubscribe();
    }
}