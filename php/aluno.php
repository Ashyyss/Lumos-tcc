<?php 
session_start();
if ($_SESSION ['usuario_tipo'] !== 'aluno'){
}
echo "<h2>Olá, " . $_SESSION['usuario_nome'] . "(Aluno)</h2>";


?>