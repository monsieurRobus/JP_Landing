pc.script.create('scene02_pj4_chicosPalmadas', function (app) {
    // Creates a new Scene02_pj4_chicosPalmadas instance
    var Scene02_pj4_chicosPalmadas = function (entity) {
        this.entity = entity;
    };

    Scene02_pj4_chicosPalmadas.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
            this.skeleton = this.entity.spine.skeleton;
            
            this.entity.spine.state.setAnimationByName(0, "idle", true);
            this.entity.spine.spine.priority = 1;
            this.cuentaPalmasdas =0;
            
            jQuery(document).on("palmadas",function(){
                
                this.cuentaPalmasdas +=1;
                if (this.cuentaPalmasdas < 3){
                  this.entity.spine.state.setAnimationByName(0, "palmadas", false,1);
                  this.skeleton.setToSetupPose();       
                
                 this.entity.spine.state.addAnimationByName(0, "idle", true,2.7);
                    setTimeout(function(){
                        
                        this.entity.sound.slot("PALMADAS").play();
                        
                    }.bind(this),100);
                    
                }
                else {
                    this.entity.spine.state.setAnimationByName(0, "palmadas", true);
                    this.entity.sound.slot("PALMADAS").loop=true;
                    this.entity.sound.slot("PALMADAS").play();
                    
                }
                
                
            }.bind(this));
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
            this.camara = app.root.findByName("Camara");
            
            //console.log(this.camara.getPosition().sub(this.entity.getPosition()).length());
                        
            if((this.camara.getPosition().sub(this.entity.getPosition()).length() > 72) && (this.entity.sound.slot("MILIQUITULI").volume >0)){
                
                this.entity.sound.slot("MILIQUITULI").volume -= dt/2;
                this.entity.sound.slot("PALMADAS").volume -= dt;
                }
            
            
            
        }
    };

    return Scene02_pj4_chicosPalmadas;
});