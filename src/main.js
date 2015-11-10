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
  var camera = new THREE.PerspectiveCamera(45,
                                           window.innerWidth/window.innerHeight,
                                           1,
                                           500);
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
  camera.position.set(30,30,30);
  camera.lookAt(new THREE.Vector3(0,0,0));
  function cantor(level, line) {
    var g = new THREE.Geometry();
    // console.log(Object.prototype.toString.call(g.vertices));
    g.vertices = [
      new THREE.Vector3(0, line[0].y, line[0].x),
      new THREE.Vector3(0, line[1].y, line[1].x)
    ];

    var lineMat = new THREE.LineBasicMaterial({ color: 0xffaaff });
    var ls = new THREE.LineSegments(g, lineMat);
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
    console.log(ls);
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
  cantor(3, [{x: 0, y:10}, {x: 20, y: 10}]);
  renderer.render(scene, camera);
}

window.addEventListener('load', onPageLoad, false);
