pc.script.create('scene02_audioSatelite', function (app) {
    // Creates a new Scene02_audioSatelite instance
    var Scene02_audioSatelite = function (entity) {
        this.entity = entity;
    };

    Scene02_audioSatelite.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
            
            this.camara = app.root.findByName("Camara");
           
            this.sala3 = app.root.findByName("scene02_interactiva");
            //console.log((this.camara.getPosition().x - this.sala3.getPosition().x));
                        
            if((((this.camara.getPosition().x - this.sala3.getPosition().x )> 130 ) && ((this.camara.getPosition().x - this.sala3.getPosition().x) < 180)) && (this.entity.sound.slot("COSMOS").volume < 0.5)) {
               console.log("dentro");
                this.entity.sound.slot("COSMOS").volume += dt/4; 
                
            }
            
            /*
             if(((this.camara.getPosition().x - this.entity.getPosition().x) > 125) && (this.entity.sound.slot("COSMOS").volume >0)){
                 //console.log("ahora");
                this.entity.sound.slot("COSMOS").volume -= dt/2;
            }
            */
            
            
            
            
            
        }
    };

    return Scene02_audioSatelite;
});