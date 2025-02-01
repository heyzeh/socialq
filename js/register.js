<<<<<<< HEAD
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore , doc , setDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { loginUser } from './login.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDPvzBikfTcivDoXQAuASq32ssgW_cQXc",
  authDomain: "socialq-a967b.firebaseapp.com",
  projectId: "socialq-a967b",
  storageBucket: "socialq-a967b.firebasestorage.app",
  messagingSenderId: "859948808790",
  appId: "1:859948808790:web:977a1f9be0378f3e5159f7",
  measurementId: "G-3MS5FM3EPG"
};

//declear signup option buttons
let creatorSignup = document.getElementById("creator-signup");
let companySignup = document.getElementById("company-signup");

let accountType ="creator";
//declare signup var
export let registerPlatform = [];
export let registerContent = [];
export let registerType = [];
export let registerFollowers = null;
export let registerGender = null;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

//accountType Logic
creatorSignup.addEventListener("click", function(){
  accountType = "creator"
  console.log("Acount Type is creator =? " + accountType);
});
companySignup.addEventListener("click", function(){
  accountType = "company"
  console.log("Acount Type is company =? " + accountType);
});


//sumbit button

const submit = document.getElementById("submit");

submit.addEventListener('click', function (event) {
  console.log("button works");
  event.preventDefault();

  // Account info fields
  const email1 = document.getElementById("email1").value;
  const email2 = document.getElementById("email2").value;
  const password1 = document.getElementById("password1").value;
  const password2 = document.getElementById("password2").value;
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const profileDescription = "Write about yourself.";
  const companyName = document.getElementById("company-name").value;
  
  console.log(accountType);

  if (accountType === "creator") {
    createUserWithEmailAndPassword(auth, email1, password1)
      .then((userCredential) => {
        // Create user document
        const user = userCredential.user;
        localStorage.setItem('firstName', firstName);
        setDoc(doc(db, "users", user.uid), {
          firstName: firstName,
          lastName: lastName,
          email1: user.email,
          uid: user.uid,
          platform: registerPlatform,
          content: registerContent,
          type: registerType,
          followers: registerFollowers,
          gender: registerGender,
          profileDesription: profileDescription
        })
          .then(() => {
            console.log("User document successfully written!");
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('uid', user.uid);
            console.log(profileDescription);
            window.location.href = "profilev2.html";
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during account creation: ", errorCode, errorMessage);
      });
  } else if (accountType === "company") {
    createUserWithEmailAndPassword(auth, email2, password2)
      .then((userCredential) => {
        // Create company document
        const company = userCredential.user; // Fix applied here
        localStorage.setItem('firstName', companyName);
        setDoc(doc(db, "company", company.uid), {
          companyName: companyName,
          email2: company.email,
          uid: company.uid,
          platform: registerPlatform,
          content: registerContent,
          type: registerType,
          followers: registerFollowers,
          gender: registerGender,
          profileDesription: profileDescription
        })
          .then(() => {
            console.log("Company document successfully written!");
            localStorage.setItem('firstName', companyName);
            localStorage.setItem('uid', company.uid);
            window.location.href = "profilev2.html";
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during account creation: ", errorCode, errorMessage);
      });
  } else {
    console.log("Account type not selected");
  }
});


// Define the function that adds/removes platforms from the array
export function updatePlatformArray(id) {
  if (registerPlatform.includes(id)) {
    // If the platform is already in the array, remove it
    registerPlatform = registerPlatform.filter(item => item !== id);
  } else {
    // Otherwise, add it to the array
    registerPlatform.push(id);
  }
  console.log(registerPlatform);
}

// Define the function that adds/removes content from the array
export function updateContentArray(id) {
  if (registerContent.includes(id)) {
    // If the content is already in the array, remove it
    registerContent = registerContent.filter(item => item !== id);
  } else {
    // Otherwise, add it to the array
    registerContent.push(id);
  }
  console.log(registerContent);
}

// Define the function that adds/removes types from the array
export function updateTypeArray(id) {
  if (registerType.includes(id)) {
    // If the type is already in the array, remove it
    registerType = registerType.filter(item => item !== id);
  } else {
    // Otherwise, add it to the array
    registerType.push(id);
  }
  console.log(registerType);
}

// Define the function that sets/removes the followers value
export function updateFollowersValue(id) {
  if (registerFollowers === id) {
    // If the followers value is already set, clear it
    registerFollowers = null;
  } else {
    // Otherwise, set it to the clicked value
    registerFollowers = id;
  }
  console.log(registerFollowers);
}

// Define the function that sets/removes the gender value
export function updateGenderValue(id) {
  if (registerGender === id) {
    // If the gender value is already set, clear it
    registerGender = null;
  } else {
    // Otherwise, set it to the clicked value
    registerGender = id;
  }
  console.log(registerGender);
}

document.addEventListener("DOMContentLoaded", () => {
  // Add event listeners for platform checkboxes
  const platformElements = document.querySelectorAll('.signup-platform-checkbox');
  platformElements.forEach(element => {
    element.addEventListener('click', (event) => {
      updatePlatformArray(event.target.id);
      event.target.classList.toggle('selected');
    });
  });

  // Add event listeners for content checkboxes
  const contentElements = document.querySelectorAll('.signup-content-checkbox');
  contentElements.forEach(element => {
    element.addEventListener('click', (event) => {
      updateContentArray(event.target.id);
      event.target.classList.toggle('selected');
    });
  });

  // Add event listeners for type checkboxes
  const typeElements = document.querySelectorAll('.signup-type-checkbox');
  typeElements.forEach(element => {
    element.addEventListener('click', (event) => {
      updateTypeArray(event.target.id);
      event.target.classList.toggle('selected');
    });
  });

  // Add event listeners for followers checkboxes (single selection)
  const followersElements = document.querySelectorAll('.signup-followers-checkbox');
  followersElements.forEach(element => {
    element.addEventListener('click', (event) => {
      updateFollowersValue(event.target.id);
      followersElements.forEach(el => el.classList.remove('selected')); // Clear other selections
      event.target.classList.add('selected');
    });
  });

  // Add event listeners for gender checkboxes (single selection)
  const genderElements = document.querySelectorAll('.signup-gender-checkbox');
  genderElements.forEach(element => {
    element.addEventListener('click', (event) => {
      updateGenderValue(event.target.id);
      genderElements.forEach(el => el.classList.remove('selected')); // Clear other selections
      event.target.classList.add('selected');
    });
  });
});


=======
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore , doc , setDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { loginUser } from './login.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDPvzBikfTcivDoXQAuASq32ssgW_cQXc",
  authDomain: "socialq-a967b.firebaseapp.com",
  projectId: "socialq-a967b",
  storageBucket: "socialq-a967b.firebasestorage.app",
  messagingSenderId: "859948808790",
  appId: "1:859948808790:web:977a1f9be0378f3e5159f7",
  measurementId: "G-3MS5FM3EPG"
};

//declear signup option buttons
let creatorSignup = document.getElementById("creator-signup");
let companySignup = document.getElementById("company-signup");

let accountType ="creator";
//declare signup var
export let registerPlatform = [];
export let registerContent = [];
export let registerType = [];
export let registerFollowers = null;
export let registerGender = null;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

//accountType Logic
creatorSignup.addEventListener("click", function(){
  accountType = "creator"
  console.log("Acount Type is creator =? " + accountType);
});
companySignup.addEventListener("click", function(){
  accountType = "company"
  console.log("Acount Type is company =? " + accountType);
});


//sumbit button

const submit = document.getElementById("submit");

submit.addEventListener('click', function (event) {
  console.log("button works");
  event.preventDefault();

  // Account info fields
  const email1 = document.getElementById("email1").value;
  const email2 = document.getElementById("email2").value;
  const password1 = document.getElementById("password1").value;
  const password2 = document.getElementById("password2").value;
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const profileDescription = "Write about yourself.";
  const companyName = document.getElementById("company-name").value;
  
  console.log(accountType);

  if (accountType === "creator") {
    createUserWithEmailAndPassword(auth, email1, password1)
      .then((userCredential) => {
        // Create user document
        const user = userCredential.user;
        localStorage.setItem('firstName', firstName);
        setDoc(doc(db, "users", user.uid), {
          firstName: firstName,
          lastName: lastName,
          email1: user.email,
          uid: user.uid,
          platform: registerPlatform,
          content: registerContent,
          type: registerType,
          followers: registerFollowers,
          gender: registerGender,
          profileDesription: profileDescription
        })
          .then(() => {
            console.log("User document successfully written!");
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('uid', user.uid);
            console.log(profileDescription);
            window.location.href = "profilev2.html";
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during account creation: ", errorCode, errorMessage);
      });
  } else if (accountType === "company") {
    createUserWithEmailAndPassword(auth, email2, password2)
      .then((userCredential) => {
        // Create company document
        const company = userCredential.user; // Fix applied here
        localStorage.setItem('firstName', companyName);
        setDoc(doc(db, "company", company.uid), {
          companyName: companyName,
          email2: company.email,
          uid: company.uid,
          platform: registerPlatform,
          content: registerContent,
          type: registerType,
          followers: registerFollowers,
          gender: registerGender,
          profileDesription: profileDescription
        })
          .then(() => {
            console.log("Company document successfully written!");
            localStorage.setItem('firstName', companyName);
            localStorage.setItem('uid', company.uid);
            window.location.href = "profilev2.html";
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error during account creation: ", errorCode, errorMessage);
      });
  } else {
    console.log("Account type not selected");
  }
});


// Define the function that adds/removes platforms from the array
export function updatePlatformArray(id) {
  if (registerPlatform.includes(id)) {
    // If the platform is already in the array, remove it
    registerPlatform = registerPlatform.filter(item => item !== id);
  } else {
    // Otherwise, add it to the array
    registerPlatform.push(id);
  }
  console.log(registerPlatform);
}

// Define the function that adds/removes content from the array
export function updateContentArray(id) {
  if (registerContent.includes(id)) {
    // If the content is already in the array, remove it
    registerContent = registerContent.filter(item => item !== id);
  } else {
    // Otherwise, add it to the array
    registerContent.push(id);
  }
  console.log(registerContent);
}

// Define the function that adds/removes types from the array
export function updateTypeArray(id) {
  if (registerType.includes(id)) {
    // If the type is already in the array, remove it
    registerType = registerType.filter(item => item !== id);
  } else {
    // Otherwise, add it to the array
    registerType.push(id);
  }
  console.log(registerType);
}

// Define the function that sets/removes the followers value
export function updateFollowersValue(id) {
  if (registerFollowers === id) {
    // If the followers value is already set, clear it
    registerFollowers = null;
  } else {
    // Otherwise, set it to the clicked value
    registerFollowers = id;
  }
  console.log(registerFollowers);
}

// Define the function that sets/removes the gender value
export function updateGenderValue(id) {
  if (registerGender === id) {
    // If the gender value is already set, clear it
    registerGender = null;
  } else {
    // Otherwise, set it to the clicked value
    registerGender = id;
  }
  console.log(registerGender);
}

document.addEventListener("DOMContentLoaded", () => {
  // Add event listeners for platform checkboxes
  const platformElements = document.querySelectorAll('.signup-platform-checkbox');
  platformElements.forEach(element => {
    element.addEventListener('click', (event) => {
      updatePlatformArray(event.target.id);
      event.target.classList.toggle('selected');
    });
  });

  // Add event listeners for content checkboxes
  const contentElements = document.querySelectorAll('.signup-content-checkbox');
  contentElements.forEach(element => {
    element.addEventListener('click', (event) => {
      updateContentArray(event.target.id);
      event.target.classList.toggle('selected');
    });
  });

  // Add event listeners for type checkboxes
  const typeElements = document.querySelectorAll('.signup-type-checkbox');
  typeElements.forEach(element => {
    element.addEventListener('click', (event) => {
      updateTypeArray(event.target.id);
      event.target.classList.toggle('selected');
    });
  });

  // Add event listeners for followers checkboxes (single selection)
  const followersElements = document.querySelectorAll('.signup-followers-checkbox');
  followersElements.forEach(element => {
    element.addEventListener('click', (event) => {
      updateFollowersValue(event.target.id);
      followersElements.forEach(el => el.classList.remove('selected')); // Clear other selections
      event.target.classList.add('selected');
    });
  });

  // Add event listeners for gender checkboxes (single selection)
  const genderElements = document.querySelectorAll('.signup-gender-checkbox');
  genderElements.forEach(element => {
    element.addEventListener('click', (event) => {
      updateGenderValue(event.target.id);
      genderElements.forEach(el => el.classList.remove('selected')); // Clear other selections
      event.target.classList.add('selected');
    });
  });
});


>>>>>>> 87b3c477c84110625b224d723a37036d05680aec
