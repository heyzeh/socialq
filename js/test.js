//backgroundImg is 720x120 

let creators = [];
let companies = [];
var currentUser;

let creatorSearch = creators;
let companySearch = companies;

let searchCreatorFollower = "";
let searchCreatorGender = "";
let searchCreatorType = [];
let searchCreatorContent = [];
let searchCreatorPlatform =[];

let searchCompanyGender = "";
let searchCompanyFollower = "";
let searchCompanyType = [];
let searchCompanyContent = [];
let searchCompanyPlatform = [];

let searchTab = "creator";

function genderDropbox(id){
    let genderDropdown = document.getElementById("gender-dropdown");
    console.log("genderDropbox was clicked");
   
    if (genderDropdown.style.display === "none" || genderDropdown.style.display === "") {
        genderDropdown.style.display = "grid";
        document.getElementById("gender-box-text").style.borderRadius = "10px 10px 0 0";
    } else {
        genderDropdown.style.display = "none";
        document.getElementById("gender-box-text").style.borderRadius = "10px 10px 10px 0";
    }
    
}

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
    }
}

//Follower dropbox
function followerDropbox(id){
    let followerDropdown = document.getElementById("follower-dropdown");
    console.log("followerDropbox was clicked");
   
    if (followerDropdown.style.display === "none" || followerDropdown.style.display === "") {
        followerDropdown.style.display = "grid";
        document.getElementById("follower-box-text").style.borderRadius = "10px 10px 0 0";
    } else {
        followerDropdown.style.display = "none";
        document.getElementById("follower-box-text").style.borderRadius = "10px 10px 10px 0";
    }
    
}

