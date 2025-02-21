// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { orderBy, limit, startAfter, onSnapshot, getFirestore, doc, getDoc, collection, query, where, getDocs, setDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
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

// Constants
const MESSAGES_COLLECTION = "messages";
const USERS_COLLECTION = "users";

// Global variables
let user = null;
let recipientId = null;

const imageRef = ref(storage, `img/${getUserIdFromUrl()}/Profile_img`);
const imageExist = await doesImageExist(imageRef);

// Update the recipient's name on the page
if(imageExist){
    const img = await getDownloadURL(imageRef);
    document.getElementById("chat-profile-picture").src = img;
} else {
    document.getElementById("chat-profile-picture").src = "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Astro_Boy_anime_version.png/220px-Astro_Boy_anime_version.png";
}

if(recipientId === null){
    recipientId = getUserIdFromUrl();
}
console.log(recipientId);
function getUserIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('recipientId');
}
function changeRecipientId(newId) {
    const currentUrl = new URL(window.location);
    currentUrl.searchParams.set('recipientId', newId);
    history.pushState({}, "", currentUrl);
}
// Listen for authentication state changes
onAuthStateChanged(auth, (currentUser) => {
    user = currentUser;
    const recipient = getUserIdFromUrl();
    
    if (user) {
        console.log("User is logged in:", user);
        appendContacts();
        
        if (recipient) {
            console.log("Recipient is:", recipient);
            filterMessages(recipient);
        } else {
            console.log("Recipient is empty or not found.");
        }
    } else {
        console.log("No user is logged in.");
    }
});

