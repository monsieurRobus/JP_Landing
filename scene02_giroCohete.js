pc.script.attribute('velocidad','number',1,{
    displayName: 'Velocidad'
});

pc.script.attribute('sentido','boolean',false,{
    displayName: 'Sentido Horario'
});



pc.script.create('scene02_giroCohete', function (app) {
    // Creates a new Scene02_giroCohete instance
    var Scene02_giroCohete = function (entity) {
        this.entity = entity;
    };

    Scene02_giroCohete.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            
            this.giro=false;
            this.multiplicador=1;
            
            app.keyboard.on(pc.EVENT_KEYDOWN,this.giroOn,this);
        
            
            
            jQuery(document).on("sala4",function(event){
                              
              this.giro=true;
              
                  if(this.sentido)
                      this.multiplicador = -1;
                              
                              }.bind(this));
        
        
        
        },

        
        giroOn: function(){
            
            
          
            
            
        },
        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            
            if(this.giro)
               this.entity.rotate(0,0,this.multiplicador*this.velocidad*dt);
            
        }
    };

    return Scene02_giroCohete;
});