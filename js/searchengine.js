
//backgroundImg is 720x120 

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

let searchCreatorFollower = "";
let searchCreatorGender = "";
let searchCreatorType = [];
let searchCreatorContent = [];
let searchCreatorPlatform =[];
// Some how merge these variables and find other way to filter the creator and celeb with firstore.
let searchCompanyGender = "";
let searchCompanyFollower = "";
let searchCompanyType = [];
let searchCompanyContent = [];
let searchCompanyPlatform = [];

let platformDropbox = document.getElementById("platform-box-text");
let contentDropbox = document.getElementById("content-box-text");
let typeDropbox = document.getElementById("type-box-text");
let followerDropbox = document.getElementById("follower-box-text");
let genderDropbox = document.getElementById("gender-box-text");

let searchPlatformArray = [];
let searchTab = "creator";

genderDropbox.addEventListener("click", function(id){
    let genderDropdown = document.getElementById("gender-dropdown");
    console.log("genderDropbox was clicked");
   
    if (genderDropdown.style.display === "none" || genderDropdown.style.display === "") {
        genderDropdown.style.display = "grid";
        document.getElementById("gender-box-text").style.borderRadius = "10px 10px 0 0";
    } else {
        genderDropdown.style.display = "none";
        document.getElementById("gender-box-text").style.borderRadius = "10px 10px 10px 0";
    }
    
});

function clearGenderSelect(){
    let checkboxMale = document.getElementById("checkbox-male");
    let checkboxFemale = document.getElementById("checkbox-female");
    let checkboxOther = document.getElementById("checkbox-other");

    checkboxMale.style.backgroundColor = "";
    checkboxFemale.style.backgroundColor = "";
    checkboxOther.style.backgroundColor = "";
}

function selectGender(id){

    let element = document.getElementById(id);
    let checkboxMale = document.getElementById("checkbox-male");
    let checkboxFemale = document.getElementById("checkbox-female");
    let checkboxOther = document.getElementById("checkbox-other");
    let genderDropdown = document.getElementById("gender-dropdown");
    let genderBoxText = document.getElementById("gender-box-text");

    console.log("id: " + id);
    if (searchTab === "creator") {
        // add this if statement if(id.background color = ""){}else{
        
        if(element.id === "checkbox-male"){
            clearGenderSelect();
            checkboxMale.style.backgroundColor = "black";
            genderDropdown.style.display = "none";
            genderBoxText.innerHTML = "Male";
            searchCreatorGender = "male";
        }
        if(element.id === "checkbox-female"){
            clearGenderSelect();
            checkboxFemale.style.backgroundColor = "black"; 
            genderDropdown.style.display = "none";
            genderBoxText.innerHTML = "Female";
            searchCreatorGender = "female";
        }
        if(element.id === "checkbox-other"){
            clearGenderSelect();
            checkboxOther.style.backgroundColor = "black"; 
            genderDropdown.style.display = "none";
            genderBoxText.innerHTML = "Other";
            searchCreatorGender = "other";
        }
       // console.log("creator gender search" + searchCreatorGender);
    } else {
        if(element.id === "checkbox-male"){
            console.log("XXXXXXXX");
            clearGenderSelect();
            checkboxMale.style.backgroundColor = "black";
            genderDropdown.style.display = "none";
            genderBoxText.innerHTML = "Male";
            searchCompanyGender = "male";
        }
        if(element.id === "checkbox-female"){
            clearGenderSelect();
            checkboxFemale.style.backgroundColor = "black"; 
            genderDropdown.style.display = "none";
            genderBoxText.innerHTML = "Female";
            searchCompanyGender = "female";
        }
        if(element.id === "checkbox-other"){
            clearGenderSelect();
            checkboxOther.style.backgroundColor = "black"; 
            genderDropdown.style.display = "none";
            genderBoxText.innerHTML = "Other";
            searchCompanyGender = "other";
        }
        console.log("company gender search " + searchCompanyGender);

        // if(!searchCreatorType.includes(option.value)){
        //     element.style.backgroundColor = "black";
        // } else if (searchCreatorType.includes(option.value)){
        //     element.style.backgroundColor = "white";
        // }
    }
}

//Follower dropbox
followerDropbox.addEventListener("click", function(id){
    let followerDropdown = document.getElementById("follower-dropdown");
    console.log("followerDropbox was clicked");
   
    if (followerDropdown.style.display === "none" || followerDropdown.style.display === "") {
        followerDropdown.style.display = "grid";
        document.getElementById("follower-box-text").style.borderRadius = "10px 10px 0 0";
    } else {
        followerDropdown.style.display = "none";
        document.getElementById("follower-box-text").style.borderRadius = "10px 10px 10px 0";
    }
    
});

