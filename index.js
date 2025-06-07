import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, setDoc, doc } from "firebase/firestore";

import dotenv from "dotenv";
dotenv.config();

import { addVehicle, updateVehicle, deleteVehicle } from "./functions/manageVehicles.js";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID, 
    storageBucket: process.env.STORAGE_BUCKET, 
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

const newVehicle = {
    "anoFabricacao": 1998,
    "marca": "Mercedes Benz",
    "anoModelo": 1998,
    "modelo": "Sprinter 310D",
    "placa": "IPE-5358",
    "secretaria": "Obras"
}


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function listDocuments() {
    try {
        const querySnapshot = await getDocs(collection(db, "processos"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        });
    } catch (error) {
        console.error("Error listing documents: ", error);
    }
}

// search for a specific document inside a collection
async function searchDocument(collection, documentId) {
    try {
        const docRef = doc(db, collection, documentId); // Use doc to create a document reference
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
            console.log(`Document found: ${JSON.stringify(docSnapshot.data())}`);
            return docSnapshot.data();
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error searching document: ", error);
    }
}

searchDocument("veiculos", "IHO-4243").then((res) => console.log(res)); // Replace with the actual document ID you want to search

updateVehicle(db, "IHO-4243", newVehicle).then(() => console.log("Update completed"));

searchDocument("veiculos", "IHO-4243").then((res) => console.log(res)); // Replace with the actual document ID you want to search

deleteVehicle(db, "IPE-5358");