// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, query, where, getDocs, setDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";

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
let recipientId = getUserIdFromUrl();

// Listen for authentication state changes
onAuthStateChanged(auth, (currentUser) => {
    user = currentUser;
    if (user) {
        console.log("User is logged in:", user);
        displayMessages();
    } else {
        console.log("No user is logged in.");
    }
});

// Utility function to get user data from Firestore
async function getUserData(uid) {
    try {
        const userDocRef = doc(db, USERS_COLLECTION, uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            console.error("User document not found!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}

// Get recipientId from URL query parameter
async function getUserIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('recipientId');
}

// Fetch and display messages
async function displayMessages() {
    const inboxContainer = document.getElementById("chatarea");
    inboxContainer.innerHTML = "";  // Clear the container before displaying new messages

    const resolvedRecipientId = await recipientId;
    const contactsContainer = document.getElementById("contacts");

    const messages = await fetchMessages(resolvedRecipientId);

    if (messages.length > 0) {
        // Sort messages by timestamp
        messages.sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);

        const senderData = await getUserData(user.uid);
        const recipientData = await getUserData(resolvedRecipientId);

        // Generate and append messages
        messages.forEach(message => appendMessage(inboxContainer, message, senderData, recipientData));
    }

    // Fetch and append contacts
    await appendContacts(contactsContainer);
}

// Fetch messages between current user and the recipient
async function fetchMessages(recipientId) {
    const q1 = query(collection(db, MESSAGES_COLLECTION), where("receiverUid", "==", user.uid), where("senderUid", "==", recipientId));
    const q2 = query(collection(db, MESSAGES_COLLECTION), where("senderUid", "==", user.uid), where("receiverUid", "==", recipientId));

    const querySnapshots = await Promise.all([getDocs(q1), getDocs(q2)]);
    let messages = [];

    querySnapshots.forEach(snapshot => {
        snapshot.forEach(doc => {
            messages.push(doc.data());
        });
    });

    return messages;
}

// Append individual message to the inbox
function appendMessage(inboxContainer, message, senderData, recipientData) {
    const messageElement = document.createElement('div');
    messageElement.setAttribute('class', 'message');
    messageElement.setAttribute('id', message.senderUid);

    const senderName = message.senderUid === user.uid ? `${senderData.firstName} ${senderData.lastName}` : `${recipientData.firstName} ${recipientData.lastName}`;

    messageElement.innerHTML = `
        <div class="message-header">
            <strong>From:</strong> ${senderName}
            <span class="timestamp">${new Date(message.timestamp.seconds * 1000).toLocaleString()}</span>
        </div>
        <div class="message-body">
            <p>${message.message}</p>
        </div>
    `;

    inboxContainer.appendChild(messageElement);
}

async function appendContacts(contactsContainer) {
    const contactsSet = new Set();

    // Query for messages where the current user is the sender
    const senderQuery = query(collection(db, MESSAGES_COLLECTION), where("senderUid", "==", user.uid));
    const senderSnapshot = await getDocs(senderQuery);

    // Query for messages where the current user is the receiver
    const receiverQuery = query(collection(db, MESSAGES_COLLECTION), where("receiverUid", "==", user.uid));
    const receiverSnapshot = await getDocs(receiverQuery);

    // Add receiver UIDs to the contacts set from the sender messages
    senderSnapshot.forEach(doc => {
        const message = doc.data();
        contactsSet.add(message.receiverUid);
    });

    // Add sender UIDs to the contacts set from the receiver messages
    receiverSnapshot.forEach(doc => {
        const message = doc.data();
        contactsSet.add(message.senderUid);
    });

    // Fetch user data for all unique contacts
    const contactsData = await Promise.all([...contactsSet].map(async (contactId) => {
        return await getUserData(contactId);
    }));

    // Append contact information to the contacts container
    contactsData.forEach(contact => {
        if (contact) {
            const contactDiv = document.createElement("div");
            contactDiv.classList.add("contact-list");
            contactDiv.id = contact.uid;
            contactDiv.textContent = `${contact.firstName} ${contact.lastName}`;
            contactsContainer.appendChild(contactDiv);
        }
    });
}


// Send message function
async function sendMessage(senderUid, receiverUid, messageContent) {
    try {
        const newMessageRef = doc(db, MESSAGES_COLLECTION, `${senderUid}_${receiverUid}_${Date.now()}`);
        await setDoc(newMessageRef, {
            senderUid,
            receiverUid,
            message: messageContent,
            timestamp: Timestamp.fromDate(new Date()),
            read: false
        });
        console.log("Message sent!");
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

// Event listener for contact selection
document.getElementById("contacts").addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains("contact-list")) {
        const recipientId = event.target.id;
        console.log(`Showing chat with recipient ID: ${recipientId}`);
        window.location.href = `../html/inbox.html?recipientId=${recipientId}`;
    }
});