function clearFollowerSelect() {
    const followerOptions = [
            { id: "checkbox-0k+", label: "0k+", value: "0k+" },
            { id: "checkbox-10k+", label: "10k+", value: "10k+" },
            { id: "checkbox-100k+", label: "100k+", value: "100k+" },
            { id: "checkbox-250k+", label: "250k+", value: "250k+" },
            { id: "checkbox-500k+", label: "500k+", value: "500k+" },
            { id: "checkbox-1mil+", label: "1mil+", value: "1mil+" },
            { id: "checkbox-10mil+", label: "10mil+", value: "10mil+" },
            { id: "checkbox-25mil+", label: "25mil+", value: "25mil+" },
            { id: "checkbox-50mil+", label: "50mil+", value: "50mil+" },
            { id: "checkbox-100mil+", label: "100mil+", value: "100mil+" }
    ];

    followerOptions.forEach(option => {
        let checkbox = document.getElementById(option.id);
        if (checkbox) {
            checkbox.style.backgroundColor = "";
        }
    });
}


function selectFollower(id) {
    console.log("Click element id:" + id);
    const followerOptions = [
        
            { id: "checkbox-0k+", label: "0k+", value: "0k+" },
            { id: "checkbox-10k+", label: "10k+", value: "10k+" },
            { id: "checkbox-100k+", label: "100k+", value: "100k+" },
            { id: "checkbox-250k+", label: "250k+", value: "250k+" },
            { id: "checkbox-500k+", label: "500k+", value: "500k+" },
            { id: "checkbox-1mil+", label: "1mil+", value: "1mil+" },
            { id: "checkbox-10mil+", label: "10mil+", value: "10mil+" },
            { id: "checkbox-25mil+", label: "25mil+", value: "25mil+" },
            { id: "checkbox-50mil+", label: "50mil+", value: "50mil+" },
            { id: "checkbox-100mil+", label: "100mil+", value: "100mil+" }
            
        
        
        // Add more ranges here as needed
    ];

    // Clear previous selections
    clearFollowerSelect();

    // Get the element and dropdown elements
    let element = document.getElementById(id);
    let followerDropdown = document.getElementById("follower-dropdown");
    let followerBoxText = document.getElementById("follower-box-text");

    // Loop through the follower options to match the clicked checkbox
    if (searchTab === "creator") {
        console.log("Creator mode selected");
        followerOptions.forEach(option => {
            // console.log("option.id:", option.id, option.value);
            // console.log("id:", id);
            if (option.id === id) {
                // console.log("matched! " + option.id + "with " + id );
                // Set the background color for the selected option
                element.style.backgroundColor = "black";
                // Update the searchCreatorFollower global variable
                searchCreatorFollower = option.value;
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAA" + option.value);
                // Update the dropdown text
                followerBoxText.innerHTML = option.label;
                // console.log("found match, selected followers is: " + option.value);
            } else {
                // console.log("Didnt find a match with the followers");
            }
        });

        // Hide the dropdown after selection
        followerDropdown.style.display = "none";

        //console.log("Selected Creator Followers: " + searchCreatorFollower);
    } else {
        console.log("Company mode selected");
        followerOptions.forEach(option => {
            if (option.id === id) {
                // Set the background color for the selected option
                element.style.backgroundColor = "black";
                // Update the searchCompanyFollower global variable
                searchCompanyFollower = option.value;
                // Update the dropdown text
                followerBoxText.innerHTML = option.label;
            }
        });

        // Hide the dropdown after selection
        followerDropdown.style.display = "none";

        //console.log("Selected Company Followers: " + searchCompanyFollower);
    }
}

//type dropbox

typeDropbox.addEventListener("click", function(id){
    let typeDropdown = document.getElementById("type-dropdown");
   // console.log("typeDropbox was clicked");
   
    if (typeDropdown.style.display === "none" || typeDropdown.style.display === "") {
        typeDropdown.style.display = "grid";
        document.getElementById("type-box-text").style.borderRadius = "10px 10px 0 0";
    } else {
        typeDropdown.style.display = "none";
        document.getElementById("type-box-text").style.borderRadius = "10px 10px 10px 0";
    }
    
});

