const contactInput = document.getElementById('contact');
    const qualificationInput = document.getElementById('que');
    const resumeInput = document.getElementById('resume');
    const fileName = document.getElementById('file-name');
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const form = document.forms.apply;
    
    // Show selected file name
    resumeInput.addEventListener('change', function() {
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
    
    function validateResume(file) {
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
        return file && allowedTypes.includes(file.type);
    }
    
    function validateGender() {
        let isChecked = false;
        genderInputs.forEach(input => {
            if (input.checked) isChecked = true;
        });
        return isChecked;
    }
    
    function validateQualification(qualification) {
        return qualification.trim().length > 0;
    }
    
    // Real-time validation
    contactInput.addEventListener('input', function() {
        if (validatePhone(this.value)) {
            showValidation(this, true, 'contact');
        } else {
            showValidation(this, false, 'contact');
        }
    });
    
    qualificationInput.addEventListener('input', function() {
        if (validateQualification(this.value)) {
            showValidation(this, true, 'que');
        } else {
            showValidation(this, false, 'que');
        }
    });
    
    resumeInput.addEventListener('change', function() {
        if (validateResume(this.files[0])) {
            showValidation(this, true, 'resume');
        } else {
            showValidation(this, false, 'resume');
        }
    });
    
    genderInputs.forEach(input => {
        input.addEventListener('change', function() {
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
        
        // Validate qualification
        if (!validateQualification(qualificationInput.value)) {
            showValidation(qualificationInput, false, 'que');
            isValid = false;
        }
        
        // Validate resume
        if (!validateResume(resumeInput.files[0])) {
            showValidation(resumeInput, false, 'resume');
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
        
        return isValid;
    }