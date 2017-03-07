pc.script.create('multiClick', function (app) {
    // Creates a new MultiClick instance
    var MultiClick = function (entity) {
        this.entity = entity;
    };

    MultiClick.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
            this.intervalo =1;
            this.timer = 0;
            this.entity.rigidbody.angularVelocity = pc.Vec3.ZERO;
            this.velocidadAngular = new pc.Vec3(Math.cos(Math.PI/3)*8,Math.sin(Math.PI/3)*8,0);
            //app.keyboard.on(pc.EVENT_KEYDOWN,this.onClick,this);
            
            jQuery(document).on("clickSatelite",function(event){
                
                this.onClick();
                
            }.bind(this));
            
        },
        
        onClick: function(event){
          
            var x = this.velocidadAngular.x;
            var y = this.velocidadAngular.y;
            var z = this.velocidadAngular.z;
                   
                 if ((this.intervalo <= 0.2) || (this.velocidadAngular.length() > 250)){
                     
                        jQuery(document).trigger("finEscena2",[this]);
                        //console.log("FIN!"+ this.velocidadAngular.length());
                        //
                        setTimeout(function(){
                            
                            jQuery(document).trigger("siguienteEscena");
                            
                        },2500);
                 }
                    else
                        {
                            
                        
                    x *= 1.1;
                    y *= 1.1;
                    z *= 1.1;
                    this.intervalo *= 0.95;
                    this.timer=0;
                    this.velocidadAngular = new pc.Vec3(x,y,z);
                    this.entity.rigidbody.angularVelocity = this.velocidadAngular;
                    }
               
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
            this.timer += dt;
            
            var x = this.velocidadAngular.x;
            var y = this.velocidadAngular.y;
            var z = this.velocidadAngular.z;
            
            if ((this.timer >= this.intervalo) && (this.intervalo >=0.25))
                {
                    //console.log("lento!");
                    //console.log(this.intervalo);
                    
                    this.timer = 0;
                    
                    
                       if(this.intervalo < 1){
                          this.intervalo *=1.05; 
                        x *= 0.9;
                        y *= 0.9;
                        z *= 0.9;
                        this.velocidadAngular = new pc.Vec3(x,y,z);
                        this.entity.rigidbody.angularVelocity = this.velocidadAngular;
                    }
                    
                    
                }
        }
    };

    return MultiClick;
});