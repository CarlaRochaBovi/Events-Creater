<?php
  $host = "localhost";
  $user = "root";
  $password = "";
  $dbname = "events";

  try {
    // PDO = PHP Data Objects
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  }catch(PDOException $e) {
    die ("Falha na conexão: " . $e -> getMessage());
  }

?>