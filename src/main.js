function onPageLoad() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45,
                                           window.innerWidth/window.innerHeight,
                                           1,
                                           500);
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  var m1 = new THREE.LineBasicMaterial({
    color: 0x0000ff
  }),
    m2 = new THREE.LineBasicMaterial({ color: 0xff0000 }),
    m3 = new THREE.LineBasicMaterial({ color: 0x00ff00 });
  var g1 = new THREE.Geometry();
  var origin = new THREE.Vector3(0,0,0);
  g1.vertices.push(
    origin,
    new THREE.Vector3(0, 10, 0),
    new THREE.Vector3(0, 20, 0)
  );

  var g2 = new THREE.Geometry();
  g2.vertices.push(
    origin,
    new THREE.Vector3(10, 0, 0),
    new THREE.Vector3(20, 0, 0)
  );

  var g3 = new THREE.Geometry();
  g3.vertices.push(
    origin,
    new THREE.Vector3(0,0, 10),
    new THREE.Vector3(0,0, 20)
  );

  var liney = new THREE.Line(g1, m1),
    linex = new THREE.Line(g2, m2),
    linez = new THREE.Line(g3, m3);
  scene.add(liney, linex, linez);
  camera.position.set(30,30,30);
  camera.lookAt(new THREE.Vector3(0,0,0));
  renderer.render(scene, camera);
}

window.addEventListener('load', onPageLoad, false);
