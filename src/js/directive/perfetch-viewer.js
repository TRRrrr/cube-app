module.directive('perfetchViewer', function () {
 return {
    restrict: 'EACM',
    replace: false,
    scope: {
      model: '@',
      cameraStatus: '='
    },
    transclude: false,
    link: function (scope, el, attrs) {
	    scope.$watch('cameraStatus', function(newVal){
	    	if(newVal != null){
	    		cameraEventHandler(newVal);
	    	}
	    })

	      if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	      var container, stats, mesh,moveCameraFlag, myButton, clock, lastX, lastZ;

	      var camera, cameraTarget, scene, renderer, control, cameraDir;
	      init();
	      animate();

	      function init() {
	        lastX = 0;
	        lastZ = 0;
			moveCameraFlag = false;
		    container = el[0];

			camera = new THREE.PerspectiveCamera( 35, el.width() / el.height(), 1, 15 );
			camera.position.set( Math.sin(lastX) * 3, 0.15, Math.cos(lastZ) * 3 );

			cameraTarget = new THREE.Vector3( 0, 0.3, 0 );

			scene = new THREE.Scene();
			scene.fog = new THREE.Fog( 0xffffff, 2, 15 );//0x72645b


			// Ground
			//{ ambient: 0x999999, color: 0x999999, specular: 0x101010 }
			var plane = new THREE.Mesh( new THREE.PlaneGeometry( 40, 40 ), new THREE.MeshPhongMaterial( { ambient: 0xffffff, color: 0xffffff, specular: 0xffffff } ) );
			plane.rotation.x = -Math.PI/2;
			plane.position.y = -0.5;
			scene.add( plane );

			plane.receiveShadow = true;
			// renderer
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

			var loader = new THREE.PLYLoader();
	        scope.$watch('model', function (newVal, oldVal) {
	          // TODO reload model
	          if(typeof loader != 'undefined'){
	            if(loader.load !=null){
	              loader.load(newVal);
	            }
	          }
	          console.log('reload model', newVal);
	        });
			loader.addEventListener( 'load', function ( event ) {
					var geometry = event.content;
					//var material = new THREE.MeshPhongMaterial( { ambient: 0x0055ff, color: 0x0055ff, specular: 0x111111, shininess: 200 } );
					var mesh = new THREE.Mesh( geometry);
					mesh.position.set( 0, 0.40, 0 );
					mesh.rotation.set( 0, - Math.PI / 2, 0 );
					mesh.scale.set( 1, 1, 1 );

					mesh.castShadow = true;
					mesh.receiveShadow = true;

					scene.add( mesh );

				} );debugger;
			loader.load( '3dmodel/ball.ply' );
			//loader.load(scope.model);

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


	    }//init()

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
			 camera.aspect = el.width() / el.height();
			 camera.updateProjectionMatrix();
			 renderer.setSize( el.width(), el.height() );
		    }

		    function animate() {

				requestAnimationFrame( animate );
				if(moveCameraFlag){
					turnCamera(cameraDir);
				}
				render();
				stats.update();
				//controls.update();

		    }

		    function render() {
				camera.lookAt( cameraTarget );
				//control.update();
				renderer.render( scene, camera );

				//keyboard may not be useful.
				/*
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
				*/
		    }

		    function turnCamera(dir){
		    	var dt = clock.getDelta();
				camera.position.x = Math.sin( lastX ) * 3;
				camera.position.z = Math.cos( lastZ ) * 3;
				camera.lookAt( cameraTarget );
		    	if(dir == "left"){
		    		lastX = lastX + dt;
		    		lastZ = lastZ + dt;
		    	}else{
		    		lastX = lastX - dt;
		    		lastZ = lastZ - dt;
		    	}
		    	
		    }

		    function cameraReset(){
		    	camera.position.x = Math.sin(0) * 3;
		    	camera.position.z = Math.cos(0) * 3;
		    	camera.lookAt( cameraTarget);
		    	lastZ = 0;
		    	lastX = 0;
		    }

		    function cameraEventHandler(dir){
		    	switch(dir){
		    		case "reset":
		    			moveCameraFlag = false;
		    			cameraReset();
		    			break;
		    		case "pause":
		    			moveCameraFlag = false;
		    			break;
	    			case "left":
	    			case "right":
			    		if(clock == null || !moveCameraFlag){
			    			clock = new THREE.Clock();
						}
	    				moveCameraFlag = true;
	    				setMoveCamera(dir);
	    				break;
		    	}
		    }


		    function setMoveCamera(dir){
					cameraDir = dir;
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
