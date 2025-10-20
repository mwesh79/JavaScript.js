const colors = ["green", "red", "rgba(100,200,300,0.1)", "#f15025"];

const btn = document.getElementById("btn");
const color = document.getElementById("color");

btn.addEventListener('click', function () {
    
    const randomNumber = getRandomNumber();

    document.body.style.backgroundColor = colors[randomNumber];
    color.textContent = colors[randomNumber];

});

function getRandomNumber() {
    return Math.floor(Math.random() * colors.length);
}



