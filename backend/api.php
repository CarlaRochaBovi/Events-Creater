<?php


  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json");
  header("Access-Control-Allow-Headers: Content-Type");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");
  include 'db.php';

  $method = $_SERVER['REQUEST_METHOD'];
  $input = json_decode(file_get_contents('php://input', true));

  switch($method) {
    case 'GET':
      handleGet($pdo);
      break;
    case 'POST':
      handlePost($pdo, $input);
      break;
    case 'PUT':
      handlePut($pdo, $input);
      break;
    case 'DELETE':
      handleDelete($pdo, $input);
      break;
    default:
      echo json_encode(['message' => 'Solicitação Inválida!']);
      break;
  }


  function handleGet($pdo) {
    $sql = "SELECT * FROM events";
    $stmt = $pdo->prepare($sql);
    $stmt -> execute();
    $result = $stmt -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
  }

  function handlePost($pdo, $input) {
    $sql = "INSERT INTO events(name, place, date, description) VALUES (:name, :place, :date, :description)";
    $stmt = $pdo-> prepare($sql);
    $stmt->execute([
      'name' => $input->name,
      'place' => $input->place,
      'date' => $input->date,
      'description' => $input->description
    ]);
    echo json_encode(['message' => 'Usuário criado com sucesso.']);
  }

  function handlePut($pdo, $input) {
    $sql = "UPDATE events SET name = :name, place = :place, date = :date, description = :description WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
      'name' => $input->name,
      'place' => $input->place,
      'date' => $input->date,
      'description' => $input->description,
      'id' => $input->id
    ]);
    echo json_encode(['message' => 'Usuário atualizado com sucesso.']);
  }

  function handleDelete($pdo, $input) {
    $sql = "DELETE FROM events WHERE id = :id";
    $stmt = $pdo -> prepare($sql);
    $stmt->execute(['id' => $input->id]);
    echo json_encode(['message' => 'Usuário deletado com sucesso.']);
  }

?>