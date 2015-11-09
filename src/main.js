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

  // LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,100,0);
	scene.add(light);

  var lineGeo = new THREE.Geometry();
  var origin = new THREE.Vector3(0,0,0);
  var lineMat = new THREE.LineBasicMaterial({ color: 0xefefef });
  lineGeo.vertices.push(
    origin,
    new THREE.Vector3(50,25, 0),
    origin,
    new THREE.Vector3(35,45)
  );
  var segments = new THREE.LineSegments(lineGeo, lineMat);
  // var shp = new THREE.Shape(segments);

  scene.add(segments);

  var settings = {
    amount: 10,
    bevelEnabled: false,
    material: 0,
    extrudeMaterial: 1
  };

  var exGeo = new THREE.ExtrudeGeometry(lineGeo, settings);
  var material = new THREE.MeshBasicMaterial({ color: 0xff8800 });

  var obj = new THREE.Mesh(exGeo, material);
  scene.add(obj);
  animate();

  function animate()
  {
    requestAnimationFrame( animate );
  	render();
  	update();
  }

  function update()
  {
  	if ( keyboard.pressed("z") )
  	{
  		// do something
  	}

  	controls.update();
  	// stats.update();
  }

  function render()
  {
  	renderer.render( scene, camera );
  }
}

window.addEventListener('load', onPageLoad, false);
