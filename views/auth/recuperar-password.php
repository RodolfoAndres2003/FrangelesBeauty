<h1 class="nombre-pagina">Reestablecer Password</h1>
<p class="descripcion-pagina">Ingresa un nuevo Password a continuacion.</p>
<?php  
    include_once __DIR__ . "/../templates/alertas.php";
    if($error) return;
?>
<form class="formulario" method="POST">

    <div class="campo">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Tu nuevo password">
    </div>
    <input type="submit" class="boton" value="Confirmar">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Inicia Sesión!</a>
    <a href="/crear-cuenta">¿Aún no tienes una cuenta? Registrate!</a>
</div>