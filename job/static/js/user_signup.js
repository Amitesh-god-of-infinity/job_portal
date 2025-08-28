// Get form elements
const contactInput = document.getElementById('contact');
const emailInput = document.getElementById('email');
const pwdInput = document.getElementById('pwd');
const cpwdInput = document.getElementById('cpwd');
const imageInput = document.getElementById('image');
const fileName = document.getElementById('file-name');
const genderInputs = document.querySelectorAll('input[name="gender"]');
const form = document.forms.signup;

// Show selected file name
imageInput.addEventListener('change', function () {
    if (this.files.length > 0) {
        fileName.textContent = this.files[0].name;
    } else {
        fileName.textContent = '';
    }
});

// Validation functions
function validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

function validateImage(file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    return file && allowedTypes.includes(file.type);
}

function validateGender() {
    let isChecked = false;
    genderInputs.forEach(input => {
        if (input.checked) isChecked = true;
    });
    return isChecked;
}

// Real-time validation
contactInput.addEventListener('input', function () {
    if (validatePhone(this.value)) {
        showValidation(this, true, 'contact');
    } else {
        showValidation(this, false, 'contact');
    }
});

emailInput.addEventListener('input', function () {
    if (validateEmail(this.value)) {
        showValidation(this, true, 'email');
    } else {
        showValidation(this, false, 'email');
    }
});

pwdInput.addEventListener('input', function () {
    if (validatePassword(this.value)) {
        showValidation(this, true, 'pwd');
        // Also validate confirmation when password changes
        if (cpwdInput.value) {
            if (this.value === cpwdInput.value) {
                showValidation(cpwdInput, true, 'cpwd');
            } else {
                showValidation(cpwdInput, false, 'cpwd');
            }
        }
    } else {
        showValidation(this, false, 'pwd');
    }
});

cpwdInput.addEventListener('input', function () {
    if (this.value === pwdInput.value && validatePassword(pwdInput.value)) {
        showValidation(this, true, 'cpwd');
    } else {
        showValidation(this, false, 'cpwd');
    }
});

imageInput.addEventListener('change', function () {
    if (validateImage(this.files[0])) {
        showValidation(this, true, 'image');
    } else {
        showValidation(this, false, 'image');
    }
});

genderInputs.forEach(input => {
    input.addEventListener('change', function () {
        const errorElement = document.getElementById('gender-error');
        if (validateGender()) {
            errorElement.style.display = 'none';
        } else {
            errorElement.style.display = 'block';
        }
    });
});

// Show validation status
function showValidation(element, isValid, fieldName) {
    const errorElement = document.getElementById(fieldName + '-error');
    const successElement = document.getElementById(fieldName + '-success');

    if (isValid) {
        element.classList.remove('error');
        element.classList.add('success');
        if (errorElement) errorElement.style.display = 'none';
        if (successElement) successElement.style.display = 'block';
    } else {
        element.classList.remove('success');
        element.classList.add('error');
        if (errorElement) errorElement.style.display = 'block';
        if (successElement) successElement.style.display = 'none';
    }
}

// Form submission validation
function validateForm() {
    let isValid = true;

    // Validate phone
    if (!validatePhone(contactInput.value)) {
        showValidation(contactInput, false, 'contact');
        isValid = false;
    }

    // Validate email
    if (!validateEmail(emailInput.value)) {
        showValidation(emailInput, false, 'email');
        isValid = false;
    }

    // Validate password
    if (!validatePassword(pwdInput.value)) {
        showValidation(pwdInput, false, 'pwd');
        isValid = false;
    }

    // Validate password confirmation
    if (pwdInput.value !== cpwdInput.value) {
        showValidation(cpwdInput, false, 'cpwd');
        isValid = false;
    }

    // Validate image
    if (!validateImage(imageInput.files[0])) {
        showValidation(imageInput, false, 'image');
        isValid = false;
    }

    // Validate gender
    if (!validateGender()) {
        document.getElementById('gender-error').style.display = 'block';
        isValid = false;
    }

    if (!isValid) {
        // Scroll to first error
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    return isValid && checkpass();
}

// Original password check function
function checkpass() {
    if (document.signup.pwd.value != document.signup.cpwd.value) {
        alert('Password Does Not Match');
        document.signup.cpwd.focus();
        return false;
    }
    return true;
}