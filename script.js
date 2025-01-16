const crossingArea = document.getElementById('crossing-area');
const output = document.getElementById('result');

let isDragging = false;
let selectedZones = new Set(); // Utiliser un Set pour éviter les doublons

// Démarre le mode "drag"
crossingArea.addEventListener('mousedown', (e) => {
    isDragging = true;
    selectedZones.clear(); // Réinitialise les sélections
    e.preventDefault(); // Empêche les comportements par défaut
});

// Pendant le "drag"
crossingArea.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
        if (hoveredElement && hoveredElement.classList.contains('zone')) {
            hoveredElement.classList.add('active');
            selectedZones.add(hoveredElement.dataset.action); // Ajoute l'action au Set
        }
    }
});

// Relâche le clic pour valider les sélections
crossingArea.addEventListener('mouseup', () => {
    isDragging = false;
    updateOutput();
});

// Réinitialise le mode "drag" si on relâche le clic en dehors
document.body.addEventListener('mouseup', () => {
    isDragging = false;
});

// Met à jour l'affichage des sélections
function updateOutput() {
    if (selectedZones.size > 0) {
        output.textContent = Array.from(selectedZones).join(', ');
    } else {
        output.textContent = "Aucune sélection";
    }
}

// Réinitialisation visuelle
document.body.addEventListener('mouseup', () => {
    document.querySelectorAll('.zone').forEach((zone) => {
        zone.classList.remove('active');
    });
});
