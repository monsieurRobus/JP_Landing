pc.script.create('scene04_loadPJ', function (app) {
    // Creates a new Scene04_loadPJ instance
    var Scene04_loadPJ = function (entity) {
        this.entity = entity;
    };

    Scene04_loadPJ.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
                      
            
            this.camara = app.root.findByName("Camara");
            this.camara.script.base_giroCamara.activaGiro=false;
            //this.referencia.setPosition(0,32,70);
            //alert(this.pj.getPosition());
            
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return Scene04_loadPJ;
});