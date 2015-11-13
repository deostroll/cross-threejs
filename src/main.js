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
  var light = new THREE.AmbientLight(0xffffff);
  var shape = new THREE.Shape();
  shape.moveTo(5,5);
  shape.lineTo(7, 5);
  shape.lineTo(7, 7);
  shape.lineTo(5, 7);
  shape.lineTo(5, 5);

  var exGeo = shape.extrude({
    amount:2,
    step: 4,
    bevelEnabled: false
  });
  var m1 = new THREE.MeshBasicMaterial({ wireframe: true, skinning: false });
  var m2 = new THREE.MeshBasicMaterial({ color: 0x00eeff });


  var mat = new THREE.MeshFaceMaterial([ m2, m1]);

  var mesh = new THREE.Mesh(exGeo, mat);
  scene.add(mesh, light);

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
