function obtenerDatos() {
  var url =
    "https://prod-15.brazilsouth.logic.azure.com:443/workflows/16dff5ebd1414e91937feb3b61c9f810/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=sqkV8PmTkkiC0p7JWIbz3SdkLaE9BPGJ_osv3i-le-8";

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log("Respuesta del servidor")
      fetch("./js/referencias.json")
        .then((response) => {
          return response.json();
        })
        console.log("Entro al JSON")
        .then((jsondata) => cambiarListas(data, jsondata));
    });
}

function cambiarListas(data, referencia) {
  referencias = referencia;
  console.log(data.usuarios)
  inspectores = data.usuarios;
  let listInspector =
    "<option disabled selected>Selecciona una opción</option>";
  let listReferencias =
    "<option disabled selected>Selecciona una opción</option>";
  let listCentroTrabajo =
    "<option disabled selected>Selecciona una opción</option>";
  let listTurno = "<option disabled selected>Selecciona una opción</option>";
  let listJefeTurno =
    "<option disabled selected>Selecciona una opción</option>";
  let listProceIncumplido =
    "<option disabled selected>Selecciona una opción</option>";
  let listFactores = "<option disabled selected>Selecciona una opción</option>";
  let listFuncionario =
    "<option disabled selected>Selecciona una opción</option>";
  let listDefectos = "<option disabled selected>Selecciona una opción</option>";

  for (var i = 0; i < data.usuarios.length; i++) {
    listInspector +=
      "<option value='" +
      data.usuarios[i].Codigo +
      " - " +
      data.usuarios[i].Nombre +
      "'>" +
      data.usuarios[i].Codigo +
      " - " +
      data.usuarios[i].Nombre +
      "</option>";
  }

  for (var i = 0; i < referencias.length; i++) {
    listReferencias +=
      "<option value='" +
      referencias[i].Codigo +
      "'>" +
      referencias[i].Codigo +
      "</option>";
  }

  for (var i = 0; i < data.CentroTrabajo.length; i++) {
    listCentroTrabajo +=
      "<option value='" +
      data.CentroTrabajo[i].Codigo +
      " - " +
      data.CentroTrabajo[i].Recurso +
      "'>" +
      data.CentroTrabajo[i].Codigo +
      " - " +
      data.CentroTrabajo[i].Recurso +
      "</option>";
  }

  for (var i = 0; i < data.Genericos.length; i++) {
    if (data.Genericos[i].Turno != "") {
      listTurno +=
        "<option value='" +
        data.Genericos[i].Turno +
        "'>" +
        data.Genericos[i].Turno +
        "</option>";
    }
  }

  for (var i = 0; i < data.Genericos.length; i++) {
    if (data.Genericos[i].Jefe_turno != "") {
      listJefeTurno +=
        "<option value='" +
        data.Genericos[i].Jefe_turno +
        "'>" +
        data.Genericos[i].Jefe_turno +
        "</option>";
    }
  }

  for (var i = 0; i < data.Genericos.length; i++) {
    if (data.Genericos[i].Procedimiento_incumplido != "") {
      listProceIncumplido +=
        "<option value='" +
        data.Genericos[i].Procedimiento_incumplido +
        "'>" +
        data.Genericos[i].Procedimiento_incumplido +
        "</option>";
    }
  }

  for (var i = 0; i < data.Genericos.length; i++) {
    if (data.Genericos[i].Proveedores != "") {
      proveedores +=
        "<option value='" +
        data.Genericos[i].Proveedores +
        "'>" +
        data.Genericos[i].Proveedores +
        "</option>";
    }
  }

  for (var i = 0; i < data.Genericos.length; i++) {
    if (data.Genericos[i].clientes != "") {
      clientes +=
        "<option value='" +
        data.Genericos[i].clientes +
        "'>" +
        data.Genericos[i].clientes +
        "</option>";
    }
  }

  for (var i = 0; i < data.Genericos.length; i++) {
    if (data.Genericos[i].Factor != "") {
      factores.push(JSON.parse(data.Genericos[i].Factor));
    }
  }

  factores.forEach(
    (factor) =>
      (listFactores +=
        "<option value='" + factor.factor + "'>" + factor.factor + "</option>")
  );

  for (var i = 0; i < data.Operarios.length; i++) {
    listFuncionario +=
      "<option value='" +
      data.Operarios[i].Codigo +
      " - " +
      data.Operarios[i].Apellido +
      " " +
      data.Operarios[i].Nombre +
      "'>" +
      data.Operarios[i].Codigo +
      " - " +
      data.Operarios[i].Apellido +
      " " +
      data.Operarios[i].Nombre +
      "</option>";
  }

  for (var i = 0; i < data.Defectos.length; i++) {
    listDefectos +=
      "<option value='" +
      data.Defectos[i].Codigo +
      " - " +
      data.Defectos[i].Descripcion +
      "'>" +
      data.Defectos[i].Codigo +
      " - " +
      data.Defectos[i].Descripcion +
      "</option>";
  }

  $("#nombreInspector").html(listInspector);
  $("#centroTrabajo").html(listCentroTrabajo);
  $("#horario").html(listTurno);
  $("#nombreLider").html(listJefeTurno);
  $("#procInterno").html(listProceIncumplido);
  $("#factor").html(listFactores);
  $("#nombreOperario").html(listFuncionario);
  $("#referenciaInspeccionada").html(listReferencias);
  $("#defecto").html(listDefectos);
}
