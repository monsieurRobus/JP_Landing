pc.script.create('scene02_pj6_pizarraB', function (app) {
    // Creates a new Scene02_pj6_pizarraB instance
    var Scene02_pj6_pizarraB = function (entity) {
        this.entity = entity;
    };

    Scene02_pj6_pizarraB.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
            this.skeleton = this.entity.spine.skeleton;
            
            this.entity.spine.state.setAnimationByName(0, "idle", true);
            this.entity.spine.spine.priority = 1;
            this.ref = app.root.findByName("referenciaCamara");
            this.cam = app.root.findByName("Camara");
            
            jQuery(document).on("pizarraOn",function(event){
                
                this.cam.script.base_giroCamara.activaGiro=false;
                this.ref.setEulerAngles(this.ref.getEulerAngles().x,0,this.ref.getEulerAngles().z);
                
                this.entity.spine.state.setAnimationByName(0, "escribir", true);
                
            }.bind(this));
           
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Scene02_pj6_pizarraB;
});