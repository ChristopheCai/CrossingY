const output = document.getElementById('result');

let isDragging = false;
let selectedZones = new Set();

document.addEventListener('mousedown', (e) => {
    isDragging = true;
    selectedZones.clear();
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
        if (hoveredElement && hoveredElement.classList.contains('select')) {
            hoveredElement.classList.add('active');
            selectedZones.add(hoveredElement.dataset.action);
        } else if (hoveredElement && hoveredElement.classList.contains('menu')) {
            hoveredElement.classList.add('active');
        }
    }
});

document.body.addEventListener('mouseup', () => {
    isDragging = false;
    updateOutput();

    document.querySelectorAll('.active').forEach((zone) => {
        zone.classList.remove('active');
    });
});

function updateOutput() {
    console.log("output" + selectedZones.size);
    if (selectedZones.size > 0) {
        output.textContent = Array.from(selectedZones).join(', ');
    } else {
        output.textContent = "Aucune sélection";
    }
}
