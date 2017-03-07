pc.script.create('scene01_chicaSpine', function (app) {
    // Creates a new Spineboy instance
    var Scene01_chicaSpine = function (entity) {
        this.entity = entity;
    };

    Scene01_chicaSpine.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
            this.skeleton = this.entity.spine.skeleton;
            
            this.entity.spine.state.setAnimationByName(0, "idle", true);
           
            this.entity.spine.spine.priority = 1;
            
            this.brazo = this.skeleton.findBone("pj1_brazo_izq_A");
            console.log(this.brazo.rotation);
           
            this.cancion = 0;
            this.contador =0;
            this.posicionPuntero = 0;
            
             
            
              jQuery(document).on("movimientoDrag",function(event,puntero,posicion){
                this.posicionPuntero=posicion;
                  this.brazo.rotation = 30;
                  //this.skeleton.updateWorldTransform();
                  
                 
                  
            }.bind(this));
            
            
            
             jQuery(document).on("pressUp",function(event){
                 
                                   
                 this.siguienteCancion();
                     
              
             }.bind(this));
            
            jQuery(document).on("estadoInicial",function(event){
                
                if (this.cancion <3){
                  //this.entity.spine.state.addAnimationByName(0, "idle", true,1);
                  }
                
                }.bind(this)); 
            
            
        },
        
        
   
        siguienteCancion: function(){
            
            this.entity.sound.stop();
            
            this.entity.spine.state.setAnimationByName(0,"sonreir",false);
             this.skeleton.setToSetupPose(); 
            switch(this.cancion){
                    
                case 0:
                    
                    setTimeout(function(){
                        
                        this.entity.sound.slot("MP3").play();           
                           
                        
                        setTimeout(function(){
                            this.entity.sound.slot("BeachBoys").play();                        
                         this.skeleton.setToSetupPose();   
                                this.entity.spine.state.addAnimationByName(0,"bailar",true,1);
                                this.skeleton.setToSetupPose();
                            }.bind(this),1000);
                        
                    }.bind(this),500);
                    
                    break;
                case 1:
                                               
                    
                    setTimeout(function(){
                        
                        
                        this.entity.sound.slot("MP3").play();
                              
                        
                        setTimeout(function(){
                            this.entity.sound.slot("LOBOS").play();
                        
                                this.entity.spine.state.addAnimationByName(0,"bailar",true,1);
                                this.skeleton.setToSetupPose();
                            }.bind(this),1000);
                        
                    }.bind(this),500);
                    
                    break;
                case 2:
                    
                    setTimeout(function(){
                        
                                               
                        this.entity.sound.slot("MP3").play();
                          
                        
                        setTimeout(function(){
                            this.entity.sound.slot("CHOPIN").play(); 
                                this.entity.spine.state.addAnimationByName(0,"bailar",true,1);
                                this.skeleton.setToSetupPose();
                            }.bind(this),1000);
                        
                    }.bind(this),500);
                    
                    setTimeout(function(){
                        
                        jQuery(document).trigger("final",[this]);
                        
                    }.bind(this),7000);
                    break;
                    
                   
                    
            }
            
            
             this.cancion +=1;
            
                    
        },
        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
            
           // console.log(this.brazo.rotation);
          
        }
    };

    return Scene01_chicaSpine;
});