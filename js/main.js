let container, camera, renderer, scene, line, curve, geometry, material, x2 = 0

function init() {

  container = document.querySelector('#scene-container');

  let scene = new THREE.Scene();
  scene.background = new THREE.Color(0xff0000);

  createCamera();
  createLights();
  createLines();
  createRenderer();

  renderer.setAnimationLoop(() => {
    update();
    render();
  })
}

function update() {
}

// render
function createRenderer() {

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x111111);
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio.devicePixelRatio);
  renderer.gammaFactor = 2.2;
  renderer.physicallyCorrectLights = true;

  container.appendChild(renderer.domElement);
}

function render() {
updateLines();

  renderer.render(scene, camera);
}

function createCamera() {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
  camera.position.set(0, 0, 200);
  camera.lookAt(0, 0, 0);

  scene = new THREE.Scene();
}

function createLights() {
  const mainLight = new THREE.DirectionalLight(0xffffff, 5);
  mainLight.position.set(0, 0, 10);
  scene.add(mainLight);
}

function createLines() {
  let x1 = 0;
  let y1 = -25;
  let y2 = 0;
  let y3 = 25;

  geometry = new THREE.Geometry()
  geometry.vertices.push(
    new THREE.Vector3(x1, y1, 0),
    new THREE.Vector3(x1, y2, 0),
    new THREE.Vector3(x1, y3, 0),
  )

  material = new THREE.LineBasicMaterial({ color: 0xffdc00 });
  curvedLine = new THREE.Line(geometry, material);
  scene.add(curvedLine);

  curvedLine.curve = geometry.vertices; // link vertices to this curvedLine

}

function updateLines() {
  x2 += 0.05

  // update x of 2nd vector
  curvedLine.curve[1].x = x2
  // update changed vertices
  curvedLine.geometry.verticesNeedUpdate = true;

}

// adjust canvas to resized window
function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight)
}

window.addEventListener("resize", onWindowResize);


init();
