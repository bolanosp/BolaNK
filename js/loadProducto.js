var scene = null,
  camera = null,
  renderer = null,
  controls = null,
  pointLight = null,
  pointLigth2 = null,
  model = null;

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight, false);
}

function start() {
  initScene();
  animate();
}

function initScene() {
  // scene, camera, render
  //create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050101);
  //create camera
  camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    1,
    80
  );
  //To render
  const canvas = document.querySelector(".webgl"); //call canvas of html
  renderer = new THREE.WebGLRenderer({ canvas: canvas });

  //add elements
  scene.add(camera);

  camera.position.set(4, 5, 5);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  controls.update();

  window.addEventListener("resize", onWindowResize, false);

  //ligths
  const light = new THREE.AmbientLight(0xfcfff0, 1); // soft white light
  scene.add(light);

  pointLight = new THREE.PointLight(0xfcfff0, 1, 0);
  pointLight.position.set(5, 5, 0);
  scene.add(pointLight);

  numProducto = document.getElementById("numProducto").innerHTML;
  console.log(model);

  loadModel_objAndMtl(
    "./src/models/" + productList[numProducto].model + "/",
    productList[numProducto].model,
    true,
    scene
  );
}

function loadModel_objAndMtl(PathGeneralFolder, pahtFile, show) {
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
        object.position.set(0, 0, 0);
        object.scale.set(
          productList[numProducto].scale,
          productList[numProducto].scale,
          productList[numProducto].scale
        );
        //

        model = object; //
        scene.add(object);
      });
    });
  }
}

function animate() {
  requestAnimationFrame(animate);

  model.rotation.y -= 0.01;

  controls.update();
  renderer.render(scene, camera);
  renderer.setSize(window.innerWidth, window.innerHeight, false);

  camera.lookAt(scene.position);
}
