//var init to start scen
var scene0 = null,
  scene1 = null,
  scene2 = null,
  camera = null,
  renderer0 = null,
  renderer1 = null,
  renderer2 = null,
  controls0 = null,
  controls1 = null,
  controls2 = null,
  pointLight = null,
  pointLight2 = null;

var shoes = [];

function start() {
  initScene();
  animate();
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight, false);
}

function initScene() {
  // scene, camera, render
  //create scene

  scene0 = new THREE.Scene();
  scene1 = new THREE.Scene();
  scene2 = new THREE.Scene();

  //To render
  const canvas0 = document.querySelector("#webgl0");
  const canvas1 = document.querySelector("#webgl1");
  const canvas2 = document.querySelector("#webgl2"); //call canvas of html
  renderer0 = new THREE.WebGLRenderer({ canvas: canvas0 });

  renderer1 = new THREE.WebGLRenderer({ canvas: canvas1 });
  renderer2 = new THREE.WebGLRenderer({ canvas: canvas2 });

  addBasicsInit(scene0);
  addBasicsInit(scene1);
  addBasicsInit(scene2);

  window.addEventListener("resize", onWindowResize, false);

  // LOAD NIKE UPTEMPO
  loadModel_objAndMtl(
    "./src/models/" + productList[0].model + "/",
    productList[0].model,
    true,
    scene0,
    0.4
  );

  // LOAD NIKE RETRO
  loadModel_objAndMtl(
    "./src/models/" + productList[1].model + "/",
    productList[1].model,
    true,
    scene1,
    0.05
  );

  // LOAD CAR
  loadModel_objAndMtl(
    "./src/models/" + productList[2].model + "/",
    productList[2].model,
    true,
    scene2,
    0.4
  );
}

function loadModel_objAndMtl(PathGeneralFolder, pahtFile, show, scene, scale) {
  if (show == true) {
    var mtlLoader2 = new THREE.MTLLoader();
    mtlLoader2.setTexturePath(PathGeneralFolder);
    mtlLoader2.setPath(PathGeneralFolder);
    mtlLoader2.load(pahtFile + ".mtl", function (materials) {
      materials.preload();

      var objLoader2 = new THREE.OBJLoader();
      objLoader2.setMaterials(materials);
      objLoader2.setPath(PathGeneralFolder);
      objLoader2.load(pahtFile + ".obj", function (object) {
        //
        object.position.set(0, -2, 0);
        object.scale.set(scale, scale, scale);
        //

        scene.add(object);
        shoes.push(object);
      });
    });
  }
}
function addBasicsInit(scene) {
  scene.background = new THREE.Color(0x050101);

  camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    1,
    80
  );

  scene.add(camera);

  const light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);

  pointLight = new THREE.PointLight(0xfcfff0, 1, 0);
  pointLight.position.set(0, 20, 0);
  scene.add(pointLight);

  controls0 = new THREE.OrbitControls(camera, renderer0.domElement);
  controls1 = new THREE.OrbitControls(camera, renderer1.domElement);
  controls2 = new THREE.OrbitControls(camera, renderer2.domElement);

  camera.position.set(8, 5, 5);

  controls0.update();
  controls1.update();
  controls2.update();
}

function animate() {
  requestAnimationFrame(animate);
  shoes[0].rotation.y += 0.001;
  shoes[1].rotation.y += 0.001;
  shoes[2].rotation.y += 0.001;

  controls0.update();
  controls1.update();
  controls2.update();

  renderer0.render(scene0, camera);
  renderer0.setSize(window.innerWidth, window.innerHeight, false);
  renderer1.render(scene1, camera);
  renderer1.setSize(window.innerWidth, window.innerHeight, false);
  renderer2.render(scene2, camera);
  renderer2.setSize(window.innerWidth, window.innerHeight, false);
}

console.log();
