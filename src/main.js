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

  var extrudeSettings = {
      amount : 2,
      steps : 1,
      bevelEnabled: false,
      curveSegments: 8
  };

  var triangleShape = new THREE.Shape();

  triangleShape.moveTo(0,0);
  triangleShape.lineTo(5,0);
  triangleShape.lineTo(2.5, Math.sin(Math.PI/3) * 5);
  triangleShape.lineTo(0,0);
  var points = triangleShape.getPoints();
  var delta = 0.05;
  var holePath = new THREE.Path();
  holePath.moveTo(delta, delta);
  holePath.lineTo(5-delta, delta);
  holePath.lineTo(2.5, Math.sin(Math.PI/3) * 5 - delta);
  holePath.lineTo(delta, delta);
  triangleShape.holes.push(holePath);

  var exgeo = triangleShape.extrude({
    amount: 8,
    bevelEnabled: false,
  });

  var material = new THREE.MeshBasicMaterial({ color: 0xaaee00, wireframe: false });
  var mesh = new THREE.Mesh(exgeo, material);
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
