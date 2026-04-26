let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// LIGHT (important so you can actually see stuff later)
let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

// Ground
let groundGeo = new THREE.PlaneGeometry(50, 50);
let groundMat = new THREE.MeshStandardMaterial({ color: 0x228B22 });
let ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Car
let carGeo = new THREE.BoxGeometry(1, 0.5, 2);
let carMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
let car = new THREE.Mesh(carGeo, carMat);
scene.add(car);

// Camera position
camera.position.set(0, 5, 8);

// Movement state (THIS was the problem before)
let keys = {
  w: false,
  s: false,
  a: false,
  d: false
};

// Key listeners (fixed)
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() in keys) keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key.toLowerCase() in keys) keys[e.key.toLowerCase()] = false;
});

function animate() {
  requestAnimationFrame(animate);

  let speed = 0;
  let turn = 0;

  if (keys.w) speed = 0.1;
  if (keys.s) speed = -0.1;
  if (keys.a) turn = 0.05;
  if (keys.d) turn = -0.05;

  // Move car
  car.rotation.y += turn;
  car.position.x -= Math.sin(car.rotation.y) * speed;
  car.position.z -= Math.cos(car.rotation.y) * speed;

  // Camera follow
  camera.position.x = car.position.x + Math.sin(car.rotation.y) * 5;
  camera.position.z = car.position.z + Math.cos(car.rotation.y) * 5;
  camera.lookAt(car.position);

  renderer.render(scene, camera);
}

animate();

const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
  'px.jpg','nx.jpg','py.jpg','ny.jpg','pz.jpg','nz.jpg'
]);
scene.background = texture;

renderer.shadowMap.enabled = true;

const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

const directional = new THREE.DirectionalLight(0xffffff, 1);
directional.position.set(5, 10, 7);
scene.add(directional);

camera.position.lerp(targetPosition, 0.1);

camera.fov = 75 + speed * 0.5;
camera.updateProjectionMatrix();

const audio = new Audio('engine.mp3');
audio.loop = true;
audio.play();

audio.playbackRate = 0.5 + speed * 0.1;
