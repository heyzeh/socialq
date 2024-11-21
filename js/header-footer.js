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
             <a class="footerlink" href="">Instgram</a>
             <a class="footerlink" href="">twitter</a>
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
<a id="socialQ" href="homev2.html"><h1 id="socialQ">SocialQ</h1></a>
<div id="login-signup"><a href="loginv2.html" id="login">Login</a><a href="signup.html" id="signup">Signup</a></div>
<a id="profileIconSmall" href="profilev2.html"><img id="profileIconSmall" src="../img/blank_profile.png" alt="Profile Icon"></a>
</div>
<div id="menu_bar">
<a class="menu" href="homev2.html">Home</a>
<a class="menu" href="loginv2.html">Login Page</a>
<a id="test-links" class="menu" href="testing_links.html">Test Links</a>
</div>
<div id="search-bar">
</div>
`;

// Function to insert the header styles into the <head> and the header structure into the <body>
function addHeader() {
// Insert CSS links into the head
document.head.insertAdjacentHTML("beforeend", headerStyles);

// Insert the actual header structure into the body
document.body.insertAdjacentHTML("afterbegin", headerHTML);
}

// Call the function when the page loads
function onPageLoad() {
addFooter();
addHeader();

}

window.onload = onPageLoad;