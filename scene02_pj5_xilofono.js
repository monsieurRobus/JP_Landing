pc.script.create('scene02_pj5_xilofono', function (app) {
    // Creates a new Scene02_pj5_xilofono instance
    var Scene02_pj5_xilofono = function (entity) {
        this.entity = entity;
    };

    Scene02_pj5_xilofono.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
            this.skeleton = this.entity.spine.skeleton;
            
            this.entity.spine.state.setAnimationByName(0, "idle", true);
            this.entity.spine.spine.priority = 1;
            this.niniotoca = false;
            this.contador = 0;
            
            jQuery(document).on("tocar",function(){
                
                    this.contador +=1;
                
                    if(this.contador < 6){
                
                  this.entity.spine.state.setAnimationByName(0, "tocar", false,1);
                  this.skeleton.setToSetupPose();
                        setTimeout(function(){
                            
                            this.entity.sound.slot("NOTAS").play();
                            
                        }.bind(this),100);
                  
                 this.entity.spine.state.addAnimationByName(0, "idle", true,2.7);
                }
                else
                    {
                       this.entity.spine.state.setAnimationByName(0, "tocar", true); 
                       this.skeleton.setToSetupPose();
                        setTimeout(function(){
                            
                            this.entity.sound.slot("NOTAS").play();
                            
                        }.bind(this),200);
                        
                        setTimeout(function(){
                            
                            this.entity.sound.slot("NOTAS").play();
                            
                        }.bind(this),2000);
                        
                        setTimeout(function(){
                            
                             this.entity.sound.slot("NOTAS").play();
                            
                        }.bind(this),3800);
                        
                        
                    }
                  
                
            }.bind(this));
            
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
            this.camara = app.root.findByName("Camara");
            this.palmadas = app.root.findByName("scene02_pj4_palmadas");
           // console.log((this.camara.getPosition().x - this.entity.getPosition().x));
                        
            
            // CONTROL DEL VOLUMEN DEL XILOFONO
            if((((this.camara.getPosition().x - this.palmadas.getPosition().x )> 15 ) && ((this.camara.getPosition().x - this.entity.getPosition().x) < 15) && (this.camara.getPosition().x - this.palmadas.getPosition().x) < 70) ) {
               //console.log("dentro");
               if( (this.entity.sound.slot("MILIQUIREV").volume < 0.7) && (this.entity.sound.slot("NOTAS").volume < 0.7)){
                   
                        this.entity.sound.slot("MILIQUIREV").volume += dt/2; 
                        this.entity.sound.slot("NOTAS").volume += dt/2; 
                   
                   }
            }
            
             if(((this.camara.getPosition().x - this.entity.getPosition().x) > 15)  ){
                 //console.log("ahora");
                this.entity.sound.slot("MILIQUIREV").volume -= dt/2;
                this.entity.sound.slot("NOTAS").volume -= dt/2;
                
            }
            
           // if(((this.camara.getPosition().x - this.entity.getPosition().x) > 15) && (this.entity.sound.slot("NINIO").volume >0) ){
                 //console.log("ahora");
                //this.entity.sound.slot("NINIO").volume -= dt*1.5;
                
            //}
             
             //if ((((this.camara.getPosition().x - this.palmadas.getPosition().x )> 15 ) && ((this.camara.getPosition().x - this.entity.getPosition().x) < 15) && (this.camara.getPosition().x - this.palmadas.getPosition().x) < 70) && (this.entity.sound.slot("NINIO").volume < 0.4) && (this.niniotoca)){
                 
                 //this.entity.sound.slot("NINIO").volume += 10*dt;
                 
             //}   
              
            
        }
    };

    return Scene02_pj5_xilofono;
});