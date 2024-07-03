<h1 class="nombre-pagina">LOGIN</h1>
<p class="descripcion-pagina">Inicia Sesion con tus datos</p>
<?php  
    include_once __DIR__ . "/../templates/alertas.php";
    
?>
<form class="formulario" method="POST" action="/">
    <div class="campo">
        <label for="email">Email</label>
        <input 
        type="email" 
        id="email" 
        placeholder="Ej: micorreo@gmail.com" 
        name="email"
        />
    </div>
    <div class="campo">
        <label for="password">Password</label>
        <input 
        type="password" 
        id="password" 
        placeholder="Ej: tu contraseña" 
        name="password"
        />
    </div>

    <input type="submit" class="boton" value="Iniciar Sesión">
</form>

<div class="acciones">
    <a href="/crear-cuenta">¿Aún no tienes una cuenta? Registrate!</a>
    <a href="/olvide">Olvidaste tu password?</a>
</div>