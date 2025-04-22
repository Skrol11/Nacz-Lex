<?php
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'domain' => '', // Ustaw domenę, jeśli to konieczne
    'secure' => true, // Wymaga HTTPS
    'httponly' => true,
    'samesite' => 'Lax'
]);
session_start();

// Dodanie nagłówków zabezpieczających
header("Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self';");
header("X-XSS-Protection: 1; mode=block");
header("X-Content-Type-Options: nosniff");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    header('Content-Type: application/json');

    // Zakomentowano walidację CSRF
    // if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    //     echo json_encode(["status" => "error", "message" => "Nieprawidłowy token CSRF."]);
    //     exit;
    // }

    // Sprawdzenie zgody RODO
    if (!isset($_POST['rodo_agreement']) || $_POST['rodo_agreement'] != 'on') {
        echo json_encode(["status" => "error", "message" => "Wymagana jest zgoda na przetwarzanie danych osobowych."]);
        exit;
    }

    // Pobranie i walidacja danych z formularza
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $message_text = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

    if (empty($name) || empty($email) || empty($message_text)) {
        echo json_encode(["status" => "error", "message" => "Wszystkie pola są wymagane."]);
        exit;
    }

    if (!$email) {
        echo json_encode(["status" => "error", "message" => "Nieprawidłowy adres email."]);
        exit;
    }

    // Wysłanie wiadomości e-mail
    $to = "naczlex@wp.pl";
    $subject = "Nowa wiadomość od $name";
    $message = "Imię i nazwisko: $name\nEmail: $email\n\nWiadomość:\n$message_text";
    $headers = "From: $email";

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["status" => "success", "message" => "Wiadomość została wysłana pomyślnie."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Wystąpił błąd podczas wysyłania wiadomości."]);
    }
} else {
    header("Location: index.html");
    exit;
}
?>