const startDateInput = document.querySelector('input[name="startdate"]');
const endDateInput = document.querySelector('input[name="enddate"]');
const salaryInput = document.getElementById('salary');
const experienceInput = document.getElementById('experience');
const form = document.forms.jobform;

// Set minimum dates to today
const today = new Date().toISOString().split('T')[0];
if (startDateInput) startDateInput.setAttribute('min', today);
if (endDateInput) endDateInput.setAttribute('min', today);

// Update end date min when start date changes
if (startDateInput && endDateInput) {
    startDateInput.addEventListener('change', function () {
        endDateInput.setAttribute('min', this.value);
        validateDateComparison();
    });

    endDateInput.addEventListener('change', function () {
        validateDateComparison();
    });
}

// Validation functions
function validateSalary(salary) {
    const salaryRegex = /^\d+(\.\d{1,2})?$/;
    return salaryRegex.test(salary);
}

function validateExperience(experience) {
    if (!experience) return true; // Optional field
    const expRegex = /^\d+(\.\d{1,2})?$/;
    return expRegex.test(experience);
}

function validateDates(startDate, endDate) {
    if (!startDate || !endDate) return true; // Both are optional
    return new Date(startDate) < new Date(endDate);
}

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

// Real-time validation
if (salaryInput) {
    salaryInput.addEventListener('input', function () {
        if (validateSalary(this.value)) {
            showValidation(this, true, 'salary');
        } else {
            showValidation(this, false, 'salary');
        }
    });
}

if (experienceInput) {
    experienceInput.addEventListener('input', function () {
        if (validateExperience(this.value)) {
            showValidation(this, true, 'experience');
        } else {
            showValidation(this, false, 'experience');
        }
    });
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
    if (salaryInput && !validateSalary(salaryInput.value)) {
        showValidation(salaryInput, false, 'salary');
        isValid = false;
    }

    // Validate experience
    if (experienceInput && !validateExperience(experienceInput.value)) {
        showValidation(experienceInput, false, 'experience');
        isValid = false;
    }

    // Validate dates
    if (startDateInput && endDateInput) {
        if (startDateInput.value && endDateInput.value) {
            if (!validateDates(startDateInput.value, endDateInput.value)) {
                document.getElementById('datecompare-error').style.display = 'block';
                showValidation(startDateInput, false, 'startdate');
                showValidation(endDateInput, false, 'enddate');
                isValid = false;
            }
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