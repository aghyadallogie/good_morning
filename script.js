const town = document.querySelector("#town");
const country = document.querySelector("#country");
const temperature = document.querySelector(".city-temp");
const icon = document.querySelector(".city-icon");
const figcaption = document.querySelector("figcaption");

const apiKey = "4d8fb5b93d4af21d66a2948710284366";
const url = `https://api.openweathermap.org/data/2.5/weather?q=berlin&appid=${apiKey}&units=metric`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        const { main, name, sys, weather } = data;
        const src = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

        town.innerText = name;
        country.innerText = sys.country;
        temperature.innerText = `${Math.round(main.temp)}°`
        icon.src = src;
        figcaption.innerText = weather[0]["description"]

    });

// todo list
const inputText = document.querySelector('#todoInput');
const list = document.querySelector('ul');
const form = document.querySelector('form');

let elements = [];

form.addEventListener('submit', e => {
    e.preventDefault();
    if (inputText.value) {
        elements.unshift(inputText.value);
        localStorage.setItem('LOCAL-TODO-LIST', JSON.stringify(elements));
        display();
    }
    inputText.value = '';

});

window.onload = () => {
    if (JSON.parse(localStorage.getItem('LOCAL-TODO-LIST'))) {
        elements = JSON.parse(localStorage.getItem('LOCAL-TODO-LIST'));
        display();
    }
}

function delElement(index) {
    elements.splice(index, 1);
    localStorage.setItem('LOCAL-TODO-LIST', JSON.stringify(elements));
    display();
    inputText.focus();
}

function display() {
    list.innerHTML = '';
    for (let index = 0; index < elements.length; index++) {
        list.innerHTML += `<li class="todoText" ondblclick=delElement(${index}) >${elements[index]}</li>`
    }
}

// analog clock

const hourHand = document.getElementById('hourHand');
const minuteHand = document.getElementById('minuteHand');
const secondHand = document.getElementById('secondHand');

function initClock() {
    let date = new Date();
    let hours = date.getHours() % 12;
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let hourDeg = hours * 30,
        minuteDeg = minutes * 6;
    secondDeg = seconds * 6;

    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `rotate(${secondDeg}deg)`;

    setTimeout(initClock, 1000);
}

initClock();