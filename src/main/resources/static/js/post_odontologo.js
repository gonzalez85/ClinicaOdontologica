window.addEventListener('load', function () {

    //Al cargar la pagina buscamos y obtenemos el formulario donde estarán
    //los datos que el usuario cargará de la nueva pelicula
    const formulario = document.querySelector('#add_new_odontologo');

    //Ante un submit del formulario se ejecutará la siguiente funcion
    formulario.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que se envíe el formulario por defecto

       //creamos un JSON que tendrá los datos de la nueva película
        const formData = {
            nombre: document.querySelector('#nombre_odontologo').value,
            apellido: document.querySelector('#apellido_odontologo').value,
            matricula: document.querySelector('#matricula_odontologo').value,
        };
        //invocamos utilizando la función fetch la API clinicaOdontologica con el método POST que guardará
        //el paciente que enviaremos en formato JSON
        const url = '/odontologo';
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }

        fetch(url, settings)
            .then(response => {
                 if (!response.ok) {
                     // Si la respuesta no es exitosa (por ejemplo, error 400), lanzamos un error
                     return response.json().then(errorData => {
                         throw new Error(errorData.message || 'Error al agregar el odontologo, verifique los campos: Todos los campos deben estar completos, Nombre, Apellido y Matricula deben tener entre 3 y 15 caracteres');
                     });
                 }
                 return response.json(); // Si la respuesta es correcta, convertimos a JSON
             })
             .then(data => {
                 //Si no hay ningun error se muestra un mensaje diciendo que la pelicula
                 //se agrego bien
                 let successAlert = '<div class="alert alert-success alert-dismissible">' +
                     '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                     '<strong></strong> Odontologo agregado </div>'

                 document.querySelector('#response').innerHTML = successAlert;
                 document.querySelector('#response').style.display = "block";
                 resetUploadForm();

            })
            .catch(error => {
                    //Si hay algun error se muestra un mensaje diciendo que la pelicula
                    //no se pudo guardar y se intente nuevamente
                    let errorAlert = '<div class="alert alert-danger alert-dismissible">' +
                                     '<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                                     '<strong> Error: ' + error.message + '</strong> </div>'

                      document.querySelector('#response').innerHTML = errorAlert;
                      document.querySelector('#response').style.display = "block";
                     //se dejan todos los campos vacíos por si se quiere ingresar otra pelicula
                     resetUploadForm();})
    });


    function resetUploadForm(){
        document.querySelector('#nombre_odontologo').value = "";
        document.querySelector('#apellido_odontologo').value = "";
        document.querySelector('#matricula_odontologo').value = "";

    }

//    (function(){
//        let pathname = window.location.pathname;
//        if(pathname === "/"){
//            document.querySelector(".nav .nav-item a:first").addClass("active");
//        } else if (pathname == "../post_odontologos.html") {
//            document.querySelector(".nav .nav-item a:last").addClass("active");
//        }
//    })();
});