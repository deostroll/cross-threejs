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
  camera.position.set(0, 300, 400);
  // camera.lookAt(new THREE.Vector3(0,0,0));
  camera.lookAt(scene.position);
  var controls = new THREE.OrbitControls(camera, render.domElement);

  // LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);

  ////////////
	// CUSTOM //
	////////////

	var starPoints = [];

	starPoints.push(new THREE.Vector2(0,0));
  starPoints.push(new THREE.Vector2(100, 0));
  starPoints.push(new THREE.Vector2(100, 100));
  starPoints.push(new THREE.Vector2(0, 100));

	var starShape = new THREE.Shape( starPoints );

	var extrusionSettings = {
		amount: 100,
    bevelEnabled: false,
		material: 0, extrudeMaterial: 0
	};

	var starGeometry = new THREE.ExtrudeGeometry( starShape, extrusionSettings );

	var materialFront = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
	var materialSide = new THREE.MeshBasicMaterial( { color: 0xff8800 } );
	var materialArray = [ materialFront, materialSide ];
	var starMaterial = new THREE.MeshFaceMaterial(materialArray);

	var star = new THREE.Mesh( starGeometry, starMaterial );
	star.position.set(0,50,0);
	scene.add(star);

	// add a wireframe to model
	var wireframeTexture = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true } );
	var star = new THREE.Mesh( starGeometry, wireframeTexture );
	star.position.set(0,50,0);
	// scene.add(star);

  // renderer.render(scene, camera);

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
