<<<<<<< HEAD
// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore , doc , setDoc, getDoc, updateDoc, query, where, collection, getDocs  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";

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
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

var loggedInUserId = null; // Replace with logic to get current logged-in user's ID
var settingsUserId = getUserIdFromUrl();


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

  async function loadAccountData() {
    const user = auth.currentUser; // This is the current authenticated user

    if (!user) {
        console.log("No user is logged in.");
        return null; // Return null if no user is logged in
    }

    const userDocRef = doc(db, "users", user.uid); // Reference to the user's document in Firestore
    try {
        const userDoc = await getDoc(userDocRef); // Fetch the user document
        if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log("Found logged-in user");
            return userData; // Return the user data if document exists
        } else {
            console.log("No such document!");
            return null; // Return null if no document exists
        }
    } catch (error) {
        console.error("Error fetching user data:", error.message);
        return null; // Return null in case of an error
    }
}

// Use `onAuthStateChanged` to ensure the code runs after Firebase is initialized
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("User is logged in with UID:", user.uid);
        toggleAuthDisplay();
        // Now you can call loadAccountData() since the user is authenticated
        const userData = await loadAccountData();
        if (userData) {
            console.log("User data:", userData);
        } else {
            console.log("No user data found.");
        }
    } else {
        console.log("No user is logged in.");
    }
});

async function populateProfileSettings() {
    console.log("Loading data into profile settings");
    const userData = await loadAccountData(); // Assumes this function loads current logged-in user's data
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("userId");
    const userDoc = doc(db, "users", userId);
    const statisOption1 = document.getElementById("statis-option1");
    const statisOption2 = document.getElementById("statis-option2");
    const authStatis = document.getElementById('unAuth-Statis');

    getDoc(userDoc).then((docSnapshot) => {
        if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            console.log(userData.uid); // Display data in your UI

            // Set user information to appropriate elements
            document.getElementById('firstName').textContent = userData.firstName || "N/A";
            document.getElementById('lastName').textContent = userData.lastName || "N/A";
            document.getElementById('email').textContent = userData.email || "N/A";
            document.getElementById('profile-description-auth').textContent = userData.profileDescription || "Write about yourself.";
            document.getElementById('profile-description-auth').placeholder = userData.profileDescription || "Write about yourself.";
            document.getElementById('profile-availability-auth').textContent = userData.profileAvailability || "Write about your availability.";
            document.getElementById('profile-availability-auth').placeholder = userData.profileAvailability || "Write about your availability.";
            document.getElementById('profile-description-unauth').textContent = userData.profileDescription || "Write about yourself.";
            document.getElementById('profile-description-unauth').placeholder = userData.profileDescription || "Write about yourself.";
            document.getElementById('profile-availability-unauth').textContent = userData.profileAvailability || "Write about your availability.";
            document.getElementById('profile-availability-unauth').placeholder = userData.profileAvailability || "Write about your availability.";

            // Preferences section
            document.getElementById('unAuth-Statis').textContent = userData.statis || "N/A";
            console.log("userData.statis:", userData.statis);

            // document.getElementById('auth-Statis').textContent = userData.statis || "Live"; // Default to "Live" if no status is set            
            console.log(authStatis);
            // Account settings
            document.getElementById('platform').textContent = userData.platform || "N/A";
            document.getElementById('content').textContent = userData.content || "N/A";
            document.getElementById('type').textContent = userData.type || "N/A";
            document.getElementById('followers').textContent = userData.followers || "N/A";
            document.getElementById('gender').textContent = userData.gender || "N/A";

            if (userData.statis === "live"){
                console.log("LOOK AT ME");
                statisOption1.value = "live";
                statisOption1.innerHTML = "live";
                statisOption2.value = "offline";
                statisOption2.innerHTML = "offline";
            } else {
                console.log("LOOK AT ME");
                statisOption1.value = "offline";
                statisOption1.innerHTML = "offline";
                statisOption2.value = "live";
                statisOption2.innerHTML = "live";
            }

        } else {
            console.error("User not found");
        }
    }).catch(error => {
        console.error("Error fetching user data: ", error);
    });
}


