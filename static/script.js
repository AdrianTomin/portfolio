function changeColor() {
    const body = document.querySelector("body");
    body.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
}

