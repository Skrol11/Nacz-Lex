<?php
session_start();

// Dodanie nagłówków zabezpieczających
header("Content-Security-Policy: default-src 'self'; script-src 'self' https://www.google.com/recaptcha/; style-src 'self';");
header("X-XSS-Protection: 1; mode=block");
header("X-Content-Type-Options: nosniff");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    header('Content-Type: application/json');

    // Mechanizm ochrony przed CSRF
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        echo json_encode(["status" => "error", "message" => "Nieprawidłowy token CSRF."]);
        exit;
    }

    // Sekretny klucz reCAPTCHA (przechowywany na serwerze)
    $secret = getenv('RECAPTCHA_SECRET_KEY');
    $response = $_POST['g-recaptcha-response'] ?? '';

    // Sprawdzenie, czy odpowiedź reCAPTCHA została przesłana
    if (empty($response)) {
        echo json_encode(["status" => "error", "message" => "Weryfikacja reCAPTCHA nie powiodła się."]);
        exit;
    }

    // Weryfikacja reCAPTCHA za pomocą API Google
    $verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secret&response=$response");
    $result = json_decode($verify);

    if (!$result->success) {
        echo json_encode(["status" => "error", "message" => "Weryfikacja reCAPTCHA nie powiodła się."]);
        exit;
    }

    if ($result->success) {
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
        $to = "jotter@wp.pl";
        $subject = "Nowa wiadomość od $name";
        $message = "Imię i nazwisko: $name\nEmail: $email\n\nWiadomość:\n$message_text";
        $headers = "From: $email";

        if (mail($to, $subject, $message, $headers)) {
            echo json_encode(["status" => "success", "message" => "Wiadomość została wysłana pomyślnie."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Wystąpił błąd podczas wysyłania wiadomości."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Weryfikacja reCAPTCHA nie powiodła się."]);
    }

    // Obsługa formularza newslettera
    if (isset($_POST['email'])) {
        $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
        if (!$email) {
            echo json_encode(["status" => "error", "message" => "Nieprawidłowy adres email."]);
            exit;
        }
        // Możesz dodać integrację z MailerLite lub zapisać e-mail lokalnie
        file_put_contents('newsletter_emails.txt', $email . PHP_EOL, FILE_APPEND);
        echo json_encode(["status" => "success", "message" => "Dziękujemy za zapisanie się na newsletter."]);
        exit;
    }
} else {
    // Generowanie tokena CSRF
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    header("Location: index.html"); // Przekierowanie na stronę główną, jeśli metoda żądania nie jest POST
    exit;
}
?>