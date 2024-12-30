// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

function showPopup() {
    document.getElementById("otpPopup").style.display = "block";
}

// Close the popup
function closePopup() {
    document.getElementById("otpPopup").style.display = "none";
}

function toggleFullScreen(img) {
  img.classList.toggle('s-full-screen');
}

// Verify OTP (placeholder function)
function verifyOTP() {
    const otp = document.getElementById("otpInput").value;
    let validotp = "123456";
    if (otp === validotp) {  // Example OTP verification
        alert("OTP verified successfully!");
        closePopup();
    } else {
        alert("Invalid OTP. Please try again.");
    }
}