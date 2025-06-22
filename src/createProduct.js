import * as THREE from 'three';

export function createProduct() {
  const group = new THREE.Group();

  // CHAIR SCALE FACTOR
  const scale = 1.5; // Increase to make the whole chair bigger proportionally

  // Contrasting color palette
  const seatColor = 0xaaaaaa;      // Grey
  const backrestColor = 0x1b1b1b;  // Deep black
  const backrestEdgeColor = 0xaaaaaa; // Grey for edges
  const cushionColor = 0x00d6ff;   // Bright cyan
  const legColor = 0xff3b3b;       // Bold red
  const barColor = 0xffffff;       // White

  // Seat
  const seatGeometry = new THREE.BoxGeometry(3 * scale, 0.2 * scale, 3 * scale);
  const seatMaterial = new THREE.MeshBasicMaterial({ color: seatColor });
  const seat = new THREE.Mesh(seatGeometry, seatMaterial);
  seat.position.y = 0.25 * scale;
  seat.name = "Seat";
  group.add(seat);

  // Cushion
  const cushionGeo = new THREE.CylinderGeometry(1.1 * scale, 1.1 * scale, 0.24 * scale, 32);
  const cushionMat = new THREE.MeshBasicMaterial({ color: cushionColor });
  const cushion = new THREE.Mesh(cushionGeo, cushionMat);
  cushion.position.y = 0.4 * scale;
  cushion.name = "Cushion";
  group.add(cushion);

  // Solid, filled backrest with curved grey edges
  const backrestWidth = 3.2 * scale;
  const backrestHeight = 1.4 * scale;
  const backrestDepth = 0.35 * scale;
  const cornerRadius = 0.35 * scale;

  // Main rectangle (center)
  const mainRectGeo = new THREE.BoxGeometry(
    backrestWidth - 2 * cornerRadius,
    backrestHeight,
    backrestDepth
  );
  const mainRect = new THREE.Mesh(mainRectGeo, new THREE.MeshBasicMaterial({ color: backrestColor }));
  mainRect.name = "Backrest Center";

  // Top and bottom cylinders (grey)
  const cylHGeo = new THREE.CylinderGeometry(
    cornerRadius, cornerRadius, backrestWidth - 2 * cornerRadius, 24, 1, false, Math.PI / 2, Math.PI
  );
  const cylTop = new THREE.Mesh(cylHGeo, new THREE.MeshBasicMaterial({ color: backrestEdgeColor }));
  cylTop.rotation.z = Math.PI / 2;
  cylTop.position.y = backrestHeight / 2 - cornerRadius / 2;
  cylTop.name = "Backrest Top Edge";

  const cylBottom = cylTop.clone();
  cylBottom.position.y = -backrestHeight / 2 + cornerRadius / 2;
  cylBottom.name = "Backrest Bottom Edge";

  // Left and right cylinders (grey)
  const cylVGeo = new THREE.CylinderGeometry(
    cornerRadius, cornerRadius, backrestHeight - 2 * cornerRadius, 24, 1, false, 0, Math.PI
  );
  const cylLeft = new THREE.Mesh(cylVGeo, new THREE.MeshBasicMaterial({ color: backrestEdgeColor }));
  cylLeft.position.x = -backrestWidth / 2 + cornerRadius / 2;
  cylLeft.rotation.x = Math.PI / 2;
  cylLeft.name = "Backrest Left Edge";

  const cylRight = cylLeft.clone();
  cylRight.position.x = backrestWidth / 2 - cornerRadius / 2;
  cylRight.name = "Backrest Right Edge";

  // Four corner spheres (grey)
  const sphereGeo = new THREE.SphereGeometry(cornerRadius / 1.01, 18, 12);
  const sphereTL = new THREE.Mesh(sphereGeo, new THREE.MeshBasicMaterial({ color: backrestEdgeColor }));
  sphereTL.position.set(-backrestWidth / 2 + cornerRadius / 2, backrestHeight / 2 - cornerRadius / 2, 0);
  sphereTL.name = "Backrest Top Left Corner";

  const sphereTR = sphereTL.clone();
  sphereTR.position.x = backrestWidth / 2 - cornerRadius / 2;
  sphereTR.name = "Backrest Top Right Corner";

  const sphereBL = sphereTL.clone();
  sphereBL.position.y = -backrestHeight / 2 + cornerRadius / 2;
  sphereBL.name = "Backrest Bottom Left Corner";

  const sphereBR = sphereTR.clone();
  sphereBR.position.y = -backrestHeight / 2 + cornerRadius / 2;
  sphereBR.name = "Backrest Bottom Right Corner";

  // Combine all backrest parts
  const backrestGroup = new THREE.Group();
  backrestGroup.name = "Backrest";
  backrestGroup.add(mainRect, cylTop, cylBottom, cylLeft, cylRight, sphereTL, sphereTR, sphereBL, sphereBR);

  backrestGroup.position.y = 1.35 * scale;
  backrestGroup.position.z = -1.28 * scale;
  backrestGroup.rotation.x = Math.PI / 36;
  group.add(backrestGroup);

  // Four legs
  const legMat = new THREE.MeshBasicMaterial({ color: legColor });
  const legPositions = [
    [-1.1, -1,  1.1],
    [ 1.1, -1,  1.1],
    [-1.1, -1, -1.1],
    [ 1.1, -1, -1.1],
  ];
  for (let i = 0; i < 4; i++) {
    const legGeo = new THREE.CylinderGeometry(0.12 * scale, 0.12 * scale, 2 * scale, 16);
    const leg = new THREE.Mesh(legGeo, legMat);
    leg.position.set(legPositions[i][0] * scale, -0.75 * scale, legPositions[i][2] * scale);
    leg.name = `Leg ${i + 1}`;
    group.add(leg);
  }

  // Crossbars for stability (white)
  const barMat = new THREE.MeshBasicMaterial({ color: barColor });
  const crossBar1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07 * scale, 0.07 * scale, 2.1 * scale, 16), barMat
  );
  crossBar1.rotation.z = Math.PI / 2;
  crossBar1.position.y = -1.55 * scale;
  crossBar1.name = "Crossbar X";
  group.add(crossBar1);

  const crossBar2 = crossBar1.clone();
  crossBar2.rotation.z = 0;
  crossBar2.rotation.x = Math.PI / 2;
  crossBar2.name = "Crossbar Z";
  group.add(crossBar2);

  group.name = "Chair";
  group.position.set(0, 0, 0);
  return group;
}