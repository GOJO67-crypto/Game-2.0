let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ground
let geometry = new THREE.PlaneGeometry(50, 50);
let material = new THREE.MeshBasicMaterial({ color: 0x228B22, side: THREE.DoubleSide });
let ground = new THREE.Mesh(geometry, material);
ground.rotation.x = Math.PI / 2;
scene.add(ground);

// Car (cube placeholder)
let carGeometry = new THREE.BoxGeometry(1, 0.5, 2);
let carMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
let car = new THREE.Mesh(carGeometry, carMaterial);
scene.add(car);

camera.position.set(0, 5, 5);

let speed = 0;
let turn = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === "w") speed = 0.1;
  if (e.key === "s") speed = -0.1;
  if (e.key === "a") turn = 0.05;
  if (e.key === "d") turn = -0.05;
});

document.addEventListener("keyup", () => {
  speed = 0;
  turn = 0;
});

function animate() {
  requestAnimationFrame(animate);

  car.rotation.y += turn;
  car.position.x -= Math.sin(car.rotation.y) * speed;
  car.position.z -= Math.cos(car.rotation.y) * speed;

  camera.position.x = car.position.x;
  camera.position.z = car.position.z + 5;
  camera.lookAt(car.position);

  renderer.render(scene, camera);
}

animate();
