const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isRequiredValid = checkRequired([username, email, password, confirmPassword]);

  let isFormValid = isRequiredValid;

  if (isRequiredValid) {
    const isUsernameValid = checkLength(username, 3, 15);
    const isEmailValid = checkEmail(email);
    const isPasswordValid = checkLength(password, 6, 25);
    const isPasswordsMatch = checkPasswordsMatch(password, confirmPassword);

    isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isPasswordsMatch;
  }

  if (isFormValid) {
    alert("Registration successful!");
    form.reset();

    // Reset form-group classes
    document.querySelectorAll(".form-group").forEach((group) => {
      group.classList.remove("success", "error");
    });
  }
});

// Show error inside form-group (even if input is wrapped)
function showError(input, message) {
  const formGroup = input.closest(".form-group");
  formGroup.classList.remove("success");
  formGroup.classList.add("error");
  const small = formGroup.querySelector("small");
  small.innerText = message;
}

// Show success
function showSuccess(input) {
  const formGroup = input.closest(".form-group");
  formGroup.classList.remove("error");
  formGroup.classList.add("success");

  const small = formGroup.querySelector("small");
  if (small) small.innerText = "";  // Clear the message
}

// Check required fields
function checkRequired(inputs) {
  let isValid = true;
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${formatFieldName(input)} is required`);
      isValid = false;
    } else {
      showSuccess(input);
    }
  });
  return isValid;
}

// Validate input length
function checkLength(input, min, max) {
  const value = input.value.trim();
  if (value.length < min) {
    showError(input, `${formatFieldName(input)} must be at least ${min} characters.`);
    return false;
  } else if (value.length > max) {
    showError(input, `${formatFieldName(input)} must be less than ${max} characters.`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

// Validate email
function checkEmail(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, "Email is not valid");
    return false;
  }
}

// Password match
function checkPasswordsMatch(pw, confirmPw) {
  if (pw.value !== confirmPw.value) {
    showError(confirmPw, "Passwords do not match");
    return false;
  }
  return true;
}

// Toggle password visibility
function togglePassword(id, icon) {
  const input = document.getElementById(id);
  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  icon.classList.toggle("fa-eye");
  icon.classList.toggle("fa-eye-slash");
}

// Capitalize label from input ID
function formatFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