async function uploadImage() {
    const userData = await loadAccountData();
    const fileInput = document.getElementById("fileInput-auth");
    const file = fileInput.files[0];
    console.log("uploading photo");
    if(file) {
        const fileName = file.name
        const storageRef = ref(storage, `img/${userData.uid}/Profile_img`);
        await uploadBytes(storageRef, file);

        const imageURL = await getDownloadURL(storageRef);
        const imagePreview = document.getElementById("imagePreview-auth");
        imagePreview.src = imageURL;
    } else{
        console.log("no file selected");
    }
}

    const uploadButton = document.getElementById("uploadImage-auth");
    uploadButton.addEventListener('click', uploadImage);

const basicinfoSubmit = document.getElementById("basic-info-submit");
const textareaAbout = document.getElementById("profile-description");
const textareaAvailability = document.getElementById("profile-availability");

basicinfoSubmit.addEventListener("click", function(){
    updateAbout(textareaAbout.value);
    updateAvailabilty(textareaAvailability.value);
})
    
async function updateAbout(input){
    const userData = await loadAccountData();
    const docRef = doc(db, "users", userData.uid);
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

async function updateAvailabilty(input){
    const userData = await loadAccountData();
    const docRef = doc(db, "users", userData.uid);
    try {
        // Update specific fields in the document
        await updateDoc(docRef, {
            profileAvailability: input
        });
    
        console.log("Document successfully updated!");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
        location.reload();

    }

// Get the select element
const authStatusSelect = document.getElementById('auth-statis');
authStatusSelect.addEventListener('change', async function () {
    const userData = await loadAccountData();
    const selectedStatus = authStatusSelect.value;
    console.log('Selected status:', selectedStatus);

    const docRef = doc(db, "users", userData.uid);

    try {
        // Update specific fields in the document
        await updateDoc(docRef, {
            statis: selectedStatus
        });

        console.log("Document successfully updated!");

        // Fetch the updated data to confirm the change
        const updatedDoc = await getDoc(docRef);

        if (updatedDoc.exists()) {
            const updatedData = updatedDoc.data();
            document.getElementById('unAuth-Statis').textContent = updatedData.statis;
        } else {
            console.error("Document does not exist after update!");
        }
    } catch (error) {
        console.error("Error updating document: ", error);
    }
});

async function toggleAuthDisplay() {
    const loggedInUserId = await loadAccountData();
    const settingsUserId = getUserIdFromUrl();
    const authElements = document.querySelectorAll('.auth');
    const unAuthElements = document.querySelectorAll('.unAuth');
    console.log(loggedInUserId + " ====" + settingsUserId);
    if (loggedInUserId.uid === settingsUserId) {
        authElements.forEach(element => element.style.display = 'block');
        unAuthElements.forEach(element => element.style.display = 'none');
    } else {
        authElements.forEach(element => element.style.display = 'none');
        unAuthElements.forEach(element => element.style.display = 'block');
    }
}

function getUserIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('userId');
}

document.addEventListener("DOMContentLoaded", function () {
    const currentPage = window.location.pathname;
    console.log("Loading Page");
    if (currentPage.includes("profile_settings.html")) {
        console.log("You are on the profile settings page.");
        populateProfileSettings();
    } else if (currentPage.includes("profilev2.html")) {
        console.log("You are on the profile page.");
        loadProfilePhotos();
        populateProfilePage();
    } else {
        console.log("Unknown page:", currentPage);
    }
});

// Function to get current user info
// function getCurrentUserInfo() {
//     // Listen for changes in authentication state
//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//             console.log("User is signed in:");
//             console.log("UID: " + user.uid);
//             console.log("Email: " + user.email);
//             console.log("Display Name: " + user.displayName);
//             console.log("Photo URL: " + user.photoURL);
//             console.log("Email Verified: " + user.emailVerified);
//         } else {
//             console.log("No user is signed in. Redirecting to Login Page");
//             localStorage.clear(uid);
//             window.location.href = "../html/index.html";
//         }
//     });
// }
=======
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
>>>>>>> 87b3c477c84110625b224d723a37036d05680aec
