class DuplaFenda {
    constructor(game) {

        this.assetsPath = '/';

        const object = 'duplaFenda';
        console.log(this.assetsPath);
        const loader = new THREE.FBXLoader();

        loader.load(`${this.assetsPath}fbx/objects/duplaFenda2.fbx`, function (object) {

            game.environment = object; 
             game.environment.add( this.positionalAudio );
            game.colliders = [];
            game.scene.add(object);
            object.traverse(function (child) {
                if (child.isMesh) {
                    if (child.name.startsWith("proxy")) {
                        game.colliders.push(child);
                        child.material.visible = false;
                    } else {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                }
            });
          
				
			


            game.loadNextAnim(loader);
        });
    }
}       