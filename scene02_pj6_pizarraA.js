pc.script.create('scene02_pj6_pizarraA', function (app) {
    // Creates a new Scene02_pj6_pizarraA instance
    var Scene02_pj6_pizarraA = function (entity) {
        this.entity = entity;
    };

    Scene02_pj6_pizarraA.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.sombra=app.root.findByName("scene02_sombraC1");
            this.sombra2=app.root.findByName("scene02_sombraC2");
            this.mov1=app.root.findByName("scene02_pj6_A");
            this.mov2=app.root.findByName("scene02_pj6_B");
            this.som1=app.root.findByName("scene02_sombraA1");
            this.som2=app.root.findByName("scene02_sombraB1");
            this.posicionPizarraB=app.root.findByName("scene02_pj6_pizarra_B").getLocalPosition().clone();
            app.root.findByName("scene02_pj6_pizarra_B").setLocalPosition(2000,100,200);
            this.skeleton = this.entity.spine.skeleton;
            this.fadeOUT = false;
            this.entity.spine.state.setAnimationByName(0, "idle", true);
            this.entity.spine.spine.priority = 1;
            
            jQuery(document).on("idea",function(event){
            
                this.entity.spine.state.setAnimationByName(0, "idea", false);
                
                setTimeout(function(){
                                        
                    this.entity.setLocalPosition(2000,100,200);
                    this.sombra.destroy();
                    this.mov1.enabled=true;
                    
                        
                        this.mov1.enabled=true;
                        this.mov2.enabled=false;
                        this.som1.enabled=true;
                        this.som2.enabled=false;
                    
                    setTimeout(function(){
                        
                            this.mov1.enabled=false;
                            this.mov2.enabled=true;
                            this.som1.enabled=false;
                            this.som2.enabled=true;
                            
                        }.bind(this),300);
                    
                    
                    setTimeout(function(){
                        this.mov1.destroy();
                        this.mov2.destroy();   
                        this.som1.destroy();
                        this.som2.destroy(); 
                    
                        jQuery(document).trigger("pizarraB",[this]);
                        app.root.findByName("scene02_pj6_pizarra_B").setLocalPosition(this.posicionPizarraB);
                        app.root.findByName("scene02_sombraC2").enabled=true;
                             
                        }.bind(this),600);
                    
                }.bind(this),4000);
                
                
            }.bind(this));
            console.log(this.skeleton);
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
            
            
        }
    };

    return Scene02_pj6_pizarraA;
});