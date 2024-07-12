window.addEventListener("load", function () {
  const url =
    "https://prod-18.brazilsouth.logic.azure.com:443/workflows/6d5c28067ac142af92a35472bb3b610d/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7C20RRAi7cQVYJZAWCtcq75EGd5NgkCMdYEvpmrQw28";

  obtenerDatos();

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(inspectores);
    let correos = [];
    [...correo].forEach((element) => {
      correos.push(element.value);
    });

    if (!validaciones(correos)) return false;

    if (tipoOrden.value == "Compra") {
      data = {
        fecha: fechayHora,
        nombreInspector: nombreInspector.value,
        tipoOrden: tipoOrden.value,
        tipoCompra: tipoCompra.value,
        noCertificado:
          tipoCompra.value != "Lote con Observación" ? noCertificado.value : "",
        referenciaInspeccionada: referenciaInspeccionada.value,
        descripcionreferencia: descripcionreferencia.value,
        noOrden: noOrden.value,
        nomProvCli: nomProvCli.value,
        cantidadLote: cantidadLote.value,
        noMuestra: noMuestra.value,
        noconforme: noconforme.value,
        rechazadas: rechazadas.value,
        factor: factor.value,
        descripcionFactor: descripcionFactor.value,
        AnalisisJefePlanta: AnalisisJefePlanta == "Si" ? true : false,
        AnalisisLiderTurno: AnalisisLiderTurno == "Si" ? true : false,
        AnalisisFuncionario: AnalisisFuncionario == "Si" ? true : false,
        AnalisisInspector: AnalisisInspector == "Si" ? true : false,
        AnalisisIngenieroManufactura:
          AnalisisIngenieroManufactura == "Si" ? true : false,
        descripcionAnalisis: descripcionAnalisis.value,
        defecto: defecto.value,
        descripcion: descripcion.value,
        archivoNoConforme: archivoNoConforme,
        archivoConforme: archivoConforme,
        correo: correos.join(";"),
        correoInspector: inspectores.find(
          (inspector) =>
            inspector.Codigo + " - " + inspector.Nombre ===
            nombreInspector.value
        ).Correo,
      };
    } else {
      data = {
        fecha: fechayHora,
        nombreInspector: nombreInspector.value,
        tipoOrden: tipoOrden.value,
        noCertificado: noCertificado.value,
        referenciaInspeccionada: referenciaInspeccionada.value,
        descripcionreferencia: descreferencia.value,
        noOrden: noOrden.value,
        nomProvCli: nomProvCli.value,
        cantidadLote: cantidadLote.value,
        noMuestra: noMuestra.value,
        noconforme: noconforme.value,
        rechazadas: rechazadas.value,
        centroTrabajo: centroTrabajo.value,
        horario: horario.value,
        nombreOperario: nombreOperario.value,
        responsableO: responsableO == "Si" ? true : false,
        controlProcesoO: controlProcesoO == "Si" ? true : false,
        nombreOperario2: nombreOperario2.value,
        responsableO2: responsableO2 == "Si" ? true : false,
        controlProcesoO2: controlProcesoO2 == "Si" ? true : false,
        nombreLider: nombreLider.value,
        responsableJ: responsableJ == "Si" ? true : false,
        procInterno: procInterno.value,
        factor: factor.value,
        descripcionFactor: descripcionFactor.value,
        AnalisisJefePlanta: AnalisisJefePlanta == "Si" ? true : false,
        AnalisisLiderTurno: AnalisisLiderTurno == "Si" ? true : false,
        AnalisisFuncionario: AnalisisFuncionario == "Si" ? true : false,
        AnalisisInspector: AnalisisInspector == "Si" ? true : false,
        AnalisisIngenieroManufactura:
          AnalisisIngenieroManufactura == "Si" ? true : false,
        descripcionAnalisis: descripcionAnalisis.value,
        defecto: defecto.value,
        descripcion: descripcion.value,
        archivoNoConforme: archivoNoConforme,
        archivoConforme: archivoConforme,
        correo: correos.join(";"),
        correoInspector: inspectores.find(
          (inspector) =>
            inspector.Codigo + " - " + inspector.Nombre ===
            nombreInspector.value
        ).Correo,
      };
    }
    console.log(data);
    const settings = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    cargando();
    enviarPeticion(settings);
  });

  function enviarPeticion(settings) {
    fetch(url, settings).then((response) => {
      console.log(response);
      document.getElementById("headermensaje").style.background = "#6EF05F";
      document.getElementById("titulomensaje").innerHTML = "Realizado";
      document.getElementById("mensaje").innerHTML =
        "Se realizó correctamente su registro.";
      form.reset();
      archivoConforme = [];
      archivoNoConforme = [];
    });
  }

  function cargando() {
    document.getElementById("headermensaje").style.background = "#4040ff";
    document.getElementById("titulomensaje").innerHTML = "Cargando";
    document.getElementById("mensaje").innerHTML =
      '<img src="https://acegif.com/wp-content/uploads/loading-25.gif" alt="Cargando" width="50px" height="50px"><span style="padding-left: 10px">Cargando...</span>';
  }
});

jQuery(document).ready(function () {
  // Listen for the input event.
  jQuery("#noOrden").on("input", function (evt) {
    // Allow only numbers.
    jQuery(this).val(
      jQuery(this)
        .val()
        .replace(/[^0-9.]/g, "")
    );
  });

  jQuery("#rechazadas").on("input", function (evt) {
    // Allow only numbers.
    jQuery(this).val(
      jQuery(this)
        .val()
        .replace(/[^0-9.]/g, "")
    );
  });
  jQuery("#cantidadLote").on("input", function (evt) {
    // Allow only numbers.
    jQuery(this).val(
      jQuery(this)
        .val()
        .replace(/[^0-9.]/g, "")
    );
  });

  jQuery("#noMuestra").on("input", function (evt) {
    // Allow only numbers.
    jQuery(this).val(
      jQuery(this)
        .val()
        .replace(/[^0-9.]/g, "")
    );
  });

  jQuery("#noconforme").on("input", function (evt) {
    // Allow only numbers.
    jQuery(this).val(
      jQuery(this)
        .val()
        .replace(/[^0-9.]/g, "")
    );
  });
});

// Guardar archivos No conformes
function saveFileNoConforme(f) {
  const file = f.files[0];
  const fr = new FileReader();
  fr.addEventListener("load", function () {
    let contenido = fr.result.split(",");
    const obj = {
      archivo: f.name,
      filename: file.name,
      mimeType: file.type,
      contenido: {
        "$content-type": file.type,
        $content: contenido[1],
      },
    };
    archivoNoConforme.push(obj);
  });
  if (file) {
    fr.readAsDataURL(file);
  }
  console.log(archivoNoConforme);
}

// Guardar archivo conforme
function saveFileConforme(f) {
  const file = f.files[0];
  const fr = new FileReader();
  fr.addEventListener("load", function () {
    let contenido = fr.result.split(",");
    const obj = {
      archivo: f.name,
      filename: file.name,
      mimeType: file.type,
      contenido: {
        "$content-type": file.type,
        $content: contenido[1],
      },
    };
    archivoConforme.push(obj);
  });
  if (file) {
    fr.readAsDataURL(file);
  }
  console.log(archivoConforme);
}

$(document).ready(function () {
  var multipleCancelButton = new Choices("#emails", {
    removeItemButton: true,
    maxItemCount: 20,
    searchResultLimit: 8,
    renderChoiceLimit: 20,
  });
});
