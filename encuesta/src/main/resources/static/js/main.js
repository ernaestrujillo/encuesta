//Ernaes Antonio Trujillo Vizuet
//21-07-2022
//Encuesta
var host="http://localhost:8080";//Cambiar en produccion
var listaEncuesta=[];
var listaPreguntas=[];
var selEncuesta={};

function setboxHeight(){
var h=$( window ).height();
var w=$( window ).width()-10;
var wMenu=450;
$("#boxMenu").height(h);
$("#boxMenu").width(wMenu);
$("#boxContent").height(h);
$("#boxContent").width(w-wMenu);
}

$(window).resize(function() {
  setboxHeight();
});

function ComponenteImgIni(){
var r=$(".active");
if(r.length>0){
  $(r[0]).removeClass("active");
}
$("#imgIni").remove();
$("#boxContentLista").html("");
$("#boxContentTop").html("");
$("#lstEncuesta").html("");
var templateString = $("#tempImgIni").html();
var template = _.template(templateString);
$("#boxContent").append(template());
}

function ComponenteSpinner(idElement){
var templateString = $("#cmpSpinner").html();
var template = _.template(templateString);
$("#"+idElement).prepend(template());
}

function partialTemplate(idElement,element,idPregunta){
var templateString = $("#"+idElement).html();
var template = _.template(templateString);
return template({opcion:element,idPregunta});
}

function InsertaItemEncuesta(element,idEncuesta){
var templateString = $("#tmpItemEncuesta").html();
var template = _.template(templateString);
if(idEncuesta==-1){
  $("#lstEncuesta").prepend(template(element));
  listaEncuesta.push(element);
}else{
  $("#Encuesta_"+idEncuesta).find("strong").text(element.nombreEncuesta);
  var encuesta=listaEncuesta.find(op=>{return op.idEncuesta==idEncuesta});
  if(encuesta!=undefined){
    encuesta.nombreEncuesta=element.nombreEncuesta;
  }
}
}


function RefrescarEncuesta(){
$("#txtBuscar").val("");
ComponenteImgIni();
ListarEncuestas();
}

