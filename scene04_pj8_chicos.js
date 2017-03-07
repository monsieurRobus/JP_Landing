pc.script.create('scene04_pj8_chicos', function (app) {
    // Creates a new Scene04_pj8_chicos instance
    var Scene04_pj8_chicos = function (entity) {
        this.entity = entity;
    };

    Scene04_pj8_chicos.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
            this.skeleton = this.entity.spine.skeleton;
            this.rapido = false;
            this.entity.spine.state.setAnimationByName(0, "idle", true);
            this.entity.spine.spine.priority = 1;
            
            
            //this.entity.setPosition(-0.197,27.319,29.873);
            
            jQuery(document).on("velocidad",function(event,that,giro){
                
            //this.velocidad = giro;
                
            }.bind(this));
            
            
            
         
            
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
            console.log(this.entity.getPosition()+' '+this.entity.enabled);
            
            if (app.root.findByName("Mundo"))
                
                // Posicion inicial del pj8
                {
                    this.entity.setLocalPosition(-0.3,-2.8,-13.6);
                    this.velocidad = app.root.findByName("Mundo").script.scene04_multiClick.velocidad;
                    

                    if( this.velocidad > 8){

                        if (!this.rapido){

                            this.entity.spine.state.setAnimationByName(0, "girar", true);
                            this.rapido =true;
                        }


                    }
                    else 
                        {
                            if (this.rapido){
                                this.entity.spine.state.setAnimationByName(0, "idle", true);
                                this.rapido = false;
                            }
                        }
                    }
            else
                {
                    
                    
                }
            
            
        }
    };

    return Scene04_pj8_chicos;
});