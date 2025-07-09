document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("login-email").value.trim().toLowerCase();
  const password = document.getElementById("login-password").value;

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const foundUser = users.find(user => user.email === email && user.password === password);

  if (foundUser) {
    alert("Login successful!");
    localStorage.setItem("loggedInUser", JSON.stringify({ fname: foundUser.fname }));
    window.location.href = "home.html";
  } else {
    alert("Invalid email or password.");
  }
});



