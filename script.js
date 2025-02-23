const clothes = document.querySelectorAll(".clothes");
const buryButton = document.querySelector("#buryButton");
const secretInput = document.querySelector("#secret");

for (let i = 0; i < clothes.length; i++) {
    let clothing = clothes[i];
    makeDraggable(clothing);
}

function makeDraggable(element) {
    let offsetX, offsetY, isDragging = false;
    const draggingSrc = './src/dirt.svg'; // New image while dragging

    function onMouseDown(e) {
        if (element.src === draggingSrc) {
            element.removeEventListener('mousedown', onMouseDown);
            return;
        }
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        element.style.position = 'absolute';
    }

    function onMouseMove(e) {
        if (!isDragging) return;
        element.style.left = `${e.clientX - offsetX}px`;
        element.style.top = `${e.clientY - offsetY}px`;
    }

    function onMouseUp() {
        if (isDragging) {
            if (element.tagName !== 'IMG') {
                // Create a new img element
                const img = document.createElement('img');
                img.src = draggingSrc; // Set the new image source
                img.style.position = 'absolute';
                img.style.left = element.style.left;
                img.style.top = element.style.top;
                img.style.width = element.offsetWidth + 'px'; // Maintain size
                img.style.height = element.offsetHeight + 'px';

                // Replace the original element with the new img
                element.parentNode.replaceChild(img, element);
                element = img; // Update reference to the new img
            } else {
                element.src = draggingSrc; // Change image source if it's already an img
            }
            element.removeEventListener('mousedown', onMouseDown); // Remove dragging ability
        }
        isDragging = false;
    }


    element.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

buryButton.addEventListener('click', () => {
    let secret = secretInput.value;
    console.log(secret);
    const secretText = document.createElement("div");
    secretText.textContent = secret;
    makeDraggable(secretText);
    secretText.classList.add("secretText", "prevent-select");
    secretText.style.left = '50vw';
    secretText.style.top = '50vh';
    document.body.appendChild(secretText);
    secretInput.value = "";
})