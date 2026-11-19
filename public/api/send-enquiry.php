<?php
header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');
function respondEnquiry($status, $data) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') respondEnquiry(405, array('error' => 'Method Not Allowed'));
$input = file_get_contents('php://input', false, null, 0, 20001);
if (strlen($input) > 20000) respondEnquiry(413, array('error' => 'Request too large.'));
$payload = json_decode($input, true);
if (!is_array($payload) || !isset($payload['type']) || !in_array($payload['type'], array('contact', 'course'), true)) {
    respondEnquiry(400, array('error' => 'Invalid enquiry type.'));
}
$limits = array('name'=>150, 'email'=>254, 'phone'=>50, 'course'=>200, 'enquiryType'=>100, 'message'=>5000, 'profession'=>200, 'goals'=>5000);
$data = array();
foreach ($limits as $key => $limit) {
    $value = $key === 'name' ? ($payload['fullName'] ?? $payload['name'] ?? '') : ($payload[$key] ?? '');
    if (!is_string($value) || strlen($value) > $limit) respondEnquiry(400, array('error'=>'Invalid form fields.'));
    $data[$key] = trim($value);
}
if (!$data['name'] || !filter_var($data['email'], FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $data['name'] . $data['email'] . $data['course'])) {
    respondEnquiry(400, array('error'=>'Valid name and email are required.'));
}
if ($payload['type'] === 'contact' && (!$data['message'] || !$data['enquiryType'])) respondEnquiry(400, array('error'=>'Message and enquiry type are required.'));
if ($payload['type'] === 'course' && !$data['course']) respondEnquiry(400, array('error'=>'Course is required.'));
$subject = $payload['type'] === 'course' ? 'Course enquiry: ' . $data['course'] : 'Monkey Tribe contact enquiry';
$lines = array();
foreach ($data as $key => $value) {
    if ($value !== '') $lines[] = $key . ': ' . $value;
}
$headers = "From: Monkey Tribe <hello@monkeytribe.in>\r\n";
$headers .= 'Reply-To: ' . $data['email'] . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
if (mail('hello@monkeytribe.in', $subject, implode("\n\n", $lines), $headers)) {
    respondEnquiry(200, array('success'=>true));
}
respondEnquiry(502, array('error'=>'Unable to send enquiry email. Please try again later.'));
