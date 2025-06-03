// --- Get DOM References ---
const formContainer = document.getElementById('idForForm');
const fullNameInput = document.getElementById('fullNameInput');
const emailInput = document.getElementById('emailInput');
const usernameInput = document.getElementById('usernameInput');
const generateTicketBtn = document.getElementById('generateTicket');

const avatarUpload = document.getElementById('avatarUpload');
const uploadZone = document.getElementById('uploadZone');
const avatarPreview = document.getElementById('avatarPreview');
const avatarControls = document.getElementById('avatarControls');
const changeImageBtn = document.getElementById('changeImageBtn');
const removeImageBtn = document.getElementById('removeImageBtn');

const ticketDisplayArea = document.getElementById('ticketDisplayArea');
const ticketFullName = document.getElementById('ticketFullName');
const ticketEmail = document.getElementById('ticketEmail');
const ticketAvatar = document.getElementById('ticketAvatar');
const ticketGitHub = document.getElementById('ticketGitHub');

const fullNameError = document.getElementById('fullNameError');
const emailError = document.getElementById('emailError');
const usernameError = document.getElementById('usernameError');
const avatarError = document.getElementById('avatarError');
const generateAnotherTicketBtn = document.getElementById('generateAnotherTicketBtn');

// --- Initialize State Variables ---
let currentAvatarUrl = null;

// --- Helper Functions ---
function clearAllErrors() {
    fullNameError.textContent = '';
    emailError.textContent = '';
    usernameError.textContent = '';
    avatarError.textContent = '';
}

function handleRemoveAvatar() {
    avatarUpload.value = '';
    currentAvatarUrl = null;
    avatarPreview.src = '';
    avatarPreview.style.display = 'none';
    avatarControls.style.display = 'none';
    uploadZone.style.display = 'block';
    avatarError.textContent = '';
}

function handleAvatarChange(event) {
    clearAllErrors();
    
    const selectedFile = avatarUpload.files[0];

    if (!selectedFile) {
        return;
    }

    const allowedFileTypes = ['image/jpeg', 'image/png'];
    if (!allowedFileTypes.includes(selectedFile.type)) {
        avatarError.textContent = 'Only JPEG and PNG files are allowed.';
        avatarUpload.value = '';
        return;
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    if (selectedFile.size > MAX_FILE_SIZE) {
        avatarError.textContent = 'File size exceeds 5 MB.';
        avatarUpload.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        currentAvatarUrl = e.target.result;
        avatarPreview.src = currentAvatarUrl;
        avatarPreview.style.display = 'block';
        avatarControls.style.display = 'flex';
        uploadZone.style.display = 'none';
    };
    reader.onerror = function(e) {
        avatarError.textContent = 'Could not read file.';
    }
    reader.readAsDataURL(selectedFile);
}

function handleFormSubmission(event) {
    event.preventDefault();
    clearAllErrors();

    const fullNameValue = fullNameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const usernameValue = usernameInput.value.trim();

    let isValid = true;

    if (fullNameValue === '') {
        fullNameError.textContent = 'Full name is required.';
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === '') {
        emailError.textContent = 'Email is required.';
        isValid = false;
    } else if (!emailRegex.test(emailValue)) {
        emailError.textContent = 'Invalid email format.';
        isValid = false;
    }

    if (usernameValue === '') {
        usernameError.textContent = 'Username is required.';
        isValid = false;
    }

    if (currentAvatarUrl === null) {
        avatarError.textContent = 'Avatar image is required.';
        isValid = false;
    }

    if (isValid) {
        generateAndDisplayTicket(fullNameValue, emailValue, usernameValue, currentAvatarUrl);
    }
}

function generateAndDisplayTicket(fullNameValue, emailValue, usernameValue, avatarUrl) {
    ticketFullName.textContent = fullNameValue;
    ticketEmail.textContent = emailValue;
    ticketAvatar.src = avatarUrl;
    
    if (ticketGitHub) {
        ticketGitHub.textContent = '@' + usernameValue;
    }

    ticketDisplayArea.style.display = 'block';
    formContainer.style.display = 'none';
    ticketDisplayArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetApp() {
    fullNameInput.value = '';
    emailInput.value = '';
    usernameInput.value = '';

    handleRemoveAvatar();
    clearAllErrors();

    ticketDisplayArea.style.display = 'none';
    formContainer.style.display = 'block';
}

// --- Event Listener Assignments ---
generateTicketBtn.addEventListener('click', handleFormSubmission);
uploadZone.addEventListener('click', () => avatarUpload.click());
avatarUpload.addEventListener('change', handleAvatarChange);
changeImageBtn.addEventListener('click', () => avatarUpload.click());
removeImageBtn.addEventListener('click', handleRemoveAvatar);
generateAnotherTicketBtn.addEventListener('click', resetApp);

// --- Initial setup on page load ---
document.addEventListener('DOMContentLoaded', () => {
    ticketDisplayArea.style.display = 'none';
    formContainer.style.display = 'block';
    handleRemoveAvatar();
    clearAllErrors();
});