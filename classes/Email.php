<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email {
    public $nombre;
    public $email;
    public $token;


    public function __construct($nombre, $email, $token)
    {
        $this->nombre = $nombre;
        $this->email = $email;
        $this->token = $token;
    }
    public function enviarConfirmacion(){
        // Crear el Objeto de email
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = $_ENV['EMAIL_HOST'];
        $mail->SMTPAuth = true;
        $mail->Port = $_ENV['EMAIL_PORT'];
        $mail->Username = $_ENV['EMAIL_USER'];
        $mail->Password = $_ENV['EMAIL_PASS'];

        $mail->setFrom('Cuentas@Appsalon.com');
        $mail->addAddress('Cuentas@Appsalon.com', 'FrangelesBeauty.com');
        $mail->Subject = 'Confirma tu cuenta';
        //Set HTML
        $mail->isHTML(TRUE);
        $mail->CharSet = 'UTF-8';

        $contenido = "<html>";
        $contenido .= "<p><strong>Hola " . $this->nombre . "</strong> Has Creado tu Cuenta en FrangelesBeauty, Solo debes confirmarla presionando el siguiente enlace</p>";
        $contenido .= "<p>Preciona Aqui: <a href='" . $_ENV['APP_URL'] . "/confirmar-cuenta?token=".
        $this->token . "'>Confirmar Cuenta</a></p>";
        $contenido .= "<p>Si tu no solicitaste esta cuenta, puedes ignorar el mensaje</p>";
        $contenido .= "</html>";

        $mail->Body = $contenido;

        //Enviar el Email
        $mail->send();
    }
    public function enviarInstrucciones(){
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = $_ENV['EMAIL_HOST'];
        $mail->SMTPAuth = true;
        $mail->Port = $_ENV['EMAIL_PORT'];
        $mail->Username = $_ENV['EMAIL_USER'];
        $mail->Password = $_ENV['EMAIL_PASS'];

        $mail->setFrom('Cuentas@Appsalon.com');
        $mail->addAddress('Cuentas@Appsalon.com', 'FrangelesBeauty.com');
        $mail->Subject = 'Reestablece tu Password';
        //Set HTML
        $mail->isHTML(TRUE);
        $mail->CharSet = 'UTF-8';

        $contenido = "<html>";
        $contenido .= "<p><strong>Hola " . $this->nombre . "</strong> Has solicitado resstablecer tu Password.</p>";
        $contenido .= "<p>Preciona Aqui: <a href='" . $_ENV['APP_URL'] . "/recuperar?token=".
        $this->token . "'>Resstablecer</a></p>";
        $contenido .= "<p>Si tu no solicitaste esta cuenta, puedes ignorar el mensaje</p>";
        $contenido .= "</html>";

        $mail->Body = $contenido;

        //Enviar el Email
        $mail->send();
    }
}