<?php 
    $host = 'localhost';
    $user = 'root';
    $pass = '030108ka';
    $db = 'dbLumos';

    $conn = new mysqli($host, $user, $pass, $db);

    if($conn->connect_error) {
        die(json_encode(["status" => "erro", "mensagem" => "Erro ao conectar ao  banco de dados "]));
    }


?>