// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const uid = localStorage.getItem('uid');
let userIsAuth = null;

async function isAuth() {
    const loggedInUserId = await loadAccountData();
    const settingsUserId = getUserIdFromUrl();
    if (loggedInUserId.uid === settingsUserId) {
        userIsAuth = true;
    } else {
        console.log("You arnt the page owner");
        userIsAuth = false;
    }
}

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
        loadProfilePhotos();
        toggleAuthDisplay();
        isAuth();
        console.log(isAuth());
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

async function loadProfilePhotos(){
    const params = new URLSearchParams(window.location.search);
    const uid = params.get('userId');

    const images = [
        { id: 'Profile_img', authElement: document.getElementById("profile-picture-auth"), unAuthElement: document.getElementById("profile-picture-unAuth") },
        { id: 'Profile_banner_img', authElement: document.getElementById("banner-auth"), unAuthElement: document.getElementById("banner-unAuth") },
        { id: 'gallery1-img1_img', authElement: document.getElementById("gallery1-img1-auth"), unAuthElement: document.getElementById("gallery1-img1-unAuth") },
        { id: 'gallery1-img2_img', authElement: document.getElementById("gallery1-img2-auth"), unAuthElement: document.getElementById("gallery1-img2-unAuth") },
        { id: 'gallery1-img3_img', authElement: document.getElementById("gallery1-img3-auth"), unAuthElement: document.getElementById("gallery1-img3-unAuth") }
    ];
    
    images.forEach(async (image) => {
        const imageRef = ref(storage, `img/${uid}/${image.id}`);
        const imageExist = await doesImageExist(imageRef);
        
        if(imageExist){
            const img = await getDownloadURL(imageRef);
            image.authElement.src = img;
            image.unAuthElement.src = img;
        } else {
            image.authElement.src = "../img/1080x1920uploadphoto.jpg";
            image.unAuthElement.src = "../img/1080x1920uploadphoto.jpg";
        }
    });
}

async function doesImageExist(imageRef) {
    try {
        await getDownloadURL(imageRef);
        return true; 
    } catch (error) {
        return false; 
    }
}
async function populateProfilePage() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("userId");

    // Reference to Firestore collections for creator and company
    const userDoc = doc(db, "users", userId);
    const companyDoc = doc(db, "company", userId);
    console.log("Loading Profile Page");
    try {
        // First, try fetching user data from the "users" collection (creator)
        const userSnapshot = await getDoc(userDoc);
        let userData = null;
        let isCreator = false;

        if (userSnapshot.exists()) {
            userData = userSnapshot.data();
            isCreator = true; // Mark it as a creator
        }

        // If the user data isn't found, try fetching from the "company" collection
        if (!userData) {
            const companySnapshot = await getDoc(companyDoc);
            if (companySnapshot.exists()) {
                userData = companySnapshot.data();
                isCreator = false; // Mark it as a company
            }
        }

        // If no data is found in both collections
        if (!userData) {
            console.error("User not found in both creator and company collections");
            return;
        }

        // Apply styles or modifications based on whether it's a creator or company
        if (isCreator) {
            // Change styles and content for creator profile
            document.body.classList.add('creator-profile'); // Add a class to the body
            // Modify profile page content for creator
            document.getElementById('profile-full-name').textContent = userData.firstName + " " + userData.lastName || "N/A";
            document.getElementById('profile-type').textContent = userData.type || "N/A";
            document.getElementById('profile-platform').textContent = userData.platform || "N/A";
            document.getElementById('profile-about-p').textContent = userData.profileDescription || "Write about yourself.";
            document.getElementById('profile-availability-p').textContent = userData.profileAvailability || "Write about your availability.";
            // Any additional styling or changes specific to creators
        } else {
            // Change styles and content for company profile
            document.body.classList.add('company-profile'); // Add a class to the body
            // Modify profile page content for company
            document.getElementById('profile-full-name').textContent = userData.companyName || "N/A";
            document.getElementById('profile-type').textContent = userData.type || "N/A";
            document.getElementById('profile-platform').textContent = userData.platform || "N/A";
            document.getElementById('profile-description').textContent = userData.profileDescription || "About the company.";
            // Any additional styling or changes specific to companies
        }

        // If needed, you can add further UI adjustments or content updates here.

    } catch (error) {
        console.error("Error fetching user data: ", error);
    }
}

async function toggleAuthDisplay() {
    const loggedInUserId = await loadAccountData();
    const settingsUserId = getUserIdFromUrl();
    const authElements = document.querySelectorAll('.auth');
    const unAuthElements = document.querySelectorAll('.unAuth');
    console.log(loggedInUserId + " ====" + settingsUserId);
    if (loggedInUserId.uid === settingsUserId) {
        console.log("You are Auth");
        authElements.forEach(element => element.style.display = 'block');
        unAuthElements.forEach(element => element.style.display = 'none');
    } else {
        console.log("You are unAuth");
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

        console.log("You are on the profile page.");
        populateProfilePage();
        // toggleAuthDisplay();
});

