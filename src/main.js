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

function onPageLoad() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    1,
    500
  );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  var m1 = new THREE.LineBasicMaterial({ color: 0x0000ff }),
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

  var
    liney = new THREE.Line(g1, m1),
    linex = new THREE.Line(g2, m2),
    linez = new THREE.Line(g3, m3);
  scene.add(liney, linex, linez);
  camera.position.set(-30,30,-30);
  camera.lookAt(new THREE.Vector3(0,10,0));

  var matLine = new THREE.LineBasicMaterial({ color: 0xffaabb });

  var t = new Triangle({x: 0, y:0 }, { x: 5, y: Math.sqrt(3)/2 * 10}, {x: 10, y: 0});

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

  function serpenski(level) {
    var t = Triangle.CreateEquilateral(20, {x: 1, y: 1});
    plotTriangle(t);
    // debugger;
    var iterations = 0;
    stack = [t];
    while (iterations < level) {
      var length = stack.length;
      while(length > 0) {
        var triangle = stack.shift();
        var mid = triangle.getMidTriangle();
        plotTriangle(mid);
        stack.push.apply(stack, triangle.getSerpenskiTriangles());
        length--;
      }
      iterations++;
    }
  }

  serpenski(2);

  renderer.render(scene, camera);
  console.log('hello');
}

window.addEventListener('load', onPageLoad, false);
