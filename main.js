const api_url = "https://api.github.com/users/";
const form = document.querySelector("form");
const input = document.querySelector("input");
const container = document.querySelector(".box");
async function getData(url) {
  try {
    const reponse = await fetch(url);
    const data = await reponse.json();
    getInfo(data);
  } catch (er) {
    console.log(`Error : ${er.message}`);
  }
}
async function getRepo(url) {
  try {
    const reponse = await fetch(url);
    const data = await reponse.json();
    getRepos(data);
  } catch (error) {
    console.log(`Error : ${error.message}`);
  }
}
const createErrorCard = (msg) => {
  container.innerHTML = `<h1 class="error">${msg}</h1>`;
};
const getInfo = (data) => {
  if (data.message) {
    createErrorCard("No profile with this Username");
  } else {
    const name = data.name;
    const bio = data.bio;
    const followers = data.followers;
    const following = data.following;
    const repos = data.public_repos;
    const avatar = data.avatar_url;
    container.innerHTML = "";
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="img">
      <img src="${avatar}" alt="" />
    </div>
    <div class="info">
      <h2>${name}</h2>
      <p>
      ${bio}
      </p>
      <div class="static">
        <div class="followers"><span>${followers} Followers</span></div>
        <div class="following"><span>${following} Following</span></div>
        <div class="repos"><span>${repos} repos</span></div>
      </div>
      <div class="last-repo">
      </div>
    </div>
      `;
    container.append(card);
  }
};
const getRepos = (data) => {
  const lastRepos = document.querySelector(".last-repo");
  data.slice(0, 5).forEach((element) => {
    const repoEl = document.createElement("a");
    repoEl.href = element.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = element.name;
    lastRepos.append(repoEl);
  });
};
form.addEventListener("submit", (eo) => {
  eo.preventDefault();
  const searchTerm = input.value;
  if (searchTerm && searchTerm != "") {
    getData(api_url + searchTerm);
    getRepo(api_url + searchTerm + "/repos");
  } else {
    window.alert("Write Somthing!!");
  }
  input.value = "";
});
