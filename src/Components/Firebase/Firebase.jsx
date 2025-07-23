import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, collection, getDocs } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyCuspq4r8HA-tsw2e8W_cnAOoIfEc1BIf0",
    authDomain: "olx-clone-dcb81.firebaseapp.com",
    projectId: "olx-clone-dcb81",
    storageBucket: "olx-clone-dcb81.firebasestorage.app",
    messagingSenderId: "507293043857",
    appId: "1:507293043857:web:a27671a3863dc36e07c330"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const storage = getStorage()
const fireStore = getFirestore()


const fetchFromFireStore = async () => {
    try {
        const productsCollection = collection(fireStore, "products");
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        console.log("Products fetched from FireStore:", productsList);
        return productsList;
    } catch (error) {
        console.error("Error fetching products from FireStore:", error);
    }
}

export {
    auth,
    provider,
    storage,
    fireStore,
    fetchFromFireStore
}