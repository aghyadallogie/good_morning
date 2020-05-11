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

let elements = [];

document.querySelector('form').addEventListener('submit', e => {
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
}

function display() {
    list.innerHTML = '';
    for (let index = 0; index < elements.length; index++) {
        list.innerHTML += `<li class="todoText" ondblclick=delElement(${index}) >${elements[index]}</li>`

    }
}

