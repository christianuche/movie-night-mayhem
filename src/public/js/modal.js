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
