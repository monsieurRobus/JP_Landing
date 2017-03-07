pc.script.create('scene01_pajaro', function (app) {
    // Creates a new Scene01_pajaro instance
    var Scene01_pajaro = function (entity) {
        this.entity = entity;
    };

    Scene01_pajaro.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
            
            
            this.entity.spine.state.setAnimationByName(0, "idle", true);
            this.entity.spine.spine.priority = 1;
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Scene01_pajaro;
});