<?php
require_once __DIR__ . '/config.php';

setCorsHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(array("error" => "Method Not Allowed"));
    exit();
}

try {
    $keyId = getEnvVar('RAZORPAY_KEY_ID');
    $keySecret = getEnvVar('RAZORPAY_KEY_SECRET');
    if (!$keyId || !$keySecret) {
        http_response_code(500);
        echo json_encode(array("error" => "Razorpay keys are not configured on the server."));
        exit();
    }

    $input = file_get_contents("php://input");
    $payload = json_decode($input, true);
    
    $courseId = isset($payload['courseId']) ? strtolower(trim($payload['courseId'])) : '';
    
    if (!isset($COURSES[$courseId])) {
        http_response_code(400);
        echo json_encode(array("error" => "Please select a valid course before payment."));
        exit();
    }
    
    $course = $COURSES[$courseId];
    $student = isset($payload['student']) ? $payload['student'] : array();
    
    $timestamp = round(microtime(true) * 1000);
    $receipt = substr("mt_{$courseId}_{$timestamp}", 0, 40);
    
    $studentName = isset($student['name']) ? substr(trim($student['name']), 0, 120) : '';
    $studentEmail = isset($student['email']) ? substr(trim($student['email']), 0, 120) : '';
    $studentPhone = isset($student['phone']) ? substr(trim($student['phone']), 0, 120) : '';
    
    $orderPayload = array(
        "amount" => $course['price'] * 100,
        "currency" => "INR",
        "receipt" => $receipt,
        "notes" => array(
            "courseId" => $courseId,
            "course" => $course['badge'],
            "studentName" => $studentName,
            "studentEmail" => $studentEmail,
            "studentPhone" => $studentPhone
        )
    );
    
    // Call Razorpay API
    $ch = curl_init('https://api.razorpay.com/v1/orders');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_USERPWD, "$keyId:$keySecret");
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($orderPayload));
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    
    $response = curl_exec($ch);
    $httpStatusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    $order = json_decode($response, true);
    
    if ($httpStatusCode !== 200 || !isset($order['id'])) {
        $errorMsg = isset($order['error']['description']) ? $order['error']['description'] : 'Unable to create Razorpay order right now.';
        http_response_code(502);
        echo json_encode(array("error" => $errorMsg));
        exit();
    }
    
    http_response_code(200);
    echo json_encode(array(
        "keyId" => $keyId,
        "orderId" => $order['id'],
        "amount" => $order['amount'],
        "currency" => $order['currency'],
        "receipt" => $order['receipt'],
        "course" => array(
            "id" => $courseId,
            "badge" => $course['badge'],
            "title" => $course['title'],
            "price" => $course['price']
        )
    ));
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array("error" => "Unable to start payment. Please try again."));
}
?>
