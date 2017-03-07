pc.script.create('UnloadVRAM', function (app) {
    // Creates a new UnloadVRAM instance
    var UnloadVRAM = function (entity) {
        this.entity = entity;
    };

    UnloadVRAM.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {  
        },

                
        //Este es el metodo que se encarga del borrado de los assets     
        BorradoVRAM: function(entidad)
        {    
          
            
            // Solo se pasa a realizar el borrado si la entidad existe
            if(entidad !== null)
            {   
                if (typeof entidad.model !== "undefined"){
             
                //console.log(entidad); 
                // Se coge el material de la entidad seleccionada
                var material =  entidad.model.model.meshInstances[0].material; //entidad.model.meshInstances[0].material;
                
                //Si la textura existe para ese material
                if(typeof material.diffuseMap === "undefined") 
                {
                }
                else
                    {
                            // Se toma la textura del asset material seleccionado
                            var diffuse =  material.diffuseMap; 

                            //Y si esta textura existe
                            if(diffuse !== null)
                            {                      
                                //Se limpia su contenido, poniendo su diffuseMap a null
                                material.diffuseMap = null;  

                                //Se actualiza su estado para que se recarguen los elementos que tenian asociados esta material
                                material.update();          

                                // Se selecciona el asset que tiene asociada la textura para poder eliminarla
                                var asset = app.assets.find( diffuse.name, "texture");

                                //////////////////////////////////////////////////////////////////////////////
                                // ESTA ES LA LINEA QUE DESTRUYE LA TEXTURA DEL VRAM
                                diffuse.destroy(); 
                                //
                                /////////////////////////////////////////////////////////////////////////////

                                // Toma la direccion url de donde se encuentra la textura
                                var url = asset.file.url + "?t=" + asset.hash; 

                                // La limpia de la cache 
                                app.loader.clearCache(url, "texture"); 

                                // Y la resetea de la cache
                                asset.unload();                    
                            }
                        }
                    }
                }
                
        },
        
        
        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        
        }
    };

    return UnloadVRAM;
});