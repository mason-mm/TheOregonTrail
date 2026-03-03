let maxLines = 0;

const typingSpeed = 85;

function updateMaxLines() {
    const textElement = document.getElementById("console-text");
    if (!textElement) return;

    const computedStyle = window.getComputedStyle(textElement);

    const lineHeight = parseFloat(computedStyle.lineHeight);
    const height = textElement.clientHeight;

    maxLines = Math.floor(height / lineHeight);
}

window.addEventListener("resize", updateMaxLines);
window.addEventListener("load", updateMaxLines);

export async function print(msg) {
    const textElement = document.getElementById("console-text");

    return new Promise((resolve) => {
        let i = 0;

        // Recursively called to type each character after a delay
        function typeCharacter() {
            if (i < msg.length) {
                // Add the next character
                textElement.textContent += msg.charAt(i);
                i++;
                // Call again for the next character
                setTimeout(typeCharacter, typingSpeed);
            } else {
                // Add a new line
                textElement.textContent += "\n";

                // Trim top if too many lines
                const lines = textElement.textContent.split("\n");

                if (lines.length > maxLines) {
                    lines.shift(); // Remove first line
                    textElement.textContent = lines.join("\n")
                }

                resolve();
            }
        }

        // Start typing
        typeCharacter();
    });
}

export function clear() {
    const consoleText = document.getElementById("console-text");
    
    // Set the text to nothing
    consoleText.textContent = "";
}
