function Triangle(p1, p2, p3) {
  this.p1 = p1;
  this.p2 = p2;
  this.p3 = p3;
}

Triangle.prototype.to3D = function(plane) {
  var p1 = this.p1, p2 = this.p2, p3 = this.p3;
  var ret = null;
  if(!plane) plane = 'xy';
  switch (plane) {
    case 'xy':
      ret = [
        new THREE.Vector3(p1.x, p1.y, 0),
        new THREE.Vector3(p2.x, p2.y, 0),
        new THREE.Vector3(p3.x, p3.y, 0)
      ];
      break;
    case 'yz':
      ret = [
        new THREE.Vector3(0, p1.x, p1.y),
        new THREE.Vector3(0, p2.x, p2.y),
        new THREE.Vector3(0, p3.x, p3.y)
      ];
    case 'zx':
      ret = [
        new THREE.Vector3(p1.y, 0, p1.x),
        new THREE.Vector3(p2.y, 0, p2.x),
        new THREE.Vector3(p3.y, 0, p3.x)
      ];
      break;
  }

  return ret;
}

Triangle.prototype.getMidTriangle = function() {
  var p1 = this.p1, p2 = this.p2, p3 = this.p3;
  var fnMid = function(p, q, axis) {
    var ret;
    if(axis === 'x') {
      return (p.x + q.x) / 2;
    }
    else {
      return (p.y + q.y) / 2;
    }
  };
  var
    s1 = {
      x: fnMid(p1, p2, 'x'),
      y: fnMid(p1, p2, 'y')
    },
    s2 = {
      x: fnMid(p2, p3, 'x'),
      y: fnMid(p2, p3, 'y')
    },
    s3 = {
      x: fnMid(p3, p1, 'x'),
      y: fnMid(p3, p1, 'y')
    };
  return new Triangle(s1, s2, s3);
}

Triangle.prototype.getSerpenskiTriangles = function() {
    var p1 = this.p1, p2 = this.p2, p3 = this.p3;
    var mt = this.getMidTriangle();
    var m1 = mt.p1, m2 = mt.p2, m3 = mt.p3;
    return [
      //triangle 1
      new Triangle(
        {
          x: p1.x, y: p1.y
        },
        {
          x: m1.x, y: m1.y
        },
        {
          x: m3.x, y: m3.y
        }
      ),
      //triangle 2
      new Triangle(
        {
          x: m1.x, y: m1.y
        },
        {
          x: p2.x, y: p2.y
        },
        {
          x: m2.x, y: m2.y
        }
      ),
      //triangle 3
      new Triangle(
        {
          x: m2.x, y: m2.y
        },
        {
          x: p3.x, y: p3.y
        },
        {
          x: m3.x, y: m3.y
        }
      )
    ];
};

Triangle.CreateEquilateral = function(side, offset) {
  var x = 0, y = 0;

  var makePoint = function() {
    return {
      x: x + (offset ? offset.x : 0),
      y: y + (offset ? offset.y : 0)
    };
  }
  var s1 = makePoint();

  x = side/2, y = side * Math.sqrt(3)/2;

  var s2 = makePoint();

  x = side, y = 0;

  var s3 = makePoint();

  return new Triangle(s1, s2, s3);
};

function Line(p1, p2) {
  this.p1 = p1;
  this.p2 = p2;
}

Line.prototype.to3D = function(plane) {
  var p1 = this.p1, p2 = this.p2;
  var ret = null;
  if(!plane) plane = 'xy';
  switch (plane) {
    case 'xy':
      ret = [
        new THREE.Vector3(p1.x, p1.y, 0),
        new THREE.Vector3(p2.x, p2.y, 0)
      ];
      break;
    case 'yz':
      ret = [
        new THREE.Vector3(0, p1.x, p1.y),
        new THREE.Vector3(0, p2.x, p2.y)
      ];
    case 'zx':
      ret = [
        new THREE.Vector3(p1.y, 0, p1.x),
        new THREE.Vector3(p2.y, 0, p2.x)
      ];
      break;
  }

  return ret;
};

