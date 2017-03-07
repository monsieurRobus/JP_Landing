pc.script.create('scene02_wifiController', function (app) {
    // Creates a new Scene02_wifiController instance
    var Scene02_wifiController = function (entity) {
        this.entity = entity;
    };

    Scene02_wifiController.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
            this.wifi1 = app.root.findByName("scene02_wifi01");
            this.wifi2 = app.root.findByName("scene02_wifi02");
            this.wifi3 = app.root.findByName("scene02_wifi03");
            this.wifi1.enabled = false;
            this.wifi2.enabled = false;
            this.wifi3.enabled = false;
            
            this.subir=true;
            this.time = 0;
            
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
            this.time += dt;
            
            
            if (this.time > 0.25){
                
                if (this.subir)
                    {
                        
                        if (this.wifi1.enabled && this.wifi2.enabled && !this.wifi3.enabled)
                        this.wifi3.enabled=true;
                        if (this.wifi1.enabled && !this.wifi2.enabled && !this.wifi3.enabled)
                        this.wifi2.enabled=true;                        
                        if (!this.wifi1.enabled && !this.wifi2.enabled && !this.wifi3.enabled)
                        this.wifi1.enabled=true;
                        
                        
                    }
                
                else {
                         if (!this.wifi1.enabled && !this.wifi2.enabled && this.wifi3.enabled)
                        this.wifi3.enabled=false;
                        if (!this.wifi1.enabled && this.wifi2.enabled && this.wifi3.enabled)
                        this.wifi2.enabled=false;                       
                        if (this.wifi1.enabled && this.wifi2.enabled && this.wifi3.enabled)
                        this.wifi1.enabled=false;
                        
                    
                }
                
               
            // RESETEA EL CONTADOR
            this.time=0;
            }   
            
            if (this.wifi1.enabled && this.wifi2.enabled && this.wifi3.enabled)
                this.subir=false;
            
            if (!this.wifi1.enabled && !this.wifi2.enabled && !this.wifi3.enabled)
                this.subir=true;
            
            //console.log(this.wifi1.enabled);
            //console.log(this.wifi2.enabled);
            //console.log(this.wifi3.enabled);
            }
        };

    return Scene02_wifiController;
});