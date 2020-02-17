let container, camera, renderer, scene

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
  renderer.render(scene, camera);
}

function createCamera() {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);

  scene = new THREE.Scene();
}

function createLights() {
  const mainLight = new THREE.DirectionalLight(0xffffff, 5);
  mainLight.position.set(0, 0, 10);
  scene.add(mainLight);
}

function createLines() {
  let material = new THREE.LineDashedMaterial({
    color: 0xffdc00,
    linewidth: 5,
    scale: 1,
    dashSize: 3,
    gapSize: 1,
  });

  let points = []
  let lines = [] // array of THREE.line instances
  let counter = 0
  let x1 = -50;
  let y1 = -25;
  let y2 = 25;

  for (let i = 0; i < 11; i++) {
    points.push(new THREE.Vector2(x1, y1));
    points.push(new THREE.Vector2(x1, y2));
    

    let vectorPoints = [points[counter], points[counter + 1]];
    let geometry = new THREE.BufferGeometry().setFromPoints(vectorPoints);
    lines.push(new THREE.Line(geometry, material))

    x1 += 10;
    counter += 2;
    vectorPoints = [];
    

    scene.add(lines[i])
  }
  console.log(lines)
  console.log(lines[0])
  console.log(points)
}

// adjust canvas to resized window
function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight)
}

window.addEventListener("resize", onWindowResize)


init();