<?php
header("Content-Type: application/json");
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$nome = $data['nome'] ?? '';
$nomedeUsuario = $data['nomedeUsuario'] ?? '';
$email = $data['email'] ?? '';
$senha = $data['senha'] ?? '';
$tipo = $data['tipo'] ?? '';

if (!$nome || !$nomedeUsuario || !$email || !$senha || !$tipo) {
    echo json_encode(["status" => "erro", "mensagem" => "Todos os campos são obrigatórios"]);
    exit;
}

$stmt = $conn->prepare("SELECT idUsuario FROM tbUsuario WHERE emailUsuario = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["status" => "erro", "mensagem" => "E-mail já cadastrado"]);
    exit;
}

$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO tbUsuario (nomeUsuario, nomedeUsuario, emailUsuario, senhaUsuario, tipo) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $nome, $nomedeUsuario, $email, $senhaHash, $tipo);

if ($stmt->execute()) {
    echo json_encode(["status" => "sucesso", "mensagem" => "Cadastro realizado com sucesso"]);
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao cadastrar"]);
}
?>
