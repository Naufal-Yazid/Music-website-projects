document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");

  function validateForm() {
    let isValid = true;

    const fullName = document.getElementById("fullName").value.trim();
    if (fullName === "") {
      document.getElementById("fullNameError").style.display = "block";
      isValid = false;
    } else {
      document.getElementById("fullNameError").style.display = "none";
    }

    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById("emailError").style.display = "block";
      isValid = false;
    } else {
      document.getElementById("emailError").style.display = "none";
    }

    const password = document.getElementById("password").value;
    if (password.length < 8) {
      document.getElementById("passwordError").style.display = "block";
      isValid = false;
    } else {
      document.getElementById("passwordError").style.display = "none";
    }

    const age = document.getElementById("age").value;
    if (age === "" || age < 1 || age > 120) {
      document.getElementById("ageError").style.display = "block";
      isValid = false;
    } else {
      document.getElementById("ageError").style.display = "none";
    }

    document.getElementById("genderError").style.display = "none";

    return isValid;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
      const formData = {
        fullName: document.getElementById("fullName").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value,
        age: document.getElementById("age").value,
        gender: document.querySelector('input[name="gender"]:checked').value,
      };

      console.log("Form data:", formData);
      alert("Account created successfully!");
      window.location.href = "../HTML/home.html";
    }
  });

  form.addEventListener("input", function (e) {
    const target = e.target;

    if (target.id === "fullName") {
      if (target.value.trim() !== "") {
        document.getElementById("fullNameError").style.display = "none";
      }
    }

    if (target.id === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(target.value.trim())) {
        document.getElementById("emailError").style.display = "none";
      }
    }

    if (target.id === "password") {
      if (target.value.length >= 8) {
        document.getElementById("passwordError").style.display = "none";
      }
    }

    if (target.id === "age") {
      const age = target.value;
      if (age !== "" && age >= 1 && age <= 120) {
        document.getElementById("ageError").style.display = "none";
      }
    }
  });
});
