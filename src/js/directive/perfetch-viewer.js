module.directive('perfetchViewer', function () {
  return {
    restrict: 'EACM',
    replace: false,
    transclude: false,
    scope: {
      model: '@'
    },
    link: function (scope, el, attrs) {

      if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

      var container, stats, mesh, myButton, moveCameraFlag;

      var camera, cameraTarget, scene, renderer, control;
      init();
      animate();

      function init() {
        debugger;
	moveCameraFlag = false;
        container = el[0];
	myButton = document.createElement( 'input');
	myButton.value = "Click me";
	myButton.type = "button";
	myButton.style.position = "absolute";
	myButton.style.left = "100px";
	myButton.addEventListener("click", function(){setMoveCamera();});
        el.append(myButton);

	camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 15 );
	camera.position.set( 2, 0.15, 2 );

	controls = new THREE.OrbitControls( camera );
	controls.addEventListener( 'change', render );

	cameraTarget = new THREE.Vector3( 0, 0.3, 0 );

	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x72645b, 2, 15 );


	// Ground

	var plane = new THREE.Mesh( new THREE.PlaneGeometry( 40, 40 ), new THREE.MeshPhongMaterial( { ambient: 0x999999, color: 0x999999, specular: 0x101010 } ) );
	plane.rotation.x = -Math.PI/2;
	plane.position.y = -0.5;
	scene.add( plane );

	plane.receiveShadow = true;
	// renderer
	var myCanvas = document.getElementById("example");
	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: false} );
	renderer.setSize( el.width(), el.height() );
	renderer.setClearColor( scene.fog.color, 1 );

	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.physicallyBasedShading = true;

	renderer.shadowMapEnabled = true;
	renderer.shadowMapCullFace = THREE.CullFaceBack;

	el.append( renderer.domElement );


	// ASCII file

	var loader = new THREE.STLLoader();
	loader.addEventListener( 'load', function ( event ) {

	  var geometry = event.content;
	  //var geometry1 = event.content;
	  for ( var i = 0; i < geometry.faces.length; i ++ ) {
   	    var face = geometry.faces[ i ];
   	    face.color.setHex( /*0x3366FF*/ 0x3366FF );

	    //face.vertexColors[0]= new THREE.Color(0x3366FF);
	    //face.vertexColors[1] = new THREE.Color(0x3366FF);
	    //face.vertexColors[2] = new THREE.Color(0x3366FF);

	  }
	  var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x00ee00, wireframe: true, transparent: true, wireframeLinewidth: 0 } );
	  var material =
	    new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, transparent: false, opacity: 0.7, wireframe: false,  shading: THREE.SmoothShading})
	  ;
	  //var material = new THREE.MeshPhongMaterial( { ambient: 0xAAAAAA, color: 0xFFDFC4, specular: 0x333333, shininess: 100 } );
	  mesh = new THREE.Mesh( geometry, material );

	  mesh.position.set( 0, 0.40, 0 );
	  mesh.rotation.set( 0, 0, 0 );
	  mesh.scale.set( 1, 1, 1 );

	  mesh.castShadow = true;
	  mesh.receiveShadow = true;
	  mesh.geometry.verticesNeedUpdate = true;
	  scene.add( mesh );
	  /*
	    var mesh1 = new THREE.Mesh(geometry1, wireframeMaterial);
	    mesh1.position.set( 0, 0, 1.15 );
	    mesh1.rotation.set( 0, 0, 0 );
	    mesh1.scale.set( 1, 1, 1 );

	    scene.add( mesh1);
	  */
	  /*
	    control = new THREE.TransformControls( camera, renderer.domElement );
	    control.addEventListener( 'change', render );

	    control.attach( mesh );
	    control.scale = 0.65;
	    //control.hide();
	    scene.add( control.gizmo );*/

	} );
	loader.load( '3dmodel/zhengXian.stl' );

        /*

	// Binary files

	var material = new THREE.MeshPhongMaterial( { ambient: 0x555555, color: 0xAAAAAA, specular: 0x111111, shininess: 200 } );

	var loader = new THREE.STLLoader();
	loader.addEventListener( 'load', function ( event ) {

	var geometry = event.content;
	var mesh = new THREE.Mesh( geometry, material );

	mesh.position.set( 0, - 0.37, - 0.6 );
	mesh.rotation.set( - Math.PI / 2, 0, 0 );
	mesh.scale.set( 2, 2, 2 );

	mesh.castShadow = true;
	mesh.receiveShadow = true;

	scene.add( mesh );

	} );
	loader.load( './models/stl/binary/pr2_head_pan.stl' );

	var loader = new THREE.STLLoader();
	loader.addEventListener( 'load', function ( event ) {

	var geometry = event.content;
	var mesh = new THREE.Mesh( geometry, material );

	mesh.position.set( 0.136, - 0.37, - 0.6 );
	mesh.rotation.set( - Math.PI / 2, 0.3, 0 );
	mesh.scale.set( 2, 2, 2 );

	mesh.castShadow = true;
	mesh.receiveShadow = true;

	scene.add( mesh );

	} );
	loader.load( './models/stl/binary/pr2_head_tilt.stl' );
        */

	// Lights

	scene.add( new THREE.AmbientLight( 0x777777 ) );

	addShadowedLight( 1, 1, 1, 0xffffff, 1.35 );
	addShadowedLight( 0.5, 1, -1, 0xffaa00, 1 );


	// stats

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	el.append( stats.domElement );

	//

	window.addEventListener( 'resize', onWindowResize, false );


      }

      function addShadowedLight( x, y, z, color, intensity ) {

	var directionalLight = new THREE.DirectionalLight( color, intensity );
	directionalLight.position.set( x, y, z )
	scene.add( directionalLight );

	directionalLight.castShadow = true;
	// directionalLight.shadowCameraVisible = true;

	var d = 1;
	directionalLight.shadowCameraLeft = -d;
	directionalLight.shadowCameraRight = d;
	directionalLight.shadowCameraTop = d;
	directionalLight.shadowCameraBottom = -d;

	directionalLight.shadowCameraNear = 1;
	directionalLight.shadowCameraFar = 4;

	directionalLight.shadowMapWidth = 1024;
	directionalLight.shadowMapHeight = 1024;

	directionalLight.shadowBias = -0.005;
	directionalLight.shadowDarkness = 0.15;

      }

      function onWindowResize() {

	// camera.aspect = window.innerWidth / window.innerHeight;
	// camera.updateProjectionMatrix();

	// renderer.setSize( el.width(), el.height() );

      }

      function animate() {

	requestAnimationFrame( animate );
	if(moveCameraFlag){
	  moveCamera();
	}
	render();
	stats.update();
	controls.update();

      }

      function render() {

	camera.lookAt( cameraTarget );
	//control.update();
	renderer.render( scene, camera );

	//keyboard
	var start = 0;
	document.onkeydown=function(e){e = e || window.event;
  				       var charCode = e.charCode || e.keyCode,
      				       character = String.fromCharCode(charCode);
				       console.log(charCode);
				       if(charCode == 68){

					 start = 0;
				       }
				      }

	document.onkeyup = function(e){
	  var charCode = e.charCode || e.keyCode,
      	  character = String.fromCharCode(charCode);
	  console.log(charCode);
	}
      }

      function moveCamera(){
	console.log("1");
	var timer = Date.now() * 0.0005;

	camera.position.x = Math.cos( timer ) * 3;
	camera.position.z = Math.sin( timer ) * 3;

	//camera.lookAt( cameraTarget );
      }
      function setMoveCamera(){
	moveCameraFlag = true;
      }

      // Rotate an object around an arbitrary axis in object space
      var rotObjectMatrix;
      function rotateAroundObjectAxis(object, axis, radians) {
	rotObjectMatrix = new THREE.Matrix4();
	rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

	// old code for Three.JS pre r54:
	// object.matrix.multiplySelf(rotObjectMatrix);      // post-multiply
	// new code for Three.JS r55+:
	object.matrix.multiply(rotObjectMatrix);

	// old code for Three.js pre r49:
	// object.rotation.getRotationFromMatrix(object.matrix, object.scale);
	// new code for Three.js r50+:
	object.rotation.setEulerFromRotationMatrix(object.matrix);
      }

      var rotWorldMatrix;
      // Rotate an object around an arbitrary axis in world space
      function rotateAroundWorldAxis(object, axis, radians) {
	rotWorldMatrix = new THREE.Matrix4();
	rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);

	// old code for Three.JS pre r54:
	//  rotWorldMatrix.multiply(object.matrix);
	// new code for Three.JS r55+:
	rotWorldMatrix.multiply(object.matrix);                // pre-multiply

	object.matrix = rotWorldMatrix;

	// old code for Three.js pre r49:
	// object.rotation.getRotationFromMatrix(object.matrix, object.scale);
	// new code for Three.js r50+:
	object.rotation.setEulerFromRotationMatrix(object.matrix);
      }

    }
  };
});
