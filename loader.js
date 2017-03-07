
pc.script.create('loader', function (app) {
    // Creates a new Loader instance
    var Loader = function (entity) {
        this.entity = entity;
    };
   
    //IMPORTANTE PARA EL UNLOAD
    //Variable global para el control de los borrados de material
    var unload = false;
    
    //Contiene la id de la escena que se encuentra cargada.
    var idescena;
   
    //IMPORTANTE PARA EL UNLOAD
    //Contiene el numero de escenas total que tiene el mundo
    var nEscenas;
    
    // VARIABLES DE CARLOS  
    
    var unavezEscena2 = true;
    
    var unavezEscena3 = false;
    
    var unavezEscena4 = false;
    
    var unavezEscena5 = false;
    
    Loader.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
                
            console.log("Cargando la escena 1º");
            app.loadSceneHierarchy("449478.json"); 
            
            this.escenaActual = 0;
            
            
            idescena = 449478;
   
            ///IMPORTANTE PARA EL UNLOAD
            // El numero de escenas, si se le pasaran al loader, como una cadena de string
            // solo hay que inicializarla con un .length a ese array
            nEscenas = 5;
            
            jQuery(document).on("siguienteEscena",function(event){                
                
                this.siguiente();
                
            }.bind(this));
            

            
        },
        
        siguiente: function() {
          
            var aux = 0;
            switch(this.escenaActual){
                    
                case 0:
                    aux = 1;
                    
                    console.log("Cargando escena 2");
                    app.loadSceneHierarchy("449477.json");

                    idescena = 449477;
                    unavezEscena2 = false;
                    unavezEscena3 = true;
                    this.escenaActual = 1;
                    jQuery(document).find("#UI").remove();
                    
                    // Posicionado inicial de la camara
                    jQuery(document).trigger("posicionado",new pc.Vec3(-0.5,-2.594,3.19));
                    jQuery(document).trigger("posicionadoCAM",new pc.Vec3(0,7.218,66.21));
                    jQuery(document).trigger("fovCAM",11);
                    
                    
                   
                    
                    break;
                    
                case 1:
                    
                    aux = 2;
                    
                    console.log("Cargando escena 3");
                    app.loadSceneHierarchy("449476.json");

                    idescena = 449476;
                    unavezEscena3 = false;
                    unavezEscena4 = true;
                    this.escenaActual = 2;                    
                    jQuery(document).find("#UI").remove();
                    
                    
                    // Posicionado inicial de la camara
                    jQuery(document).trigger("posicionado",new pc.Vec3(0,0,0));
                    jQuery(document).trigger("posicionadoCAM",new pc.Vec3(0,7.218,79.486));
                    jQuery(document).trigger("fovCAM",9);
                    
                    
                    break;
                    
                case 2:
                    
                    aux = 3;
                    
                    console.log("Cargando escena 4");
                    app.loadSceneHierarchy("449479.json");

                    idescena = 449479;
                    unavezEscena4 = false;
                    this.escenaActual = 3;
                    jQuery(document).find("#UI").remove();
                    
                    // Posicionado inicial de la camara
                    jQuery(document).trigger("posicionado",new pc.Vec3(0,0,9));
                    jQuery(document).trigger("posicionadoCAM",new pc.Vec3(0,25,0));
                    //jQuery(document).trigger("posicionadoPJ8",new pc.Vec3(-100,0,0));                    
                    app.root.findByName("scene04_musica").sound.slot("FINAL").play();
                    jQuery(document).trigger("fovCAM",16);
                     break;
                    
                case 3:
                    
                    console.log("cargando escena final");
                     app.root.findByName("scene04_pj8").destroy();
                    app.loadSceneHierarchy("453295.json");
                    
                    idescena = 453295;
                    unavezEscena5 = false;
                    this.escenaActual = 4;
                   
                    jQuery(document).find("#UI").remove();
                    
                                      
                    break;
                    
                    
                default: console.log("que escena?");       
                    
                   
                    
                    
            }
            
            this.entity.script.Unload.changedEntrar(this.entidad); 
            this.escenaActual = aux;
            
        },
   
        
        //IMPORTANTE PARA EL UNLOAD
        getUnload: function () {
            
            return unload;
            
        },          
        
        //IMPORTANTE PARA EL UNLOAD
        getNumEscenas: function(){
          
            return nEscenas;
            
        },       
        
        
        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
            
                

            if (app.keyboard.wasPressed(pc.KEY_SPACE)) {
              //jQuery(document).on("siguienteEscena",function(event){   
                console.log("cambiando de escena");
                
                
                
                
                
                
                //IMPORTANTE PARA EL UNLOAD
                //Se consigue el objeto para el UnloadVRAM          
                //Se cambia el control para comenzar el borrado       
                this.entity.script.Unload.changedEntrar(this.entidad);
 

                
                   
                
                  if(unavezEscena4)
                {
                     console.log("Cargando escena 3");
                    app.loadSceneHierarchy("449479.json");

                    idescena = 449479;
                    unavezEscena4 = false;
                    this.escenaActual = 3;
                    jQuery(document).find("#UI").remove();
                    
                }
                
                if(unavezEscena3)
                {
                    console.log("Cargando escena 3");
                    app.loadSceneHierarchy("449476.json");

                    idescena = 449476;
                    unavezEscena3 = false;
                    unavezEscena4 = true;
                    this.escenaActual = 2;
                    jQuery(document).find("#UI").remove();
                    
                }                
                

                if(unavezEscena2)
                {
                    console.log("Cargando escena 2");
                    app.loadSceneHierarchy("449477.json");

                    idescena = 449477;
                    unavezEscena2 = false;
                    unavezEscena3 = true;
                    this.escenaActual = 1;
                    jQuery(document).find("#UI").remove();
                    

                    
                }
                
              
            }
            
        },
        
                
        
        //Innecesario
        getIdescena: function () {
            
            return idescena;
            
        }  
        
        
    };

    return Loader;
});