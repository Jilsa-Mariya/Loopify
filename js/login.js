import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOtiHb-mf2ToyD8DCSz9ShiLcAitw3RAc",
    authDomain: "loopify-hackathon.firebaseapp.com",
    databaseURL: "https://loopify-hackathon-default-rtdb.firebaseio.com",
    projectId: "loopify-hackathon",
    storageBucket: "loopify-hackathon.appspot.com",
    messagingSenderId: "475557979417",
    appId: "1:475557979417:web:018ec55c47952a789cd188"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Login
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login successful!");
            window.location.href = "home.html"; // Redirect to homepage
        })
        .catch((error) => {
            alert("Login failed: " + error.message);
        });
});

// Sign Up
document.getElementById("signup-btn").addEventListener("click", function () {
    const email = prompt("Enter your email:");
    const password = prompt("Enter a password:");

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Signup successful! You can now log in.");
        })
        .catch((error) => {
            alert("Signup failed: " + error.message);
        });
        // Login Function
document.getElementById("login-btn").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form from reloading the page

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User signed in successfully
            console.log("Login successful!");
            alert("Login Successful! Redirecting...");
            
            // Redirect to home page
            window.location.href = "home.html"; // Change "home.html" to your actual home page
        })
        .catch((error) => {
            console.error("Error logging in:", error.message);
            alert("Login Failed: " + error.message);
        });
});
