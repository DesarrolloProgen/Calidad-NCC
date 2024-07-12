/* ------------------------------------------------------------------------------------- */
/*                                       VARIABLES                                       */
/* ------------------------------------------------------------------------------------- */
const form = document.forms[0];
let factores = [];
let proveedores = "<option disabled selected>Selecciona una opción</option>";
let clientes = "<option disabled selected>Selecciona una opción</option>";
let referencias = [];
let inspectores = [];
var archivoNoConforme = [];
var archivoConforme = [];
var now = new Date();
var fecha = now.getMonth() + 1 + "-" + now.getDate() + "-" + now.getFullYear();
var minutos = now.getMinutes();
if (minutos < 10) minutos = "0" + minutos;
var hora = now.getHours() + ":" + minutos;
var fechayHora = fecha + " " + hora;

var nombreInspector = document.getElementById("nombreInspector");
var noCertificado = document.getElementById("noCertificado");
var referenciaInspeccionada = document.getElementById(
  "referenciaInspeccionada"
);
var descripcionreferencia = document.getElementById("descreferencia");
var tipoOrden = document.getElementById("tipoOrden");
var tipoCompra = document.getElementById("tipoCompra");
var nomProvCli = document.getElementById("nomProvCli");
var noOrden = document.getElementById("noOrden");
var cantidadLote = document.getElementById("cantidadLote");
var noMuestra = document.getElementById("noMuestra");
var noconforme = document.getElementById("noconforme");
var rechazadas = document.getElementById("rechazadas");
//Manufactura
var centroTrabajo = document.getElementById("centroTrabajo");
var horario = document.getElementById("horario");
var nombreOperario = document.getElementById("nombreOperario1");
var nombreOperario2 = document.getElementById("nombreOperario2");
var resO = document.getElementsByName("ResponsableO1");
var controlO = document.getElementsByName("ControlProceso1");
var resO2 = document.getElementsByName("ResponsableO2");
var controlO2 = document.getElementsByName("ControlProceso2");
var controlProcesoO;
var responsableO;
var controlProcesoO2;
var responsableO2;
var nombreLider = document.getElementById("nombreLider");
var resJ = document.getElementsByName("ResponsableJ");
var responsableJ;
var procInterno = document.getElementById("procInterno");
// descripcion de la inspeccion
var factor = document.getElementById("factor");
var descripcionFactor = document.getElementById("descripcionFactor");
var AnalisisJP = document.getElementsByName("AnalisisJP");
var AnalisisJefePlanta;
var AnalisisLT = document.getElementsByName("AnalisisLT");
var AnalisisLiderTurno;
var AnalisisF = document.getElementsByName("AnalisisF");
var AnalisisFuncionario;
var AnalisisI = document.getElementsByName("AnalisisI");
var AnalisisInspector;
var AnalisisIM = document.getElementsByName("AnalisisIM");
var AnalisisIngenieroManufactura;
var descripcionAnalisis = document.getElementById("descripcionAnalisis");
// descripcion del reporte
var defecto = document.getElementById("defecto");
var descripcion = document.getElementById("descripcion");
var correo = document.getElementById("emails").options;

var data = {};

