pc.script.create('scene02_sequenceSalas', function (app) {
    // Creates a new Scene02_sequenceSalas instance
    var Scene02_sequenceSalas = function (entity) {
        this.entity = entity;
    };

    Scene02_sequenceSalas.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
            this.salas = {
                primera: 0,
                segunda: 1,
                tercera: 2,
                punto1: 3,
                punto2: 4,
                punto3: 5,
                punto4: 6,
                punto5: 7,
                punto6: 8,
                cuarta: 9,
                quinta: 10,
                sexta: 11
                            
            };
            
            this.activaGiroCamara = app.root.findByName("Camara").script.base_giroCamara.activaGiro;
            
            this.sala = this.salas.primera;
            this.destino = this.salas.primera;
            this.timer = 0;
            this.situar = pc.Vec3.ZERO;
            //this.posicionF = app.root.findByName("referencia_giro_camara_01)").getPosition();
            
            jQuery(document).on("siguiente",function(event){
                
                this.siguienteSala();
                
            }.bind(this));
               
            //app.keyboard.on(pc.EVENT_KEYDOWN,this.siguienteSala,this);
            
        },

        siguienteSala: function(){
            
            
            
            switch(this.destino)
                {
                    case 0: 
                            
                            this.destino = this.salas.segunda;
                            this.posicionF = app.root.findByName("referencia_giro_camara_02").getPosition();
                        
                        break;
                    case 1:
                            
                            this.destino = this.salas.tercera;
                            this.posicionF = app.root.findByName("referencia_giro_camara_03").getPosition();
                            
                            
                        
                        break;
                    case 2: 
                        
                            this.destino = this.salas.punto1;
                            this.posicionF = app.root.findByName("referencia_giro_camara_03").getPosition();
                            this.posicionF.add(new pc.Vec3(0,19.701,0));
                         
                           
                        
                        break;
                    case 3:
                        this.destino = this.salas.punto2;
                        this.posicionF = app.root.findByName("referencia_giro_camara_03").getPosition();
                        this.posicionF.add(new pc.Vec3(21.104,20.529,0));
                        break;
                    case 4:
                        this.destino = this.salas.punto3;
                        this.posicionF = app.root.findByName("referencia_giro_camara_03").getPosition();
                        this.posicionF.add(new pc.Vec3(21.104,32.454,0));
                        break;
                    case 5:
                        this.destino = this.salas.punto4;
                        this.posicionF = app.root.findByName("referencia_giro_camara_03").getPosition();
                        this.posicionF.add(new pc.Vec3(43.939,32.454,0));
                        break;
                    case 6:
                        this.destino = this.salas.punto5;
                        this.posicionF = app.root.findByName("referencia_giro_camara_03").getPosition();
                        this.posicionF.add(new pc.Vec3(43.939,50.532,0));
                        break;
                    case 7: 
                        this.destino = this.salas.punto6;
                        this.posicionF = app.root.findByName("referencia_giro_camara_03").getPosition();
                        this.posicionF.add(new pc.Vec3(34.451,50.532,0));
                        break;
                    case 8: 
                        this.destino = this.salas.cuarta;
                        this.posicionF = app.root.findByName("referencia_giro_camara_03").getPosition();
                        this.posicionF.add(new pc.Vec3(34.451,59.411,0));
                        break;
                    case 9: 
                        this.destino = this.salas.quinta;    
                        this.posicionF = app.root.findByName("referencia_giro_camara_04").getPosition();
                        this.posicionF.add(new pc.Vec3(0.3,-0.6,0));                        
                }
            
            this.origen = this.camara.getPosition();
            this.desplazamiento = this.posicionF.clone();
            this.desplazamiento.sub(this.camara.getPosition());
            this.desplazamiento.scale(1/(7*this.desplazamiento.length()));
            
        },
        
        moverSala: function(){
            
            // SI LAS SALAS SON DESIGUALES, EJECUTA ESTA FUNCiÓN QUE LLEVA LA CAMARA DE UNA PARTE A LA OTRA
            
        },
        
        
        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
            this.camara= app.root.findByName("referenciaCamara");
            
            /*
            if(this.camara.getPosition().x >=65){
                
                jQuery(document).trigger("fov1",[this]);
            }
            
            if(this.camara.getPosition().x>=135){
                
                jQuery(document).trigger("fov2",[this]);
                
            }
            */
            
            // COMPROBAR QUE LA SALA ORIGEN Y DESTINO ES DESIGUAL
            // 
            //
            //console.log(this.sala);
            var escalar = 1;
            
            
            
            
            if ((this.sala !=this.destino)){
               
                //this.camara.setPosition(this.camara.getPosition().add(this.camara.getPosition()));
                //this.sala = this.destino;
                //
                
                
                if (this.sala < 2){
                
                    if(Math.abs((this.posicionF.x-this.camara.getPosition().x))>0.1)
                        {
                            this.activaGiroCamara = false;
                            
                            
                            
                            
                            if(Math.abs((this.posicionF.x-this.camara.getPosition().x)<6))
                                escalar = 0.97;
                            
                            if(Math.abs((this.posicionF.x-this.camara.getPosition().x)>21))
                                escalar = 1.05;
                        
                        this.camara.translate((this.desplazamiento.scale(escalar)));
                        console.log(this.desplazamiento);                           
                            
                        }
                    
                         else {
                             
                                this.camara.setPosition(this.posicionF); 
                                 //alert(this.camara.getPosition(),this.posicionF);
                                this.sala = this.destino; 
                                
                                 if(this.sala == 1){

                                        jQuery(document).trigger("sala2",[this]);
                                    }

                                    if (this.sala == 2){

                                        jQuery(document).trigger("sala3",[this]);

                                    }
                             
                                     
                                             
                                
                            }
                    
                        }
                
                
                else{
               
                    
                    var euclidea = new pc.Vec3(this.posicionF.x-this.camara.getPosition().x,this.posicionF.y-this.camara.getPosition().y,this.posicionF.z-this.camara.getPosition().z).length();
                   
                    if(euclidea>0.1){
                        this.camara.translate(this.desplazamiento);
                        //console.log(euclidea);
                        
                        }
                    else {
                        //alert("destino");
                        this.sala = this.destino;
                        //this.camara.setPosition(this.posicionF);
                        this.siguienteSala();
                        
                        if (this.sala == 9){
                            
                            jQuery(document).trigger("readyForClick",[this]);
                            
                        }
                        
                        if (this.sala == 10){

                              jQuery(document).trigger("sala4",[this]);
                        }
                        
                    }
                        }
                
                    // Activacion ANIMATE CC
                    
                    
                    
                
                    
                
               }
            
        }
    };

    return Scene02_sequenceSalas;
});