// Personal API Key for OpenWeatherMap API
const apiKey = "57f114c98d5d00801ca33a78b4fe888b";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
    return newData;
  } catch (err) {
    console.log("Error", err);
  }
};

const getData = async (url) => {
  const res = await fetch(url);
  try {
    const newData = res.json();
    return newData;
  } catch (err) {
    console.log("Error", err);
  }
};

const fetchData = async () => {
  try {
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    if (!zipCode) {
      alert("you should pass a zip code");
      return;
    }
    const fullURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
    const res = await fetch(fullURL);
    const data = await res.json();
    const result = {
      temperature: data.main.temp,
      newDate,
      feelings,
    };
    return result;
  } catch (err) {
    console.log("Error", err);
    alert("you should pass a valid zip code");
  }
};

document.getElementById("generate").addEventListener("click", async () => {
  fetchData()
    .then((data) => postData("/postData", data))
    .then(() =>
      getData("setData").then((data) => {
        // console.log(data);
        document.getElementById("date").innerHTML = data.date;
        document.getElementById("temp").innerHTML =
          Math.round(data.temp) + "degrees";
        document.getElementById("content").innerHTML = data.feel;
      })
    );
});
