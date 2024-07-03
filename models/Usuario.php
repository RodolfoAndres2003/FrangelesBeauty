<?php
namespace Model;

class Usuario extends ActiveRecord {
    //Base de Datos
    protected static $tabla = 'usuarios';
    protected static $columnasDB = ['nombre', 'apellido', 'email', 'password', 'telefono', 'admin', 'confirmado', 'token'];

    
    public $id;
    public $nombre;
    public $apellido;
    public $email;
    public $password;
    public $telefono;
    public $admin;
    public $confirmado;
    public $token;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->apellido = $args['apellido'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->password = $args['password'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->admin = $args['admin'] ?? '0';
        $this->confirmado = $args['confirmado'] ?? '0';
        $this->token = $args['token'] ?? '';
    }
    //Mensajes de validacion para la creacion de una cuenta
    public function validarNuevaCuenta(){
        if(!$this->nombre){
            self::$alertas['error'][] = 'El nombre es Obligatorio';
        }
        if(!$this->apellido){
            self::$alertas['error'][] = 'El apellido es Obligatorio';
        }
        if(!$this->telefono){
            self::$alertas['error'][] = 'El telefono es Obligatorio';
        }
        if(!$this->email){
            self::$alertas['error'][] = 'El email es Obligatorio';
        }
        if(!$this->password){
            self::$alertas['error'][] = 'El password es Obligatorio';
        }
        if(strlen($this->password) < 8){
            self::$alertas['error'][] = 'El password debe contener al menos 8 Caracteres';
        }
        
        return self::$alertas;
    }
    public function validarLogin(){
        if(!$this->email){
            self::$alertas['error'][] = 'El email es Obligatorio';
        }
        if(!$this->password){
            self::$alertas['error'][] = 'El password es Obligatorio';
        }
        return self::$alertas;
    }

    public function validarEmail(){
        if(!$this->email){
            self::$alertas['error'][] = 'El email es Obligatorio';
        }
        return self::$alertas;
    }

    public function existeUsuario() {
        //Revisa si el usuario ya exite
        $query = "SELECT * FROM " . self::$tabla . " WHERE email = '" . $this->email . "' LIMIT 1";
        $resultado = self::$db->query($query);
       
        
        if($resultado->num_rows){
            self::$alertas['error'][] = 'El Usuario ya esta registrado';
        }
        return $resultado;
    }
    public function hashPassword(){
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
    }
    public function crearToken(){
        $this->token = uniqid();
    }
    public function comprobarPasswordAndverificado($password){

        $resultado = password_verify($password, $this->password);
        
        if(!$resultado || !$this->confirmado){
            self::$alertas['error'][] = "Password Incorrecto o su cuenta no ha sido confirmada";
        } else {
            return true;
        }
        
    }
    public function validarPassword() {
        if(!$this->password) {
            self::$alertas['error'][] = 'El password es Obligatorio';
        }
        if(strlen($this->password) < 8) {
            self::$alertas['error'][] = 'El password debe tener al menos 6 caracteres';
        }
        return self::$alertas;
    }
}