<?php 
session_start();
if ($_SESSION ['usuario_tipo'] !== 'professor'){
}
echo "<h2>Olá, " . $_SESSION['usuario_nome'] . "(Professor)</h2>";
?>