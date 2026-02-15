function openEventModal() {
  document.getElementById("eventModal").style.display = "block";
}

function closeEventModal() {
  document.getElementById("eventModal").style.display = "none";
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("eventModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

async function submitEventForm(e) {
  e.preventDefault();

  const title = document.getElementById("eventTitle").value;
  const date = document.getElementById("eventDate").value;
  const time = document.getElementById("eventTime").value;
  const movieTitle = document.getElementById("selectedMovie")?.value || "";
  const movieId = document.getElementById("selectedMovieId")?.value || "";
  const invites = document.getElementById("inviteEmails")?.value || "";

  const newEvent = {
    title,
    date,
    time,
    movieTitle,
    movieId,
    invites
  };

  try {
    const res = await fetch("/events/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent)
    });

    if (res.ok) {
      alert("Event Created Successfully!");
      closeEventModal();
      document.getElementById("createEventForm").reset();
      // Optionally, refresh the page to show new events
      window.location.reload();
    } else {
      const text = await res.text();
      alert("Error creating event: " + text);
    }
  } catch (err) {
    console.error(err);
    alert("Server error. Check console for details.");
  }
}

function searchMovieInModal() {
  const query = document.getElementById("movieSearch").value;

  if (query.length < 2) {
    document.getElementById("movieResults").innerHTML = "";
    return;
  }

  fetch(`/events/search-movie?q=${query}`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("movieResults");
      list.innerHTML = "";

      data.forEach(movie => {
        const div = document.createElement("div");
        div.classList.add("movie-result-item");
        div.innerText = movie.title;
        div.onclick = () => selectMovie(movie);
        list.appendChild(div);
      });
    });
}

function selectMovie(movie) {
  document.getElementById("movieSearch").value = movie.title;
  document.getElementById("selectedMovie").value = movie.title;
  document.getElementById("selectedMovieId").value = movie.id;
  document.getElementById("movieResults").innerHTML = "";
}

/* --------------------------------------
   MAKE FUNCTIONS AVAILABLE TO HTML
--------------------------------------- */
window.openEventModal = openEventModal;
window.closeEventModal = closeEventModal;
window.submitEventForm = submitEventForm;
window.searchMovieInModal = searchMovieInModal;
window.selectMovie = selectMovie;



const toggleButton = document.getElementById("darkModeToggle");

window.addEventListener("DOMContentLoaded", () => {
  const darkMode = localStorage.getItem("darkMode");

  if (darkMode === "enabled") {
    document.body.classList.add("dark");
  }
});

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
});


// Joke fetching functionality
let jokes = [];
let currentIndex = 0;
const displayTime = 6000; // time to show joke
const loaderTime = 3000; // time to show loader

async function loadJokes() {
  const loader = document.getElementById("loader");
  const jokeText = document.getElementById("jokeText");

  try {
    const response = await fetch("jokes.json");
    jokes = await response.json();

    // Load saved joke index
    const savedIndex = localStorage.getItem("jokeIndex");
    if (savedIndex !== null) {
      currentIndex = parseInt(savedIndex);
    } else {
      currentIndex = Math.floor(Math.random() * jokes.length);
    }

    // Start joke loop
    showJokeWithLoader();
  } catch (error) {
    loader.style.display = "none";
    jokeText.style.display = "block";
    jokeText.textContent = "Oops! Couldn't load a joke.";
    console.error(error);
  }
}

function showJokeWithLoader() {
  const loader = document.getElementById("loader");
  const jokeText = document.getElementById("jokeText");

  // 🛑 STOP if elements don't exist
  if (!loader || !jokeText || jokes.length === 0) return;

  // Fade out old joke
  jokeText.classList.remove("fade-in");
  jokeText.classList.add("fade-out");

  // Show loader
  loader.style.display = "block";
  jokeText.style.display = "none";

  setTimeout(() => {
    // Hide loader
    loader.style.display = "none";
    jokeText.style.display = "block";

    // Fade in new joke
    jokeText.textContent = jokes[currentIndex].joke;
    jokeText.classList.remove("fade-out");
    jokeText.classList.add("fade-in");

    // Save current joke index
    localStorage.setItem("jokeIndex", currentIndex);

    // Move to next joke
    currentIndex = (currentIndex + 1) % jokes.length;

    // Schedule next joke
    setTimeout(showJokeWithLoader, displayTime);
  }, loaderTime);
}

// Load jokes when page loads
window.addEventListener("load", loadJokes);


document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input");
  
  if (!searchInput) return; // 🛑 STOP if not on search page

  const savedSearch = localStorage.getItem("lastSearch");

  if (savedSearch) {
    searchInput.value = savedSearch;
  }

  searchInput.addEventListener("input", () => {
    localStorage.setItem("lastSearch", searchInput.value);
  });
});


function saveRecentlyViewed(movieId) {
  let viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

  viewed = viewed.filter((id) => id !== movieId);
  viewed.unshift(movieId);
  viewed = viewed.slice(0, 5);

  localStorage.setItem("recentlyViewed", JSON.stringify(viewed));
}
