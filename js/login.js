
// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

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
let accountType = "";
const usersCollectionRef = collection(db, "users");
const companiesCollectionRef = collection(db, "company");

// Check if the user is already logged in when the page loads
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is logged in
      console.log("User is logged in:", user.email);
    } else {
      // No user is logged in
      console.log("No user is logged in.");
    }
  });

// Login function
async function loginUser(email, password) {
  try {
    // Sign in the user with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Retrieve the user object
    const user = userCredential.user;

    // Determine the account type based on the logged-in user's UID
    const userDocRef = doc(db, "users", user.uid); // Reference to the 'users' collection
    const companyDocRef = doc(db, "company", user.uid); // Reference to the 'company' collection

    const [userDocSnapshot, companyDocSnapshot] = await Promise.all([
      getDoc(userDocRef),
      getDoc(companyDocRef),
    ]);

    let accountType = null;
    let data = null;

    if (userDocSnapshot.exists()) {
      accountType = "creator";
      data = userDocSnapshot.data();
    } else if (companyDocSnapshot.exists()) {
      accountType = "company";
      data = companyDocSnapshot.data();
    }

    if (accountType && data) {
      console.log("Account type determined:", accountType);

      if (accountType === "creator") {
        localStorage.setItem('firstName', data.firstName); // Store creator's first name
      } else if (accountType === "company") {
        localStorage.setItem('firstName', data.companyName); // Store company's name
      }

      localStorage.setItem('uid', data.uid); // Store UID
    } else {
      console.log("No such document!");
    }

    // Log the email of the logged-in user
    console.log("Logged in user email:", user.email);

    // Navigate to a different page
    window.location.href = `../html/profilev2.html?userId=${user.uid}`; // Change to your desired page

    return user.email; // Return email or use it as needed
  } catch (error) {
    console.error("Error during login:", error.message);
  }
}



// Function to check the logged-in user
function whoIsLoggedIn() {
    // Listen for changes in the authentication state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Currently logged in user:", user.email);
      } else {
        console.log("No user is logged in.");
      }
    });
  }

//logout function
function logoutUser() {
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
    window.location.reload();

  }

// Export functions
export { loginUser, whoIsLoggedIn, logoutUser };
