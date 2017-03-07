pc.script.create('scene03_gestorFade', function (app) {
    // Creates a new Scene01_gestorFade instance
    var Scene03_gestorFade = function (entity) {
        this.entity = entity;
    };

    Scene03_gestorFade.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.contadorDrag = {
                inicio:0,
                primero:1,
                segundo:2,
                tercero:3
            };
            
            this.posicionDrag = this.contadorDrag.inicio;
            
           jQuery(document).on("GIRAMUNDO",function(event){
                 
                // Arreglar, repite el evento varias veces: ¿algo que ver con evento touch + evento mouse?
                this.activarSecuencia();
                  
            }.bind(this));
            
        },
        
        activarSecuencia: function(){
          
            switch (this.posicionDrag){
                    
                case 0:
                    
                    this.entity.getChildren()[0].script.scene01_imageFade.fadeEstado(0);
                    
                    this.posicionDrag = this.contadorDrag.primero;
                    break;
                
                case 1:
                    
                    this.entity.getChildren()[0].script.scene01_imageFade.fadeEstado(1);
                    this.entity.getChildren()[1].script.scene01_imageFade.fadeEstado(0);
                    
                    this.posicionDrag = this.contadorDrag.segundo;
                    break;
           
                case 2:
                    this.entity.getChildren()[1].script.scene01_imageFade.fadeEstado(1);
                    this.entity.getChildren()[2].script.scene01_imageFade.fadeEstado(0);
                    
                    this.posicionDrag = this.contadorDrag.tercero;
                    break;
        
                default:
            }
            
        },
        
      
            
        

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            //console.log(this.posicionDrag);
        }
    };

    return Scene03_gestorFade;
});