/* ------------------------------------------------------------------------------------- */
/*                                       VALIDACIONES                                    */
/* ------------------------------------------------------------------------------------- */
function validar_email(email) {
  var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email) ? true : false;
}
function validaciones(correos) {
  // Validacion de Nombre del Instector
  if (
    nombreInspector.value == null ||
    nombreInspector.value == "" ||
    nombreInspector.value == "Selecciona una opción"
  ) {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML = "Seleccione un Inspector";
    return false;
  }
  // Referencia Inspeccionada
  if (
    referenciaInspeccionada.value == null ||
    referenciaInspeccionada.value == "" ||
    referenciaInspeccionada.value == "Selecciona una opción"
  ) {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML =
      "Seleccione la referencia Inspeccionada";
    return false;
  }

  // Tipo de Orden
  if (
    tipoOrden.value == null ||
    tipoOrden.value == "" ||
    tipoOrden.value == "Selecciona una opción"
  ) {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML =
      "Seleccione el tipo de orden que va a reportar";
    return false;
  }
  if (
    tipoOrden === "Compra" && (tipoCompra.value == null ||
    tipoCompra.value == "" ||
    tipoCompra.value == "Selecciona una opción")
  ) {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML =
      "Ingrese El filtro de tipo de Compra (Solo se aceptan números)";
    return false;
  }
  if (
    noOrden.value == null ||
    (noOrden.value == "" && tipoCompra != "Lote con Observación")
  ) {
    // Numero de la Orden
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML =
      "Ingrese un número de Orden (Solo se aceptan números)";
    return false;
  }
  // Nombre Cliente Proveedor
  if (
    nomProvCli.value == null ||
    nomProvCli.value == "" ||
    nomProvCli.value == "Selecciona una opción"
  ) {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML =
      "Seleccione el nombre del cliente o proveedor";
    return false;
  }
  // Cantidad del Lote
  if (cantidadLote.value == null || cantidadLote.value == "") {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML =
      "Ingrese la cantidad del lote/Seriales (Solo se aceptan números)";
    return false;
  }
  //Numero de Muestra
  if (noMuestra.value == null || noMuestra.value == "") {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML =
      "Ingrese el número de la muestra";
    return false;
  }
  //Cantidad de la muestra no conforme
  if (noconforme.value == null || noconforme.value == "") {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML =
      "Ingrese el número de muestra no conforme (Solo se aceptan números)";
    return false;
  }
  //Cantidad de las piezas rechazadas
  if (rechazadas.value == null || rechazadas.value == "") {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML =
      "Ingrese el número de la muestras rechazadas (Solo se aceptan números)";
    return false;
  }
  //VALIDACIONES SI EL TIPO DE ORDEN ES MANUFACTURA
  if (tipoOrden.value == "Manufactura") {
    // Centro de Trabajo
    if (
      centroTrabajo.value == null ||
      centroTrabajo.value == "" ||
      centroTrabajo.value == "Selecciona una opción"
    ) {
      document.getElementById("headermensaje").style.background = "#ff3c37";
      document.getElementById("titulomensaje").innerHTML = "ERROR";
      document.getElementById("mensaje").innerHTML =
        "Ingrese el Centro de Trabajo que reporta";
      return false;
    }
    // horario
    if (
      horario.value == null ||
      horario.value == "" ||
      horario.value == "Selecciona una opción"
    ) {
      document.getElementById("headermensaje").style.background = "#ff3c37";
      document.getElementById("titulomensaje").innerHTML = "ERROR";
      document.getElementById("mensaje").innerHTML =
        "Seleccione alguno de los distintos horarios";
      return false;
    }
    // nombre del Operario
    if (
      nombreOperario.value == null ||
      nombreOperario.value == "" ||
      nombreOperario.value == "Selecciona una opción"
    ) {
      document.getElementById("headermensaje").style.background = "#ff3c37";
      document.getElementById("titulomensaje").innerHTML = "ERROR";
      document.getElementById("mensaje").innerHTML =
        "Ingrese el nombre del funcionario";
      return false;
    }
    //¿El operario es responsable?
    //  Rervisar radio seleccionado
    for (i = 0; i < resO.length; i++) {
      if (resO[i].checked) {
        responsableO = resO[i].value;
      }
    }
    for (i = 0; i < resO2.length; i++) {
      if (resO2[i].checked) {
        responsableO2 = resO2[i].value;
      }
    }
    if (responsableO == null || responsableO == "") {
      document.getElementById("headermensaje").style.background = "#ff3c37";
      document.getElementById("titulomensaje").innerHTML = "ERROR";
      document.getElementById("mensaje").innerHTML =
        responsableO + "Seleccione si el funcionario es el responsable";
      return false;
    }
    //¿El operario es responsable?
    //  Rervisar radio seleccionado
    for (i = 0; i < controlO.length; i++) {
      if (controlO[i].checked) {
        controlProcesoO = controlO[i].value;
      }
    }
    for (i = 0; i < controlO2.length; i++) {
      if (controlO2[i].checked) {
        controlProcesoO2 = controlO2[i].value;
      }
    }
    if (controlProcesoO == null || controlProcesoO == "") {
      document.getElementById("headermensaje").style.background = "#ff3c37";
      document.getElementById("titulomensaje").innerHTML = "ERROR";
      document.getElementById("mensaje").innerHTML =
        controlProcesoO +
        "Seleccione si el funcionario realizo control de proceso";
      return false;
    }
    // Nombre Jefe de turno
    if (
      nombreLider.value == null ||
      nombreLider.value == "" ||
      nombreLider.value == "Selecciona una opción"
    ) {
      document.getElementById("headermensaje").style.background = "#ff3c37";
      document.getElementById("titulomensaje").innerHTML = "ERROR";
      document.getElementById("mensaje").innerHTML =
        "Ingrese el nombre del Lider de turno";
      return false;
    }
    //Revisar radio seleccionado
    for (i = 0; i < resJ.length; i++) {
      if (resJ[i].checked) {
        responsableJ = resJ[i].value;
      }
    }
    //¿Jefe de Turno es responsable?
    if (responsableJ == null || responsableJ == "") {
      document.getElementById("headermensaje").style.background = "#ff3c37";
      document.getElementById("titulomensaje").innerHTML = "ERROR";
      document.getElementById("mensaje").innerHTML =
        "Seleccione si el Jefe es el responsable";
      return false;
    }
    // Procedimiento incumplido
    if (
      procInterno.value == null ||
      procInterno.value == "" ||
      procInterno.value == "Selecciona una opción"
    ) {
      document.getElementById("headermensaje").style.background = "#ff3c37";
      document.getElementById("titulomensaje").innerHTML = "ERROR";
      document.getElementById("mensaje").innerHTML =
        "Ingrese el proceso que se incumplió";
      return false;
    }

    // Factor
    if (
      factor.value == null ||
      factor.value == "" ||
      factor.value == "Selecciona una opción"
    ) {
      document.getElementById("headermensaje").style.background = "#ff3c37";
      document.getElementById("titulomensaje").innerHTML = "ERROR";
      document.getElementById("mensaje").innerHTML =
        "Seleccione el factor del análisis";
      return false;
    }
    // descripccion del Factor
    if (
      descripcionFactor.value == null ||
      descripcionFactor.value == "" ||
      descripcionFactor.value == "Selecciona una opción"
    ) {
      document.getElementById("headermensaje").style.background = "#ff3c37";
      document.getElementById("titulomensaje").innerHTML = "ERROR";
      document.getElementById("mensaje").innerHTML =
        "Seleccione la descripción del factor del análisis";
      return false;
    }

    for (i = 0; i < AnalisisJP.length; i++) {
      if (AnalisisJP[i].checked) {
        AnalisisJefePlanta = AnalisisJP[i].value;
      }
    }
    // Analisis del Jefe de Planta
    if (AnalisisJefePlanta == null || AnalisisJefePlanta == "") {
      document.getElementById("headermensaje").style.background = "#ff3c37";
      document.getElementById("titulomensaje").innerHTML = "ERROR";
      document.getElementById("mensaje").innerHTML =
        "Seleccione si el Jefe de planta intervino en el análisis";
      return false;
    }

    for (i = 0; i < AnalisisLT.length; i++) {
      if (AnalisisLT[i].checked) {
        AnalisisLiderTurno = AnalisisLT[i].value;
      }
    }

    if (AnalisisLiderTurno == null || AnalisisLiderTurno == "") {
      document.getElementById("headermensaje").style.background = "#ff3c37";
      document.getElementById("titulomensaje").innerHTML = "ERROR";
      document.getElementById("mensaje").innerHTML =
        "Seleccione si el Lider de Turno intervino en el análisis";
      return false;
    }

    for (i = 0; i < AnalisisF.length; i++) {
      if (AnalisisF[i].checked) {
        AnalisisFuncionario = AnalisisF[i].value;
      }
    }

    if (AnalisisFuncionario == null || AnalisisFuncionario == "") {
      document.getElementById("headermensaje").style.background = "#ff3c37";
      document.getElementById("titulomensaje").innerHTML = "ERROR";
      document.getElementById("mensaje").innerHTML =
        "Seleccione si el Funcionario intervino en el análisis";
      return false;
    }

    for (i = 0; i < AnalisisI.length; i++) {
      if (AnalisisI[i].checked) {
        AnalisisInspector = AnalisisI[i].value;
      }
    }

    if (AnalisisInspector == null || AnalisisInspector == "") {
      document.getElementById("headermensaje").style.background = "#ff3c37";
      document.getElementById("titulomensaje").innerHTML = "ERROR";
      document.getElementById("mensaje").innerHTML =
        "Seleccione si el Inspector intervino en el análisis";
      return false;
    }

    for (i = 0; i < AnalisisIM.length; i++) {
      if (AnalisisIM[i].checked) {
        AnalisisIngenieroManufactura = AnalisisIM[i].value;
      }
    }

    if (
      AnalisisIngenieroManufactura == null ||
      AnalisisIngenieroManufactura == ""
    ) {
      document.getElementById("headermensaje").style.background = "#ff3c37";
      document.getElementById("titulomensaje").innerHTML = "ERROR";
      document.getElementById("mensaje").innerHTML =
        "Seleccione si el Ingeniero de Manufactura intervino en el análisis";
      return false;
    }

    // descripcion del analisis
    if (descripcionAnalisis.value == null || descripcionAnalisis.value == "") {
      document.getElementById("headermensaje").style.background = "#ff3c37";
      document.getElementById("titulomensaje").innerHTML = "ERROR";
      document.getElementById("mensaje").innerHTML =
        "Ingrese la descripción del análisis de la inspección";
      return false;
    }
  }
  // Defecto de la inspección
  if (
    defecto.value == null ||
    defecto.value == "" ||
    defecto.value == "Selecciona una opción"
  ) {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML =
      "Seleccione el defecto de la inspección";
    return false;
  }

  // Descripcion de la inspeccion.
  if (descripcion.value == null || descripcion.value == "") {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML =
      "Ingrese la descripción de la inspección";
    return false;
  }
  if (archivoNoConforme == null || archivoNoConforme == "") {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML =
      "Ingrese archivo de evidencia de No conformidad";
    return false;
  }
  if (correos.length <= 0) {
    document.getElementById("headermensaje").style.background = "#ff3c37";
    document.getElementById("titulomensaje").innerHTML = "ERROR";
    document.getElementById("mensaje").innerHTML =
      "Debe ingresar los correos de notificicación";
    return false;
  }
  return true;
}
