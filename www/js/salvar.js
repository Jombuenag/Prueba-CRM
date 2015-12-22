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
    var sql= "INSERT INTO takudb " +
        "(nombre, " +
        "apellidos, " +
        "aniversario, " +
        "numtelf, " +
        "email )" +
        "VALUES ('" +nombre+ "','" +apellidos+ "','" +aniversario+ "','" +numtelf+ "','" +email+ "');";
    tx.executeSql(sql);
    alert("ROW INSERT: " + sql);
    load.initialize();

};

function mostrarDBError(err){
    console.log("ERROR EN LA INSERCIÓN DE DATOS "+err.code);
    console.log("MENSAJE DE ERROR "+err.message);
};

$("#salvar").click(function(event){
            alert("NUEVO ELEMENTO EN LISTA");
            nombre=$("#nombre").val();
            apellidos=$("#apellidos").val();
            aniversario=$("#aniversario").val();
            numtelf=$("#numtelf").val();
            email=$("#email").val();

            //CONEXION CON DB
            db=window.openDatabase("takudb", "1.0", "Base de datos CRM", 2 * 1024 * 1024);
            db.transaction(insertarDatos, mostrarDBError);
        }
);

//CARGAR DE LA BASE DE DATOS
var load = {
    db: "",
    initialize: function () {
        this.db = window.openDatabase("takudb", "1.0", "MiniCRM", 2 * 1024 * 1024);
        this.cargarDB();
    },
    cargarDB: function () {
        this.db.transaction(this.show, this.showDBError);
    },
    show: function (tx) {
        var sql = "SELECT * FROM localDB order by ultims asc;";

        tx.executeSql(sql, [], function (tx, result) {
            $("#listausuarios ul li").remove();
            if (result.rows.length > 0) {
                for (var i = 0; i < result.rows.length; i++) {
                    var fila = result.rows.item(i);
                    //Actualitza el HTML
                    $("#listausuarios ul").append("<li id=" + fila.id + "><a href='#usuario'><div>" + fila.nombre + "</div><div >Poker</div></a></li>").listview('refresh');

                }
            }

        }, function (tx, error) {
            this.showDBError(error);
        });
    },
    showDBError: function (err) {
        alert("Error: " + err.code + " // " + err.message);
    }
};


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