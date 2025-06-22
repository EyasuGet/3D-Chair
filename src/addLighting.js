import * as THREE from 'three';

export function addLighting(scene) {
  // Strong ambient light
  const ambient = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambient);

  // Bright directional light
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.1);
  dirLight.position.set(6, 12, 8);
  scene.add(dirLight);

  // Optionally, add a second light to fill shadows
  const fillLight = new THREE.PointLight(0xffffff, 0.6, 100);
  fillLight.position.set(-6, 4, -8);
  scene.add(fillLight);
}