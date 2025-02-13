// Save user name
function setName() {
  const userName = prompt('Enter your name:');
  localStorage.setItem('userName', userName);
  document.getElementById('userName').textContent = userName;
}

// Set initial user name and other settings
document.addEventListener('DOMContentLoaded', () => {
  const storedName = localStorage.getItem('userName');
  if (storedName) {
    document.getElementById('userName').textContent = storedName;
  }
  
  const storedBackground = localStorage.getItem('backgroundImage');
  if (storedBackground) {
    document.body.style.backgroundImage = `url(${storedBackground})`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
  }
  
  const storedTextColor = localStorage.getItem('textColor');
  if (storedTextColor) {
    document.body.style.color = storedTextColor;
  }
  
  const storedOutline = localStorage.getItem('pageOutline');
  if (storedOutline) {
    document.querySelector('.container').style.borderColor = storedOutline;
  }
  
  const storedDarkMode = localStorage.getItem('darkMode');
  if (storedDarkMode === 'true') {
    document.body.classList.add('dark-mode');
  }

  loadCustomLinks();
  updateDateTime();
  setInterval(updateDateTime, 1000); // Update date and time every second
});

// Update date and time
function updateDateTime() {
  const now = new Date();
  const datetime = now.toLocaleString();
  document.getElementById('datetime').textContent = datetime;
}

// Change background image
function setBackgroundImage(event) {
  const reader = new FileReader();
  reader.onload = function() {
    const imageUrl = reader.result;
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    localStorage.setItem('backgroundImage', imageUrl);
  };
  reader.readAsDataURL(event.target.files[0]);
}

// Change text color
function setTextColor() {
  const color = document.getElementById('textColorSelector').value;
  document.body.style.color = color;
  localStorage.setItem('textColor', color);
}

// Change page outline
function setPageOutline() {
  const color = document.getElementById('pageOutlineSelector').value;
  document.querySelector('.container').style.borderColor = color;
  localStorage.setItem('pageOutline', color);
}

// Toggle dark mode
function toggleDarkMode() {
  const isDarkMode = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
}

// Edit custom link
function editCustomLink(index) {
  const linkUrl = prompt('Enter link URL:');
  const imageUrl = prompt('Enter image URL:');
  
  const customLinks = document.querySelectorAll('.custom-link');
  customLinks[index].innerHTML = `<img src="${imageUrl}" alt="Custom Link"><button onclick="removeCustomLink(${index})">Remove</button>`;
  customLinks[index].setAttribute('href', linkUrl);

  saveCustomLinks();
}

// Remove custom link
function removeCustomLink(index) {
  const customLinks = document.querySelectorAll('.custom-link');
  customLinks[index].innerHTML = `Add Custom Link ${index + 1}`;
  customLinks[index].setAttribute('onclick', `editCustomLink(${index})`);
  
  saveCustomLinks();
}

// Save custom links to localStorage
function saveCustomLinks() {
  const customLinks = document.querySelectorAll('.custom-link');
  const linksData = [];
  
  customLinks.forEach(link => {
    const linkUrl = link.getAttribute('href');
    const imageUrl = link.querySelector('img') ? link.querySelector('img').src : null;
    
    linksData.push({ url: linkUrl, image: imageUrl });
  });
  
  localStorage.setItem('customLinks', JSON.stringify(linksData));
}

// Load custom links from localStorage
function loadCustomLinks() {
  const storedLinks = localStorage.getItem('customLinks');
  if (storedLinks) {
    const linksData = JSON.parse(storedLinks);
    const customLinks = document.querySelectorAll('.custom-link');
    
    linksData.forEach((linkData, index) => {
      const customLink = customLinks[index];
      customLink.innerHTML = `<img src="${linkData.image}" alt="Custom Link"><button onclick="removeCustomLink(${index})">Remove</button>`;
      customLink.setAttribute('href', linkData.url);
    });
  }
}

// Save button colors
function saveButtonColors() {
  const buttonColor = document.getElementById('buttonColorSelector').value;
  const linkButtonColor = document.getElementById('linkButtonColorSelector').value;
  
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.style.backgroundColor = buttonColor;
  });
  
  const linkButtons = document.querySelectorAll('.custom-link');
  linkButtons.forEach(linkButton => {
    linkButton.style.backgroundColor = linkButtonColor;
  });
  
  localStorage.setItem('buttonColor', buttonColor);
  localStorage.setItem('linkButtonColor', linkButtonColor);
}
