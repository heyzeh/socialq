let infoPage = document.getElementById("profile-info");
let preferencesPage = document.getElementById("profile-preferences");
let settingsPage = document.getElementById("profile-settings");
let billingPage = document.getElementById("profile-billing");

infoPage.style.display = "grid";
preferencesPage.style.display = "none";
settingsPage.style.display = "none";
billingPage.style.display = "none";


function selectInfo(){
    console.log(infoPage.style.display);
    if(infoPage.style.display === "none"){
        console.log("Selecting Info Tab");
        preferencesPage.style.display = "none";
        infoPage.style.display = "grid";
        settingsPage.style.display = "none";
        billingPage.style.display = "none";
    }
}

function selectPreferences(){
    console.log(preferencesPage.style.display);
    if(preferencesPage.style.display === "none"){
        console.log("Selecting Preferences Tab");
        preferencesPage.style.display = "grid";
        infoPage.style.display = "none";
        settingsPage.style.display = "none";
        billingPage.style.display = "none";
    }
}

function selectSettings(){
    console.log(settingsPage.style.display);
    if(settingsPage.style.display === "none"){
        console.log("Selecting settings Tab");
        preferencesPage.style.display = "none";
        infoPage.style.display = "none";
        settingsPage.style.display = "grid";
        billingPage.style.display = "none";
    }
}

function selectBilling(){
    console.log(billingPage.style.display);
    if(billingPage.style.display === "none"){
        console.log("Selecting billing Tab");
        preferencesPage.style.display = "none";
        infoPage.style.display = "none";
        settingsPage.style.display = "none";
        billingPage.style.display = "grid";
    }
}



