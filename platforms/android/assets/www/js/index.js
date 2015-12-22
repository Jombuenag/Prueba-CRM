var cargaDB = {
    db: "",
    initialize: function () {
        //GENERAMOS EL CONECTOR
        this.db = window.openDatabase("takudb", "1.0", "Base de datos CRM", 2 * 1024 * 1024);
        this.cargarDB();
    },
    cargarDB: function () {
        this.db.transaction(this.mostrarDB, this.mostrarDBError);
    },
    mostrarDB: function (tx) {
        var sql = "SELECT * FROM takudb;";
        tx.executeSql(
            sql,
            [],
            //FUNCION DE RESULTADO DB
            function (tx, result) {
                if (result.rows.length > 0) {
                    for (var i = 0; i < result.rows.length; i++) {
                        var fila = result.rows.item(i);
                        //AQUÍ SE ACTUALIZA EL HTML
                        alert("ROW " + i + " nombre: " + fila.nombre +" "+ fila.apellidos);
                        $("#listausuarios ul").append("<li id='"+ fila.id + "'class='usuarios'><a href='listausuarios.html' data-ajax ='false'></a></li>").listview('refresh');
                 }
            }
        },
//HAY QUE GUARDAR LA ID
$(document).ready(
    function(){
        $('listausuarios').click
        var id=$(this).attr("id");
        window.localStorage.setItem("id_usuario",id);

       }
    )
),
function (tx, error) {
    this.mostrarDBError(error);
}
},
    mostrarDBError:function(err){
    alert("Se ha produciodo un error en la creación de la base de datos: "+error.code);
    alert("MENSAJE DE ERROR : " + err.message);
    }

};

var configDB ={
    existe_db:"",
    db:"",
    initialize: function() {
        //VARIABLE EXISTE DB PARA VER SI SE HA CREADO LA BASE DE DATOS
        this.existe_db = window.localStorage.getItem("existe_db");
        if (this.existe_db == null) {
            navigator.notification.confirm("NO EXISTE LA BASE DE DATOS");
            //CREAMOS UN ENLACE CON LA BASE DE DATOS
            this.db = window.openDatabase("takudb", "1.0", "Base de datos CRM", 2 * 1024 * 1024);
            this.crearDB();
        } else {
            //CREADA
            console.log("LA BASE DE DATOS YA EXISTE");
            cargaDB.initialize();
        }
    },

    onConfirm:function(buttonIndex){
        if(buttonIndex==1){
            window.localStorage.setItem("existe_db",1);
            alert("¡YA EXISTO!")
        }
    },
    //CREAMOS LA BASE DE DATOS
    crearDB:function(){
        console.log("Se creará la base de datos");

        this.db.transaction(this.createLocalDB,this.createDBError,this.createDBSucc);
    },

    createLocalDB: function(tx){
        tx.executeSql("DROP TABLE IF EXISTS takudb");
        var sql="CREATE TABLE IF NOT EXISTS takudb ("+
            "id INTEGER PRIMARY KEY AUTOINCREMENT,"+
            "nombre VARCHAR(35),"+
            "apellidos VARCHAR(75),"+
            "aniversario VARCHAR(10),"+
            "telefono INTEGER(10),"+
            "email VARCHAR(75));";
        tx.executeSql(sql);
        //INSERTAMOS LOS DATOS
        sql="INSERT INTO takudb(nombre, apellidos, aniversario, telefono, email)"+
            "VALUES('Jorge','Ombuena',21/02/1989, 689362463,'Takumakun@gmail.com');";

        tx.executeSql(sql);
        // AQUI ES DONDE SE HARÁN LOS INSERT
        alert("SE HA CREADO : " + sql);

    },
    createDBError: function(err){
        alert("Se ha produciodo un error en la creación de la base de datos: "+error.code);
    },
    createDBSucc: function(){
        window.localStorage.setItem("existe_db",1);
        cargarDB.initialize();
    }
};
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, true);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {



        /*listeningElement.setAttribute('style', 'display:none;');
         receivedElement.setAttribute('style', 'display:block;');*/

        configDB.initialize();

    }
};

app.initialize();