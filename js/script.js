let allPublications = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchPublications();

  document.getElementById("searchInput")
    .addEventListener("input", applyFilters);

  document.getElementById("statusFilter")
    .addEventListener("change", applyFilters);
});

function fetchPublications() {
  fetch("data/publications.json")
    .then(res => res.json())
    .then(data => {
      allPublications = data.publications;
      displayPublications(allPublications);
    })
    .catch(err => console.error(err));
}

function applyFilters() {
  const searchText = document.getElementById("searchInput").value.toLowerCase();
  const status = document.getElementById("statusFilter").value;

  const filtered = allPublications.filter(pub => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchText) ||
      pub.authors.toLowerCase().includes(searchText);

    const matchesStatus =
      status === "all" || pub.status === status;

    return matchesSearch && matchesStatus;
  });

  displayPublications(filtered);
}

function displayPublications(publications) {
  const container = document.getElementById("publication-list");
  container.innerHTML = "";

  if (publications.length === 0) {
    container.innerHTML = "<p>No publications found.</p>";
    return;
  }

  publications.forEach(pub => {
    const card = document.createElement("div");
    card.className = "publication-card";

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
