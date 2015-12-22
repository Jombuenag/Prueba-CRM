/**
 * Created by Takuma on 26/11/2015.
 */
var nombre="";
var apellidos="";
var aniversario="";
var numtelf="";
var email="";

var db="";

//AQUI EMPIEZA LA MANDANGA DE INSERTAR DATOS
function insertarDatos(tx){
    sql="INSERT INTO takudb(nombre, apellidos, aniversario, numtelf, email)" + " VALUES('"+nombre+"','"+apellidos+"','"+aniversario+"','"+numtelf+"','"+email+"')'"
    tx.executeSql(sql);
    alert("ROW INSERT: " + sql);

};

function mostrarDBError(err){
    alert("DURUM DURUM DU DAHDAHDAH!!"+err.code);
    alert("MENSAJE DE ERROR: "+err.message);
};

$("#salvar").click(
        function(event){
            alert("NUEVO ELEMENTO EN LISTA");
            nombre=$("#nombre").val();
            apellidos=$("#apellidos").val();
            aniversario=$("#aniversario").val();
            numtelf=$("#numtelf").val();
            email=$("#email").val();

            //CONEXION CON DB
            db=window.openDatabase("TakuCRM_DB", "1.0", "Base de datos CRM", 2 * 1024 * 1024);
            db.transaction(insertarDatos, mostrarDBError);

            //INSERT

        }
);
function mostrarImagen(imageURI) {
    console.log("IMAGEN: " + imageURI);

    $("#avatar").attr("src", imageURI);
};
function errorImagen(message){
    console.log("MENSAGE DE ERROR: "+message);
};

$("#avatar").click(
    function(event){
        navigator.camera.getPicture(
            mostrarImagen,
            errorImagen,
            {
                quality: 75,
                destinationType: Camera.DestinationType.FILE_URI
            }
        );
    }
);