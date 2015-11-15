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
  var l = 5;
  var d = 0.05;
  const rt3 = Math.sqrt(3);
  var triangleShape = new THREE.Shape();
  triangleShape.moveTo(0,0);
  triangleShape.lineTo(l,0);
  triangleShape.lineTo(l/2, Math.sin(Math.PI/3) * l);
  triangleShape.lineTo(0,0);
  
  //triangleShape.lineTo(l/4, l * rt3/4);
  console.log(triangleShape);
  var exgeo = triangleShape.extrude({
    amount: 2,
    bevelEnabled: false,
  });

  var material = new THREE.MeshBasicMaterial(
    {
      color: 0xaaee00,
      wireframe: false,
      side:THREE.DoubleSide
    }
  );


  var mesh1 = new THREE.Mesh(exgeo, material);

  var mesh = new THREE.Mesh();
  mesh.add(mesh1);
  scene.add(mesh);
  // console.log(triangleShape);
  // console.log(points);
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
