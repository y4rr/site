/// RENDERER

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild( renderer.domElement );

/// SCENE

var scene = new THREE.Scene();

/// CAMERA

var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
scene.add(camera);

/// LIGHTS

var light = new THREE.AmbientLight(0xFFFFFF, 0.5);
scene.add(light);

/// ADD SCENE

var numberOfCubes = 4;
var cubes = [];

for (var i = 0; i < numberOfCubes; i++) {
  cubes[i] = {
    geometry : new THREE.BoxGeometry(30, 30, 30),
    material : new THREE.MeshNormalMaterial(),
  }
  cubes[i].mesh = new THREE.Mesh(cubes[i].geometry, cubes[i].material);
  cubes[i].mesh.position.set(0, 0, -75);
  scene.add( cubes[i].mesh );
}

/// RENDER LOOP


function animate() {
	requestAnimationFrame( animate );
  
  for ( var i = 0; i < cubes.length; i++) {
    var j = i + 1;
    if (j % 2 === 0) {                
      cubes[i].mesh.rotation.x -= (j * 0.003);
      cubes[i].mesh.rotation.y -= (j * 0.003);
    } else {
      cubes[i].mesh.rotation.x += (j * 0.003);
      cubes[i].mesh.rotation.y += (j * 0.003);
    }
  }
  
	renderer.render( scene, camera );
}

/// MAKE RESPONSIVE

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

/// CALL FUNCTIONS

window.addEventListener("resize", resize);
animate();