document.addEventListener("DOMContentLoaded", () => {

  //packeges
  const packages = [
    {
      id: 1,
      name: "Paris Adventure",
      description: "Explore the beautiful city of Paris",
      price: 1200,
      //image: 'https://github.com/user-attachments/assets/3bc4dbbd-b6e5-49bb-b997-32948106b6f7',
    },

    {
      id: 2,
      name: "New York Escape",
      description: "Experience the hustle and bustle of New York",
      price: 1500,
      //image: 'https://github.com/user-attachments/assets/dc4ef395-69ec-4b31-bf6d-81a6d2ab5de3',
    },

    {
      id: 3,
      name: "Tokyo Delight",
      description: "Discover the amazing culture of Tokyo",
      price: 1300,
    },

    {
      id: 4,
      name: "Sydney Getaway",
      description: "Relax and unwind in sunny Sydney",
      price: 1400,
    },
  ];

  //Testimonials

  const testimonials = [
    { user: "Alice", review: "Amazing experience, highly recommended!" },

    { user: "Bob", review: "Great service and unforgettable memories!" },
  ];

  const favoritePackages = JSON.parse(localStorage.getItem("favorites")) || [];

  const packagesContainer = document.getElementById("packages");

  const favoritePackagesList = document.getElementById("favoritePackagesList");

  const testimonialContainer = document.getElementById("testimonialContainer");

  function loadPackages() {
    packagesContainer.innerHTML = "";

    packages.forEach((pkg) => {
      const packageCard = document.createElement("div");

      packageCard.className = "package-card";

      packageCard.innerHTML = `

                <h3>${pkg.name}</h3>

                <p>${pkg.description}</p>

                <p>Price: $${pkg.price}</p>

                <button onclick="bookPackage(${pkg.id})">Book Now</button>

                <span class="favorite" onclick="toggleFavorite(${pkg.id})">${
        favoritePackages.includes(pkg.id) ? "★" : "☆"
      }</span>

            `;

      packagesContainer.appendChild(packageCard);
    });
  }

  function loadTestimonials() {
    testimonialContainer.innerHTML = "";

    testimonials.forEach((testimonial) => {
      const testimonialElement = document.createElement("div");

      testimonialElement.className = "testimonial";

      testimonialElement.innerHTML = `

                <p><strong>${testimonial.user}</strong> <br> <br> ${testimonial.review} <br> <br> Rating: ★★★★☆ </p>

            `;

      testimonialContainer.appendChild(testimonialElement);
    });
  }

  function loadFavorites() {
    favoritePackagesList.innerHTML = "";

    favoritePackages.forEach((favoriteId) => {
      const pkg = packages.find((p) => p.id === favoriteId);

      if (pkg) {
        const listItem = document.createElement("li");

        listItem.textContent = pkg.name;

        favoritePackagesList.appendChild(listItem);
      }
    });
  }

  window.toggleFavorite = function (packageId) {
    const index = favoritePackages.indexOf(packageId);

    if (index === -1) {
      favoritePackages.push(packageId);
    } else {
      favoritePackages.splice(index, 1);
    }

    localStorage.setItem("favorites", JSON.stringify(favoritePackages));

    loadPackages();

    loadFavorites();
  };

  window.bookPackage = function (packageId) {
    const pkg = packages.find((p) => p.id === packageId);

    if (pkg) {
      localStorage.setItem("selectedPackage", JSON.stringify(pkg));

      window.location.href = "confirmation.html";
    }
  };

  document.getElementById("searchButton").addEventListener("click", () => {
    const searchTerm = document
      .getElementById("searchInput")
      .value.toLowerCase();

    const filteredPackages = packages.filter((pkg) =>
      pkg.name.toLowerCase().includes(searchTerm)
    );

    packagesContainer.innerHTML = "";

    filteredPackages.forEach((pkg) => {
      const packageCard = document.createElement("div");

      packageCard.className = "package-card";

      packageCard.innerHTML = `

                <h3>${pkg.name}</h3>

                <p>${pkg.description}</p>

                <p>Price: $${pkg.price}</p>

                <button onclick="bookPackage(${pkg.id})">Book Now</button>

                <span class="favorite" onclick="toggleFavorite(${pkg.id})">${
        favoritePackages.includes(pkg.id) ? "★" : "☆"
      }</span>

            `;

      packagesContainer.appendChild(packageCard);
    });
  });

  loadPackages();

  loadTestimonials();

  loadFavorites();
});
