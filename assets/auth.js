document.addEventListener("DOMContentLoaded", function () {
    const loggedIn = sessionStorage.getItem("loggedIn");

    if (loggedIn !== "true") {
        // Redirect to the login page if not logged in
        window.location.href = "login.html";
    }
});