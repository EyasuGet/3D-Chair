# 3D Chair

A simple interactive 3D chair visualization using [Three.js](https://threejs.org/).

## Features

- **3D Model**: A chair constructed from basic geometry for easy customization.
- **Mouse Interaction**:
  - **Hover**: Highlights parts of the chair.
  - **Click**: Displays the name of the part clicked.
- **Orbit Controls**: Rotate, pan, and zoom the camera for full model exploration.
- **Responsive Overlay**: View the name of each part by clicking.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/EyasuGet/3D-Chair.git
   cd 3D-Chair
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **View in your browser:**

   Open [http://localhost:5173](http://localhost:5173) or the port shown in your terminal.

## Project Structure

```
3D-Chair/
├── src/
│   ├── createProduct.js    # Builds the chair geometry and names its parts
│   ├── main.js             # Main entry point, rendering and interaction
│   ├── initScene.js        # Scene, camera, renderer setup
│   └── ...                 # Other files/components
├── public/
│   └── ...
├── package.json
└── README.md
```

## Customization

- **Edit `src/createProduct.js`** to change the chair's style, colors, or geometry.
- **Edit `src/main.js`** to adjust interaction logic or effects.

## Dependencies

- [three](https://www.npmjs.com/package/three)
- [vite](https://vitejs.dev/) or another dev server (see `package.json`)

## License

MIT

---

**Author:** [EyasuGet](https://github.com/EyasuGet)# 3D Chair

A simple interactive 3D chair visualization using [Three.js](https://threejs.org/).

## Features

- **3D Model**: A chair constructed from basic geometry for easy customization.
- **Mouse Interaction**:
  - **Hover**: Highlights parts of the chair.
  - **Click**: Displays the name of the part clicked.
- **Orbit Controls**: Rotate, pan, and zoom the camera for full model exploration.
- **Responsive Overlay**: View the name of each part by clicking.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/EyasuGet/3D-Chair.git
   cd 3D-Chair
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **View in your browser:**

   Open [http://localhost:5173](http://localhost:5173) or the port shown in your terminal.

## Project Structure

```
3D-Chair/
├── src/
│   ├── createProduct.js    # Builds the chair geometry and names its parts
│   ├── main.js             # Main entry point, rendering and interaction
│   ├── initScene.js        # Scene, camera, renderer setup
│   └── ...                 # Other files/components
├── public/
│   └── ...
├── package.json
└── README.md
```

## Customization

- **Edit `src/createProduct.js`** to change the chair's style, colors, or geometry.
- **Edit `src/main.js`** to adjust interaction logic or effects.

## Dependencies

- [three](https://www.npmjs.com/package/three)
- [vite](https://vitejs.dev/) or another dev server (see `package.json`)

## License

MIT

---

**Author:** [EyasuGet](https://github.com/EyasuGet)