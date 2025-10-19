  // ---------------- Login JS ----------------
const DEMO_PASS = "wander2025"; // your password

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById("password");

    // handle form submission (button click or Enter key)
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // prevent page reload
        const enteredPassword = passwordInput.value.trim();

        if (enteredPassword === DEMO_PASS) {
            window.location.href = "admin.html";
        } else {
            alert("Incorrect password!");
            passwordInput.value = '';
            passwordInput.focus();
        }
    });
});
