<?php
header("Content-Type: application/json");
session_start();
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$senha = $data['senha'] ?? '';

$stmt = $conn->prepare("SELECT idUsuario, nomeUsuario, nomedeUsuario, senhaUsuario, tipo FROM tbUsuario WHERE emailUsuario = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($usuario = $result->fetch_assoc()) {
    if (password_verify($senha, $usuario['senhaUsuario'])) {
        $_SESSION['usuario_id'] = $usuario['idUsuario'];
        $_SESSION['usuario_nome'] = $usuario['nomeUsuario'];
        $_SESSION['usuario_tipo'] = $usuario['tipo'];

        echo json_encode([
            "status" => "sucesso",
            "usuario" => [
                "id" => $usuario['idUsuario'],
                "nome" => $usuario['nomeUsuario'],
                "tipo" => $usuario['tipo']
            ]
        ]);
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Senha incorreta"]);
    }
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Usuário não encontrado"]);
}
?>
