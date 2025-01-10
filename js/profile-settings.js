// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore , doc , setDoc, getDoc, updateDoc, query, where, collection, getDocs  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDPvzBikfTcivDoXQAuASq32ssgW_cQXc",
  authDomain: "socialq-a967b.firebaseapp.com",
  projectId: "socialq-a967b",
  storageBucket: "socialq-a967b.firebasestorage.app",
  messagingSenderId: "859948808790",
  appId: "1:859948808790:web:977a1f9be0378f3e5159f7",
  measurementId: "G-3MS5FM3EPG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const uid = localStorage.getItem('uid');


export function logoutUser() {
    // Loop through all keys in localStorage and remove them
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i); // Get the key name
        localStorage.removeItem(key);    // Remove the item with that key
    }

    signOut(auth).then(() => {
      console.log("User logged out successfully");
    }).catch((error) => {
      console.error("Error during logout:", error.message);
    });
    window.location.href = "../html/homev2.html";

  }

async function loadAccountData(){
 // Reference the user's document
    const userDocRef = doc(db, "users", uid);
    try {
        // Fetch the document
        const userDoc = await getDoc(userDocRef);

        // Check if the document exists
    if (userDoc.exists()) {
        // Get the data and return it
        const userData = userDoc.data();
        return userData;
    } else {
        console.log("No such document!");
    }
    } catch (error) {
        console.error("Error fetching user data:", error.message);
    }
}



export const firstName = "userData.firstName";
export const lastName = "mcintos";
// export const email = userData.email;
// export const phone = userData.phone;
// export const platform = userData.platform;
// export const content = userData.content;
// export const type = userData.type;
// export const followers = userData.followers;
// export const gender = userData.gender;



async function populateProfileSettings() {
    const userData = await loadAccountData();



    if (userData) {
        // basic info
        document.getElementById('firstName').textContent = userData.firstName || "N/A";
        document.getElementById('lastName').textContent = userData.lastName || "N/A";
        document.getElementById('email').textContent = userData.email || "N/A";
        document.getElementById('profile-description').textContent = userData.profileDescription || "Write about yourself.";
        document.getElementById('profile-description').placeholder = userData.profileDescription || "Write about yourself.";
        //preferences
        //acount settings
        document.getElementById('platform').textContent = userData.platform || "N/A";
        document.getElementById('content').textContent = userData.content || "N/A";
        document.getElementById('type').textContent = userData.type || "N/A";
        document.getElementById('followers').textContent = userData.followers || "N/A";
        document.getElementById('gender').textContent = userData.gender || "N/A";
    } else {
        console.log("Failed to load user data.");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname;

    if (currentPage.endsWith("profile_settings.html")) {
        console.log("You are on the profile settings page.");
        populateProfileSettings();
        textarea.addEventListener("keydown", function(event) {
            const docRef = doc(db, "users", uid);
            if (event.key === "Enter") {
                console.log(textarea.value);
                updateAbout(textarea.value);
            }
        })
    } else if (currentPage.endsWith("profilev2.html")) {
        console.log("You are on the profile page.");
        loadProfilePhotos();
        populateProfilePage();
    } else {
        console.log("Unknown page:", currentPage);
    }
});

async function loadProfilePhotos(){
    const userData = await loadAccountData();
    if(userData.bannerImg){
        console.log("display profile banner");
    } else {
        console.log("no banner detected, using default");
        document.getElementById("banner").src = "../img/insert_banner.jpg";
    }
}

async function populateProfilePage() {
    const userData = await loadAccountData();
    let plaformList = "";
    let typeList = "";

    for(let i = 0; i < userData.platform.length; i++){
        plaformList += userData.platform[i] + " - ";
        // console.log(plaformList);
    }

    for(let i = 0; i < userData.type.length; i++){
        typeList += userData.type[i] + " - ";
    }

    if (userData) {
        // basic info
        document.getElementById('profile-full-name').textContent = userData.firstName + " " + userData.lastName || "N/A";
        document.getElementById('profile-type').textContent = typeList || "N/A";
        document.getElementById('profile-platform').textContent = plaformList || "N/A";
        document.getElementById('profile-about').textContent = userData.profileDesription;

        // //preferences
        // //acount settings
        // document.getElementById('platform').textContent = userData.platform || "N/A";
        // document.getElementById('content').textContent = userData.content || "N/A";
        // document.getElementById('type').textContent = userData.type || "N/A";
        // document.getElementById('followers').textContent = userData.followers || "N/A";
        // document.getElementById('gender').textContent = userData.gender || "N/A";
    } else {
        console.log("Failed to load user data.");
    }
}

async function updateAbout(input){
    const docRef = doc(db, "users", uid);
    try {
        // Update specific fields in the document
        await updateDoc(docRef, {
            profileDescription: input
        });
    
        console.log("Document successfully updated!");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
        location.reload();

    }


const textarea = document.getElementById("profile-description");
// const output = document.getElementById("output");


//   getFilteredDocuments();