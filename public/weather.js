const apiKey = "25a0e0fc614367ed39ebda46316ee4e5";

document.getElementById("searchButton").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value;
    getWeather(city);
    document.getElementById("cityInput").value = ""; // clear input value after search

    if (city) {
        getWeather(city);
        localStorage.setItem("lastCity", city); //save last input in local storage
    }
});

const lastCity = localStorage.getItem("lastCity");
if (lastCity) {
    getWeather(lastCity); //get last input
}


function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error("Something went wrong: ", error));
}

function displayWeather(data) {
    document.getElementById("cityName").textContent = data.name;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("temperature").textContent = `${data.main.temp}°C`

    const spriteContainer = document.getElementById("spritesContainer")


    spriteContainer.innerHTML = "";
    let imageURL = "";

    if (data.weather[0].description.includes("clear")) {
        imageURL = weatherSprites.clear;
    }else if (data.weather[0].description.includes("cloud")){
        imageURL = weatherSprites.clouds;
    } else if (data.weather[0].description.includes("rain") || data.weather[0].description.includes("drizzle")){
        imageURL = weatherSprites.rain;
    }else if (data.weather[0].description.includes("snow")){
        imageURL = weatherSprites.snow;
    }else if (data.weather[0].description.includes("thunderstorm")){
        imageURL = weatherSprites.thunderstorm;
    }else if (data.weather[0].description.includes("mist") || data.weather[0].description.includes("fog") || data.weather[0].description.includes("haze")){
        imageURL = weatherSprites.fog;
    } else {
        imageURL = weatherSprites.error;
    }

    if (imageURL){
        const img = document.createElement("img");
        img.src = imageURL;
        img.alt = data.weather[0].description.toLowerCase();
        img.classList.add("pixelSprites");
        spriteContainer.appendChild(img);
    }
}

function funAlert (){
    alert("Nope, no more pages, this is the one");
}

const weatherSprites = {
    rain: "https://art.pixilart.com/8ef5f20196552d5.gif",
    clouds: "https://i.gifer.com/origin/0d/0d6cf5b4980702758a616a14bed86e3a_w200.gif",
    clear: "https://senageng.carrd.co/assets/images/gallery01/f8a26e1c.gif?v=914abad4",
    snow: "https://img1.picmix.com/output/stamp/normal/3/3/2/7/2167233_27d86.gif",
    fog: "https://static.vecteezy.com/ti/gratis-vector/p1/10512339-wolken-hemel-pixel-gratis-vector.jpg",
    thunderstorm: "https://art.pixilart.com/b51a387e10490f6.png",
    error: "/src/pixelErrorImg.jpg"
}




