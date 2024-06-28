/* ------------------------------------------------------------------------------------- */
/*                                 FUNCIONES ONCHAGE                                     */
/* ------------------------------------------------------------------------------------- */
/* Funciones Onchange para las condiciones de mostrar diferentes 
                                     DIV dependiendo de selecciones por parte del usuario*/
/*                 SELECCIONES DEPENDIENDO DE LA REFERENCIA SELECCIONADA                 */

function referenciaOnchange(selected) {
  descripcionReferencia = referencias.find(
    (referencia) => referencia.Codigo === selected.value
  );
  $("#descreferencia").val(descripcionReferencia.Descripcion);
}

/*                    SELECCIONES DEPENDIENDO DEL FACTOR SELECCIONADO                    */

function factorChange(selected) {
  $("#descripcionFactor").html("");
  listdescripcionfactores =
    "<option disabled selected>Selecciona una opción</option>";
  clienteSeleccionado = factores.find(
    (factor) => factor.factor === selected.value
  );
  for (let i = 0; i < clienteSeleccionado.opciones.length; i++) {
    listdescripcionfactores +=
      "<option value='" +
      clienteSeleccionado.opciones[i] +
      "'>" +
      clienteSeleccionado.opciones[i] +
      "</option>";
  }
  $("#descripcionFactor").html(listdescripcionfactores);
}

/*                    BUSCAR EN LOS SELECTS GRANDES                    */

$(document).ready(function () {
  $(".js-example-basic-single").select2();
});

/*             SELECCIONES DEPENDIENDO DEL TIPO DE ORDEN SELECCIONADA                  */

function ordenOnchange(sel) {
  divManufactura = document.getElementById("seccionManufactura");
  divDescripcion = document.getElementById("seccionDescripcionInspeccion");
  divTipoCompra = document.getElementById("filtroCompra");
  divCompraDependiente = document.getElementById("filtroCompraDependiente");

  $("#nomProvCli").html("");
  if (sel.value == "Manufactura" || sel.value == "Producto Terminado") {
    divManufactura.style.display = "";
    divDescripcion.style.display = "";
    divTipoCompra.style.display = "none";
    divCompraDependiente.style.display = "";
    $("#nomProvCli").html(clientes);
    sel.value == "Producto Terminado"
      ? $("#Cantidad").html("Cantidad de Seriales")
      : $("#Cantidad").html("Cantidad del Lote");
    sel.value == "Producto Terminado"
      ? $("#cantidadLote").attr(
          "placeholder",
          "Ingrese la cantidad de seriales"
        )
      : $("#cantidadLote").attr("placeholder", "Ingrese la cantidad del Lote");
  }
  if (sel.value == "Compra" || sel.value == "Selecciona una opción") {
    divManufactura.style.display = "none";
    divDescripcion.style.display = "none";
    divTipoCompra.style.display = "";
    $("#nomProvCli").html(proveedores);
  }
}

function filtroCompraOnchange(sel) {
  divCompraDependiente = document.getElementById("filtroCompraDependiente");
  if (sel.value === "Lote con Observación") {
    divCompraDependiente.style.display = "none";
  } else {
    divCompraDependiente.style.display = "";
  }
}
