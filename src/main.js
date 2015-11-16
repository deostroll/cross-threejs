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

  function serpenski(trianglePoints, level) {
    if(level <= 0 ) return
    var iter = 0;
    var inverted = [];
    var stack = [trianglePoints];
    var length = 0;
    var serpenskify = function(pts) {
      var
        ax = pts[0],
        ay = pts[1],
        bx = pts[2],
        by = pts[3],
        cx = pts[4],
        cy = pts[5];

      // var midPoints = [
      //     (ax + bx)/2, (ay + by)/2 ,
      //     (bx + cx)/2, (by + cy)/2 ,
      //     (cx + ax)/2, (cy + ay)/2
      // ];
      var
        m1x = (ax + bx)/2, m1y = (ay + by)/2,
        m2x = (bx + cx)/2, m2y = (by + cy)/2,
        m3x = (cx + ax)/2, m3y = (cy + ay)/2
      ;

      var t1 = [
        ax, ay,
        m1x, m1y,
        m3x, m3y
      ];

      var t2 = [
        m3x, m3y,
        cx, cy,
        m2x, m2y
      ];

      var t3 = [
        m1x, m1y,
        bx, by,
        m2x, m2y
      ];

      return {
        triangles: [ t1, t2, t3 ],
        inverted: [ m1x, m1y, m2x, m2y, m3x, m3y ]
      };

    };
    while (iter < level) {
      length = stack.length;
      while(length > 0) {
        var t = stack.shift();
        var r = serpenskify(t);
        stack.push.apply(stack, r.triangles);
        inverted.push(r.inverted);
        length--;
      }
      iter++;
    }

    return {
      triangles: stack,
      inverted: inverted
    };
  }

  var points = [
    4,2 ,
    8,2 ,
    6, 2 + 2 * Math.sqrt(3)
  ];

  var result = serpenski(points, 2);
  var mesh = new THREE.Mesh();
  var getHolePoints = function(pts, d) {
    
  };
  for (var i = 0, triangles = result.triangles, j = triangles.length; i < j; i++) {
      var pt = triangles[i];
      var shape = new THREE.Shape();
      shape.moveTo(pt[0], pt[1]);
      shape.lineTo(pt[2], pt[3]);
      shape.lineTo(pt[4], pt[5]);
      shape.lineTo(pt[0], pt[1]);
  }

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
