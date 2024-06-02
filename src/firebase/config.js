// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZoUxgTvIxe9wgKeohxZvHSigwz-3_sOI",
  authDomain: "storeuptc.firebaseapp.com",
  projectId: "storeuptc",
  storageBucket: "storeuptc.appspot.com",
  messagingSenderId: "887768715977",
  appId: "1:887768715977:web:3cdbeefa018ff7c160f318"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export async function uploadFile(file) {
    const storageRef = ref(storage, 'images/' + file.name)
    const uploadTask = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(uploadTask.ref)
    return downloadURL
}
export async function deleteFile(file) {
    const storageRef = ref(storage, 'images/' + file.name)
    await deleteObject(storageRef)
}
