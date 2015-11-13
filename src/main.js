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
  var shape = new THREE.Shape();
  shape.moveTo(0,0);
  shape.lineTo(20, 10);
  shape.lineTo(5, 16);
  shape.lineTo(0, 0);

  var material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
  var shapeGeo = new THREE.ShapeGeometry(shape);
  var mesh = new THREE.Mesh(shapeGeo, material);
  mesh.position.z = 10;
  console.log(mesh.position);
  var light = new THREE.AmbientLight(0xffffff);
  scene.add(light);
  scene.add(mesh);
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
