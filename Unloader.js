//Lista de elementos de escenografia
pc.script.attribute('ListaDeBorrado', 'string', 'Lista Borrado', {displayName: "Lista Borrado"});

//Atributo para indicar comportamiento del borrar
pc.script.attribute('Borrado', 'boolean', false, {displayName: "Borrado"});

// Create a script attribute to enable the drag and drop of a JSON asset containing character data
pc.script.attribute('BufferTexturas', 'asset', null, {type: 'json', max: 1});


pc.script.create('Unload', function (app) {
    // Creates a new Unload instance
    var Unload = function (entity) {
        this.entity = entity;
    }; 

    var entrar;
    var ListaObjetos;

    var abrir = false;
    var MostrarJson = true;
    
    var EscenasMundo;
    
    var Json_Unload;
    
    var Num_Escenas;
    
    //Objeto donde se almacena la informacion de una textura
    function ObjetoTextura(nombreTextura, apariciones){
        
        //nombreTextura contendrá el nombre de la textura que aparecio en una escena en concreto
        this.nombreTextura = nombreTextura;
        
        //apariciones contendra el numero de veces que aparece esta textura en el proyecto
        this.apariciones = apariciones;
    }    
    
    
    Unload.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
 
            ListaObjetos =  this.ListaDeBorrado.split(",");

            this.ListaTexturas = [];
            

            // Get JSON data from a project asset        
            this.jsonMapa = this.loadJsonFromAssetM(); 
            
            
            //Si el archivo JSON existe hay que leerlo
            if( typeof this.jsonMapa != "undefined" )
            {
                var MapaTexturas = [];
                //Se recorre el JSon
                for(i=0; i<this.jsonMapa.Texturas.length;i++)
                {
                    var nombre = this.jsonMapa.Texturas[i];

                    var textur = new ObjetoTextura(nombre, 0);
                    
                    MapaTexturas.splice(i,0,textur);
                     
                    this.ListaTexturas = MapaTexturas;
                }
                Json_Unload = true;
                    
            }
            else
            {  
                Json_Unload = false;
            }
        },

        //Metodo para cargar el asset del JSON 
        loadJsonFromAssetM: function () {
            
            if( typeof app.assets.get(this.BufferTexturas) !== "undefined" )
            {            
                var data = app.assets.get(this.BufferTexturas).resource;
                return data;
            }
            else
            {
                var dat;
                return dat;  
            }
        },        
        
        
        changedEntrar: function () {    
            
            entrar = !entrar;
      
        },
        
        Repetidas: function(BuTexturas){
          
            var nombres = [];

            for(i=0; i<BuTexturas.length; i++)
            {
                
                if(BuTexturas[i].apariciones > 1)
                {
                    nombres.push(BuTexturas[i].nombreTextura);   
                }  
            }
            
            return nombres;
            
        },
        
        //Este metodo devuelve true o false dependiendo de si hay que respetar la textura que tiene enlazado esta entidad
        RespetarTextura: function(entidad){
          
            //Predefinidamente se determinara que no se tiene que respetar la textura del objeto
            var resulta = false;
            
            //console.log("Metodo para el respeto de texturas");
            //console.log(entidad.model.model.meshInstances[0].material.diffuseMap.name);
            //Se recorre la lista de texturas y se busca una coincidencia
            for(i=0; i<this.ListaTexturas.length;i++)
            {
                var tipo = entidad.model; 
                 
                if(typeof tipo !== "undefined")
                {
                    if(this.ListaTexturas[i].nombreTextura == entidad.model.model.meshInstances[0].material.diffuseMap.name)
                    {
                        resulta = true;
                    }
                    
                }
                else
                {
                    //Se devuelve un true, en respetar si la entidad no contiene una textura, porque asi se capsula que
                    //el algoritmo no entre a buscar la textura de un elemento que no va a tener, por ejemplo un sonido
                    resulta = true;       
                }
            }
            
            return resulta;
        },
                
        
        
        
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        //             FUNCION PARA CALCULAR EL NUMERO DE VECES QUE APARECE CADA UNA DE LAS TEXTURAS EN TODAS LAS ESCENAS CARGADAS HASTA EL MOMENTO 
        //
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        CrearJSON: function (dt) {
            
                //Se resetea la lista de texturas para calcularla cada vez que se lanza esta función         
                this.ListaTexturas = [];
                
                //Donde se van a incluir los objetos que son borrables  
                var ListaObjetosBorrar = [];

                //En el metodo la lista de objetos no se utiliza porque se quiere contabilizar todos los que se cargan
                ListaObjetos = [];

                //////////////////////////////////////////////////////////////////////
                //Hay que coger todos los elementos que son borrables
                //
                //Se coge el objeto root que contiene todo el mundo
                var lista = app.root;

                //Se coge la lista de hijos que cuelgan de la app.root, que son las escenas
                var hijosL = lista.getChildren();
                    
                //Se recorre la lista de escenas cargadas
                for(i=1; i<hijosL.length; i++)
                {
                    //para cada escena 
                    var elementL = hijosL[i].getChildren();
                        
                    //Se recorren los elementos que cuelgan de esa escena
                    for(j=0; j<elementL.length; j++)
                    {
                        //Se comprueba para cada elemento si esta en la ListaObjetos para salvarlo
                        if( ListaObjetos.indexOf(elementL[j].name) == -1 )
                        {
                            //Se incluye en la lista de borrado
                            ListaObjetosBorrar.push( elementL[j].name );
                        }
                            
                    }  
                }
            
            
            EscenasMundo = this.entity.script.loader.getNumEscenas();
            
            console.log("Numero de escenas cargadas de momento "+(hijosL.length-1)+"   total que se van a cargar "+EscenasMundo);
            
            if(hijosL.length-1 == EscenasMundo)
            { 
                console.log(ListaObjetosBorrar);
                
                //Una vez que se tienen los elementos que cuelgan de todo el mundo, hay que inicializar la lista de texturas para ver como se repiten
                
                //Esta variable se utilizará para saber si una textura esta inicializada ya dentro de la lista de texturas
                var inicializado = false;

                //Se recorre la lista de objetos que son borrables
                for(i=0; i<ListaObjetosBorrar.length; i++)
                {                    
                    
                    if (typeof this.entidad === "undefined")
                        {
                            
                        }
                    else
                        {
                            //Se consiguen los elementos del script para borrado y objeto a borrar
                            this.entidad = app.root.findByName(ListaObjetosBorrar[i]);
                            var namej = this.entidad.model.model.meshInstances[0].material.diffuseMap; 
                            //console.log(namej);

                            //Si el nombre no es null
                            if(namej !== null ) 
                            {
                                //Se recoge el nombre de la textura asociada a este modelo
                                var namj = this.entidad.model.model.meshInstances[0].material.diffuseMap.name;   

                                //Si la lista ya estaba incializada es porque ya hay una aparicion anterior de esa textura, asique hay que buscarla e
                                //incrementar su numero de apariciones.
                                if(inicializado)
                                {
                                    var fin = true;
                                    var j = 0;

                                    while(fin)     
                                    {   
                                        //Se comprueba que el nombre existe y no es un null
                                        if(namej !== null)        
                                        {        
                                            //Se comprueba para cada elemento si esta en la ListaTexturas para salvarlo
                                            if( this.ListaTexturas[j].nombreTextura == namej.name )   
                                            {
                                                //Si esta esa textura ya en la lista se incrementa sus apariciones
                                                this.ListaTexturas[j].apariciones++;
                                                inicializado = true;
                                                fin = false;
                                            }
                                            else
                                            {
                                                inicializado = false; 
                                            }

                                            j++;
                                            if(j>=this.ListaTexturas.length) 
                                            {
                                                fin = false; 
                                            }
                                        }
                                    }
                                }

                                //Si no esta en la lista es porque es un material nuevo, que hay que incluir en la lista
                                if(!inicializado)
                                {                                   
                                    //Si no esta esa textura en la lista hay que inicializarla
                                    var Textj = new ObjetoTextura(namej.name,1);
                                    this.ListaTexturas.push(Textj); 
                                    inicializado = true;
                                }    
                            }
                        }
                }
            }
        },
        
        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
             this.UnloadVRAM = app.root.findByName("UnloadVRAM");  

            if( typeof this.jsonMapa === "undefined" )        
            {
                Json_Unload = false;
            }
            
            //Si hay que entrar a borrar algo
            if(Json_Unload)
            {
                if(entrar)
                {
                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    //Se comprueba la condicion, si esta activado, el algoritmo tiene que borrar los elementos de la lista
                    //
                    if(this.Borrado)
                    {
                        //Comprobar que la lista esta vacia 
                        if(ListaObjetos[0] === "")
                        {
                            ListaObjetos = [];
                        }

                        //Si la lista contiene elementos
                        if(ListaObjetos.length > 0)
                        {
                            console.log("BORRADO DE ELEMENTOS ESPECIFICOS");
                            
                            /////////////////////////////////////////////////////////////////
                            //
                            // BORRADO DE ELEMENTOS ESPECIFICOS
                            //
                            //Se consigue el objeto para el UnloadVRAM
                            this.UnloadVRAM = app.root.findByName("UnloadVRAM");              

                            //Se recorre la lista de objetos que se quieren borrar
                            for(i=0; i<ListaObjetos.length; i++)
                            {
                                //Se consiguen los elementos del script para borrado y objeto a borrar
                                this.entidad = app.root.findByName(ListaObjetos[i]);

                                if(this.entidad !== null)
                                {
                                    var respect = this.RespetarTextura(this.entidad);
                                    if(!respect)
                                    {
                                        this.UnloadVRAM = app.root.findByName("UnloadVRAM"); 
                                        console.log("Se respeta el "+this.entidad);
                                        //Se llama al borrado
                                        this.UnloadVRAM.script.UnloadVRAM.BorradoVRAM(this.entidad);
                                    }

                                    //Se destruye la entidad
                                    this.entidad.destroy();

                                    //ElementosBorrados++;

                                    //Se quita de la lista de elementos
                                    ListaObjetos.splice(i,1);
                                    i--;
                                }
                            }  

                            //Se cambia el valor de Entrar para que este borrado solo se haga una vez
                            this.changedEntrar();
                        }
                        //Si la lista no contiene elementos
                        else
                        {
                            ListaObjetos = [];

                            console.log("BORRADO DE TODOS LOS ELEMENTOS DE LA ESCENA");
                            
                            ///////////////////////////////////////////////////////////////////////
                            //
                            // BORRADO DE TODOS LOS ELEMENTOS DE LA ESCENA
                            //                    
                            //Se consigue el objeto para el UnloadVRAM
                            this.UnloadVRAM = app.root.findByName("UnloadVRAM");              

                            //////////////////////////////////////////////////////////////////////
                            //Hay que coger todos los elementos que son borrables
                            //

                            //Se coge el objeto root que contiene todo el mundo
                            var lis = app.root;

                            //Se coge la lista de hijos que cuelgan de la app, que son las escenas
                            var hijos = lis.getChildren();

                            //Se recorre la lista de escenas cargadas
                            for(i=1; i<hijos.length; i++)
                            {
                                //para cada escena
                                var element = hijos[i].getChildren();
                                for(j=0; j<element.length; j++)
                                {
                                    //Se guardan los nombres de los items que cuelgan de la escena
                                    ListaObjetos.push( element[j].name ); 
                                }

                            }

                            //Se recorre la lista de objetos que se quieren borrar
                            for(i=0; i<ListaObjetos.length; i++)
                            {

                                //Se consiguen los elementos del script para borrado y objeto a borrar
                                this.entidad = app.root.findByName(ListaObjetos[i]);
                                
                                var respecti = this.RespetarTextura(this.entidad);  
                                if(!respecti)
                                {
                                    this.UnloadVRAM = app.root.findByName("UnloadVRAM"); 
                                    //Se llama al borrado
                                    this.UnloadVRAM.script.UnloadVRAM.BorradoVRAM(this.entidad);
                                }
                                
                                console.log("Borrando elemento "+this.entidad);
                                //Se destruye la entidad
                                this.entidad.destroy();   

                                //ElementosBorrados++;

                                //Se quita de la lista de elementos
                                ListaObjetos.splice(i,1);   
                                i--;

                            }  

                            //Se cambia el valor de Entrar para que este borrado solo se haga una vez
                            this.changedEntrar();                    
                        }
                    }
                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //
                    //Se comprueba la condicion, si esta desactivado, el algoritmo tiene que borrar los elementos que no esten en la lista, 
                    //si la lista esta vacia es porque no se quiere salvar nada asique se borraran todos 
                    //
                    else
                    {
                        //Donde se van a incluir los objetos que deben ser borrados  
                        var ListaObjetosBorrar = [];

                        //Comprobar que la lista esta vacia 
                        if(ListaObjetos[0] === "")
                        {
                            ListaObjetos = [];
                        }

                        console.log("BORRANDO DE TODOS LOS ELEMENTOS QUE NOOOOOOOOOOOOOOOOOOOOOO  SE ENCUENTREN EN LA LISTA");
                        ///////////////////////////////////////////////////////////////////////
                        //
                        // BORRADO DE TODOS LOS ELEMENTOS DE LA ESCENA QUE NO SE ENCUENTREN EN LA LISTA
                        //                    

                        //Se consigue el objeto para el UnloadVRAM  
                        this.UnloadVRAM = app.root.findByName("UnloadVRAM");              

                        //////////////////////////////////////////////////////////////////////
                        //Hay que coger todos los elementos que son borrables
                        //

                        //Se coge el objeto root que contiene todo el mundo
                        var lista = app.root;

                        //Se coge la lista de hijos que cuelgan de la app, que son las escenas
                        var hijosL = lista.getChildren();

                        //Se recorre la lista de escenas cargadas
                        for(i=1; i<hijosL.length; i++)
                        {
                            //para cada escena 
                            var elementL = hijosL[i].getChildren();

                            for(j=0; j<elementL.length; j++)
                            {
                                //Se comprueba para cada elemento si esta en la ListaObjetos para salvarlo
                                if( ListaObjetos.indexOf(elementL[j].name) == -1 )
                                {
                                    //Se incluye en la lista de borrado
                                    ListaObjetosBorrar.push( elementL[j].name );
                                }

                            }  
                        }
                        
                        console.log(ListaObjetosBorrar);
                        
                        //Se recorre la lista de objetos que se quieren borrar
                        for(k=0; k<ListaObjetosBorrar.length; k++)
                        {
                            //Se consiguen los elementos del script para borrado y objeto a borrar
                            this.entidad = app.root.findByName(ListaObjetosBorrar[k]);

                            
                            
                            //BORRAR
                            var sound = this.entidad.findByName("SpaceExplorers.mp3");
                            
                            if(sound !== null)
                            {
                                console.log(typeof sound);
                                console.log("llego un elemento sonido");
                                    
                            }
                            
                            
                            
                            
                            
                            
                            var respecto = this.RespetarTextura(this.entidad);       
                            if(!respecto)
                            {
                                //Se llama al borrado
                                this.UnloadVRAM.script.UnloadVRAM.BorradoVRAM(this.entidad);
                            }
                            
                            console.log("Borrando entidad "+this.entidad);
                            
                            //Se destruye la entidad
                            this.entidad.destroy();   

                            //Se quita de la lista de elementos
                            ListaObjetosBorrar.splice(k,1);   

                            k--; 
                        }  
                        //Se cambia el valor de Entrar para que este borrado solo se haga una vez
                        this.changedEntrar();                    
                    } 
                
                }
            }  
            else
            {   
                //Se calcula el mapa de navegacion con el algoritmo    
                this.CrearJSON();
                     
                //Se coge el objeto root que contiene todo el mundo
                var listai = app.root;

                //Se coge la lista de hijos que cuelgan de la app, que son las escenas
                var hijosLi = listai.getChildren();
               
                if( EscenasMundo == hijosLi.length-1)
                { 
                    abrir = true;    
                }
                
                if (abrir)
                {
                    if(MostrarJson)
                    {        
                    
                        //si el Json no existe 
                        if( typeof this.jsonMapa == "undefined" )
                        {
                            entrar = false;

                            console.log("Entro por aqui porque el json no existe");

                            BuTexturas = this.ListaTexturas;

                            console.log(BuTexturas);

                            BuTexturas = this.Repetidas(BuTexturas);

                            var text = '{ "Texturas" : ' ;
                            text = text + JSON.stringify(BuTexturas); 

                            text = text + '}';

                            console.log("Imprimido");

                            //Se guarda el Json del mapa 
                            //var myWindow = window.open("", "Buffer Texturas");
                            //myWindow.document.write(text);

                            
                             // OBSOLETO
                            //Se guarda el Json del mapa 
                            var url = 'data:text/json;charset=utf8,' + encodeURIComponent(text);
                            window.open(url, '_blank');
                            window.focus();
                            

                        }
                        abrir = false;
                        
                        MostrarJson = false;
                    }
                }
            }
        }       
    };
    
    return Unload;    
});