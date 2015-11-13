function onPageLoad() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45,
                                           window.innerWidth/window.innerHeight,
                                           1,
                                           500);
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);


  document.body.appendChild(renderer.domElement);

  var
    dir = new THREE.Vector3(1,0,0),
    origin = new THREE.Vector3(0,0,0);

  var xaxis = new THREE.ArrowHelper(dir, origin, 100, 0xffff00, 10,10);
  //console.log(scene.position);
  camera.position.set(0, 0, 15);
  camera.lookAt(scene.position);
  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  scene.add(xaxis);

  //renderer.render(scene, camera);
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

  requestAnimationFrame(render);
}

window.addEventListener('load', onPageLoad, false);
