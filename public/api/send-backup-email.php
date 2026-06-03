<?php
// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(array("error" => "Method Not Allowed"));
    exit();
}

// Read raw body
$input = file_get_contents("php://input");
$data = json_decode($input);

if (empty($data) || empty($data->to) || empty($data->subject) || empty($data->body)) {
    http_response_code(400);
    echo json_encode(array("error" => "Incomplete request data: to, subject, body required."));
    exit();
}

$to = $data->to;
$subject = $data->subject;
$message = $data->body;

// Setup headers for plain text email
$headers = "From: Monkey Tribe Backup <hello@monkeytribe.in>\r\n";
$headers .= "Reply-To: hello@monkeytribe.in\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send using native PHP mail() function
if (mail($to, $subject, $message, $headers)) {
    http_response_code(200);
    echo json_encode(array("success" => true, "message" => "Backup email sent successfully!"));
} else {
    http_response_code(500);
    echo json_encode(array("error" => "Failed to send backup email via mail(). Please check cPanel mail log."));
}
?>
