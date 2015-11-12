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
  camera.position.z = 15; camera.position.x = -5;
  camera.lookAt(scene.position);
  scene.add(xaxis);
  renderer.render(scene, camera);
}

window.addEventListener('load', onPageLoad, false);
