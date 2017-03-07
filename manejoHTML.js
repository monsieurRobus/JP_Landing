// this script can reference html asset as an attribute
// and will live update dom and reattach events to it on html changes
// so that launcher don't need to be refreshed during development

pc.script.attribute('html', 'asset', [ ], { type: 'html' });

pc.script.create('manejoHTML4', function (app) {
    var ManejoHTML4 = function (entity) {
        this.entity = entity;
        this.circulo = null;
    };

    ManejoHTML4.prototype = {
        initialize: function () {
            // create DIV element
            this.element = document.createElement('div');
            this.element.id = "UI";
            this.element.classList.add('fondo');
            
            // append to body
            // can be appended somewhere else
            // it is recommended to have some container element
            // to prevent iOS problems of overfloating elements off the screen
            document.body.appendChild(this.element);
            
            // asset
            
            this.asset = null;
            this.assetId = 0;
            this.ejecucion=false;
            this.counter = 0;
            this.pagina = 0;
            
            jQuery(document).on("siguienteEscena",function(event){
               
               // this.borrar();
                
            }.bind(this));
            
        },
        
        attachAsset: function(assetId, fn) {
            // remember current assetId
            this.assetId = assetId;
            
            // might be no asset provided
            if (! this.assetId)
                return fn.call(this);
            
            // get asset from registry
            var asset = app.assets.get(this.assetId);
            
            // store callback of an asset load event
            var self = this;
            asset._onLoad = function(asset) {
                fn.call(self, asset, asset.resource);
            };
            
            // subscribe to changes on resource
            asset.on('load', asset._onLoad);
            // callback
            fn.call(this, asset, asset.resource);
            // load asset if not loaded
            app.assets.load(asset);
        },
        
        template: function(asset, html) {
            // unsubscribe from old asset load event if required
            if (this.asset && this.asset !== asset)
                this.asset.off('load', this.asset._onLoad);
            
            // remember current asset
            this.asset = asset;
            
            // template element
            // you can use templating languages with renderers here
            // such as hogan, mustache, handlebars or any other
            this.element.innerHTML = html || '';
            
            // bind some events to dom of an element
            // it has to be done on each retemplate
            if (html)
                this.bindEvents();
        },
        
        
        
        // Aquí enlazamos funciones del HTML con codigo HTML
        // FUNCIONES EXTRA: 
        // myDown;
        // 
        
        borrar: function(){
          
            //BORRAR EL CONTENIDO DEL CANVAS
            
            
            this.element.innerHTML = '';
            
        },
        
        
          
        
        bindEvents: function() {
            var self = this;
            
            // example
            // 
            // get button element by class
            var canvas = this.element.querySelector('canvas');
            
            if (canvas){
                
          
                exportRoot = new lib.scene01_slider_v04_trazado();

                stage = new createjs.Stage(canvas);
                stage.addChild(exportRoot);
                stage.update();
                stage.enableMouseOver();

                createjs.Ticker.setFPS(lib.properties.fps);
                createjs.Ticker.addEventListener("tick", stage);

                /* 

                responsive scale code as expressed by @davegamez 
                En esta parte escalamos el canvas de ANIMATECC para que case siempre con las dimensiones de playcanvas.

                */


                var page_body = document.getElementsByTagName("body")[0];
                //page_body.style.backgroundColor = "#3C0600";
                page_body.style.overflow = "hidden";
                page_body.style.position = "fixed";
                
                // IMPORTANTE, cambiar la asignacion en page_canbvas por el canvas que hemos asignado previamente. Si no, REDIMENSIONARA EL CANVAS DE PLAYCANVAS, NO EL DE ANIMATECC    
                var page_canvas = canvas;
                stageWidth = page_canvas.width;
                stageHeight = page_canvas.height;

                var viewport = document.querySelector('meta[name=viewport]');
                var viewportContent = 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0';

                if (viewport === null) {
                 var head = document.getElementsByTagName('head')[0];
                 viewport = document.createElement('meta');
                 viewport.setAttribute('name', 'viewport');
                 head.appendChild(viewport);
                }

                viewport.setAttribute('content', viewportContent);

                 function onResize() {
                 var widthToHeight = stageWidth / stageHeight;
                 
                 var newWidth = window.innerWidth;
                 //var newHeight = window.innerHeight;
                 var newHeight = stageHeight;
                 var newWidthToHeight = newWidth / newHeight;
                 
                      
                 if (newWidthToHeight > widthToHeight) {
                 newWidth = newHeight * widthToHeight;
                 page_canvas.style.height = newHeight + "px";
                 page_canvas.style.width = newWidth + "px";
                 } else {
                 newHeight = newWidth / widthToHeight;
                 page_canvas.style.height = newHeight + "px";
                 page_canvas.style.width = newWidth + "px";
                 }
                 scale = newWidthToHeight / widthToHeight;
                 stage.width = newWidth;
                 stage.height = newHeight;
                 page_canvas.style.marginTop = ((window.innerHeight - newHeight) / 2) + "px";
                 page_canvas.style.marginLeft = ((window.innerWidth - newWidth) / 2) + "px";
                
                     
                     
                     //CODIGO ORIGINAL
                 /*
                 if (newWidthToHeight > widthToHeight) {
                 newWidth = newHeight * widthToHeight;
                 page_canvas.style.height = newHeight + "px";
                 page_canvas.style.width = newWidth + "px";
                 } else {
                 newHeight = newWidth / widthToHeight;
                 page_canvas.style.height = newHeight + "px";
                 page_canvas.style.width = newWidth + "px";
                 }
                 scale = newWidthToHeight / widthToHeight;
                 stage.width = newWidth;
                 stage.height = newHeight;
                 page_canvas.style.marginTop = ((window.innerHeight - newHeight) / 2) + "px";
                 page_canvas.style.marginLeft = ((window.innerWidth - newWidth) / 2) + "px";
                */
                }

                window.onresize = function () {
                 onResize();
                };

                onResize();
                
                
                // RESPONSIVE ALTERNO
                /*
                var page_body = document.getElementsByTagName("body")[0];
                //page_body.style.backgroundColor = "#3C0600";
                page_body.style.overflow = "hidden";
                page_body.style.position = "fixed";

                var page_canvas = canvas;
                stageWidth = page_canvas.width;
                stageHeight = page_canvas.height;

                var viewport = document.querySelector('meta[name=viewport]');
                var viewportContent = 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0';

                if (viewport === null) {
                 var head = document.getElementsByTagName('head')[0];
                 viewport = document.createElement('meta');
                 viewport.setAttribute('name', 'viewport');
                 head.appendChild(viewport);
                }

                viewport.setAttribute('content', viewportContent);

                function onResize() {
                 var newWidth = window.innerWidth;
                 var newHeight = window.innerHeight;
                 page_canvas.style.height = newHeight + "px";
                 page_canvas.style.width = newWidth + "px";
                 stage.width = newWidth;
                 stage.height = newHeight;
                }

                window.onresize = function () {
                 onResize();
                }

                onResize();
            */
            
            }
          
            
        },
        
            myDown: function(e){
            
           
                
                       
        },
        
        cargaCanvas: function(n){
            
            alert(n);
            switch(n){
                    
                case 0: 
                    
                    exportRoot = new lib.scene01_slider_v04_trazado();
                    
                    break;
                    
                case 1: 
                    
                    exportRoot = new lib.scene02_canvas_v08_trazado();
                    
                    break;
                    
                case 2: break;
                case 3: break;
                default: console.log("na!");
                    
                    stage = new createjs.Stage(canvas);
                    stage.addChild(exportRoot);
                    stage.update();
                    stage.enableMouseOver();

                    createjs.Ticker.setFPS(lib.properties.fps);
                    createjs.Ticker.addEventListener("tick", stage);

                    
                    
            }
            
        },
            
  

        update: function (dt) {
            
            this.pagina = app.root.findByName("Mapa").script.loader.escenaActual;
            
            // check for swapped asset
            // if so, then start asset loading and templating
            if(!this.ejecucion){
                if (this.assetId !== this.html[0])
                    this.attachAsset(this.html[0], this.template);
                    this.ejecucion=true;                
            }
            }
    };

    return ManejoHTML4;
});