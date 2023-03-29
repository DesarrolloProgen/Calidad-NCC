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
  $("#nomProvCli").html("");
  if (sel.value == "Manufactura") {
    divManufactura.style.display = "";
    $("#nomProvCli").html(clientes);
  }
  if (sel.value == "Compra" || sel.value == "Selecciona una opción") {
    divManufactura.style.display = "none";
    $("#nomProvCli").html(proveedores);
  }
}
