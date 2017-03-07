pc.script.create('scene03_pj7_chica', function (app) {
    // Creates a new Scene03_pj7_chica instance
    var Scene03_pj7_chica = function (entity) {
        this.entity = entity;
    };

    Scene03_pj7_chica.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
            this.skeleton = this.entity.spine.skeleton;
            
            this.entity.spine.state.setAnimationByName(0, "idle", true);
            this.entity.spine.spine.priority = 1;
            this.fade=false;
            this.cancion = 0;
            this.INDIA = this.entity.sound.slot("INDIA");
            this.AFRICA = this.entity.sound.slot("AFRICA");
            this.INDONESIA = this.entity.sound.slot("INDONESIA");
            
            jQuery(document).on("pressUp2",function(event){
                 
                
                this.entity.spine.state.setAnimationByName(0, "mover_mundo", false);
               this.entity.spine.state.addAnimationByName(0, "idle", true,2);
                
                
                setTimeout(function(){
                    
                    this.entity.sound.slot("GLOBOMUNDO").play();
                    jQuery(document).trigger("GIRAMUNDO",[this]);
                    this.siguienteCancion();
                    
                }.bind(this),500);
                 
                     
              
             }.bind(this));
            
            jQuery(document).on("estadoInicial2",function(event){
                
                this.entity.spine.state.setAnimationByName(0, "idle", true);
                
            }.bind(this));
            
        },
        
        siguienteCancion: function(){
            
            
            
            //this.entity.sound.slot("MP3").play();
            
            switch(this.cancion){
                    
                case 0:
                    
                    setTimeout(function(){
                    
                    this.AFRICA.play();
                    this.fadeIn = this.AFRICA;         
                    this.fadeOut = this.INDIA;
                        
                        this.fade= true;
                        
                    }.bind(this),500);
                    
                    break;
                case 1:
                                               
                    
                    setTimeout(function(){
                        
                    this.INDIA.play();
                    this.fadeIn = this.INDIA;         
                    this.fadeOut = this.AFRICA;
                        
                        this.fade= true;
                        
                        
                      
                        
                    }.bind(this),500);
                    
                    break;
                case 2:
                    
                    this.INDONESIA.play();
                    this.fadeIn = this.INDONESIA;         
                    this.fadeOut = this.INDIA;
                        
                   
                    
                    setTimeout(function(){
                        
                       
                         
                        
                    }.bind(this),500);
                    
                    setTimeout(function(){
                        
                        jQuery(document).trigger("final2",[this]);
                        
                    }.bind(this),7000);
                    
                    setTimeout(function(){
                        
                        jQuery(document).trigger("siguienteEscena");
                        
                    }.bind(this),9000);
                    break;
                    
            }
            
             this.cancion +=1;
            
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
            if((this.fade)){
                
                this.fadeIn.volume += dt/4;
                this.fadeOut.volume -= dt/4;
                
                if(this.fadeIn > 0.4)
                    {
                        this.fade = false;
                    }
                
            }
            
            
        }
    };

    return Scene03_pj7_chica;
});