pc.script.create('scene04_giroNubes', function (app) {
    // Creates a new Scene04_giroNubes instance
    var Scene04_giroNubes = function (entity) {
        this.entity = entity;
    };

    Scene04_giroNubes.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
                this.velocidad=pc.math.random(0,0.6);
               
        },
        
        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
                this.entity.rotate(0,this.velocidad*dt,0);
                    
        }
    };

    return Scene04_giroNubes;
});