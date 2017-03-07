pc.script.attribute('curva','curve',null,{
    displayName: 'Curva de Giro'
});
pc.script.attribute('curvaMovilX','curve',null,{
    displayName: 'Curva de Giro movil X'
});
pc.script.attribute('curvaMovilY','curve',null,{
    displayName: 'Curva de Giro movil Y'
});
pc.script.attribute('activaGiro','boolean',null,{
    displayName: 'Activar/Desactivar giro'
});




pc.script.create('base_giroCamara', function (app) {
    var alpha = 0;
    var beta = 0;
    var gamma = 0;
    
    window.addEventListener("deviceorientation", function (event) {
        alpha = event.alpha;
        beta = event.beta;
        gamma = event.gamma;
    }, true);
    
    
    // Creates a new GiroCamara instance
    var Base_giroCamara = function (entity) {
        this.entity = entity;
    };

    Base_giroCamara.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
            this.referencia = this.entity.getParent();            
            this.desde = new pc.Vec3(0,0,0);
            this.hacia = new pc.Vec3(0,0,0);
            this.ratioGiroX = 0.5;
            this.ratioGiroY = 0.5;
            this.camara = app.root.findByName("Camara");
            this.sala3 = true;
            this.sala4 = true;
            this.salaEspacio = true;
            
            
            // Detección del sistema operativo
            this.isMobile=false;
            this.OSName='';
            
            if (navigator.appVersion.indexOf("Win")!=-1) this.OSName="Windows";
            if (navigator.appVersion.indexOf("Mac")!=-1) this.OSName="MacOS";
            if (navigator.appVersion.indexOf("X11")!=-1) this.OSName="UNIX";
            if (navigator.appVersion.indexOf("Linux")!=-1) this.OSName="Linux";
            if (navigator.appVersion.indexOf("Android")!=-1) this.OSName="Android";
            
            /*
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            // is mobile..
            
                this.isMobile=true;
            }*/
            
            if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
                || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) this.isMobile = true;

            
            app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMoverRaton, this);
            //app.keyboard.on(pc.EVENT_KEYDOWN,this.mueveCamara,this);
            /*
            jQuery(document).on("fov1",function(event){
                
                this.camara.fov=9;
                this.activaGiro=false;
                this.entity.setEulerAngles(-5,0,0);
                
            }.bind(this));
            
            jQuery(document).on("fov2",function(event){
                
                this.camara.fov=10;
                
                
            }.bind(this));
        */  
            
            jQuery(document).on("posicionado",function(event,posicion1){
                
                this.posicionInicial = posicion1;
                this.referencia.setPosition(posicion1);                
            
                
            }.bind(this));
                                
                                
            jQuery(document).on("posicionadoCAM",function(event,posicion2){
                //this.referencia = app.root.findByName("referenciaCamara");
                //this.referencia.setPosition(posicion);
                this.posicionInicial = posicion2;
                this.entity.setLocalPosition(posicion2);
                
                //alert(posicion2);
                
            }.bind(this));
            
            jQuery(document).on("fovCAM",function(event,fov){
               
                this.entity.camera.fov=fov;
                //alert(fov);
                
            }.bind(this));
            
            jQuery(document).on("posicionadoPJ8",function(event,posicion3){
                
                app.root.findByName("scene04_pj8").setPosition(posicion3);
                
            }.bind(this));
        },
        
        onMoverRaton: function(e){
            
            this.desde = this.entity.camera.screenToWorld(e.x,e.y,78);
            
            
            
            this.ratioGiroX = ( e.x / app.graphicsDevice.width ); // relación entre ancho y posición del cursor en horizontal            
            this.ratioGiroY = ( e.y / app.graphicsDevice.height );
            
        },
        
        mueveCamara: function(event)
        {
          
            if (app.keyboard.wasPressed(pc.KEY_LEFT))
                {
                    this.referencia.setPosition(this.referencia.getPosition().x-0.1,this.referencia.getPosition().y,this.referencia.getPosition().z);
                }
            
            if (app.keyboard.wasPressed(pc.KEY_RIGHT))
                {
                 
                     this.referencia.setPosition(this.referencia.getPosition().x+0.1,this.referencia.getPosition().y,this.referencia.getPosition().z);   
                    
                }
            
            if (app.keyboard.wasPressed(pc.KEY_UP))
                {
                    
                    this.referencia.setPosition(this.referencia.getPosition().x,this.referencia.getPosition().y,this.referencia.getPosition().z-0.1);
                    
                }
            
            if (app.keyboard.wasPressed(pc.KEY_DOWN))
                {
                    
                    this.referencia.setPosition(this.referencia.getPosition().x,this.referencia.getPosition().y,this.referencia.getPosition().z+0.1);
                    
                }
            
            console.log(this.referencia.getPosition());
            
        },
        
        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
            
            
            
            
            
            //console.log(this.entity.getPosition()+' camara');
            
            if((this.sala3) && (this.entity.getPosition().x >= 38.5)){
                                
                this.entity.setEulerAngles(-3.4,this.entity.getEulerAngles().y,0);
                //this.referencia.setEulerAngles(-3.4,0,0);
                this.sala3 = false;
                
            }
            
            if((this.salaEspacio) && (this.entity.getPosition().x >=64)){
                
                
                this.entity.camera.fov=9;
                this.activaGiro=false;
                this.referencia.setEulerAngles(-5/10,this.referencia.getEulerAngles().y,0);
                this.entity.setEulerAngles(-5,this.entity.getEulerAngles().y,0);
                
                this.salaEspacio=false;
                
            }
            
            if((this.sala4) && (this.entity.getPosition().x >= 135)){
                
                this.activaGiro=true;                
                this.entity.camera.fov=10;
                //this.referencia.setEulerAngles(0,0,0);
                //this.entity.setEulerAngles(-5,0,0);
                this.sala4= false;
                
            }
            
            
            //console.log(this.curva.value(this.ratioGiroX));
            
            if(this.activaGiro){
                
                this.referencia.setEulerAngles(this.curva.value(this.ratioGiroY)/10,this.curva.value(this.ratioGiroX),0);


                // Si esta desde movil
               if (this.isMobile && window.DeviceOrientationEvent) {


                   switch(this.OSName){
                       case 'Android':

                           if (gamma<0) {gamma = gamma + 360;}
                           this.referencia.setEulerAngles(-5,this.curvaMovilX.value(gamma/360),0);


                           break;
                       case 'MacOS':
                               this.referencia.setEulerAngles(-5,this.curvaMovilX.value(alpha/360),0);
                           break;
                   }
               
               }
               
               
            }
        }
    };

    return Base_giroCamara;
});