function clearTypeSelect() {
    const typeOptions = [
        { id: "checkbox-informative", label: "Informative", value: "informative" },
        { id: "checkbox-entertaining", label: "Entertaining", value: "entertaining" },
        { id: "checkbox-review", label: "Product Review/Unboxing", value: "review" },
        { id: "checkbox-tutorial", label: "Tutorials/How-To", value: "tutorial" },
        { id: "checkbox-artistic", label: "Artistic/Creative", value: "artistic" },
        { id: "checkbox-type-other", label: "Other", value: "other" }
    ];
    

    typeOptions.forEach(option => {
        let checkbox = document.getElementById(option.id);
        if (checkbox) {
            checkbox.style.backgroundColor = "";
        }
    });
}

function selectType(id) {
    const typeOptions = [
        { id: "checkbox-informative", label: "Informative", value: "informative" },
        { id: "checkbox-entertaining", label: "Entertaining", value: "entertaining" },
        { id: "checkbox-review", label: "Product Review/Unboxing", value: "review" },
        { id: "checkbox-tutorial", label: "Tutorials/How-To", value: "tutorial" },
        { id: "checkbox-artistic", label: "Artistic/Creative", value: "artistic" },
        { id: "checkbox-type-other", label: "Other", value: "other" }
    ];
    
    

    // Get the element and dropdown elements
    let element = document.getElementById(id);

    // Loop through the type options to match the clicked checkbox
    if (searchTab === "creator") {
        typeOptions.forEach(option => {
            if (option.id === id) {
                if(!searchCreatorType.includes(option.value)){
                    element.style.backgroundColor = "black";
                    searchCreatorType.push(option.value);
                } else if(searchCreatorType.includes(option.value)) {
                    element.style.backgroundColor = "white";
                    for(let i = 0; i < searchCreatorType.length; i++) {
                       // console.log("testing searchCreatorType array" + searchCreatorType);
                        if(option.value = searchCreatorType[i]){
                            searchCreatorType.splice(i, 1);
                        }
                    }
                }
            }
        });

        //console.log("Selected Creator Type: " + searchCompanyType);
    } else {
        typeOptions.forEach(option => {
            if (option.id === id) {
                if(!searchCompanyType.includes(option.value)){
                    element.style.backgroundColor = "black";
                    searchCompanyType.push(option.value);
                } else if(searchCompanyType.includes(option.value)) {
                    element.style.backgroundColor = "white";
                    for(let i = 0; i < searchCompanyType.length; i++) {
                       // console.log("testing searchCompanyType array" + searchCompanyType);
                        if(option.value = searchCompanyType[i]){
                            searchCompanyType.splice(i, 1);
                        }
                    }
                }
            }
        });

       // console.log("Selected Company Type: " + searchCompanyType);
    }
}

//content dropbox
contentDropbox.addEventListener("click", function(id){
    let contentDropdown = document.getElementById("content-dropdown");
    //console.log("Content dropdown was clicked");
   
    if (contentDropdown.style.display === "none" || contentDropdown.style.display === "") {
        contentDropdown.style.display = "grid";
        document.getElementById("content-box-text").style.borderRadius = "10px 10px 0 0";
    } else {
        contentDropdown.style.display = "none";
        document.getElementById("content-box-text").style.borderRadius = "10px 10px 10px 0";
    }
});

function clearContentSelect() {
    const contentOptions = [
        { id: "checkbox-select-type", label: "Select Content", value: "select-content" },
        { id: "checkbox-sports", label: "Sports", value: "sports" },
        { id: "checkbox-lifestyle", label: "Lifestyle", value: "lifestyle" },
        { id: "checkbox-fitness", label: "Fitness & Health", value: "fitness" },
        { id: "checkbox-cooking", label: "Cooking & Food", value: "cooking" },
        { id: "checkbox-tech", label: "Technology & Gaming", value: "tech" },
        { id: "checkbox-beauty", label: "Beauty & Fashion", value: "beauty" },
        { id: "checkbox-education", label: "Education", value: "education" },
        { id: "checkbox-travel", label: "Travel & Adventure", value: "travel" },
        { id: "checkbox-finance", label: "Finance & Business", value: "finance" },
        { id: "checkbox-content-other", label: "Other", value: "other" }
    ];
    

    contentOptions.forEach(option => {
        let checkbox = document.getElementById(option.id);
        if (checkbox) {
            checkbox.style.backgroundColor = "";
        }
    });
}


