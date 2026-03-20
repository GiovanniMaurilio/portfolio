<?php

switch ($_SERVER['REQUEST_METHOD']) {

    case ("OPTIONS"):
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");
        exit;

    case ("POST"):
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json");

        $json = file_get_contents('php://input');
        $params = json_decode($json);

        if (!$params) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Invalid JSON"]);
            exit;
        }

        $email = $params->email;
        $name = $params->name;
        $message = $params->message;

        $recipient = 'giovannimaurilio04@gmail.com';
        $subject = "Contact Form <$email>";

        $body = "From: $name <br><br> Message:<br>$message";

        $headers = [];
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = 'From: no-reply@deinedomain.de';
        $headers[] = "Reply-To: $email";

        if (mail($recipient, $subject, $body, implode("\r\n", $headers))) {
            echo json_encode(["status" => "success"]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Mail failed"]);
        }

        break;

    default:
        header("Allow: POST, OPTIONS", true, 405);
        exit;
}