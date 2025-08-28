const startDateInput = document.querySelector('input[name="startdate"]');
const endDateInput = document.querySelector('input[name="enddate"]');
const salaryInput = document.getElementById('salary');
const experienceInput = document.getElementById('experience');
const logoInput = document.getElementById('logo');
const logoName = document.getElementById('logo-name');
const form = document.forms.jobform;

// Set minimum dates to today
const today = new Date().toISOString().split('T')[0];
startDateInput.setAttribute('min', today);
endDateInput.setAttribute('min', today);

// Update end date min when start date changes
startDateInput.addEventListener('change', function () {
    endDateInput.setAttribute('min', this.value);
});

// Show selected file name
logoInput.addEventListener('change', function () {
    if (this.files.length > 0) {
        logoName.textContent = this.files[0].name;
    } else {
        logoName.textContent = '';
    }
});

// Validation functions
function validateSalary(salary) {
    const salaryRegex = /^\d+(\.\d{1,2})?$/;
    return salaryRegex.test(salary);
}

function validateExperience(experience) {
    const expRegex = /^\d+(\.\d{1,2})?$/;
    return expRegex.test(experience);
}

function validateImage(file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    return file && allowedTypes.includes(file.type);
}

function validateDates(startDate, endDate) {
    return new Date(startDate) < new Date(endDate);
}

// Real-time validation
salaryInput.addEventListener('input', function () {
    if (validateSalary(this.value)) {
        showValidation(this, true, 'salary');
    } else {
        showValidation(this, false, 'salary');
    }
});

experienceInput.addEventListener('input', function () {
    if (validateExperience(this.value)) {
        showValidation(this, true, 'experience');
    } else {
        showValidation(this, false, 'experience');
    }
});

logoInput.addEventListener('change', function () {
    if (validateImage(this.files[0])) {
        showValidation(this, true, 'logo');
    } else {
        showValidation(this, false, 'logo');
    }
});

startDateInput.addEventListener('change', function () {
    validateDateComparison();
});

endDateInput.addEventListener('change', function () {
    validateDateComparison();
});

function validateDateComparison() {
    const dateCompareError = document.getElementById('datecompare-error');
    if (startDateInput.value && endDateInput.value) {
        if (validateDates(startDateInput.value, endDateInput.value)) {
            dateCompareError.style.display = 'none';
            showValidation(startDateInput, true, 'startdate');
            showValidation(endDateInput, true, 'enddate');
        } else {
            dateCompareError.style.display = 'block';
            showValidation(startDateInput, false, 'startdate');
            showValidation(endDateInput, false, 'enddate');
        }
    }
}

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
function validateJobForm() {
    let isValid = true;

    // Validate salary
    if (!validateSalary(salaryInput.value)) {
        showValidation(salaryInput, false, 'salary');
        isValid = false;
    }

    // Validate experience
    if (!validateExperience(experienceInput.value)) {
        showValidation(experienceInput, false, 'experience');
        isValid = false;
    }

    // Validate logo
    if (!validateImage(logoInput.files[0])) {
        showValidation(logoInput, false, 'logo');
        isValid = false;
    }

    // Validate dates
    if (startDateInput.value && endDateInput.value) {
        if (!validateDates(startDateInput.value, endDateInput.value)) {
            document.getElementById('datecompare-error').style.display = 'block';
            showValidation(startDateInput, false, 'startdate');
            showValidation(endDateInput, false, 'enddate');
            isValid = false;
        }
    }

    if (!isValid) {
        // Scroll to first error
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    return isValid;
}