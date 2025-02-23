const clothes = document.querySelectorAll(".clothes");
const buryButton = document.querySelector("#buryButton");
const secretInput = document.querySelector("#secret");

let clickCounter = 0;

for (let i = 0; i < clothes.length; i++) {
    let clothing = clothes[i];
    let unfolded = clothing.src.replace(/\.\w+$/, '');
    clothing.addEventListener('click', () => foldClothing(clothing, unfolded));
}

function foldClothing(clothing, unfolded) {
    if (clickCounter < 4) {
        clickCounter++;
        let foldedSrc = unfolded + "_fold" + clickCounter + ".png";
        clothing.src = foldedSrc;
    }

    if (clickCounter === 4) {
        makeDraggable(clothing);
        clothing.removeEventListener('click', foldClothing);
        clickCounter = 0;
    }
}

function makeDraggable(element) {
    let offsetX, offsetY, isDragging = false;
    const draggingSrc = './src/dirt.svg';

    function onMouseDown(e) {
        isDragging = true;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        element.style.position = 'absolute';
        element.style.zIndex = '1000';
    }

    function onMouseMove(e) {
        if (!isDragging) return;
        element.style.left = `${e.clientX - offsetX}px`;
        element.style.top = `${e.clientY - offsetY}px`;
    }

    function onMouseUp() {
        if (isDragging) {
            if (element.tagName === 'IMG') {
                const dirtImg = document.createElement('img');
                dirtImg.src = draggingSrc;
                dirtImg.style.position = 'absolute';
                dirtImg.style.left = element.style.left;
                dirtImg.style.top = element.style.top;
                dirtImg.style.width = element.offsetWidth + 'px';
                dirtImg.style.height = element.offsetHeight + 'px';
                dirtImg.style.pointerEvents = 'none'; // Prevents interaction

                element.parentNode.replaceChild(dirtImg, element);
            } else {
                element.textContent = "";
                element.style.background = `url(${draggingSrc}) center/cover no-repeat`;
                element.style.pointerEvents = 'none';
            }
        }
        isDragging = false;
    }

    element.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

buryButton.addEventListener('click', () => {
    let secret = secretInput.value;
    if (!secret.trim()) return;

    const secretText = document.createElement("div");
    secretText.textContent = secret;
    secretText.classList.add("secretText", "prevent-select");
    secretText.style.position = 'absolute';
    secretText.style.left = '50vw';
    secretText.style.top = '50vh';
    document.body.appendChild(secretText);
    makeDraggable(secretText);
    secretInput.value = "";
});
