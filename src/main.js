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
  var triangleShape = new THREE.Shape();
  triangleShape.moveTo(0,0);
  triangleShape.lineTo(l,0);
  triangleShape.lineTo(l/2, Math.sin(Math.PI/3) * l);
  triangleShape.lineTo(0,0);
  getHolePoints(triangleShape, 0.05);
  var points = triangleShape.getPoints();
  var delta = 0.05;


  function getHolePoints(shape, d) {
    var points = shape.getPoints();
    var p = points[0].x, q = points[0].y;
    var l = Math.abs(points[0].x - points[1].x);
    var points = [
      new THREE.Vector2(p + d *(1 + 1/Math.sqrt(3) ), q + d ),
      new THREE.Vector2(p + l - d * Math.sqrt(3) , q + d ),
      new THREE.Vector2(p + l/2, q + l * Math.sqrt(3)/2 - d * (1 + Math.sqrt(3)/2 ) )
    ];
    return points;
  }

  var a = getHolePoints(triangleShape, 0.05);
  var holePath = new THREE.Path(a);
  var b = holePath.getPoints();
  for (var i = 0; i < 3; i++) {
    var s1 = JSON.stringify(a[i]), s2 = JSON.stringify(b[i]);
    console.log(s1 === s2);
  }
  triangleShape.holes.push(holePath);
  var innerTriangle = new THREE.Shape(holePath.getPoints());
  var innerHolePath = new THREE.Path(getHolePoints(innerTriangle, 0.05));
  innerTriangle.holes.push(innerHolePath);
  var exgeo2 = innerTriangle.extrude(
    {
      amount: 2,
      bevelEnabled:false
    }
  );

  var exgeo = triangleShape.extrude({
    amount: 2,
    bevelEnabled: false,
  });

  var material = new THREE.MeshBasicMaterial({ color: 0xaaee00, wireframe: false });
  var material2 = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });

  var mesh1 = new THREE.Mesh(exgeo, material);
  var mesh2 = new THREE.Mesh(exgeo2, material2);
  var mesh = new THREE.Mesh();
  mesh.add(mesh1, mesh2);
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
