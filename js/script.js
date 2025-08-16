// Get references to DOM elements
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const greetingText = document.getElementById('greetingText');
const nameModal = document.getElementById('nameModal');
const nameForm = document.getElementById('nameForm');
const nameInput = document.getElementById('nameInput');
const messageForm = document.getElementById('messageForm');
const nameMessageInput = document.getElementById('name');
const messageInput = document.getElementById('message');
const messagesList = document.getElementById('messagesList');

// Toggle mobile menu on button click
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Function to update the greeting text on the hero section
function updateGreeting(name) {
  if (greetingText) {
    greetingText.innerHTML = `Hi <span class="text-blue-600">${name}</span>, welcome to my portfolio website`;
  }
}

// Function to hide the modal and make it transparent
function hideModal() {
  nameModal.classList.add('opacity-0');
  setTimeout(() => {
    nameModal.classList.add('hidden');
    nameModal.classList.remove('opacity-0');
  }, 300); // Match transition duration
}

// Function to show the modal
function showModal() {
  nameModal.classList.remove('hidden');
  setTimeout(() => {
    nameModal.classList.remove('opacity-0');
  }, 10);
}

// Check if a name is already stored in local storage
const storedName = localStorage.getItem('userName');

if (storedName) {
  // If a name is found, use it to update the greeting text
  updateGreeting(storedName);
} else {
  // If no name is found, show the modal to get the user's name
  showModal();
}

// Handle form submission for the name input
nameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userName = nameInput.value.trim();
  if (userName) {
    // Save the name to local storage
    localStorage.setItem('userName', userName);
    // Update the greeting text with the new name
    updateGreeting(userName);
    // Hide the modal
    hideModal();
  }
});

// Handle message form submission
messageForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = nameMessageInput.value.trim();
  const message = messageInput.value.trim();
  
  if (name && message) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${name}:</strong> ${message}`;
    messagesList.appendChild(li);

    this.reset();
  }
});

// Add event listeners for smooth scrolling and active link styling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
    // Close mobile menu after clicking a link
    if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
  });
});

const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 100) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.href.includes(currentSection)) {
      link.classList.add('active');
    }
  });
});
