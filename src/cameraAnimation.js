// Camera auto-orbit animation
export function setupCameraAnimation(camera, orbitControls, center = { x: 0, y: 0, z: 0 }) {
  let autoRotate = true;
  let lastUserAction = 0;
  const ROTATE_SPEED = 0.45; // radians per second

  // Listen for user interaction to pause auto-rotate
  if (orbitControls) {
    orbitControls.addEventListener('start', () => {
      autoRotate = false;
      lastUserAction = Date.now();
    });
    orbitControls.addEventListener('end', () => {
      // Resume auto-rotation after 3 seconds
      setTimeout(() => {
        if (Date.now() - lastUserAction > 2700) autoRotate = true;
      }, 2800);
    });
  }

  // Animate camera position along a circle around Y axis
  function updateCameraOrbit(time) {
    if (autoRotate) {
      const t = time * 0.0003; // slow factor
      const radius = 7;
      camera.position.x = Math.cos(t * ROTATE_SPEED) * radius;
      camera.position.z = Math.sin(t * ROTATE_SPEED) * radius;
      camera.lookAt(0, 0.5, 0); // Adjust Y if the chair sits a bit higher
    }
  }

  return updateCameraOrbit;
}