function selectContent(id) {
    const contentOptions = [
        { id: "checkbox-select-type", label: "Select Content", value: "select-content" },
        { id: "checkbox-sports", label: "Sports", value: "sports" },
        { id: "checkbox-lifestyle", label: "Lifestyle", value: "lifestyle" },
        { id: "checkbox-fitness", label: "Fitness & Health", value: "fitness" },
        { id: "checkbox-cooking", label: "Cooking & Food", value: "cooking" },
        { id: "checkbox-tech", label: "Technology & Gaming", value: "tech" },
        { id: "checkbox-beauty", label: "Beauty & Fashion", value: "beauty" },
        { id: "checkbox-education", label: "Education", value: "education" },
        { id: "checkbox-travel", label: "Travel & Adventure", value: "travel" },
        { id: "checkbox-finance", label: "Finance & Business", value: "finance" },
        { id: "checkbox-content-other", label: "Other", value: "other" }
    ];
    

    // Get the element and dropdown elements
    let element = document.getElementById(id);
    // Loop through the content options to match the clicked checkbox
    if (searchTab === "creator") {
        contentOptions.forEach(option => {
            console.log(option.id + " === " + id);
            if (option.id === id) {
                if (!searchCreatorContent.includes(option.value)) {
                    element.style.backgroundColor = "black"; // Selected color
                    searchCreatorContent.push(option.value);
                } else {
                    element.style.backgroundColor = "white"; // Unselected color
                    for (let i = 0; i < searchCreatorContent.length; i++) {
                       // console.log("Testing searchCreatorContent array: " + searchCreatorContent);
                        if (option.value === searchCreatorContent[i]) {
                            searchCreatorContent.splice(i, 1);
                            break; // Exit loop once item is found and removed
                        }
                    }
                }
            }
        });

       // console.log("Selected Creator Content: " + searchCompanyContent);
    } else {
        
        contentOptions.forEach(option => {
            if (option.id === id) {

                if (!searchCompanyContent.includes(option.value)) {
                    element.style.backgroundColor = "black"; // Selected color
                    searchCompanyContent.push(option.value);
                } else {
                    element.style.backgroundColor = "white"; // Unselected color
                    for (let i = 0; i < searchCompanyContent.length; i++) {
                      //  console.log("Testing searchCompanyContent array: " + searchCompanyContent);
                        if (option.value === searchCompanyContent[i]) {
                            searchCompanyContent.splice(i, 1);
                            break; // Exit loop once item is found and removed
                        }
                    }
                }
            }
        });

       // console.log("Selected Company Content: " + searchCompanyContent);
    }
}

//platform search
platformDropbox.addEventListener("click", function(id){
    let platformDropdown = document.getElementById("platform-dropdown");
    //console.log("platformDropbox was clicked");
    
    if (platformDropdown.style.display === "none" || platformDropdown.style.display === "") {
        platformDropdown.style.display = "grid";
        document.getElementById("platform-box-text").style.borderRadius = "10px 10px 0 0";
    } else {
        platformDropdown.style.display = "none";
        document.getElementById("platform-box-text").style.borderRadius = "10px 10px 10px 0";
    }
});

function clearPlatformSelect() {
    const platformOptions = [
        { id: "checkbox-youtube", label: "YouTube", value: "youtube" },
        { id: "checkbox-instagram", label: "Instagram", value: "instagram" },
        { id: "checkbox-facebook", label: "Facebook", value: "facebook" },
        { id: "checkbox-tiktok", label: "TikTok", value: "tiktok" },
        { id: "checkbox-streaming", label: "Streaming", value: "streaming" },
        { id: "checkbox-linkedin", label: "LinkedIn", value: "linkedin" },
        { id: "checkbox-pinterest", label: "Pinterest", value: "pinterest" },
        { id: "checkbox-snapchat", label: "Snapchat", value: "snapchat" },
        { id: "checkbox-other", label: "Other", value: "other" }
    ];
    
    

    platformOptions.forEach(option => {
        let checkbox = document.getElementById(option.id);
        if (checkbox) {
            checkbox.style.backgroundColor = "";
        }
    });
}

