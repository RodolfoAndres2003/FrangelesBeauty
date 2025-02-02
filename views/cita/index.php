<?php
    include_once __DIR__ . '/../templates/barra.php';
?>
<h1 class="nombre-pagina">Agenda tu Cita</h1>
<p class="descripcion-pagina">Sigue los pasos y agenda tu cita</p>


<div id="app">
    <div class="tabs">
    <button type="button" data-paso="1">Servicios</button>
    <button type="button" data-paso="2">Informacion Cita</button>
    <button type="button" data-paso="3">Resumen</button>
    </div>
    <div id="paso-1" class="seccion">
        <h2>Servicios</h2>
        <p class="text-center">Escoge los servicios que requieres a continuacion.</p>
        <div id="servicios" class="listado-servicios"></div>
    </div>
    <div id="paso-2" class="seccion">
        <h2>Tus Datos y Cita</h2>
        <p class="text-center">Coloca tus datos y escoge la fecha de tu cita</p>
        <form class="formulario">
            <div class="campo">
                <label for="nombre">Nombre</label>
                <input 
                id="nombre" 
                type="text" 
                placeholder="Tu nombre"
                value="<?php echo $nombre; ?>"
                disabled
                >
            </div>
            <div class="campo">
                <label for="fecha">fecha</label>
                <input 
                id="fecha" 
                type="date" 
                min="<?php echo date('Y-m-d', strtotime('+1 day')); ?>"
                >
            </div>
            
            <div class="campo">
                <label for="hora">hora</label>
                <input 
                id="hora" 
                type="time" 
                >
            </div>
            <input type="hidden" id="id" value="<?php echo $id; ?>">
        </form>
    </div>
    <div id="paso-3" class="seccion contenido-resumen">
        <h2>Resumen</h2>
        <p class="text-center">Verifica que la informacion sea correcta</p>      
    </div>
    <div class="paginacion">
        <button 
            class="boton"   
            id="anterior"
        >&laquo; Anterior
        </button>
        <button 
            class="boton" 
            id="siguiente"
        >Siguiente &raquo; 
        </button>
    </div>
</div>
<?php 
    $script = "
        <script src='build/js/app.js'></script>
        <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
    ";
?>