// Utility function to get user data from Firestore
async function getUserData(uid) {
    if (!uid) {
        console.error("Invalid UID provided to getUserData");
        return null;
    }

    try {
        console.log("Fetching user data for UID:", uid);
        const userDocRef = doc(db, USERS_COLLECTION, uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            return userDoc.data(); // Return correct user data
        } else {
            console.error("User document not found for UID:", uid);
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}

// Send message function
async function sendMessage(senderUid, receiverUid, messageContent) {
    document.getElementById("chatarea").innerHTML = "";
    try {
        console.log(receiverUid);
        if(receiverUid){
            const newMessageRef = doc(db, MESSAGES_COLLECTION, `${senderUid}_${receiverUid}_${Date.now()}`);
            await setDoc(newMessageRef, {
                senderUid,
                receiverUid,
                message: messageContent,
                timestamp: Timestamp.fromDate(new Date()),
                read: false
            });
            console.log("Message sent!");
            currentPage = 0;
            filterMessages(receiverUid);
        } else {
            const recipient = getUserIdFromUrl();
            const newMessageRef = doc(db, MESSAGES_COLLECTION, `${senderUid}_${recipient}_${Date.now()}`);
            console.log(recipient + senderUid);
            await setDoc(newMessageRef, {
                senderUid,
                recipient,
                message: messageContent,
                timestamp: Timestamp.fromDate(new Date()),
                read: false
            });
            console.log("Message sent!");
            currentPage = 0;
            filterMessages(recipient);
        }
        } catch (error) {
            console.error("Error sending message:", error);
        }
        
}

// Event listener for sending messages
document.getElementById("message-send-button").addEventListener("click", async () => {
    const messageContent = document.getElementById("message-input").value.trim();

    if (messageContent === "") {
        console.log("Message is empty. Not sending.");
        return;
    }

    console.log(`Sending message to: ${await recipientId}`);
    console.log(`Message from: ${user.uid}`);
    console.log(`Message: ${messageContent}`);

    await sendMessage(user.uid, await recipientId, messageContent);
    document.getElementById("message-input").value = "";  // Clear input after sending
});

async function appendContacts() {
    const contactsSet = new Set();
    const contactsContainer = document.getElementById("contacts");
    const contactsTitle = document.getElementById("contacts-title");
    contactsContainer.innerHTML = ""; // Clear before appending new contacts
    contactsContainer.appendChild(contactsTitle);
    const senderQuery = query(collection(db, MESSAGES_COLLECTION), where("senderUid", "==", user.uid));
    const senderSnapshot = await getDocs(senderQuery);

    const receiverQuery = query(collection(db, MESSAGES_COLLECTION), where("receiverUid", "==", user.uid));
    const receiverSnapshot = await getDocs(receiverQuery);

    senderSnapshot.forEach(doc => contactsSet.add(doc.data().receiverUid));
    receiverSnapshot.forEach(doc => contactsSet.add(doc.data().senderUid));

    console.log("Unique Contacts Set:", [...contactsSet]); // Debugging

    const contactsData = await Promise.all([...contactsSet].map(uid => getUserData(uid)));

    contactsData.forEach(async contact => {
        if (contact) {
            const contactDiv = document.createElement("div");
            contactDiv.classList.add("contact-list");
            contactDiv.id = contact.uid;
    
            // Create image element for profile picture
            const profileImg = document.createElement("img");
            console.log(contact.uid);
            const imageRef = ref(storage, `img/${contact.uid}/Profile_img`);
            const imageExist = await doesImageExist(imageRef);
            
            if(imageExist){
                const img = await getDownloadURL(imageRef);
                profileImg.src = img;
            } else {
                profileImg.src = "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Astro_Boy_anime_version.png/220px-Astro_Boy_anime_version.png";
            }
            profileImg.alt = "Profile Picture";
            profileImg.classList.add("message-profile-photo"); // Updated class name
    
            // Create text span for name
            const nameSpan = document.createElement("span");
            nameSpan.textContent = `${contact.firstName} ${contact.lastName}`;
    
            // Append image and text to contact div
            contactDiv.appendChild(profileImg);
            contactDiv.appendChild(nameSpan);
    
            contactsContainer.appendChild(contactDiv);
        }
    });
    
    
}

// Event listener for contact selection
document.getElementById("contacts").addEventListener("click", async (event) => {
    recipientId = event.target.id;
    document.getElementById("chatarea").innerHTML = "";
    console.log(recipientId);
    console.log("sender uid: " + user.uid + " - recipient uid: " + recipientId);
    currentPage = 0;
    changeRecipientId(recipientId);
    filterMessages(recipientId);
    const imageRef = ref(storage, `img/${recipientId}/Profile_img`);
    const imageExist = await doesImageExist(imageRef);
    
    // Update the recipient's name on the page
    if(imageExist){
        const img = await getDownloadURL(imageRef);
        document.getElementById("chat-profile-picture").src = img;
    } else {
        document.getElementById("chat-profile-picture").src = "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Astro_Boy_anime_version.png/220px-Astro_Boy_anime_version.png";
    }
});

async function filterMessages(recipient){
    console.log(user.uid + " and " + recipient);
    // Query messages where senderUid is the user
    const sentQ = query(
        collection(db, "messages"), 
        where("senderUid", "==", user.uid),
        where("receiverUid", "==", recipient)
    );

    const recievedQ = query(
        collection(db, "messages"),
        where("receiverUid", "==", user.uid),
        where("senderUid", "==", recipient)
    );
    
    const [sentSnapshot, receivedSnapshot] = await Promise.all([getDocs(sentQ), getDocs(recievedQ)]);
    let messages = [];

    sentSnapshot.forEach((doc) => messages.push({ id: doc.id, ...doc.data() }));
    receivedSnapshot.forEach((doc) => messages.push({ id: doc.id, ...doc.data() }));

    // console.log("All Messages:", messages);
    appendMessages(messages);
}

let isLoadingMessages = false; // Flag to track if messages are already being loaded
let lastVisibleMessage = null; // Keeps track of the last visible message for pagination
const messageLimit = 15; // Number of messages per page
let currentPage = 0;

async function appendMessages(messages, isOlder = false) {
    const inboxContainer = document.getElementById("chatarea");
    if (isLoadingMessages) return; // Avoid loading if messages are already being loaded
    isLoadingMessages = true; // Set flag to indicate loading

    // Sort messages by timestamp in descending order
    messages.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

    const start = currentPage * messageLimit;
    const end = start + messageLimit;
    
    // For older messages (assuming isOlder is defined as true when loading older messages):
    const limitedMessages = isOlder ? messages.slice(-end, -start) : messages.slice(start, end);
    
    currentPage += 1;  // For the next page, increment currentPage
    
    // Use a for...of loop to handle async/await correctly
    for (const message of limitedMessages) {
        const { message: messageText, senderUid, timestamp } = message;

        const userDoc = doc(db, "users", senderUid);
        const userSnapshot = await getDoc(userDoc);
        const userData = userSnapshot.data();
        const recipient = getUserIdFromUrl();
        let messageSide = "left";
        console.log(senderUid + " === " + recipient);

        const recipientDoc = doc(db, "users", recipient);
        const recipientSnapshot = await getDoc(recipientDoc);
        const recipientData = recipientSnapshot.data();
        document.getElementById("chat-recipent-name").innerHTML = recipientData.firstName + " " + recipientData.lastName;

            if (senderUid === recipient){
            messageSide = "left";
        } else {
            messageSide = "right";
        }
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(messageSide);

        messageElement.id = senderUid;

        messageElement.innerHTML = 
            `<div class="message-header">
                <strong>From:</strong><a href="profilev2.html?userId=${senderUid}"> ${userData.firstName} ${userData.lastName}</a>
                <span class="timestamp">${new Date(timestamp.seconds * 1000).toLocaleString()}</span>
            </div>
            <div class="message-body">
                <p>${messageText}</p>
            </div>`
        ;

        inboxContainer.appendChild(messageElement);

        // Update last visible message (for pagination)
        lastVisibleMessage = message;
    }

    isLoadingMessages = false; // Reset loading flag
}

async function doesImageExist(imageRef) {
    try {
        await getDownloadURL(imageRef);
        return true; 
    } catch (error) {
        return false; 
    }
}

// Scroll event listener to load older messages when reaching the top
const inboxContainer = document.getElementById("chatarea");

//FIX SCROLL - only displaying messages i have sent(comment added below), also add all messages like recieved ones
inboxContainer.addEventListener('scroll', async () => {
    const containerHeight = inboxContainer.clientHeight;
    const scrollPosition = inboxContainer.scrollTop;
    const contentHeight = inboxContainer.scrollHeight;
    const containerTop = contentHeight - containerHeight - 5;
    // Log current heights and scroll position
    // console.log('Visible height:', containerHeight);
    // console.log('Scroll position:', scrollPosition);
    // console.log('Total content height:', contentHeight);
    // console.log('container top height:', -containerTop);

    if (scrollPosition <= -containerTop && !isLoadingMessages) {
        console.log("Scrolled to the top. Loading older messages...");
        console.log(recipientId);
        // Append older messages
        filterMessages(recipientId); 
    }
});

//page update

function listenForUpdates() {
    const messagesQuery = query(collection(db, "messages"));
    const currentChat = getUserIdFromUrl();  // Assuming this function retrieves the recipient ID from the URL
    console.log(currentChat);

    onSnapshot(messagesQuery, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            const messageData = change.doc.data();
            const senderUid = messageData.senderUid;

            console.log(isLoadingMessages + currentChat + " and " + senderUid);

            if (change.type === "added") {
                const currentChat = getUserIdFromUrl();
                console.log(currentChat);
                // Only refresh messages if the senderUid matches the current recipientId from the URL
                if (currentChat === senderUid && !isLoadingMessages) {
                    console.log("New message added for sender:", senderUid);
                    console.log("New message data:", messageData);
                    document.getElementById("chatarea").innerHTML = "";
                    // Only call filterMessages when a new message is added by the sender
                    currentPage = 0;
                    filterMessages(currentChat);
                }
            }

            if (change.type === "modified") {
                console.log("Message updated:", messageData);
            }

            if (change.type === "removed") {
                console.log("Message deleted:", change.doc.id);
            }
        });
    });
}

listenForUpdates();
