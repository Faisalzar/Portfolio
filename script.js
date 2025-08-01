// Initialize EmailJS
(function() {
    // EmailJS Public Key
    emailjs.init("VqVR9pj1GgOUWhDjE"); // Your actual Public Key
})();

function myMenuFunction(){
    var menuBtn = document.getElementById("myNavMenu");

    if(menuBtn.className === "nav-menu"){
      menuBtn.className += " responsive";
    } else {
      menuBtn.className = "nav-menu";
    }
  }

/* ----- DARK MODE TOGGLE ----- */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const themeIcon = document.querySelector('.theme-icon');
    
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeIcon.className = 'uil uil-moon theme-icon';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.className = 'uil uil-sun theme-icon';
    }
}

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.querySelector('.theme-icon').className = 'uil uil-sun theme-icon';
}

/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
  window.onscroll = function() {headerShadow()};

  function headerShadow() {
    const navHeader =document.getElementById("header");

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop >  50) {

      navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
      navHeader.style.height = "70px";
      navHeader.style.lineHeight = "70px";

    } else {

      navHeader.style.boxShadow = "none";
      navHeader.style.height = "90px";
      navHeader.style.lineHeight = "90px";

    }
  }


/* ----- TYPING EFFECT ----- */
 var typingEffect = new Typed(".typedText",{
    strings : ["Web Developer"],
    typeSpeed : 100, 
    backSpeed : 80,
    backDelay : 2000
 })


/* ----- ## -- SCROLL REVEAL ANIMATION -- ## ----- */
 const sr = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 2000,
        reset: true     
 })

/* -- HOME -- */
sr.reveal('.featured-text-card',{})
sr.reveal('.featured-name',{delay: 100})
sr.reveal('.featured-text-info',{delay: 200})
sr.reveal('.featured-text-btn',{delay: 200})
sr.reveal('.social_icons',{delay: 200})
sr.reveal('.featured-image',{delay: 300})


/* -- PROJECT BOX -- */
sr.reveal('.header',{interval: 200})
sr.reveal('.portfo-items',{interval: 200})

/* -- HEADINGS -- */
sr.reveal('.top-header',{})

/* ----- ## -- SCROLL REVEAL LEFT_RIGHT ANIMATION -- ## ----- */

/* -- ABOUT INFO & CONTACT INFO -- */
const srLeft = ScrollReveal({
  origin: 'left',
  distance: '80px',
  duration: 2000,
  reset: true
})

srLeft.reveal('.about-info',{delay: 100})
srLeft.reveal('.contact-info',{delay: 100})

/* -- ABOUT SKILLS & FORM BOX -- */
const srRight = ScrollReveal({
  origin: 'right',
  distance: '80px',
  duration: 2000,
  reset: true
})

srRight.reveal('.skills-box',{delay: 100})
srRight.reveal('.form-control',{delay: 100})

/* -- Experience -- */
srRight.reveal('.container1',{interval: 2000})



/* ----- CHANGE ACTIVE LINK ----- */

const sections = document.querySelectorAll('section[id]')

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute('id')

    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { 

        document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link')

    }  else {

      document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link')

    }
  })
}

window.addEventListener('scroll', scrollActive)

/* ----- CONTACT FORM FUNCTIONALITY WITH EMAILJS ----- */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get form elements
    const contactForm = document.querySelector('.form-control');
    const nameInput = document.querySelector('input[placeholder="Name"]');
    const emailInput = document.querySelector('input[placeholder="Email"]');
    const messageInput = document.querySelector('textarea[placeholder="Message"]');
    const sendButton = document.querySelector('.form-button .btn');
    
    // Add event listener to send button
    sendButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get form values
        const userName = nameInput.value.trim();
        const userEmail = emailInput.value.trim();
        const userMessage = messageInput.value.trim();
        
        // Validate form
        if (!userName || !userEmail || !userMessage) {
            showMessage('Please fill in all fields!', 'error');
            return;
        }
        
        // Validate email format
        if (!isValidEmail(userEmail)) {
            showMessage('Please enter a valid email address!', 'error');
            return;
        }
        
        // Show loading state
        sendButton.innerHTML = 'Sending... <i class="uil uil-spinner"></i>';
        sendButton.disabled = true;
        
        // Prepare email parameters
        const templateParams = {
            from_name: userName,
            from_email: userEmail,
            message: userMessage,
            to_name: 'Faisal Zariwala' // Your name
        };
        
        // Send notification email first (this one works)
        console.log('Sending notification email...');
        emailjs.send('service_4pnw91m', 'template_q8hu2w8', {
            from_name: userName,
            from_email: userEmail,
            message: userMessage,
            to_name: 'Faisal Zariwala'
        })
        .then(function(notificationResponse) {
            console.log('Notification email sent successfully:', notificationResponse);
            
            // Now send auto-reply
            console.log('Sending auto-reply to:', userEmail);
            const autoReplyParams = {
                to_email: userEmail,
                to_name: userName,
                from_name: userName,
                message: userMessage
            };
            console.log('Auto-reply parameters:', autoReplyParams);
            
            return emailjs.send('service_4pnw91m', 'template_jfparqr', autoReplyParams);
        })
        .then(function(autoReplyResponse) {
            console.log('Auto-reply sent successfully:', autoReplyResponse);
            showMessage('Message sent successfully! Thank you for contacting me. You should receive a confirmation email shortly.', 'success');
            
            // Clear form
            nameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';
        })
        .catch(function(error) {
            console.log('Error details:', error);
            console.log('Error status:', error.status);
            console.log('Error text:', error.text);
            
            if (error.status === 200) {
                // Notification sent but auto-reply failed
                showMessage('Message sent! However, the auto-reply may not have been delivered.', 'success');
                // Clear form
                nameInput.value = '';
                emailInput.value = '';
                messageInput.value = '';
            } else {
                showMessage('Failed to send message. Please try again later.', 'error');
            }
        })
        .finally(function() {
            // Reset button
            sendButton.innerHTML = 'Send <i class="uil uil-message"></i>';
            sendButton.disabled = false;
        });
    });
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show message function
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Add styles
        messageDiv.style.cssText = `
            padding: 10px 15px;
            margin: 10px 0;
            border-radius: 5px;
            font-size: 14px;
            text-align: center;
            ${type === 'success' ? 
                'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 
                'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;
        
        // Insert message above the send button
        const formButton = document.querySelector('.form-button');
        formButton.parentNode.insertBefore(messageDiv, formButton);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
});