async function uploadProfileImage() {
    const userData = await loadAccountData();
    const fileInput = document.getElementById("profile-picture-input");
    const file = fileInput.files[0];
    console.log("uploading photo");
    if(file) {
        const fileName = file.name
        const storageRef = ref(storage, `img/${userData.uid}/Profile_img`);
        await uploadBytes(storageRef, file);
    } else{
        console.log("no file selected");
    }
    window.location.reload();
}

async function uploadBannerImage() {
    const userData = await loadAccountData();
    const fileInput = document.getElementById("banner-input");
    const file = fileInput.files[0];
    console.log("uploading photo");
    if(file) {
        const fileName = file.name
        const storageRef = ref(storage, `img/${userData.uid}/Profile_banner_img`);
        await uploadBytes(storageRef, file);
    } else{
        console.log("no file selected");
    }
    window.location.reload();
}

const profileImg = document.getElementById("profile-picture-edit");
const profileImgText = document.getElementById("profile-picture-edit-text");
const profileImgInput = document.getElementById("profile-picture-input");

profileImg.addEventListener('mouseenter', function(){
    profileImgText.style.display = "block";
})
profileImg.addEventListener('mouseleave', function(){
    profileImgText.style.display = "none";
})
profileImg.addEventListener('click', function(){
    profileImgInput.click();
})
profileImgInput.addEventListener("change", uploadProfileImage);

const bannerImg = document.getElementById("banner-edit");
const bannerImgText = document.getElementById("banner-edit-text");
const bannerImgInput = document.getElementById("banner-input");

bannerImg.addEventListener('mouseenter', function(){
    bannerImgText.style.display = "block";
})
bannerImg.addEventListener('mouseleave', function(){
    bannerImgText.style.display = "none";
})
bannerImg.addEventListener('click', function(){
    bannerImgInput.click();
})
bannerImgInput.addEventListener("change", uploadBannerImage);


const galleryMenu = document.getElementById("gallery-select");
const editGallery = document.getElementById("gallery-change");
const selectGallery1 = document.getElementById("gallery1-select");
const selectGallery2 = document.getElementById("gallery2-select");

const gallery1 = document.getElementById("gallery1");
const gallery2 = document.getElementById("gallery2");

editGallery.addEventListener("click", function(){
    galleryMenu.classList.toggle("hidden");
})

selectGallery1.addEventListener("click", async function(){
    const loggedInUserId = await loadAccountData();
    const settingsUserId = getUserIdFromUrl();
    console.log(loggedInUserId + " ====" + settingsUserId);
    if (loggedInUserId.uid === settingsUserId) {
    gallery1.style.display = "grid";
    gallery2.style.display = "none";
    } else {
        console.log("You arnt the page owner")
    }
})

selectGallery2.addEventListener("click", async function(){
    const loggedInUserId = await loadAccountData();
    const settingsUserId = getUserIdFromUrl();
    console.log(loggedInUserId + " ====" + settingsUserId);
    if (loggedInUserId.uid === settingsUserId) {
    gallery2.style.display = "grid";
    gallery1.style.display = "none";
} else {
    console.log("You arnt the page owner");
}
})


async function uploadGalleryImage(id) {
    const userData = await loadAccountData();
    const fileInput = document.getElementById(`${id}-input`);
    const file = fileInput.files[0];
    console.log("uploading photo");
    if(file) {
        const storageRef = ref(storage, `img/${userData.uid}/${id}_img`);
        await uploadBytes(storageRef, file);
    } else{
        console.log("no file selected");
    }
    window.location.reload();
}

// Function to handle the gallery image logic
const galleryImages = [
    { imgId: 'gallery1-img1', inputId: 'gallery1-img1-input', editTextId: 'gallery1-img1-edit-text', editId: 'gallery1-img1-edit' },
    { imgId: 'gallery1-img2', inputId: 'gallery1-img2-input', editTextId: 'gallery1-img2-edit-text', editId: 'gallery1-img2-edit' },
    { imgId: 'gallery1-img3', inputId: 'gallery1-img3-input', editTextId: 'gallery1-img3-edit-text', editId: 'gallery1-img3-edit' }
];

galleryImages.forEach(image => {
    const imgElement = document.getElementById(image.imgId);
    const editText = document.getElementById(image.editTextId);
    const inputElement = document.getElementById(image.inputId);

    // Show text when mouse enters, but only if the user is authenticated
    imgElement.addEventListener('mouseenter', function(){
        if (userIsAuth) {  // Check if the user is authenticated
            editText.style.display = "block";
        }
    });

    // Hide text when mouse leaves, but only if the user is authenticated
    imgElement.addEventListener('mouseleave', function(){
        if (userIsAuth) {  // Check if the user is authenticated
            editText.style.display = "none";
        }
    });

    // Trigger file input click on image click, but only if the user is authenticated
    imgElement.addEventListener('click', function(){
        if (userIsAuth) {  // Check if the user is authenticated
            inputElement.click();
        }
    });

    // Handle file change, but only if the user is authenticated
    inputElement.addEventListener("change", function() {
        if (userIsAuth) {  // Check if the user is authenticated
            uploadGalleryImage(image.imgId);  // Pass the imgId for identifying which image is being changed
        }
    });
});
