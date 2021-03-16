class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 3;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}


// ---------------------------------------- Navbar-Toggler - close --------------------------------------------------
const navbarCollapse = document.getElementById('navbarCollapse');

window.addEventListener('click', function() {
  if (navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
  }
})



// ---------------------------------------- Loading Page --------------------------------------------------
var loader = document.querySelector('.loader');
window.addEventListener('load', vanish);

function vanish() {
  loader.classList.add('disappear');
}



// ---------------------------------------- Random Quote Generator --------------------------------------------------
const printQuote = document.getElementById('print-quote');

async function randomQuote() {
  try {
    const res = await fetch('https://api.quotable.io/random');
    if (res.ok) { 
      const data = await res.json();
      printQuote.innerHTML = `${data.content}  -  ${data.author}`
    }
  } catch (error) {
    console.log(error);
  }
}
randomQuote();





// ---------------------------------------- Transparency menu background --------------------------------------------------
window.addEventListener('scroll', function() {
  if(window.scrollY > 50) {
    document.querySelector('#main-nav').style.opacity = 0.7;
  }
  else {
    document.querySelector('#main-nav').style.opacity = 1;
  }
})







// ---------------------------------------- Smooth Scroll --------------------------------------------------
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarMenu = document.querySelector('.navbar ul');
const navbarLinks = document.querySelectorAll('.navbar a');
const playHangman = document.getElementById('playHangman');

navbarToggler.addEventListener('click', navbarTogglerClick);

function navbarTogglerClick() {
  navbarToggler.classList.toggle('open-navbar-toggler');
  navbarMenu.classList.toggle('open');
}

navbarLinks.forEach(elem => elem.addEventListener('click', navbarLinkClick));

function navbarLinkClick(e) {
  smoothScroll(e);  //Call the 'smoothScroll' function
  if(navbarMenu.classList.contains('open')) {   //Close navbarMenu in smaller screens
    navbarToggler.click()
  }
}


function smoothScroll(event) {
  event.preventDefault();

    const targetId = event.currentTarget.getAttribute('href') === "#" ? 'header' : event.currentTarget.getAttribute("href");
    playHangman.addEventListener('click', () => window.location.replace('play.html'));

    const targetPosition = document.querySelector(targetId).offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 500;
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
    if(!start) start = timestamp;
    const progress = timestamp - start;
    // window.scrollTo(0, distance*(progress/duration) + startPosition);
    window.scrollTo(0, easeInOutQuad(progress, startPosition, distance, duration));
    if(progress < duration) window.requestAnimationFrame(step);
  }
};


function easeInOutQuad(t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};





// ---------------------------------------- Scroll Spy --------------------------------------------------
  var scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#main-nav'
  })

  function resizeWindow() {
    let dataSpyList = [].slice.call(document.querySelectorAll('[data-bs-spy="scroll"]'));

    dataSpyList.forEach(function(dataSpyElement) {
      bootstrap.ScrollSpy.getInstance(dataSpyElement).refresh();
    });
  }



// ---------------------------------------- Progress Bar --------------------------------------------------
window.addEventListener('scroll', () => {
  let progressBars = document.querySelectorAll('.progress-bar');
  let values = [
    '90%',
    '80%',
    '70%',
    '65%'
  ];
  progressBars.forEach((progress, index) => {
    progress.style.width = values[index];
  });
});



// ---------------------------------------- Form Submission --------------------------------------------------
const handleSubmit = (e) => {
  e.preventDefault()
  let myForm = document.getElementById('contactMe');
  let formData = new FormData(myForm)
  fetch('/', {
    method: 'POST',
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString()
  }).then(() => console.log('Form successfully submitted')).catch((error) =>
    alert(error))
}


//Get Input Values
let name = document.getElementById('nameInput').value;
let email = document.getElementById('emailInput').value;
let message = document.getElementById('message-text').value;


function sendEmail(name, email, message) {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "hpetrovski.94@gmail.com",
    Password: "cgwzivbfoijpvjdc",
    To: "hpetrovski.94@gmail.com",
    From: "hpetrovski.94@gmail.com",
    Subject: `${name} sent you a message`,
    Body: `Name: ${name} <br/> Email: ${email} <br/> Message: ${message}`
  }).then((message) => alert("mail sent successfully"))
}
sendEmail(name, email, message)







// Current Year
document.getElementById('year').innerHTML = new Date().getFullYear();











