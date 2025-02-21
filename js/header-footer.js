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
// Retrieve firstName from localStorage
const firstName = localStorage.getItem('firstName');
const uid = localStorage.getItem('uid');
console.log("First name from localStorage:", firstName);
console.log("First name from localStorage:", uid);
// Define the footer HTML in a variable
var footerHTML = `
  <div id="footer">
      <div id="links">
          <div id="links1">
              <a class="footerlink" href="contact.html">Contact Us</a> <br>
              <a class="footerlink" href="faq.html">FAQ</a> <br>
              <a class="footerlink" href="about.html">About</a> <br>
              <a class="footerlink" href="dontclick.html">dont click</a> <br>
          </div>
          <div id="link2">
          </div>
      </div>
      <div id="socials">
          <a class="footerlink" href="">Instagram</a>
          <a class="footerlink" href="">Twitter</a>
      </div>
      <div id="company">
          <a id="social" class="footerlink" href="../homev2.html">Orbit</a>
      </div>
  </div>
`;

// Function to insert the footer into the DOM
function addFooter() {
  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// Define the CSS links for the header to be added to the <head>
var headerStyles = `
  <link rel="stylesheet" href="../css/headerFooterStylev2.css">
  
`;

// Define the header HTML to be added to the <body>
var headerHTML = `
  <div id="header">
    <a id="socialQ" href="homev2.html">
      <h1 id="socialQ">Orbit</h1>
    </a>
   <div class="top-right-header" id="login-profile">
    <p id="profile-name">
        <a href="profilev2.html"; return false;">Profile Name</a>
    </p>
    <img id="profileIconSmall" src="../img/blank_profile.png" alt="Profile Icon">
    <div id="profile-header-tab">
      <div id="profileprofile"><a href="../html/profilev2.html?userId=${uid}">Profile</a></div> <br>
      <div id="header-profile-inbox"><a href="../html/inbox.html">Inbox</a></div> <br>
      <div id="header-profile-settings"><a href="../html/profile_settings.html?userId=${uid}">Profile Settings</a> </div>
    </div>
</div>

    <div id="login-signup" class="top-right-header"><a id="login-page" href="loginv2.html"> Login </a><span>/</span> <a id="signup-page" href="signup.html">Signup</a>
    </div>
  </div>
  <div id="menu_bar">
    <p class="menu" href="homev2.html"></p>
  </div>
  <div id="search-bar"></div>
`;

// Function to insert the header styles into the <head> and the header structure into the <body>
function addHeader() {
    // Insert CSS links into the head
    document.head.insertAdjacentHTML("beforeend", headerStyles);
  
    // Insert the actual header structure into the body
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
  
    // Set the profile name to the stored first name
    document.getElementById("profile-name").innerHTML = firstName;
  }
  

// Call the function when the page loads
function onPageLoad() {
    const firstName = localStorage.getItem('firstName');
    const uid = localStorage.getItem('uid');

  addFooter(); // Add footer
  addHeader(); // Add header
  getCurrentUserInfo();

}


document.addEventListener('DOMContentLoaded', function() {
  const profileBox = document.getElementById("login-profile");

  if (profileBox) {
    profileBox.addEventListener('click', function() {
      console.log("Displaying profile header tab");

      const tab = document.getElementById("profile-header-tab");
      const profiletab = document.getElementById("header-profile-settings");

      // Check if the profile header tab is currently visible or hidden
      if (tab.style.display === "none" || tab.style.display === "") {
        // If it is hidden, display it
        tab.style.display = "flex";
        profiletab.style.display = "flex";  // Show profile settings tab
      } else {
        // If it is visible, hide it
        tab.style.display = "none";
        profiletab.style.display = "none";  // Hide profile settings tab
      }
    });
  } else {
    console.error('Element with id "login-profile" not found.');
  }
});



function getCurrentUserInfo() {
    // Listen for changes in authentication state
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User is signed in:");
            console.log("UID: " + user.uid);
            console.log("Email: " + user.email);
            console.log("Display Name: " + user.displayName);
            console.log("Photo URL: " + user.photoURL);
            console.log("Email Verified: " + user.emailVerified);
        } else {
            console.log("No user is signed in. Redirecting to Login Page");
            localStorage.clear(uid);
            window.location.href = "../html/index.html";
        }
    });
}


// Ensure onPageLoad is called after the page is fully loaded
window.onload = onPageLoad();
