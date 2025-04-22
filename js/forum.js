document.addEventListener("DOMContentLoaded", function () {
    let username = localStorage.getItem("username") || prompt("Enter your username:");
    localStorage.setItem("username", username);

    let userPoints = parseInt(localStorage.getItem("userPoints")) || 0;
    let posts = JSON.parse(localStorage.getItem("forumPosts")) || [];
    let badge = localStorage.getItem("badge") || "None";

    document.getElementById("user-points").innerText = userPoints;
    updateBadge(badge);

    function savePosts() {
        localStorage.setItem("forumPosts", JSON.stringify(posts));
        loadPosts();
    }

    function loadPosts() {
        let forum = document.getElementById("forum-posts");
        forum.innerHTML = "";
        posts.forEach((post, index) => {
            let postDiv = document.createElement("div");
            postDiv.classList.add("post");

            postDiv.innerHTML = `
                <p><strong>${post.username}</strong>: ${post.text}</p>
                ${post.image ? `<img src="${post.image}" alt="Recycling Post">` : ""}
                <button class="like-btn" onclick="likePost(${index})">❤️ ${post.likes}</button>
            `;

            forum.appendChild(postDiv);
        });
    }

    document.getElementById("submit-post").addEventListener("click", function () {
        let text = document.getElementById("post-text").value;
        let fileInput = document.getElementById("post-image");
        let image = "";

        if (fileInput.files.length > 0) {
            let reader = new FileReader();
            reader.onload = function (e) {
                image = e.target.result;
                addPost(text, image);
            };
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            addPost(text, "");
        }
    });

    function addPost(text, image) {
        if (text.trim() === "" && image === "") return;
        posts.push({ username, text, image, likes: 0 });
        savePosts();
    }

    // ❤️ Like Button Function (Prevents Self-Likes)
    window.likePost = function (index) {
        if (posts[index].username === username) {
            alert("You can't like your own post! ❌");
            return;
        }

        posts[index].likes++;
        savePosts();
        updatePoints(posts[index].username, 10); // Award 10 points per like
    };

    function updatePoints(postOwner, points) {
        if (postOwner === username) {
            userPoints += points;
            localStorage.setItem("userPoints", userPoints);
            document.getElementById("user-points").innerText = userPoints;
            checkForBadge();
        }
    }

    function checkForBadge() {
        let newBadge = userPoints >= 1000 ? "🏆 Recycling Champion" :
                       userPoints >= 500 ? "🏅 Eco Warrior" :
                       userPoints >= 100 ? "🟢 Green Recycler" : "None";

        localStorage.setItem("badge", newBadge);
        updateBadge(newBadge);
    }

    function updateBadge(badge) {
        let badgeContainer = document.getElementById("badge-container");
        badgeContainer.textContent = badge;
        badgeContainer.className = badge !== "None" ? "badge-glow" : "";
    }

    loadPosts();
    checkForBadge();
});
