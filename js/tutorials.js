document.addEventListener("DOMContentLoaded", function () {
    // ✅ Toggle Subcategory Visibility
    document.querySelectorAll(".subcategory").forEach(subcategory => {
        subcategory.addEventListener("click", function () {
            let subOptions = subcategory.nextElementSibling;
            let arrow = subcategory.querySelector(".arrow");

            if (subOptions) {
                let isVisible = subOptions.style.display === "block";
                subOptions.style.display = isVisible ? "none" : "block";
                arrow.classList.toggle("rotate", !isVisible);
            }
        });
    });

    // ✅ Search Functionality
    document.getElementById("searchBar").addEventListener("keyup", function () {
        let filter = this.value.toLowerCase();
        let items = document.querySelectorAll(".tutorial-item");
        let subcategories = document.querySelectorAll(".subcategory");

        items.forEach(item => {
            let text = item.textContent.toLowerCase();
            item.style.display = text.includes(filter) ? "block" : "none";
        });

        // Ensure relevant subcategories remain open
        subcategories.forEach(subcategory => {
            let nextList = subcategory.nextElementSibling;
            if (nextList) {
                let visibleItems = nextList.querySelectorAll(".tutorial-item:not([style*='display: none'])");
                nextList.style.display = visibleItems.length > 0 ? "block" : "none";
                subcategory.querySelector(".arrow").classList.toggle("rotate", visibleItems.length > 0);
            }
        });
    });

    // ✅ Complete Tutorials List (Now Includes Missing Tutorials)
    let tutorials = {
        // 🌱 Plastic Bottles
        "flower-pots": { name: "Flower Pots", steps: ["Clean the plastic bottle.", "Cut it.", "Decorate it.", "Plant seeds."], video: "https://www.youtube.com/embed/ej1UdJix7lg" },
        "hanging-planters": { name: "Hanging Planters", steps: ["Cut holes.", "Attach strings.", "Fill with soil."], video: "https://www.youtube.com/embed/PJ_j5HGy_a8" },
        "bottle-hanger": { name: "Plastic Bottle Hanger", steps: ["Clean bottle.", "Make holes.", "Attach hooks."], video: " https://www.youtube.com/embed/ojx2HCUptws" },
        "bottle-decor": { name: "Decorative Bottles", steps: ["Clean bottle.", "Paint it.", "Add stickers."], video: "  https://www.youtube.com/embed/mRfgDBZ_yRg" },
        "home-decor": { name: "Home Decor", steps: ["Cut bottles.", "Paint them.", "Use LED lights."], video: "https://www.youtube.com/embed/1dth0HmGzHI" },

        // 🛍️ Plastic Bags
        "bag-tote": { name: "DIY Tote Bag", steps: ["Cut bags.", "Weave strips.", "Attach handles."]},
        "bag-rug": { name: "Plastic Bag Rug", steps: ["Cut bags.", "Weave loops.", "Flatten the rug."], video: " https://www.youtube.com/embed/AVDDN93qGj0" },

        // 🍾 Glass Bottles
        "flower-vase": { name: "Flower Vase", steps: ["Clean bottle.", "Paint it.", "Use as a vase."], video: " https://www.youtube.com/embed/QiIWOL-SzmU" },
        "candle-holder": { name: "Candle Holder", steps: ["Cut bottle.", "Sand edges.", "Place candle inside."], video: "https://www.youtube.com/embed/Mzuq5eypDco" },
        "hanging-light": { name: "Hanging Light", steps: ["Cut bottle.", "Insert LED light.", "Hang it."], video: " https://www.youtube.com/embed/LTsCYMr2s7M" },

        // 🍶 Glass Jars
        "spice-organizer": { name: "Spice Organizer", steps: ["Wash jars.", "Label them.", "Store spices."]},
        "piggy-bank": { name: "Piggy Bank", steps: ["Clean jar.", "Cut slit in lid.", "Decorate it."], video: "https://www.youtube.com/embed/8f-AEY8n3uA?si=cqFss9EjSF9Cnlkl" },
        "herb-garden": { name: "Herb Garden", steps: ["Fill jars with soil.", "Plant herbs.", "Water regularly."]},

        // 📰 Paper Recycling
        "paper-bags": { name: "Paper Bags", steps: ["Cut newspapers.", "Fold & glue.", "Attach handles."], video: "https://www.youtube.com/embed/uncLL1SC8xg" },
        "gift-wrapping": { name: "Gift Wrapping", steps: ["Use newspapers.", "Add ribbons.", "Secure with tape."], video: "https://www.youtube.com/embed/GSx2kZ4GWIU" },

        // 🎨 **NEW - Extra Tutorials You Mentioned**
        "wall-art": {
            name: "Wall Art",
            steps: ["Collect old magazines or paper.", "Cut out shapes or patterns.", "Glue them onto a canvas.", "Frame and hang your artwork."],
            video: "https://www.youtube.com/embed/Ugl6ZyxQINI?si=4oPYi7Pvyk21hjyC"
        },
        "origami-crafts": {
            name: "Origami Crafts",
            steps: ["Choose origami paper.", "Follow folding instructions.", "Create shapes like cranes, flowers, or stars."],
            video: "https://www.youtube.com/embed/GvpRI7A80JM"
        },
        "drawer-organizers": {
            name: "Drawer Organizers",
            steps: ["Collect cardboard or plastic containers.", "Cut them to fit drawer sections.", "Decorate them and place in the drawer."],
            video: "https://www.youtube.com/embed/NusShA7eCWU"
        },
        "phone-stand": {
            name: "Phone Stand",
            steps: ["Take a sturdy cardboard piece.", "Cut a slot for the phone.", "Decorate and make it stable."],
            video: "https://www.youtube.com/embed/GC7xMulhq7c?si=Xv2i9PkD9w-j8YmA"
        },
        "diy-shelves": {
            name: "DIY Shelves",
            steps: ["Use recycled wood or plastic.", "Cut and shape the shelves.", "Paint and mount them on the wall."],
            video: "https://www.youtube.com/embed/rTXVRct7AD0?si=8Q-tOIMKovKnC-Nc"
        }
    };

    // ✅ Function to Show/Hide Tutorial Content
    function showTutorial(tutorialKey, clickedItem) {
        let tutorialData = tutorials[tutorialKey];

        // Remove any existing tutorial content before adding a new one
        document.querySelectorAll(".tutorial-content").forEach(el => el.remove());

        if (tutorialData) {
            let tutorialContent = document.createElement("div");
            tutorialContent.classList.add("tutorial-content");

            let stepsHTML = `
                <h3>${tutorialData.name}</h3>
                <h4>Step-by-Step Guide</h4>
                <ul>
                    ${tutorialData.steps.map(step => `<li>${step}</li>`).join("")}
                </ul>
            `;

            let videoHTML = tutorialData.video
                ? `<h3>Video Tutorial</h3>
                   <iframe width="100%" height="315" src="${tutorialData.video}" frameborder="0" allowfullscreen></iframe>`
                : "";

            tutorialContent.innerHTML = `${stepsHTML}${videoHTML}`;
            clickedItem.after(tutorialContent); // Insert content after the clicked item
        }
    }

    // ✅ Event Listener for Tutorial Clicks
    document.querySelectorAll(".tutorial-item").forEach(item => {
        item.addEventListener("click", function () {
            let tutorialKey = this.dataset.name;
            if (tutorials[tutorialKey]) {
                showTutorial(tutorialKey, this);
            } else {
                alert("Tutorial not found!");
            }
        });
    });
});