function clearFollowerSelect() {
    const followerOptions = [
        { id: "checkbox-0k-10k", label: "0k-10k", value: "0k-10k" },
        { id: "checkbox-10k-100k", label: "10k-100k", value: "10k-100k" },
        { id: "checkbox-100k-250k", label: "100k-250k", value: "100k-250k" },
        { id: "checkbox-250k-500k", label: "250k-500k", value: "250k-500k" },
        { id: "checkbox-500k-1mil", label: "500k-1mil", value: "500k-1mil" },
        { id: "checkbox-1mil-10mil", label: "1mil-10mil", value: "1mil-10mil" },
        { id: "checkbox-10mil-25mil", label: "10mil-25mil", value: "10mil-25mil" },
        { id: "checkbox-25mil-50mil", label: "25mil-50mil", value: "25mil-50mil" },
        { id: "checkbox-50mil-100mil", label: "50mil-100mil", value: "50mil-100mil" },
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
    const followerOptions = [
        { id: "checkbox-0k-10k", label: "0k-10k", value: "0k-10k" },
        { id: "checkbox-10k-100k", label: "10k-100k", value: "10k-100k" },
        { id: "checkbox-100k-250k", label: "100k-250k", value: "100k-250k" },
        { id: "checkbox-250k-500k", label: "250k-500k", value: "250k-500k" },
        { id: "checkbox-500k-1mil", label: "500k-1mil", value: "500k-1mil" },
        { id: "checkbox-1mil-10mil", label: "1mil-10mil", value: "1mil-10mil" },
        { id: "checkbox-10mil-25mil", label: "10mil-25mil", value: "10mil-25mil" },
        { id: "checkbox-25mil-50mil", label: "25mil-50mil", value: "25mil-50mil" },
        { id: "checkbox-50mil-100mil", label: "50mil-100mil", value: "50mil-100mil" },
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
        followerOptions.forEach(option => {
            if (option.id === id) {
                // Set the background color for the selected option
                element.style.backgroundColor = "black";
                // Update the searchCreatorFollower global variable
                searchCreatorFollower = option.value;
                // Update the dropdown text
                followerBoxText.innerHTML = option.label;
            }
        });

        // Hide the dropdown after selection
        followerDropdown.style.display = "none";

        //console.log("Selected Creator Followers: " + searchCreatorFollower);
    } else {
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
function typeDropbox(id){
    let typeDropdown = document.getElementById("type-dropdown");
   // console.log("typeDropbox was clicked");
   
    if (typeDropdown.style.display === "none" || typeDropdown.style.display === "") {
        typeDropdown.style.display = "grid";
        document.getElementById("type-box-text").style.borderRadius = "10px 10px 0 0";
    } else {
        typeDropdown.style.display = "none";
        document.getElementById("type-box-text").style.borderRadius = "10px 10px 10px 0";
    }
    
}

function clearTypeSelect() {
    const typeOptions = [
        { id: "checkbox-bowling", label: "bowling", value: "bowling" },
        { id: "checkbox-baking", label: "baking", value: "baking" },
        { id: "checkbox-gym", label: "gym", value: "gym" },
        { id: "checkbox-surfing", label: "surfing", value: "surfing" }
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
        { id: "checkbox-bowling", label: "bowling", value: "bowling"},
        { id: "checkbox-baking", label: "baking", value: "baking"},
        { id: "checkbox-gym", label: "gym", value: "gym"},
        { id: "checkbox-surfing", label: "surfing", value: "surfing"}
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
function contentDropdown() {
    let contentDropdown = document.getElementById("content-dropdown");
    //console.log("Content dropdown was clicked");
   
    if (contentDropdown.style.display === "none" || contentDropdown.style.display === "") {
        contentDropdown.style.display = "grid";
        document.getElementById("content-box-text").style.borderRadius = "10px 10px 0 0";
    } else {
        contentDropdown.style.display = "none";
        document.getElementById("content-box-text").style.borderRadius = "10px 10px 10px 0";
    }
}

function clearContentSelect() {
    const contentOptions = [
        { id: "checkbox-select-type", label: "Select Content", value: "select-content" },
        { id: "checkbox-sports", label: "Sports", value: "sports" },
        { id: "checkbox-lifestyle", label: "Lifestyle", value: "lifestyle" },
        { id: "checkbox-fitness", label: "Fitness", value: "fitness" },
        { id: "checkbox-cooking", label: "Cooking", value: "cooking" }
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
        { id: "checkbox-fitness", label: "Fitness", value: "fitness" },
        { id: "checkbox-cooking", label: "Cooking", value: "cooking" }
    ];

    // Get the element and dropdown elements
    let element = document.getElementById(id);

    // Loop through the content options to match the clicked checkbox
    if (searchTab === "creator") {
        contentOptions.forEach(option => {
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
function platformDropbox() {
    let platformDropdown = document.getElementById("platform-dropdown");
    //console.log("platformDropbox was clicked");
    
    if (platformDropdown.style.display === "none" || platformDropdown.style.display === "") {
        platformDropdown.style.display = "grid";
        document.getElementById("platform-box-text").style.borderRadius = "10px 10px 0 0";
    } else {
        platformDropdown.style.display = "none";
        document.getElementById("platform-box-text").style.borderRadius = "10px 10px 10px 0";
    }
}

function clearPlatformSelect() {
    const platformOptions = [
        { id: "checkbox-youtube", label: "YouTube", value: "platform-youtube" },
        { id: "checkbox-instagram", label: "Instagram", value: "platform-instagram" },
        { id: "checkbox-facebook", label: "Facebook", value: "platform-facebook" },
        { id: "checkbox-tiktok", label: "TikTok", value: "platform-tiktok" },
        { id: "checkbox-streaming", label: "Streaming", value: "platform-streaming" }
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
        { id: "checkbox-youtube", label: "YouTube", value: "platform-youtube" },
        { id: "checkbox-instagram", label: "Instagram", value: "platform-instagram" },
        { id: "checkbox-facebook", label: "Facebook", value: "platform-facebook" },
        { id: "checkbox-tiktok", label: "TikTok", value: "platform-tiktok" },
        { id: "checkbox-streaming", label: "Streaming", value: "platform-streaming" }
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

function displayCompanyTab(){
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
}

function displayCreatorTab(){
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
}

function maxMin(followers) {
    const ranges = {
        "0k-10k": { min: 0, max: 10000 },
        "10k-100k": { min: 10000, max: 100000 },
        "100k-250k": { min: 100000, max: 250000 },
        "250k-500k": { min: 250000, max: 500000 },
        "500k-1mil": { min: 500000, max: 1000000},
        "1mil-10mil": { min: 1000000, max: 10000000},
        "10mil-25mil": { min: 10000000, max: 25000000},
        "25mil-50mil": { min: 25000000, max: 50000000},
        "50mil-100mil": {min: 50000000, max: 100000000},
        "100mil+": {min: 100000000, max: 9999999999}
    };
    return ranges[followers] || console.log("Range not coded yet");
}

function filterCreators() {
    // Start with all creators, and apply filters one by one
    creatorSearch = [...creators];
    console.log("(From filterCreators) Initial creators:", creatorSearch);

    // Filter by gender if specified
    if (searchCreatorGender !== "") {
        creatorSearch = creatorSearch.filter(creator => creator.gender === searchCreatorGender);
        console.log("After gender filter:", creatorSearch);
    }

    // Filter by follower range if specified
    if (searchCreatorFollower !== "") {
        const range = maxMin(searchCreatorFollower); // Assuming maxMin gives min and max range
        creatorSearch = creatorSearch.filter(creator => creator.followers >= range.min && creator.followers <= range.max);
        console.log("After follower filter:", creatorSearch);
    }

    // Filter by type if specified and not empty
    if (searchCreatorContent && searchCreatorContent.length > 0) {
        creatorSearch = creatorSearch.filter(creators => searchCreatorContent.includes(creators.type));
        console.log("After type filter:", creatorSearch);
    }

    // Filter by content category if specified and not empty
    if (searchCreatorType && searchCreatorType.length > 0) {
        creatorSearch = creatorSearch.filter(creators => searchCreatorType.includes(creators.category));
        console.log("After content category filter:", creatorSearch);
    }

    // Filter by platform if specified and not empty
    if (searchCreatorPlatform && searchCreatorPlatform.length > 0) {
        creatorSearch = creatorSearch.filter(creators => searchCreatorPlatform.includes(creators.role)); // Use 'platform'
        console.log("After platform filter:", creatorSearch);
    }

    console.log("Final filtered creators:", creatorSearch);
    
    // If creatorSearch is meant to be returned or displayed:
    return creatorSearch;
}


function filterCompany() {
    // Start with all companies, and apply filters one by one
    companySearch = [...companies];
    console.log("Initial companies:", companySearch);

    // Filter by gender if specified
    if (searchCompanyGender !== "") {
        companySearch = companySearch.filter(company => company.gender === searchCompanyGender);
        console.log("After gender filter:", companySearch);
    }
    
    // Filter by follower range if specified
    if (searchCompanyFollower !== "") {
        const range = maxMin(searchCompanyFollower); // Assuming maxMin gives min and max range
        companySearch = companySearch.filter(company => company.followers >= range.min && company.followers <= range.max);
        console.log("After follower filter:", companySearch);
    }

    // Filter by type if specified and not empty
    if (searchCompanyType && searchCompanyType.length > 0) {
        companySearch = companySearch.filter(company => searchCompanyType.includes(company.category));
        console.log("After type filter:", companySearch);
    }

    // Filter by content category if specified and not empty
    if (searchCompanyContent && searchCompanyContent.length > 0) {
        console.log("DO WE MATCH ?? " + searchCompanyContent + " " + company.type);
        companySearch = companySearch.filter(company => searchCompanyContent.includes(company.type));
        console.log("After content category filter:", companySearch);
    }

    // Filter by platform if specified and not empty
    if (searchCompanyPlatform && searchCompanyPlatform.length > 0) {
        console.log("DO WE MATCH ?? " + searchCompanyPlatform + " " + company.platform);
        companySearch = companySearch.filter(company => searchCompanyPlatform.includes(company.platform));
        console.log("After platform filter:", companySearch);
    }

    console.log("Final filtered companies:", companySearch);

    // If companySearch is meant to be returned or displayed:
    return companySearch;
}







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
            filterCreators();
            //console.log(searchCreatorPlatform + "   LOOK FOR    " + creators[0].role);
            generateCards();
        } else {
            runFilter(id, checkbox);
            console.log("filtering Company");
            filterCompany();
            //console.log(searchCompanyGender + "   LOOK FOR    " + companies[0].platform);
            console.log("FINAL STEP NEXT")
            generateCards();
        }
        
        
    });
});


function generateCards() {
    const container = document.getElementById('section2'); // Container to hold all the cards
    container.innerHTML = "";
   console.log("GenCards before IF")
    if (searchTab === "creator"){
            console.log("GENERATING CARDS");
            console.log("creatorSearch Array Length: " + creatorSearch.length)
            creatorSearch.forEach(item => {
                // Create the title card container
                const titleCard = document.createElement('div');
                titleCard.setAttribute('id', 'titlecard');
                titleCard.setAttribute(`background-color`, `red`);

                if (item.backgroundImg !== "") {
                    //console.log("applying custom background to" + item.name)
                    //titleCard.style.backgroundImage = item.backgroundImg;
                    titleCard.style.backgroundImage = `url('${item.backgroundImg}')`;
                    //console.log(titleCard.style.backgroundImage);
                }

                // Create individual sections within the card
                titleCard.innerHTML = `
                    <div class="cardSection" id="name">${item.name}</div>
                    <div class="cardSection" id="type">${item.type}</div>
                    <div class="cardSection" id="topLeft">followers - ${item.followers}</div>
                    <div class="cardSection" id="topRight">${item.category}</div>
                    <div class="cardSection" id="bottomLeft">${item.role}</div>
                    <div class="cardSection" id="bottomRight"><a href="">${item.link}</a></div>
                `;
                
                // Append the card to the container
                container.appendChild(titleCard);
            });
            console.log("creator card complete");
    } else {
        console.log("GENERATING CARDS");
        console.log("TEST1 " + companySearch);
        companySearch.forEach(item => {
            // Create the title card container
            const titleCard = document.createElement('div');
            titleCard.setAttribute('id', 'titlecard');
            titleCard.setAttribute(`background-color`, `red`);

            if (item.backgroundImg !== "") {
                //console.log("applying custom background to" + item.name)
                //titleCard.style.backgroundImage = item.backgroundImg;
                titleCard.style.backgroundImage = `url('${item.backgroundImg}')`;
                //console.log(titleCard.style.backgroundImage);
            }

            // Create individual sections within the card
            titleCard.innerHTML = `
                <div class="cardSection" id="name">${item.name}</div>
                <div class="cardSection" id="type">${item.type}</div>
                <div class="cardSection" id="topLeft">followers - ${item.followers}</div>
                <div class="cardSection" id="topRight">${item.category}</div>
                <div class="cardSection" id="bottomLeft">${item.role}</div>
                <div class="cardSection" id="bottomRight"><a href="">${item.link}</a></div>
            `;
            
            // Append the card to the container
            container.appendChild(titleCard);
            console.log("company card complete");
        });
    }
}
// generateCards();

//This asynce function saves the array from user.json to the const json.
async function getCreatorsData(){
    const userJSON = `https://heyzeh.github.io/socialq/json/users.json`;
    try { 
        const response = await fetch(userJSON);
        if(!response.ok){
            throw new Error (`Response status: ${response.status}`);
        }

    creators = await response.json();
    console.log(creators);
    creatorSearch = creators;
    generateCards();

    }catch(error) {
        console.error(error.message);
    }
}

async function getCompanyData(){
    const companyJSON = `https://heyzeh.github.io/socialq/json/companies.json`;
    try { 
        const response = await fetch(companyJSON);
        if(!response.ok){
            throw new Error (`Response status: ${response.status}`);
        }

    companies = await response.json();
    console.log(companies);
    companySearch = companies;
    generateCards();
    }catch(error) {
        console.error(error.message);
    }
}

getCreatorsData();
getCompanyData();
