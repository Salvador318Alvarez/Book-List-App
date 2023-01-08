import {initializeApp} from 'firebase/app'
import {
    getFirestore, collection, getDocs
} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDDEL6qaZwVaC-atyuWzkCfVsbRkfD5L5w",
    authDomain: "js-practice318.firebaseapp.com",
    projectId: "js-practice318",
    storageBucket: "js-practice318.appspot.com",
    messagingSenderId: "290811118415",
    appId: "1:290811118415:web:b96bdb73638f41b6e8bb3a"
  };

//init firebase app  
initializeApp(firebaseConfig)

//init services
const db = getFirestore()
 
//collection reference
const colRef = collection(db, 'books') //colRef:collection reference

//get collection data
getDocs(colRef)
.then((snapshot) => {
    console.log(snapshot.docs)
    let books = []
    snapshot.docs.forEach((doc)=> {
        books.push({...doc.data(), id: doc.id})
    })
    console.log(books);
})
.catch(err => {
    console.log(err.message);
})