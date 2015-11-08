function onPageLoad() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45,
                                           window.innerWidth/window.innerHeight,
                                           1,
                                           500);
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  var tg = new THREE.TextGeometry('Hello', {
    size: 30,
    weight:'normal',
  });
  var material = new THREE.MeshBasicMaterial({
    color:0xff0000
  });
  //tg.push(new THREE.Vector3(0,0,0));
  var text = new THREE.Mesh(tg, material);
  scene.add(text);
  camera.position.set(30,30,30);
  camera.lookAt(new THREE.Vector3(0,0,0));
  renderer.render(scene, camera);
}

window.addEventListener('load', onPageLoad, false);
