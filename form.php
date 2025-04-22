<?php
header('Content-Type: application/json');

ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/php-error.log'); // Loguj błędy do pliku
ini_set('display_errors', 0); // Nie wyświetlaj błędów w odpowiedzi

error_reporting(E_ALL);

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

if (headers_sent()) {
    echo json_encode(["status" => "error", "message" => "Nagłówki zostały już wysłane."]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "error", "message" => "Nieprawidłowa metoda żądania."]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    header('Content-Type: application/json');

    // Sprawdzenie zgody RODO
    if (!isset($_POST['rodo_agreement']) || $_POST['rodo_agreement'] != 'on') {
        echo json_encode(["status" => "error", "message" => "Wymagana jest zgoda na przetwarzanie danych osobowych."]);
        exit;
    }

    // Pobranie i walidacja danych z formularza
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $message_text = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS);

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

        // Ustaw kodowanie na UTF-8
        $mail->CharSet = 'UTF-8';

        // Nadawca i odbiorca
        $mail->setFrom('naczlex@wp.pl', 'Nacz-Lex'); // Nadawca: Twój adres e-mail
        $mail->addAddress('naczlex@wp.pl'); // Odbiorca: Twój adres e-mail
        $mail->addReplyTo($email, $name); // Ustaw adres Reply-To na adres użytkownika

        // Pobierz aktualną datę i godzinę
        $currentDate = date('Y-m-d H:i:s'); // Format: RRRR-MM-DD GG:MM:SS

        // Treść wiadomości
        $mail->isHTML(true); // Ustaw format wiadomości na HTML
        $mail->Subject = "Nowa wiadomość z formularza kontaktowego od: $email";

        $mail->Body = "
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            background-color: #f9f9f9;
                            color: #333;
                            padding: 20px;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            background: #fff;
                            border: 1px solid #ddd;
                            border-radius: 8px;
                            padding: 20px;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            font-size: 20px;
                            font-weight: bold;
                            color: #4caf50;
                            margin-bottom: 20px;
                            text-align: center;
                        }
                        .content p {
                            margin: 10px 0;
                        }
                        .content p strong {
                            color: #555;
                        }
                        .footer {
                            font-size: 12px;
                            color: #777;
                            text-align: center;
                            margin-top: 20px;
                            border-top: 1px solid #ddd;
                            padding-top: 10px;
                        }
                    </style>
                </head>
                <body>
                    <div class='container'>
                        <div class='header'>Nowa wiadomość z formularza kontaktowego</div>
                        <div class='content'>
                            <p><strong>Imię i nazwisko:</strong> $name</p>
                            <p><strong>Email:</strong> $email</p>
                            <p><strong>Wiadomość:</strong></p>
                            <p>$message_text</p>
                        </div>
                        <div class='footer'>
                            <p><strong>Data wysłania:</strong> $currentDate</p>
                            <p>Wiadomość została wysłana z formularza kontaktowego na stronie Nacz-Lex.</p>
                        </div>
                    </div>
                </body>
            </html>
        ";

        // Wyślij wiadomość
        $mail->send();
        echo json_encode(["status" => "success", "message" => "Wiadomość została wysłana pomyślnie."]);
    } catch (Exception $e) {
        // Logowanie szczegółowych błędów
        error_log("Błąd PHPMailer: " . $mail->ErrorInfo);
        echo json_encode(["status" => "error", "message" => "Wystąpił błąd podczas wysyłania wiadomości: " . $mail->ErrorInfo]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Nieprawidłowa metoda żądania."]);
    exit;
}
?>