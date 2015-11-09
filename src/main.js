function onPageLoad() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    0.1,
    20000
  );

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
  camera.position.set(-100,50,100);
  // camera.lookAt(new THREE.Vector3(0,0,0));
  camera.lookAt(scene.position);
  var controls = new THREE.OrbitControls(camera, render.domElement);

  var heartShape = new THREE.Shape();

heartShape.moveTo( 25, 25 );
heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
heartShape.bezierCurveTo( 30, 0, 30, 35,30,35 );
heartShape.bezierCurveTo( 30, 55, 10, 77, 25, 95 );
heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );

var extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

var geometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );

var mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({ color: 0xffffff }) );
scene.add(mesh);
  animate();

  function animate()
  {
    requestAnimationFrame( animate );
  	render();
  	update();
  }

  function update()
  {
  	// if ( keyboard.pressed("z") )
  	// {
  	// 	// do something
  	// }

  	controls.update();
  	// stats.update();
  }

  function render()
  {
  	renderer.render( scene, camera );
  }
}

window.addEventListener('load', onPageLoad, false);
