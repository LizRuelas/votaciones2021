$(document).ready(function(){
    $("#nombre").keydown(validarCaracteres);
    $("#dni").keydown(validarDigitos);


    var ingresoDatos=function(response){
        var nombre = $("#nombre").val();
        var dni =$("#dni").val();

    if (nombre && dni) { 
        
      $.ajax({
        type: "GET",
        url: "http://localhost:3002/demo.json", 
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        error: function(error, textStatus, errorThrown) { 
          $('#loginResult').text("responseText: " + error.responseText 
            + ", textStatus: " + textStatus 
            + ", errorThrown: " + errorThrown);
          $('v#loginResult').addClass("error");
        }, 

        success: function(data){

            for (var i = 0  ; i<data.length; i++) {
                if(data[i].nombre == nombre && data[i].dni == dni){
                         window.location = "votar.html";
                         break;
                } 
            }

            if (data.error) { 
               $('#loginResult').text("data.error: " + data.error);
            } else { 
               $('#loginResult').text("No se encuentra en la base de datos");
              } 
            } 
        }); 
    } 

    $('#loginResult').fadeIn();
    return false;
    };

    $("#boton").click(ingresoDatos);

});


var validarCaracteres = function(e){
    var ascii = e.keyCode;

        if (ascii == 32 || ascii == 8 || (ascii >= 97 && ascii <= 122)||(ascii >= 65 && ascii <= 90)) {
            return true;
        } else {
            return false;
        }


};

var validarDigitos = function(e){
    var ascii = e.keyCode;

        if (ascii == 8 || (ascii >= 48 && ascii <= 57)) {
            return true;
        } else {
            return false;
        }

};