function selectPlatform(id) {
    const platformOptions = [
        { id: "checkbox-youtube", label: "YouTube", value: "youtube" },
        { id: "checkbox-instagram", label: "Instagram", value: "instagram" },
        { id: "checkbox-facebook", label: "Facebook", value: "facebook" },
        { id: "checkbox-tiktok", label: "TikTok", value: "tiktok" },
        { id: "checkbox-streaming", label: "Streaming", value: "streaming" },
        { id: "checkbox-linkedin", label: "LinkedIn", value: "linkedin" },
        { id: "checkbox-pinterest", label: "Pinterest", value: "pinterest" },
        { id: "checkbox-snapchat", label: "Snapchat", value: "snapchat" },
        { id: "checkbox-other", label: "Other", value: "other" }
    ];
    
    console.log("Log from selectPlatforms()");
    // Get the element and dropdown elements
    let element = document.getElementById(id);
    
    if (searchTab === "creator"){
        searchPlatformArray = searchCreatorPlatform;
        platformOptions.forEach(option => {
            if (option.id === id) {
                if (!searchPlatformArray.includes(option.value)) {
                    element.style.backgroundColor = "black"; // Mark as selected
                    searchPlatformArray.push(option.value); // Add to the selection
                } else {
                    element.style.backgroundColor = "white"; // Mark as unselected
                    // Iterate backwards to safely remove from array
                    for (let i = searchPlatformArray.length - 1; i >= 0; i--) {
                        if (option.value === searchPlatformArray[i]) {
                            searchPlatformArray.splice(i, 1); // Remove from selection
                        }
                    }
                }
            }
        
        });
    } else {
        searchPlatformArray = searchCompanyPlatform;
        platformOptions.forEach(option => {
            if (option.id === id) {
                if (!searchPlatformArray.includes(option.value)) {
                    element.style.backgroundColor = "black"; // Mark as selected
                    searchPlatformArray.push(option.value); // Add to the selection
                } else {
                    element.style.backgroundColor = "white"; // Mark as unselected
                    // Iterate backwards to safely remove from array
                    for (let i = searchPlatformArray.length - 1; i >= 0; i--) {
                        if (option.value === searchPlatformArray[i]) {
                            searchPlatformArray.splice(i, 1); // Remove from selection
                        }
                    }
                }
            }
        
        });
    }
    // Log selected platforms for debugging
    console.log("Selected " + (searchTab === "creator" ? "Creator" : "Company") + " Platforms: ", searchPlatformArray);
}

function runFilter(id,checkbox){
    const checkboxClass = checkbox.classList;
    console.log("RUNNING FILTER " + checkboxClass);
    if (checkboxClass.contains("platform")) {
        selectPlatform(id); // Assuming selectPlatform() is defined
        selectContent(id);
    } 
    if (checkboxClass.contains("content")) {
        selectContent(id);
    }
    if (checkboxClass.contains("type")) {
        selectType(id);
    }
    if (checkboxClass.contains("followers")) {
        selectFollower(id);
    }
    if(checkboxClass.contains("gender")){
        console.log("filter checking gender class");
        selectGender(id);
    }

}

function clearSearch(){
    searchCreatorFollower = "";
    searchCreatorGender = "";
    searchCreatorType = [];
    searchCreatorContent = [];
    searchCreatorPlatform =[];

    searchCompanyFollower = "";
    searchCompanyType = [];
    searchCompanyContent = [];
    searchCompanyPlatform = [];

    document.getElementById("follower-box-text").innerHTML = "Followers";
    document.getElementById("gender-box-text").innerHTML = "Gender";
}

let displayCompanyTab = document.getElementById("company-search-tab");
displayCompanyTab.addEventListener("click", function(){
    //Change style
    console.log("company tab is clicked")
    let creatorsTab = document.getElementById("creator-search-tab");
    let companyTab = document.getElementById("company-search-tab");

    creatorsTab.style.borderRight = "white";
    creatorsTab.style.borderBottom = "2px solid black";
    companyTab.style.borderLeft = "2px solid black";
    companyTab.style.borderTopLeftRadius = "9px";
    companyTab.style.borderBottom = "white";
    console.log("beep");

    //change variables
    searchTab = "company";

    //run functions
    generateCards();
    clearPlatformSelect();
    clearContentSelect();
    clearTypeSelect();
    clearFollowerSelect();
    clearGenderSelect();
    clearSearch();

    //console
    console.log(searchTab);
});
let displayCreatorTab = document.getElementById("creator-search-tab");
displayCreatorTab.addEventListener("click", function(){
    //change style
    console.log("creator tab is clicked"); 
    let creatorsTab = document.getElementById("creator-search-tab");
    let companyTab = document.getElementById("company-search-tab");

    creatorsTab.style.borderRight = "2px solid black";
    creatorsTab.style.borderBottom = "white";
    companyTab.style.borderLeft = "white";
    companyTab.style.borderTopLeftRadius = "0";
    companyTab.style.borderBottom = "2px solid black";
    console.log("boop");

    //change variables
    searchTab = "creator";

    //run functions
    generateCards();
    clearPlatformSelect();
    clearContentSelect();
    clearTypeSelect();
    clearFollowerSelect();
    clearGenderSelect();
    clearSearch();
    
    //console
    console.log(searchTab);
});

