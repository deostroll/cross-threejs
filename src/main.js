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

  var rectLength = 15, rectWidth = 7;

  var rectShape = new THREE.Shape();
  rectShape.moveTo( 0,0 );
  rectShape.lineTo( 0, rectWidth );
  rectShape.lineTo( rectLength, rectWidth );
  rectShape.lineTo( rectLength, 0 );
  rectShape.lineTo( 0, 0 );

  var rectGeom = new THREE.ShapeGeometry( rectShape );
  var rectMesh = new THREE.Mesh( rectGeom, new THREE.MeshPhongMaterial( { color: 0xff0000, side:THREE.DoubleSide} ) ) ;
  var light = new THREE.AmbientLight(0xffffff);
  scene.add( rectMesh , light);

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
