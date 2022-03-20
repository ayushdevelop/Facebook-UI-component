const APIKEY = "eqJDW8bXCRhFpPM0qDJfRyTY0Gg5I3kp";

//button selection
const button = document.querySelector("#gif");
const post = document.getElementById("post");

//element selection
const gifList = document.getElementById("gif-list");
const spanElement = document.querySelector("span");

//section selection
const preview = document.getElementById("preview-gif");
const chatSection = document.querySelector("section.chat");

//input element selection
const query = document.getElementById("gif-search");
let textMessage = document.getElementById("message");

let searchItem;
let gifSource;

//this function is called when we search for a gif
const gifSearchRender = async () => {
  try {
    let fetchGif = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=50&q=${query.value.trim()}`
    );

    let gifData = await fetchGif.json();

    //rendering gifs in the Unordered List element
    gifData.data.map((event) => {
      gifList.innerHTML += `<li><img src = ${event.images.fixed_height.url}></li>`;
    });
  } catch (err) {
    alert(err);
  }
};

//this function is called when we click the GIF button to render all the trending gif
const gifTrendyRender = async () => {
  try {
    let fetchGif = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}`
    );

    let gifData = await fetchGif.json();

    //rendering gifs in the Unordered List element
    gifData.data.map((event) => {
      gifList.innerHTML += `<li><img src = ${event.images.fixed_height.url}></li>`;
    });
  } catch (err) {
    alert(err);
  }
};

//GIF button event to call trending GIF function and hiding and showing GIF container
button.addEventListener("click", async (e) => {
  e.preventDefault();

  //logic to hide and show GIF container
  const gifContainer = document.getElementById("gif-container");
  spanElement.classList.toggle("hidden");
  gifContainer.classList.toggle("hidden");

  //fetching trendy GIF on every GIF button event
  if (!document.querySelectorAll("#gif-list li").length) {
    gifTrendyRender();
  }
});

//logic behind switching the GIF endpoints between trendy and Search
query.addEventListener("keyup", (ev) => {
  searchItem = query.value.trim();

  //if there is a searchItem then we will be fetching GIF from Search endpoint
  if (searchItem) {
    gifList.innerHTML = " ";
    gifSearchRender();
  }
  //if there is no searchItem then we will be fetching from Trending endpoint
  else if (!searchItem) {
    gifList.innerHTML = " ";
    gifTrendyRender();
  }
});

//adding GIF preview in the text message box
gifList.addEventListener("click", (event) => {
  //storing gif source value to use it later for posting it in message
  gifSource = event.target.src;

  //preview logic of Gifs in text message box
  preview.innerHTML = `<img src=${event.target.src}>`;
  const gifContainer = document.getElementById("gif-container");
  spanElement.classList.toggle("hidden");
  gifContainer.classList.toggle("hidden");
});

//logic behind posting the message
post.addEventListener("click", (post) => {
  post.preventDefault();

  //rendering chat element in the html document
  if (gifSource || textMessage.value) {
    chatSection.innerHTML += `<div class="chatbox">
  <p>${textMessage.value}</p>
  <div class="chatGIF"><img src=${gifSource}></div>
  </div>`;
  } else if (textMessage.value) {
    chatSection.innerHTML += `<div class="chatbox">
    <p>${textMessage.value}</p>
    </div>`;
  }

  //resetting form value to give a better user-experience
  document.getElementById("input-form").reset();

  //resetting the preview to original value
  preview.innerHTML = "";
  gifList.innerHTML = "";
  query.value = "";
  gifSource = "";
});