function BuscarEncuesta(nombreEncuesta){
ComponenteImgIni();
$("#lstEncuesta").html("");
ComponenteSpinner("lstEncuesta");
fetch(host+'/api/buscarEncuestas/'+nombreEncuesta, {
    method: "GET",
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => response.json())
  .then((json)=>{
    ListadoEncuesta(json);
    $("#spinner").remove();
  })
  .catch((err) => {
    $("#spinner").remove();
    swal("Error", err, "error");
  });
}

function ListadoEncuesta(json){
json.forEach((element)=>{
  InsertaItemEncuesta(element,-1);
});
}

function ListarEncuestas(){
ComponenteSpinner("lstEncuesta");
fetch(host+'/api/encuestas', {
    method: "GET",
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => response.json())
  .then((json)=>{
    ListadoEncuesta(json);
    $("#spinner").remove();
  })
  .catch((err) => {
    $("#spinner").remove();
    swal("Error", err, "error");
  });
}

function GuardarEncuesta(){
  var idEncuesta=$("#txtIdEncuesta").val();
  var nombreEncuesta=$("#txtNombreEncuesta").val();
  if(nombreEncuesta!=""){
      let _datos = {
        idEncuesta,
        nombreEncuesta
      }

      fetch(host+'/api/saveEncuesta', {
        method: "POST",
        body: JSON.stringify(_datos),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json())
      .then((json)=>{
        ExitoGuardarEncuesta(json,idEncuesta);
      })
      .catch((err) => {
        swal("Error", err, "error");
      });
  }else{
      $('#frmEncuesta').addClass("was-validated");
  }
}

function ExitoGuardarEncuesta(json,idEncuesta){
$("#dlgEncuesta").modal("hide");
swal("Guardado Exitosamente", "La encuesta se guardo exitosamente", "success");
InsertaItemEncuesta(json,idEncuesta);
}

function ObtenerEncuesta(id){
return fetch(host+'/api/encuesta/'+id, {
    method: "GET",
    headers: {"Content-type": "application/json; charset=UTF-8"}
  });

}

function EditarEncuesta(id){
  ObtenerEncuesta(id)
  .then(response => response.json())
  .then((json)=>{
    var encuesta=json;
    if(encuesta!==undefined){
      $("#titleDlgEncuesta").text("Editar Encuesta");
      $("#txtIdEncuesta").val(encuesta.idEncuesta);
      $("#txtNombreEncuesta").val(encuesta.nombreEncuesta);
      $("#dlgEncuesta").modal("show");
    }
  }).catch((err) => {
    console.log(error);
  });
}

function NuevaEncuesta(){
$("#txtIdEncuesta").val("-1");
$("#txtNombreEncuesta").val("");
$("#titleDlgEncuesta").text("Nueva Encuesta");
$("#dlgEncuesta").modal("show");
}

function SeleccionarEncuesta(id){
ComponenteSpinner("boxContent");
ObtenerEncuesta(id)
  .then(response => response.json())
  .then((json)=>{
    var encuesta=json;
    if(encuesta!==undefined){
      var r=$(".active");
      if(r.length>0){
        $(r[0]).removeClass("active");
      }
      $("#imgIni").remove();
      $("#Encuesta_"+encuesta.idEncuesta).addClass("active");
      var templateString = $("#tmpContentTop").html();
      var template = _.template(templateString);
      $("#boxContentTop").html(template(encuesta));
      ListarPreguntas(id);
    }
    $("#spinner").remove();
  }).catch((err) => {
    $("#spinner").remove();
    console.log(err);
  });
}

function EliminarEncuesta(id){
swal({
  title: "Eliminar",
  text: "¿Desea eliminar la encuesta seleccionada?",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    fetch(host+'/api/encuesta/'+id, {
      method: "DELETE",
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then((json)=>{
      if(json.exito){
        $("#boxContentTop").text("");
        $("#boxContentLista").html("");
        $("#Encuesta_"+id).remove();
        swal("Eliminar", "La Encuesta se elimino exitosamente", "success");
      }else{
        swal("Eliminar", json.mensaje, "error");
      }
    })
    .catch((err) => {
      swal("Error", err, "error");
    });
  }
});
}

function OnSumitFrmPregunta(e){
e.preventDefault();
GuardarPregunta();
}

function ComponenteNvoPregunta(idEncuesta){
var templateString = $("#cmpNuevaPregunta").html();
var template = _.template(templateString);
$("#frmPregunta").html(template({idEncuesta}));
}

function ComponenteEditaPregunta(idEncuesta,pregunta){
var templateString = $("#cmpEditarPregunta").html();
var template = _.template(templateString);
$("#frmPregunta").html(template({idEncuesta,pregunta}));
}

function GuardarPregunta(){
  var idEncuesta=$("#txtIdEncuestaSel").val();
  var idPregunta=$("#txtIdPregunta").val();
  var nombrePregunta=$("#txtNombrePregunta").val();
  if(nombrePregunta!=""){
      let _datos = {
        encuesta:{idEncuesta},
        idPregunta,
        nombrePregunta
      }

      fetch(host+'/api/savePregunta', {
        method: "POST",
        body: JSON.stringify(_datos),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json())
      .then((json)=>{
        ExitoGuardarPregunta(json,idPregunta,idEncuesta);
      })
      .catch((err) => {
        swal("Error", err, "error");
      });
  }else{
      $('#frmPregunta').addClass("was-validated");
  }
}

function ExitoGuardarPregunta(json,idPregunta,idEncuesta){
swal("Guardado Exitosamente", "La pregunta se guardo exitosamente", "success").then((value) => {
  $("#txtNombreOpcion_"+json.idPregunta).focus();
});
InsertaItemPregunta(json,idPregunta);
ComponenteNvoPregunta(idEncuesta);
}

function InsertaItemPregunta(element,idPregunta,idEncuesta){
var templateString = $("#tmpItemPregunta").html();
var template = _.template(templateString);
if(idPregunta==-1){
  $("#boxContentLista").prepend(template({pregunta:element,idEncuesta}));
  listaPreguntas.push(element);
}else{
  var pregunta=listaPreguntas.find((op)=>{ return op.idPregunta==idPregunta});
  if(pregunta!=undefined){
    pregunta.nombreEncuesta=element.nombrePregunta;
  }
  $("#titlePregunta_"+element.idPregunta).text(element.nombrePregunta);
  $("#Pregunta_"+element.idPregunta).removeClass("border border-warning");
  $("#Pregunta_"+element.idPregunta).removeClass("shadow");
  $("#Pregunta_"+element.idPregunta).addClass("shadow-sm");
}
}

function ListarPreguntas(idEncuesta){
fetch(host+'/api/preguntas/'+idEncuesta, {
    method: "GET",
    headers: {"Content-type": "application/json; charset=UTF-8"}
  })
  .then(response => response.json())
  .then((json)=>{ListadoPreguntas(json,idEncuesta)})
  .catch((err) => {
  console.log(err);
  });
}

function ListadoPreguntas(json,idEncuesta){
listaPreguntas=json;
$("#boxContentLista").html("");
$("#boxContentLista").scrollTop(0);
json.forEach((element)=>{InsertaItemPregunta(element,-1,idEncuesta)});
}

function ObtenerPregunta(id){
return fetch(host+'/api/pregunta/'+id, {
    method: "GET",
    headers: {"Content-type": "application/json; charset=UTF-8"}
  });
}

function EditarPregunta(id,idEncuesta){
$("#Pregunta_"+id).addClass("border border-warning");
$("#Pregunta_"+id).removeClass("shadow-sm");
$("#Pregunta_"+id).addClass("shadow");
ObtenerPregunta(id)
.then(response => response.json())
.then((json)=>{
  var pregunta=json;
  if(pregunta!==undefined){
    ComponenteEditaPregunta(idEncuesta,pregunta)
    $("#txtNombrePregunta").focus();
  }
}).catch((err) => {
  console.log(err);
});
}

function CancelarEditarPregunta(idEncuesta,idPregunta){
$("#Pregunta_"+idPregunta).removeClass("border border-warning");
$("#Pregunta_"+idPregunta).removeClass("shadow");
$("#Pregunta_"+idPregunta).addClass("shadow-sm");
ComponenteNvoPregunta(idEncuesta);

}

function EliminarPregunta(id){
swal({
  title: "Eliminar",
  text: "¿Desea eliminar la pregunta seleccionada?",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    fetch(host+'/api/pregunta/'+id, {
      method: "DELETE",
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then((json)=>{
      if(json.exito){
        selIdPregunta=-1;
        $("#Pregunta_"+id).remove();
        swal("Eliminar", "La pregunta se elimino exitosamente", "success");
      }else{
        swal("Eliminar", json.mensaje, "error");
      }
    })
    .catch((err) => {
      swal("Error", err, "error");
    });
  }
});

}

function OnSumitFrmOpcion(e,idPregunta){
e.preventDefault();
GuardarOpcion(idPregunta);
}

function ComponenteNvoOpcion(idPregunta){
var templateString = $("#cmpNuevoOpcion").html();
var template = _.template(templateString);
$("#txtNombreOpcion_"+idPregunta).parent().parent().html(template({idPregunta}));
}

function ComponenteEditaOpcion(idPregunta,opcion){
var templateString = $("#cmpEditarOpcion").html();
var template = _.template(templateString);
$("#txtNombreOpcion_"+idPregunta).parent().parent().html(template({idPregunta,opcion}));
}

function GuardarOpcion(idPregunta){
  var nombreOpcion=$("#txtNombreOpcion_"+idPregunta).val();
  var idOpcion=$("#txtIdOpcion_"+idPregunta).val();

  if(nombreOpcion!=""){
      let _datos = {
        idOpcion:idOpcion,
        pregunta:{idPregunta},
        nombreOpcion
      };
      fetch(host+'/api/saveOpcion', {
        method: "POST",
        body: JSON.stringify(_datos),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
      .then(response => response.json())
      .then((json)=>{
          ExitoGuardarOpcion(json,idPregunta);
      }).catch((err) => {
        console.log(err);
      });
  }else{
      $('#frmOpcion_'+idPregunta).addClass("was-validated");
  }
}

function ExitoGuardarOpcion(json,idPregunta){
var idOpcion= $("#txtIdOpcion_"+idPregunta).val();

swal("Guardado Exitosamente", "La opcion se guardo exitosamente", "success").then((value) => {
  $("#txtNombreOpcion_"+idPregunta).focus();
});

$("#txtNombreOpcion_"+idPregunta).val("");
var pregunta=listaPreguntas.find(en=> {return en.idPregunta===idPregunta});
if(idOpcion>0){
  $("#Opcion_"+json.idOpcion+" td.des").text(json.nombreOpcion);
  $("#Opcion_"+json.idOpcion).css("background-color","transparent");
   var opcion=pregunta.opciones.find(op=>{return op.idOpcion==json.idOpcion});
   if(opcion!=undefined){
    opcion.nombreOpcion==json.nombreOpcion;
   }
}
if(idOpcion==-1){
    var htmlTemp=partialTemplate('tmpPartialOpcion',json,idPregunta);
    $("#tblOpciones_"+idPregunta+">tbody").append(htmlTemp);
    pregunta.opciones.push(json);
}

ComponenteNvoOpcion(idPregunta);

}

function ObtenerOpcion(id){
return fetch(host+'/api/opcion/'+id, {
    method: "GET",
    headers: {"Content-type": "application/json; charset=UTF-8"}
  });
}

function EditarOpcion(idPregunta,idOpcion){
$("#Opcion_"+idOpcion).css("background-color","#FEF1C1");
ObtenerOpcion(idOpcion)
.then(response => response.json())
.then((json)=>{
  var opcion=json;
  if(opcion!==undefined){
    ComponenteEditaOpcion(idPregunta,opcion);
    $("#txtNombreOpcion_"+idPregunta).focus();
  }
}).catch((err) => {
  console.log(err);
});
}

function CancelarOpcionEditar(idPregunta,idOpcion){
$("#Opcion_"+idOpcion).css("background-color","transparent");
ComponenteNvoOpcion(idPregunta);
}

function EliminarOpcion(id){
swal({
  title: "Eliminar",
  text: "¿Desea eliminar la opcion seleccionada?",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    fetch(host+'/api/opcion/'+id, {
      method: "DELETE",
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then((json)=>{
      if(json.exito){
        $("#Opcion_"+id).remove();
        swal("Eliminar", "La opcion se elimino exitosamente", "success");
      }else{
        swal("Eliminar", json.mensaje, "error");
      }
    })
    .catch((err) => {
      swal("Error", err, "error");
    });
  }
});

}


$(document).ready(function(){
  setboxHeight();
  $("#btnNuevaEncuesta").click(function (){
      NuevaEncuesta();
  });

  $("#btnGuardarEncuesta").click(function (){
      GuardarEncuesta();
  });

  $("#btnRefrescarEncuesta").click(function (){
    RefrescarEncuesta();
  });

  $('#txtBuscar').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      var palabra=$("#txtBuscar").val();
      if(palabra!=""){
        BuscarEncuesta(palabra);
      }else{
        ComponenteImgIni();
        ListarEncuestas();
      }
    }
  });
  ComponenteImgIni();
  ListarEncuestas();

});
