let paso = 1;
const pasoInicial = 1; 
const pasoFinal = 3; 

const cita = {
    id: '',
    nombre: '',
    fecha: '',
    hora: '',
    servicios: []
}

document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
})

function iniciarApp() {
    mostrarSeccion(); //Muestra y Oculta las secciones
    tabs(); //Cambia la Seccion cuando se presionen los tabs
    botonesPaginador(); // agrega o quita los botones del paginador
    paginaAnterior();
    paginaSiguiente();

    consultarAPI(); //Consulta la API en el backend de php

    idCliente();
    nombreCliente(); //Manda a llamar el nombre del cliente al objeto de cita
    seleccionarFecha(); //añade la fecha de la cita al objeto
    seleccionarHora(); //añade la hora de la cita al objeto

    mostrarResumen(); //Muestra el resumen de la cita
}
function mostrarSeccion() {
    //Ocultar la seccion que tenga la clase de mostrar 
    const seccionAnterior = document.querySelector('.mostrar');
    if(seccionAnterior){
        seccionAnterior.classList.remove('mostrar');
    }
    
    //Seleccionar la seccion con el paso...
    const pasoSelector = `#paso-${paso}`;
    const seccion = document.querySelector(pasoSelector);
    seccion.classList.add('mostrar');

    //quita la clase de actual al tab anterior
    const tabAnterior = document.querySelector('.actual');
    if(tabAnterior){
        tabAnterior.classList.remove('actual');
    }
    //Resalta el tab actual
    const tab = document.querySelector(`[data-paso = "${paso}"]`);
    tab.classList.add('actual');
}
function tabs(){
    const botones = document.querySelectorAll('.tabs button');
    
    botones.forEach(boton => {
        boton.addEventListener('click', function(e){
           paso = parseInt( e.target.dataset.paso);

           mostrarSeccion();
           botonesPaginador(); 
           
        });
    } )
}
function botonesPaginador(){
    const paginaAnterior = document.querySelector('#anterior');
    const paginaSiguiente = document.querySelector('#siguiente');

    if(paso === 1) {
        paginaAnterior.classList.add('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }else if (paso === 3){
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
        mostrarResumen();
    } else{
        paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.remove('ocultar');
    }
    mostrarSeccion();
}
function paginaAnterior() {
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', function(){
        if(paso <= pasoInicial) return;

        paso--;

        botonesPaginador();
    })
}
function paginaSiguiente() {
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', function(){
        if(paso >= pasoFinal) return;

        paso++;

        botonesPaginador();
    })
}
async function consultarAPI() {

    try {
        const url = '/api/servicios';
        const resultado = await fetch(url);
        const servicios = await resultado.json();
        mostrarServicios(servicios); 
    } catch (error) {
        console.log(error);
    }
}
function mostrarServicios(servicios){
    servicios.forEach(servicio => {
        const { id, nombre, precio} = servicio;

        const nombreServicio =document.createElement('P');
        nombreServicio.classList.add('nombre-servicio');
        nombreServicio.textContent = nombre;

        const precioServicio =document.createElement('P');
        precioServicio.classList.add('precio-servicio');
        precioServicio.textContent = `$${precio}`;
        
        const servicioDiv = document.createElement('DIV');
        servicioDiv.classList.add('servicio');
        servicioDiv.dataset.idServicio = id;
        servicioDiv.onclick = function (){
            seleccionarServicios(servicio);
        }

        servicioDiv.appendChild(nombreServicio);
        servicioDiv.appendChild(precioServicio);
        
        document.querySelector('#servicios').appendChild(servicioDiv);
    });
}
function seleccionarServicios(servicio){
    const { id } = servicio;
    const { servicios } = cita; //Extraer el arreglo de servicios

    //identificar el elemento al que se le da click
    const divServicio = document.querySelector(`[data-id-servicio="${id}"]`);
    //comprobar si un servicio ya fue agregado o quitarlo
    if(servicios.some(agregado => agregado.id === id)){
        //Eliminarlo
        cita.servicios = servicios.filter(agregado => agregado.id !== id);
        divServicio.classList.remove('seleccionado');
    } else {
        //Agregarlo
        cita.servicios = [...servicios, servicio]; // ...servicios || Toma una copia del arreglo de servicios
        divServicio.classList.add('seleccionado');
    }
   
}
function idCliente() {
    cita.id = document.querySelector('#id').value;
}
function nombreCliente(){
    cita.nombre = document.querySelector('#nombre').value;
}
function seleccionarFecha(){
    const inputFecha = document.querySelector('#fecha');
    inputFecha.addEventListener('input', function(e){

        const dia = new Date(e.target.value).getUTCDay();

        if([0].includes(dia)){
            e.target.value = '';
           mostrarAlerta('Los dias Domingos no abrimos', 'error', '.formulario');
        } else {
            cita.fecha = e.target.value;
        }
    } );
}
function seleccionarHora(){
    const inputHora = document.querySelector('#hora');
    inputHora.addEventListener('input', function(e){
        

        const horaCita = e.target.value;
        const hora = horaCita.split(":")[0];
        if(hora < 10 || hora >18 ) {
            e.target.value = '';
            mostrarAlerta('Nuestro turno de atencion es de 10am hasta las 7pm', 'error', '.formulario');
        } else {
            cita.hora = e.target.value;
            
        }
    });
}
function mostrarAlerta(mensaje, tipo, elemento, desaparece = true) {
    //Previene que se genere mas de una alerta
    const alertaPrevia = document.querySelector('.alerta');
    if(alertaPrevia) {
        alertaPrevia.remove();
    }

    //scripting para crear alerta
    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');
    alerta.classList.add(tipo);

    const referencia = document.querySelector(elemento);
    referencia.appendChild(alerta);
    if(desaparece){
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
    
}
function mostrarResumen() {
    const resumen =document.querySelector('.contenido-resumen');
    //Limpiar el contenido de Resumen
    while(resumen.firstChild){
        resumen.removeChild(resumen.firstChild);
    }
    
    if(Object.values(cita).includes('') || cita.servicios.length === 0 ){
        mostrarAlerta('hacen falta datos', 'error', '.contenido-resumen', false);

        return;
    }

    // Formatear el div de resumen
    const {nombre, fecha, hora, servicios} = cita;

    const nombreCliente = document.createElement('P');
    nombreCliente.innerHTML = `<span>Nombre:</span> ${nombre}`; // NOMBRE CLIENTE

    //Formatear la fecha en español
    const fechaObj = new Date(fecha);
    const mes = fechaObj.getMonth();
    const dia = fechaObj.getDate() + 2;
    const year = fechaObj.getFullYear();

    const fechaUTC = new Date(Date.UTC(year, mes , dia));

    const opciones = { weekday: 'long', year: 'numeric', month:'long', day: 'numeric' };
    const fechaFormateada = fechaUTC.toLocaleDateString('es-VE', opciones);

    const fechaCita = document.createElement('P');
    fechaCita.innerHTML = `<span>Fecha:</span> ${fechaFormateada}`; // FECHA FORMATEADA MOSTRANDO

    
    const horaCita = document.createElement('P');
    horaCita.innerHTML = `<span>Hora:</span> ${hora}`; // HORA MOSTRANDO

    //Heading para Datos cliente en Resumen
    const headingCliente = document.createElement('H3');
    headingCliente.textContent = 'Cita';
    resumen.appendChild(headingCliente);

    resumen.appendChild(nombreCliente);
    resumen.appendChild(fechaCita);
    resumen.appendChild(horaCita);

    //Heading para servicios en Resumen
    const headingServicios = document.createElement('H3');
    headingServicios.classList.add('pading-servicio');
    headingServicios.textContent = 'Servicios';
    resumen.appendChild(headingServicios);

    //Iterando y mostrando los servicios
    servicios.forEach(servicio => {
        const {id, precio, nombre} = servicio;
        const contenedorServicio = document.createElement('DIV');
        contenedorServicio.classList.add('contenedor-servicio');

        const textoServicio = document.createElement('P');
        textoServicio.textContent = nombre;

        const precioServicio =  document.createElement('P');
        precioServicio.innerHTML = `<span>Precio:</span> $${precio}`;

        contenedorServicio.appendChild(textoServicio);
        contenedorServicio.appendChild(precioServicio);

        resumen.appendChild(contenedorServicio);
    });
    //Boton para crear una cita
    const botonReservar = document.createElement('BUTTON'); 
    botonReservar.classList.add('boton');
    botonReservar.textContent = "Reservar Cita";
    botonReservar.onclick = reservarCita;


    resumen.appendChild(botonReservar);
}
async function reservarCita() {
    const { fecha, hora, servicios, id} = cita;

    const idServicios = servicios.map(servicio => servicio.id);
    // console.log(idServicios);
    
    const datos = new FormData();//Actua como un submit pero en js
    
    datos.append('fecha', fecha);
    datos.append('hora', hora);
    datos.append('usuarioId', id);
    datos.append('servicios', idServicios);


    try {
    //peticion hacia la api
    const url = '/api/citas'
    const respuesta = await fetch(url, {
        method: 'POST', 
        body: datos
    });
    const resultado = await respuesta.json();
    console.log(resultado);
    if(resultado.resultado){
        Swal.fire({
            icon: "success",
            title: "Cita Creada",
            text: "Tu cita ha sido Creada Correctamente",
            button: 'OK'
          }).then(()=> {
            window.location.reload();
          });
    }
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "EROR",
            text: "Hubo un error al guardar la Cita!"
          });
    }
    
    // console.log([...datos]);

}