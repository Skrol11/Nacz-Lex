<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

require 'vendor/autoload.php';

// Załaduj zmienne środowiskowe z pliku .env
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'domain' => '', // Ustaw domenę, jeśli to konieczne
    'secure' => true, // Wymaga HTTPS
    'httponly' => true,
    'samesite' => 'Lax'
]);
session_start();

header("Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self';");
header("X-XSS-Protection: 1; mode=block");
header("X-Content-Type-Options: nosniff");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    header('Content-Type: application/json');

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

    // Konfiguracja PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Ustawienia serwera SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.wp.pl'; // Serwer SMTP WP
        $mail->SMTPAuth = true;
        $mail->Username = 'naczlex@wp.pl'; // Twój adres e-mail
        $mail->Password = $_ENV['SMTP_PASSWORD']; // Pobierz hasło z pliku .env
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Szyfrowanie SSL
        $mail->Port = 465; // Port SMTP

        // Debugowanie SMTP
        $mail->SMTPDebug = 2; // Ustaw poziom debugowania (2 = szczegółowe informacje)
        $mail->Debugoutput = 'html'; // Wyświetlaj debugowanie w formacie HTML

        // Nadawca i odbiorca
        $mail->setFrom('naczlex@wp.pl', 'Nacz-Lex'); // Nadawca
        $mail->addAddress('naczlex@wp.pl'); // Odbiorca

        // Treść wiadomości
        $mail->isHTML(false);
        $mail->Subject = "Nowa wiadomość od $name";
        $mail->Body = "Imię i nazwisko: $name\nEmail: $email\n\nWiadomość:\n$message_text";

        // Test połączenia z serwerem SMTP
        try {
            $mail->smtpConnect([
                'ssl' => [
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true,
                ],
            ]);
            echo json_encode(["status" => "success", "message" => "Połączenie z serwerem SMTP działa poprawnie."]);
        } catch (Exception $e) {
            echo json_encode(["status" => "error", "message" => "Błąd połączenia z serwerem SMTP: " . $mail->ErrorInfo]);
            exit;
        }

        // Wyślij wiadomość
        $mail->send();
        echo json_encode(["status" => "success", "message" => "Wiadomość została wysłana pomyślnie."]);
    } catch (Exception $e) {
        // Logowanie szczegółowych błędów
        error_log("Błąd PHPMailer: " . $mail->ErrorInfo);
        echo json_encode(["status" => "error", "message" => "Wystąpił błąd podczas wysyłania wiadomości: " . $mail->ErrorInfo]);
    }
} else {
    header("Location: index.html");
    exit;
}
?>