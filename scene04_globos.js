pc.script.create('scene04_globos', function (app) {
    // Creates a new Scene04_globos instance
    var Scene04_globos = function (entity) {
        this.entity = entity;
    };

    Scene04_globos.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
            this.entity.translate(0,0.6*dt,0);
            
            this.entity.getChildren()[0].translate(-0.1*dt,0.1*dt,0);
            this.entity.getChildren()[1].translate(0,0.02*dt,0);
            this.entity.getChildren()[2].translate(0.2*dt,0,0);
            
            
        }
    };

    return Scene04_globos;
});