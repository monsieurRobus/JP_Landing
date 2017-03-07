pc.script.create('scene04_multiClick', function (app) {
    // Creates a new MultiClick instance
    var Scene04_multiClick = function (entity) {
        this.entity = entity;
    };

    Scene04_multiClick.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
            this.intervalo =1;
            this.timer = 0;
            this.final=false;
            this.giro = false;
            this.velocidad=0;
            //this.entity.rigidbody.angularVelocity = pc.Vec3.ZERO;
            //this.velocidadAngular = new pc.Vec3(0,20,0);
            //app.keyboard.on(pc.EVENT_KEYDOWN,this.onClick,this);
            
            jQuery(document).on("giraNino",function(event){
                
                this.onClick();
                
         
                
            }.bind(this));
            
        },
        
        onClick: function(event){
          
         this.velocidad +=8;
            
            jQuery(document).trigger("velocidad",[this,this.velocidad]);
            
            if((!this.final) && (this.velocidad>35)){
                
                jQuery(document).trigger("final",[this]);
                
                if (this.velocidad > 10){
                    this.giro = true;
                }
                else {
                    this.giro = false;
                }
                this.final=true;
                
                setTimeout(function(){
                   
                    jQuery(document).trigger("siguienteEscena",[this]);
                    
                },5000);
            }
               
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
      
            var lento=false;
            
               this.entity.rotate(0,this.velocidad*dt,0);
            
            
            if(this.velocidad>30){
                
               
                //console.log("YEEEEEH");
            }
                else{
                    
                                        
                    this.velocidad*=0.97;
                    //console.log(this.velocidad);
                    
                }
                

            
        }
    };

    return Scene04_multiClick;
});