import {initializeApp} from 'firebase/app'
import {
    getFirestore, collection, onSnapshot, //before realtime getDocs
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
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
 
//collection reference  //colRef:collection reference
const colRef = collection(db, 'books') 
   // const output = document.querySelector('.output') //I added

//queries
const q= query(colRef, where("author", "!=", "Peter Jackson"), orderBy("author", "asc" ) )

//realtime collection data
onSnapshot(q/*  or q */, (snapshot) => {
    let books = []
    const output = document.querySelector('.output') //I added
    snapshot.docs.forEach(doc => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
    output.innerHTML = ''
    books.forEach((book,index) =>{
    output.innerHTML += `<p>${index+1}. ${book.title} by ${book.author} with an id of: ${book.id}</p>`
    })
  })
  


// adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
  .then(() => {
    addBookForm.reset()
  })
})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})

const updateForm = document.querySelector('.update')

updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let docRef = doc(db, 'books', updateForm.id.value)

  updateDoc(docRef, {
    title: updateForm.title.value,
    author: updateForm.author.value
  })
  .then(() => {
    updateForm.reset()
  })
})

// // fetching a single document (& realtime)
// const docRef = doc(db, 'books', 'gGu4P9x0ZHK9SspA1d9j')

// // getDoc(docRef)
// //   .then(doc => {
// //     console.log(doc.data(), doc.id)
// //   })

// onSnapshot(docRef, (doc) => {
//   console.log(doc.data(), doc.id)
// })

//get collection data
// getDocs(colRef)
// .then((snapshot) => {
//     //console.log(snapshot.docs) to get all info
//     let books = []
//     snapshot.docs.forEach((doc)=> {
//         books.push({...doc.data(), id: doc.id})
//     })
//     console.log(books);
//     books.forEach((book,index) =>{
//     output.innerHTML += `<p>${index+1}. ${book.title} by ${book.author}</p>`
//     })
// })
// .catch(err => {
//     console.log(err.message);
// })