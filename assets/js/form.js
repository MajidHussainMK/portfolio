document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      // Basic validation
      if (!validateForm(data)) {
        return;
      }

      try {
        // Here you would typically send the form data to your backend or email service
        // For now, we'll just log it and show a success message
        console.log("Form data:", data);

        // Show success message
        showMessage("Message sent successfully!", "success");

        // Reset form
        contactForm.reset();
      } catch (error) {
        console.error("Error sending message:", error);
        showMessage("Error sending message. Please try again.", "error");
      }
    });
  }

  // Form validation
  function validateForm(data) {
    const { name, email, message } = data;

    // Clear previous error messages
    clearErrors();

    let isValid = true;

    // Name validation
    if (!name.trim()) {
      showError("name", "Name is required");
      isValid = false;
    }

    // Email validation
    if (!email.trim()) {
      showError("email", "Email is required");
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError("email", "Please enter a valid email address");
      isValid = false;
    }

    // Message validation
    if (!message.trim()) {
      showError("message", "Message is required");
      isValid = false;
    }

    return isValid;
  }

  // Email validation helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Show error message
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest(".form-group");

    // Create error message element if it doesn't exist
    let errorElement = formGroup.querySelector(".error-message");
    if (!errorElement) {
      errorElement = document.createElement("div");
      errorElement.className = "error-message";
      formGroup.appendChild(errorElement);
    }

    errorElement.textContent = message;
    field.classList.add("error");
  }

  // Clear all error messages
  function clearErrors() {
    document.querySelectorAll(".error-message").forEach((el) => el.remove());
    document
      .querySelectorAll(".error")
      .forEach((el) => el.classList.remove("error"));
  }

  // Show success/error message
  function showMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector(".form-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message element
    const messageElement = document.createElement("div");
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;

    // Insert message before the form
    contactForm.parentNode.insertBefore(messageElement, contactForm);

    // Remove message after 3 seconds
    setTimeout(() => {
      messageElement.remove();
    }, 3000);
  }
});
