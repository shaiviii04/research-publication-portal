document.addEventListener("DOMContentLoaded", () => {
  fetchPublications();
});

function fetchPublications() {
  fetch("data/publications.json")
    .then(response => response.json())
    .then(data => {
      displayPublications(data.publications);
    })
    .catch(error => {
      console.error("Error fetching publications:", error);
    });
}

function displayPublications(publications) {
  const container = document.getElementById("publication-list");

  publications.forEach(pub => {
    const card = document.createElement("div");
    card.classList.add("publication-card");

    card.innerHTML = `
      <h3>${pub.title}</h3>
      <p><strong>Authors:</strong> ${pub.authors}</p>
      <p><strong>Journal:</strong> ${pub.journal} (${pub.year})</p>
      <p><strong>Status:</strong> ${pub.status}</p>
      <p class="abstract">${pub.abstract}</p>
    `;

    container.appendChild(card);
  });
}