// Select all elements with the class 'checkbox'
const checkboxElements = document.querySelectorAll('.checkbox');

// Loop through each element and add a click event listener
checkboxElements.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        // Check if the element has the class 'platform'
        console.log(checkbox.className + " was clicked! (From Event Listener)");
        const id = checkbox.id;
        console.log("Checking searchTab: " + searchTab);
        if (searchTab === "creator") {
            runFilter(id, checkbox);
            // filterCreators();
            generateCards();
        } else {
            runFilter(id, checkbox);
            console.log("filtering Company");
            // filterCompany();
            console.log("FINAL STEP NEXT")
            generateCards();
        }
        
        
    });
});


async function generateCards() {
    const container = document.getElementById('section2'); // Container to hold all the cards
    container.innerHTML = "";
    console.log("GenCards before IF");

    if (searchTab === "creator") {
        console.log("GENERATING CARDS");
        let q = query(collection(db, "users"));

        // Apply Firestore filters
        if (searchCreatorGender !== "") {
            q = query(q, where("gender", "==", searchCreatorGender));
        }
        if (searchCreatorFollower !== "") {
            q = query(q, where("followers", "==", searchCreatorFollower));
        }

        // Fetch data
        const querySnapshot = await getDocs(q);
        let allResults = [];
        querySnapshot.forEach(doc => {
            allResults.push(doc.data());
        });

        // Filter results for array-contains fields
        allResults = allResults.filter(data => {
            return (
                (searchPlatformArray.length === 0 || searchPlatformArray.some(p => data.platform.includes(p))) &&
                (searchCreatorContent.length === 0 || searchCreatorContent.some(c => data.content.includes(c))) &&
                (searchCreatorType.length === 0 || searchCreatorType.some(t => data.type.includes(t)))
            );
        });

        // Generate cards
        allResults.forEach(data => {
            const titleCard = document.createElement('div');
            titleCard.setAttribute('id', 'titlecard');


            titleCard.innerHTML = `
                <div class="cardSection" id="name">${data.firstName}</div>
                <div class="cardSection" id="type">${data.type}</div>
                <div class="cardSection" id="topLeft">followers - ${data.followers}</div>
                <div class="cardSection" id="topRight">${data.content}</div>
                <div class="cardSection" id="bottomLeft">${data.platform}</div>
                <div class="cardSection" id="bottomRight"><a href="">${data.link}</a></div>
            `;
            container.appendChild(titleCard);
        });

        console.log("Creator cards complete");
    } else {
        console.log("GENERATING CARDS");
        let q = query(collection(db, "company"));

        // Apply Firestore filters
        if (searchCompanyGender !== "") {
            q = query(q, where("gender", "==", searchCompanyGender));
        }
        if (searchCompanyFollower !== "") {
            q = query(q, where("followers", "==", searchCompanyFollower));
        }

        // Fetch data
        const querySnapshot = await getDocs(q);
        let allResults = [];
        querySnapshot.forEach(doc => {
            allResults.push(doc.data());
        });

        // Filter results for array-contains fields
        allResults = allResults.filter(data => {
            return (
                (searchPlatformArray.length === 0 || searchPlatformArray.some(p => data.platform.includes(p))) &&
                (searchCompanyContent.length === 0 || searchCompanyContent.some(c => data.content.includes(c))) &&
                (searchCompanyType.length === 0 || searchCompanyType.some(t => data.type.includes(t)))
            );
        });

        // Generate cards
        allResults.forEach(data => {
            const titleCard = document.createElement('div');
            titleCard.setAttribute('id', 'titlecard');


            titleCard.innerHTML = `
                <div class="cardSection" id="name">${data.companyName}</div>
                <div class="cardSection" id="type">${data.type}</div>
                <div class="cardSection" id="topLeft">followers - ${data.followers}</div>
                <div class="cardSection" id="topRight">${data.content}</div>
                <div class="cardSection" id="bottomLeft">${data.platform}</div>
                <div class="cardSection" id="bottomRight"><a href="">${data.link}</a></div>
            `;
            container.appendChild(titleCard);
        });

        console.log("Company cards complete");
    }
}


generateCards();