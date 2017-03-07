pc.script.create('scene03_giraMundoGira', function (app) {
    // Creates a new Scene03_giraMundoGira instance
    var Scene03_giraMundoGira = function (entity) {
        this.entity = entity;
    };

    Scene03_giraMundoGira.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
            jQuery(document).on("GIRAMUNDO",function(event){
                
                this.girar();
                
            }.bind(this));
            
            
        },
        
        girar: function(){
          
            
          this.entity.rigidbody.angularVelocity= new pc.Vec3(-25,-50,0);  
            
            setTimeout(function(){
                
                 this.entity.rigidbody.angularVelocity= new pc.Vec3(500,1000,0);
                
            }.bind(this),250);
         
            
            
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
            this.entity.rigidbody.angularVelocity.scale(0.97);
            
        }
    };

    return Scene03_giraMundoGira;
});