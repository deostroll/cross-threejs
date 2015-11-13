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
  camera.position.set(0, 0, 15);
  camera.lookAt(scene.position);

  var
    dir = new THREE.Vector3(1,0,0),
    origin = new THREE.Vector3(0,0,0);

  var xaxis = new THREE.ArrowHelper(dir, origin, 10, 0xffff00);
  var yaxis = new THREE.ArrowHelper(new THREE.Vector3(0,1,0), origin, 10, 0xff0000);
  var zaxis = new THREE.ArrowHelper(new THREE.Vector3(0,0,1), origin, 10, 0x0000ff);

  scene.add(xaxis);
  scene.add(yaxis, zaxis);

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

  animate();
}

window.addEventListener('load', onPageLoad, false);
