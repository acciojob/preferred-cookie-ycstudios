//your JS code here. If required.
// Function to set CSS variables from input values
function applyFontPreferences(fontSize, fontColor) {
  document.documentElement.style.setProperty('--fontsize', `${fontSize}px`);
  document.documentElement.style.setProperty('--fontcolor', fontColor);
}

// Function to set cookies
function setCookie(name, value, daysToExpire) {
  const date = new Date();
  date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

// Function to get cookie value by name
function getCookie(name) {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(';');
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return '';
}

// Form submission handler
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  
  // Get values from form inputs
  const fontSize = document.getElementById('fontsize').value;
  const fontColor = document.getElementById('fontcolor').value;
  
  // Save preferences to cookies (expire after 30 days)
  setCookie('fontsize', fontSize, 30);
  setCookie('fontcolor', fontColor, 30);
  
  // Apply font preferences immediately
  applyFontPreferences(fontSize, fontColor);
  
  // Provide feedback (optional)
  alert('Your preferences have been saved!');
});

// When page loads, check for cookies and apply preferences
window.addEventListener('load', function() {
  const savedFontSize = getCookie('fontsize');
  const savedFontColor = getCookie('fontcolor');
  
  // If cookies exist, update form fields and apply preferences
  if (savedFontSize) {
    document.getElementById('fontsize').value = savedFontSize;
  }
  
  if (savedFontColor) {
    document.getElementById('fontcolor').value = savedFontColor;
  }
  
  // Apply saved preferences or defaults
  const fontSize = savedFontSize || 16;
  const fontColor = savedFontColor || '#000000';
  
  applyFontPreferences(fontSize, fontColor);
});