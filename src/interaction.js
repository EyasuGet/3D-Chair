import * as THREE from 'three';

export function setupInteraction(renderer, camera, scene, productGroup) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let lastIntersected = null;
  let originalScale = new Map();
  let feedbackTimeout = null;

  // Panel
  const panel = document.getElementById('part-panel');

  function onPointerMove(event) {
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(productGroup.children);

    if (intersects.length > 0) {
      const obj = intersects[0].object;
      if (lastIntersected !== obj) {
        if (lastIntersected && originalScale.has(lastIntersected)) {
          lastIntersected.scale.copy(originalScale.get(lastIntersected));
        }
        originalScale.set(obj, obj.scale.clone());
        obj.scale.setScalar(1.12);
        lastIntersected = obj;
        panel.textContent = obj.name;
        panel.style.display = 'block';
      }
    } else {
      if (lastIntersected && originalScale.has(lastIntersected)) {
        lastIntersected.scale.copy(originalScale.get(lastIntersected));
      }
      lastIntersected = null;
      panel.style.display = 'none';
    }
  }

  function onPointerDown(event) {
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(productGroup.children);

    if (intersects.length > 0) {
      const obj = intersects[0].object;
      // Animate feedback: change color and scale briefly
      const mat = Array.isArray(obj.material) ? obj.material[0] : obj.material;
      const origColor = mat.color.clone();
      const origScale = obj.scale.clone();
      mat.color.set(0x00aaff);
      obj.scale.setScalar(1.19);
      setTimeout(() => {
        mat.color.copy(origColor);
        obj.scale.copy(origScale);
      }, 320);

      // Show panel with name
      panel.textContent = obj.name;
      panel.style.display = 'block';
      // Hide panel after a short delay
      clearTimeout(feedbackTimeout);
      feedbackTimeout = setTimeout(() => { panel.style.display = 'none'; }, 1400);
    }
  }

  renderer.domElement.addEventListener('pointermove', onPointerMove);
  renderer.domElement.addEventListener('pointerdown', onPointerDown);

  // Clean up function (optional)
  return () => {
    renderer.domElement.removeEventListener('pointermove', onPointerMove);
    renderer.domElement.removeEventListener('pointerdown', onPointerDown);
  };
}