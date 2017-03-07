pc.script.attribute('tiempoFade','number',1,{
    displayName: 'Tiempo Fade In/Out'
});



pc.script.create('scene01_imageFade', function (app) {
    // Creates a new Scene01_imageFade instance
    var Scene01_imageFade = function (entity) {
        this.entity = entity;
        this.estado = {
              
            fadeIN:0,
            fadeOUT:1,
            idle:2
            
        };
    };

    Scene01_imageFade.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
            this.opacidadDestino= 0;
            this.material = this.entity.model.model.meshInstances[0].material;
            this.material.opacity = 0;
            this.material.update();
            
            this.timer=0;
            
            this.fade = this.estado.idle;
           
            app.keyboard.on(pc.EVENT_KEYDOWN,this.fadeEstado,this);
            
            
        },
        
        fadeEstado: function(modo){
            
            var tipoFade = { 
                IN:0,
                OUT:1
            };
            
            if(modo == tipoFade.IN){
                
                this.opacidadDestino = 1;  
                this.fade = this.estado.fadeIN;
                
                
            }
            
            if(modo == tipoFade.OUT){
                
                this.opacidadDestino = 0;  
                this.fade = this.estado.fadeOUT;
                
                
            }
            
            if(app.keyboard.wasPressed(pc.KEY_DOWN) && this.opacidadDestino !=0){
                
                this.opacidadDestino = 0;  
                this.fade = this.estado.idle;
                
                
            }
            
        },
        
        

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
            switch (this.fade)
                {
                    case 0:
                        
                        this.timer += dt/this.tiempoFade;
                        
                        this.material.opacity += dt/this.tiempoFade;
                        
                        if (this.material.opacity >= this.opacidadDestino)
                            {
                                this.fade = this.estado.idle;
                            }
                        this.material.update();
                        break;
                        
                    case 1:
                        
                        this.timer += dt/this.tiempoFade;
                        
                        this.material.opacity -= dt/this.tiempoFade;
                        
                        if (this.material.opacity <= this.opacidadDestino)
                            {
                                this.fade = this.estado.idle;
                            }
                        
                        this.material.update();
                        break;
                        
                    case 2: 
                        this.timer=0;
                        break;
                }
            
            
            
        }
    };

    return Scene01_imageFade;
});