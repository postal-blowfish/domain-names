// main.js
import { generateName } from './nameGenerator.js';

function generateNames() {
    const output = document.getElementById('nameOutput');
    output.innerHTML = ''; // Clear previous names
    
    for (let i = 0; i < 15; i++) {
        const nameDiv = document.createElement('div');
        nameDiv.className = 'name';
        const name = generateName();  // Generate a name
        nameDiv.textContent = name;
        nameDiv.setAttribute('title', name);  // Add the name as the title for the tooltip
        output.appendChild(nameDiv);
    }
}

// Make generateNames available globally
window.generateNames = generateNames;

// Generate initial set of names
generateNames();