function onPageLoad() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45,
                                           window.innerWidth/window.innerHeight,
                                           1,
                                           500);
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);


  document.body.appendChild(renderer.domElement);
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  camera.position.set(-25, 25, 25);
  camera.lookAt(scene.position);

  var axes = new THREE.AxisHelper(10);
  scene.add(axes);

  var cubeGeo = new THREE.BoxGeometry(3.5, 3.5, 3.5);
  var side1 = new THREE.MeshBasicMaterial({ color: THREE.ColorKeywords['deeppink'] });
  var side2 = new THREE.MeshBasicMaterial({ wireframe: false, color: THREE.ColorKeywords.cyan});
  var side3 = new THREE.MeshBasicMaterial({ color: THREE.ColorKeywords['red']});

  var mat = new THREE.MeshFaceMaterial([side1, side1, side2, side2, side3, side3]);
  var cube = new THREE.Mesh(cubeGeo, mat);
  cube.position.set(5, 5, 5);
  scene.add(cube);

  function animate() {
    requestAnimationFrame(animate);
    render();
    update();
  }
  function render() {
    renderer.render(scene, camera);
  }

  function update() {
    controls.update();
  }

  animate();
  // render();
}

window.addEventListener('load', onPageLoad, false);
