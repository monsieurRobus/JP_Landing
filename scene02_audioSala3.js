pc.script.create('scene02_audioSala3', function (app) {
    // Creates a new Scene02_audioSala3 instance
    var Scene02_audioSala3 = function (entity) {
        this.entity = entity;
    };

    Scene02_audioSala3.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
         
            
            
            
           this.camara = app.root.findByName("Camara");
            //console.log((this.camara.getPosition().y - this.entity.getPosition().y));
            this.xilofono = app.root.findByName("scene02_pj5_xilofono");
            //console.log((this.camara.getPosition().x - this.entity.getPosition().x));
                        
            if((((this.camara.getPosition().x - this.xilofono.getPosition().x )> 23 ) && ((this.camara.getPosition().x - this.entity.getPosition().x) < 54) && (this.camara.getPosition().x - this.xilofono.getPosition().x) < 70) && (this.entity.sound.slot("PIZARRA").volume < 0.5)) {
               //console.log("dentro");
                this.entity.sound.slot("MILIREVERB").volume += dt/2; 
                
            }
            
             if(((this.camara.getPosition().y - this.entity.getPosition().y) > 10) && (this.entity.sound.slot("MILIREVERB").volume >0)){
                 //console.log("ahora");
                this.entity.sound.slot("MILIREVERB").volume -= dt/2;
            }
            
            if(((this.camara.getPosition().y - this.entity.getPosition().y) > 10) && ((this.camara.getPosition().x) < 135) && (this.entity.sound.slot("PIZARRA").volume <0.6)){
                 //console.log("ahora");
                this.entity.sound.slot("PIZARRA").volume += dt/2;
            }
            
            if(((this.camara.getPosition().x) > 135) && (this.entity.sound.slot("PIZARRA").volume >0)){
                 //console.log("ahora");
                this.entity.sound.slot("PIZARRA").volume -= dt/2;
            }
             
            
        }
    };

    return Scene02_audioSala3;
});