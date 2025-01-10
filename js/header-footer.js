// Retrieve firstName from localStorage
const firstName = localStorage.getItem('firstName');
console.log("First name from localStorage:", firstName);

// Define the footer HTML in a variable
var footerHTML = `
  <div id="footer">
      <div id="links">
          <div id="links1">
              <a class="footerlink" href="contactv2.html">Contact Us</a> <br>
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
          <a id="social" class="footerlink" href="homev2.html">SocialQ</a>
      </div>
  </div>
`;

// Function to insert the footer into the DOM
function addFooter() {
  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// Define the CSS links for the header to be added to the <head>
var headerStyles = `
  <link rel="stylesheet" href="../css/homeStylev2.css">
  <link rel="stylesheet" href="../css/headerFooterStylev2.css">
`;

// Define the header HTML to be added to the <body>
var headerHTML = `
  <div id="header">
    <a id="socialQ" href="homev2.html">
      <h1 id="socialQ">SocialQ</h1>
    </a>
   <div class="top-right-header" id="login-profile" onclick="selectProfileTab()">
    <p id="profile-name">
        <a href="profilev2.html"; return false;">Profile Name</a>
    </p>
    <img id="profileIconSmall" src="../img/blank_profile.png" alt="Profile Icon">
    <div id="profile-header-tab">
      <a id="profileprofile" href="../html/profilev2.html">Profile</a> <br>
      <a id="header-profile-settings" href="../html/profile_settings.html">Profile Settings</a>
    </div>
</div>

    <div id="login-signup" class="top-right-header"><a id="login-page" href="loginv2.html"> Login </a><span>/</span> <a id="signup-page" href="signup.html">Signup</a>
    </div>
  </div>
  <div id="menu_bar">
    <p class="menu" href="homev2.html"></p>
    <a id="login-page-link" class="menu" href="loginv2.html">Login Page</a>
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

  console.log("Inserting header with firstName:", firstName); // Debugging

  if(uid){
    document.getElementById("login-page-link").style.display = "none";
    document.getElementById("login-signup").style.display = "none";
    document.getElementById("login-profile").style.display = "grid";
    
  } else {
    document.getElementById("login-page-link").style.display = "none";
    document.getElementById("login-signup").style.display = "grid";
    document.getElementById("login-profile").style.display = "none";
  }
  
// Reset logic on page load
  window.onload = function () {
    sessionStorage.setItem('redirected', 'false'); // Reset the redirection flag
  };

  // Redirection logic
  if (sessionStorage.getItem('redirected') === 'false') {
    if (uid) {
        sessionStorage.setItem('redirected', 'true'); // Set flag to true
        window.location.href = "../html/homev2.html";
    } else {
        sessionStorage.setItem('redirected', 'true'); // Set flag to true
        window.location.href = "../html/index.html";
    }
  }


}

function selectProfileTab() {
  console.log("Displaying profile header tab");
  const tab = document.getElementById("profile-header-tab");
  const profiletab = document.getElementById("header-profile-settings");
  
  // Get the computed display property
  const currentDisplay = window.getComputedStyle(tab).display;
  
  if (currentDisplay === "none") {
    tab.style.display = "flex";
    profiletab.style.display= " flex";
  } else {
    tab.style.display = "none";
    profiletab.style.display = "none";
  }
}




// Ensure onPageLoad is called after the page is fully loaded
window.onload = onPageLoad();
