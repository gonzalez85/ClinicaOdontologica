window.addEventListener('load', function () {
    (function () {

        //con fetch invocamos a la API de peliculas con el método GET
        //nos devolverá un JSON con una colección de peliculas
        const url = '/turno/todos';
        const settings = {
            method: 'GET'
        }

        fetch(url, settings)
            .then(response => response.json())
            .then(data => {
                //recorremos la colección de turnos del JSON
                for (turno of data) {
                    //por cada turno armaremos una fila de la tabla
                    //cada fila tendrá un id que luego nos permitirá borrar la fila si eliminamos el turno
                    var table = document.getElementById("turnoTable");
                    var turnoRow = table.insertRow();
                    let tr_id = 'tr_turno_' + turno.id;
                    turnoRow.id = tr_id;

                    //por cada turno creamos un boton delete que agregaremos en cada fila para poder eliminar la misma
                    //dicho boton invocara a la funcion de java script deleteByKey que se encargará
                    //de llamar a la API para eliminar una pelicula
                    let deleteButton = '<button' +
                        ' id=' + '\"' + 'btn_delete_turno_' + turno.id + '\"' +
                        ' type="button" onclick="deleteBy(' + turno.id + ')" class="btn btn-danger btn-sm">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">' +
                        '<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>' +
                        '<path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>' +
                        '</svg>' +
                        '</button>';

                    //por cada turno creamos un boton que muestra el id y que al hacerle clic invocará
                    //a la función de java script findBy que se encargará de buscar el turno que queremos
                    //modificar y mostrar los datos del mismo en un formulario.
                    let updateButton = '<button' +
                        ' id=' + '\"' + 'btn_id_turno_' + turno.id + '\"' +
                        ' type="button" onclick="editar(' + turno.id + ')" class="btn btn-warning btn-sm">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">' +
                        '<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>' +
                        '<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>' +
                        '</svg>' +
                        '</button>';

                    //armamos cada columna de la fila
                    //como primer columna pondremos el boton modificar
                    //luego los datos del turno
                    //como ultima columna el boton eliminar
                    console.log(turno)
                    turnoRow.innerHTML = '<td>' + turno.id + '</td>' +
                        '<td id="paciente_' + turno.id + '" data-id="' + turno.pacienteId + '">' + turno.pacienteNombreApellido.toUpperCase() + '</td>' +
                        '<td id="odontologo_' + turno.id + '" data-id="' + turno.odontologoId + '">' + turno.odontologoNombreApellido.toUpperCase() + '</td>' +
                        '<td id=fecha_' + turno.id + '>' + turno.fecha + '</td>' +
                        '<td class="action-column">' + updateButton + '</td>' +
                        '<td class="action-column">' + deleteButton + '</td>';

                };

            })
    })

    (function () {
        let pathname = window.location.pathname;
        if (pathname == "./get_turnos.html") {
            document.querySelector(".nav .nav-item a:last").addClass("active");
        }
    })
})