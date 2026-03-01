const optionElements = [
    document.getElementById("option-button1"),
    document.getElementById("option-button2"),
    document.getElementById("option-button3"),
    document.getElementById("option-button4")
];

let buttonContents = [
    "",
    "",
    "",
    ""
];

export function updateButtonText() {
    for (let i = 0; i < optionElements.length; i++) {
        optionElements[i].textContent = buttonContents[i];
    }
}

export function setButtonContent(index, text) {
    buttonContents[index] = text;
    updateButtonText();
}
