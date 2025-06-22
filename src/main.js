import { initScene } from './initScene.js';
import { createProduct } from './createProduct.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'three';

const { scene, camera, renderer } = initScene();
document.getElementById('container').appendChild(renderer.domElement);

const chair = createProduct();
scene.add(chair);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

// Create a div to show part names on click
let infoDiv = document.createElement('div');
infoDiv.style.position = 'fixed';
infoDiv.style.top = '32px';
infoDiv.style.left = '50%';
infoDiv.style.transform = 'translateX(-50%)';
infoDiv.style.background = '#222';
infoDiv.style.color = '#fff';
infoDiv.style.padding = '10px 24px';
infoDiv.style.borderRadius = '6px';
infoDiv.style.fontSize = '1.2em';
infoDiv.style.opacity = 0.92;
infoDiv.style.display = 'none';
infoDiv.style.pointerEvents = 'none';
document.body.appendChild(infoDiv);

// Raycaster and mouse vector
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoveredPart = null;
let originalColor = null;

// Highlight color for hover
let highlightColor = 0xffa500; // Golden orange

// Mouse move: highlight on hover
renderer.domElement.addEventListener('mousemove', (event) => {
  // Get mouse NDC
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  // Get all meshes in the chair
  let meshes = [];
  chair.traverse((child) => {
    if (child.isMesh) meshes.push(child);
  });

  const intersects = raycaster.intersectObjects(meshes, false);

  if (intersects.length > 0) {
    const mesh = intersects[0].object;
    if (hoveredPart !== mesh) {
      // Restore previous part color
      if (hoveredPart) {
        hoveredPart.material.color.copy(originalColor);
      }
      hoveredPart = mesh;
      originalColor = mesh.material.color.clone();
      mesh.material.color.set(highlightColor); // Highlight color
    }
  } else {
    // No part hovered
    if (hoveredPart) {
      hoveredPart.material.color.copy(originalColor);
      hoveredPart = null;
    }
  }
});

// Restore color if mouse leaves canvas
renderer.domElement.addEventListener('mouseleave', () => {
  if (hoveredPart) {
    hoveredPart.material.color.copy(originalColor);
    hoveredPart = null;
  }
});

// Show part name on click
renderer.domElement.addEventListener('pointerdown', (event) => {
  // Calculate mouse position in normalized device coordinates
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  // Flatten all child meshes of the chair
  let meshes = [];
  chair.traverse((child) => {
    if (child.isMesh) meshes.push(child);
  });

  const intersects = raycaster.intersectObjects(meshes, false);
  if (intersects.length > 0) {
    const mesh = intersects[0].object;
    // Show part name overlay
    infoDiv.innerText = mesh.name || "Part";
    infoDiv.style.display = 'block';
    // Hide after 1.2s
    setTimeout(() => { infoDiv.style.display = 'none'; }, 1200);
  }
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  chair.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();