function onPageLoad() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    1,
    500
  );
  // camera = new THREE.OrthographicCamera(
  //   window.innerWidth / - 2,
  //   window.innerWidth / 2,
  //   window.innerHeight / 2,
  //   window.innerHeight / - 2,
  //   10, 10000 );

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera.position.set(-30,30,-30);
  camera.lookAt(scene.position);
  var controls = new THREE.OrbitControls(camera, renderer.domElement);

  var axes = new THREE.AxisHelper(25);
  //scene.add(axes);

  var matLine = new THREE.LineBasicMaterial({ color: 0xffaabb });

  var t = new Triangle({x: 0, y:0 }, { x: 5, y: Math.sqrt(3)/2 * 10}, {x: 10, y: 0});

  function cantor(level, line) {
    var g = new THREE.Geometry();
    // console.log(Object.prototype.toString.call(g.vertices));
    g.vertices = [
      new THREE.Vector3(0, line[0].y, line[0].x),
      new THREE.Vector3(0, line[1].y, line[1].x)
    ];

    var lineMat = new THREE.LineBasicMaterial({ color: THREE.ColorKeywords['orange'] });
    var ls = new THREE.LineSegments(g, lineMat);
    ls.name = 'cantor';
    var end = level;
    var iterations = 0;
    while (iterations < end) {
      var points = ls.geometry.vertices.slice();
      var cantorized = [];
      for(var i = 0, j = points.length; i < j; i+= 2) {
        var a = points[i], b = points[i + 1];
        cantorized.push.apply(cantorized, cantorize(a, b));
      }
      ls.geometry.vertices = cantorized;
      iterations++;
    }
    // console.log(ls);
    scene.add(ls);
    function cantorize(p1,p2) {
      var p = {x: p1.z, y: p1.y }, q = { x: p2.z, y: p2.y };
      var distance = Math.abs(p.x - q.x);
      var _1by3 = distance / 3, _2by3 = _1by3 *  2;
      var points = [
        p,
        {
          x: p.x + _1by3, y : p.y
        },
        {
          x: p.x + _2by3, y: p.y
        },
        q
      ];
      return points.map(function(pt){
        return new THREE.Vector3(0, pt.y, pt.x);
      });
    }
  }


  function plotTriangle(triangle) {
    var pts = triangle.to3D('xy');
    var g = new THREE.Geometry();
    g.vertices.push(
      pts[0], pts[1],
      pts[1], pts[2],
      pts[2], pts[0]
    )
    var line = new THREE.LineSegments(g, matLine);
    scene.add(line);
  }

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
      var
        m1x = (ax + bx)/2, m1y = (ay + by)/2, //side ab
        m2x = (bx + cx)/2, m2y = (by + cy)/2, //side bc
        m3x = (cx + ax)/2, m3y = (cy + ay)/2  //side ca
      ;

      var t1 = [
        ax, ay,
        m1x, m1y,
        m3x, m3y
      ];

      var t2 = [
        m3x, m3y,
        m2x, m2y,
        cx, cy
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
  var
    l = 10,
    p = 0,
    q = 0,
    points = [
      p       , q,
      p + l   , q,
      p + l/2 , q + l/2 * Math.sqrt(3)
    ],
    level = 2
  ;
  cantor(level, [{x: 0, y:0}, {x: 10, y: 0}]);
  var ls = scene.getObjectByName('cantor');
  var v = ls.geometry.vertices, d = v[0].distanceTo(v[1]);
  //console.log(JSON.stringify(ls.geometry.vertices, null, 1));

  var extrusionSettings = {
    amount: d,
    bevelEnabled: false
  };
  var result = serpenski(points, level);
  var getVector2Array = function(holePoints) {
    var VArray = [];
    for(var k = 0, l = holePoints.length; k < l; k+=2) {
      VArray.push(new THREE.Vector2(holePoints[k], holePoints[k+1]));
    }
    return VArray;
  };
  var getHolePoints = function(pts, d) {
    var p = pts[0], q = pts[1];
    var l = Math.abs(p - pts[2]);
    var points = [
      p + d *(1 + 1/Math.sqrt(3)) , q + d ,
      p + l - d * Math.sqrt(3)    , q + d ,
      p + l/2                     , q + l * Math.sqrt(3)/2 - d * (1 + Math.sqrt(3)/2)
    ];

    return points;
  };
  // var mat1 = new THREE.MeshBasicMaterial({ color: THREE.ColorKeywords['pink']});
  // var mat2 = new THREE.MeshBasicMaterial({ color: THREE.ColorKeywords['blue']});

  var mat1 = new THREE.MeshLambertMaterial({ color: THREE.ColorKeywords['pink']});
  // var mat2 = mat1;
  var mat2 = new THREE.MeshLambertMaterial({ color: THREE.ColorKeywords['purple']});

  // debugger;
  var group = new THREE.Mesh();
  for (var i = 0, triangles = result.triangles, j = triangles.length; i < j; i++) {
      var pt = triangles[i];
      //defining shape
      var shape = new THREE.Shape();
      shape.moveTo(pt[0], pt[1]);
      shape.lineTo(pt[2], pt[3]);
      shape.lineTo(pt[4], pt[5]);
      shape.lineTo(pt[0], pt[1]);

      //defining hole for shape
      var holePoints = getHolePoints(pt, 0.05);
      var VArray = getVector2Array(holePoints);
      var holePath = new THREE.Path(VArray);
      shape.holes.push(holePath);

      var geo = shape.extrude(extrusionSettings);
      var mesh = new THREE.Mesh(geo, mat1);

      //defining inner shape
      var inner = new THREE.Shape(VArray);
      var innerHolePoints = getHolePoints(holePoints, 0.05)
      var innerVArray = getVector2Array(innerHolePoints);
      var innerHolePath = new THREE.Path(innerVArray);
      inner.holes.push(innerHolePath);

      var innerGeo = inner.extrude(extrusionSettings);
      var innerMesh = new THREE.Mesh(innerGeo, mat2);
      group.add(mesh, innerMesh);
  }
  // var g = group.clone();
  // g.rotateY(Math.PI/2);
  scene.add(group);
  var vertices = v;
  for(var i = 2, j = vertices.length; i < j; i+=2) {
    var p = vertices[i];
    var clone = group.clone();
    clone.translateZ(p.z);
    scene.add(clone);
  }
  // cantor(2, [{x: 0, y:0}, {x: 10, y: 0}]);
  var light = new THREE.AmbientLight(0xeeeeee);
  scene.add(light);
  animate();

  function animate () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

}

window.addEventListener('load', onPageLoad, false);
