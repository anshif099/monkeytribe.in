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
    
    $orderId = isset($payload['razorpay_order_id']) ? trim($payload['razorpay_order_id']) : '';
    $paymentId = isset($payload['razorpay_payment_id']) ? trim($payload['razorpay_payment_id']) : '';
    $signature = isset($payload['razorpay_signature']) ? trim($payload['razorpay_signature']) : '';
    $expectedCourseId = isset($payload['courseId']) ? strtolower(trim($payload['courseId'])) : '';
    
    if (!$orderId || !$paymentId || !$signature) {
        http_response_code(400);
        echo json_encode(array("error" => "Missing Razorpay payment verification fields."));
        exit();
    }
    
    // Verify payment signature
    $expectedSignature = hash_hmac('sha256', $orderId . '|' . $paymentId, $keySecret);
    
    if (!hash_equals($expectedSignature, $signature)) {
        http_response_code(400);
        echo json_encode(array("error" => "Payment signature verification failed."));
        exit();
    }
    
    // Fetch payment details
    $payment = fetchRazorpayEntity("/payments/{$paymentId}", $keyId, $keySecret);
    if (!$payment) {
        http_response_code(400);
        echo json_encode(array("error" => "Unable to fetch payment details from Razorpay."));
        exit();
    }
    
    if ($payment['order_id'] !== $orderId) {
        http_response_code(400);
        echo json_encode(array("error" => "Payment does not belong to the created order."));
        exit();
    }
    
    // Fetch order details
    $order = fetchRazorpayEntity("/orders/{$orderId}", $keyId, $keySecret);
    if (!$order) {
        http_response_code(400);
        echo json_encode(array("error" => "Unable to fetch order details from Razorpay."));
        exit();
    }
    
    if ($payment['amount'] !== $order['amount'] || $payment['currency'] !== $order['currency']) {
        http_response_code(400);
        echo json_encode(array("error" => "Payment amount does not match the order."));
        exit();
    }
    
    $courseId = isset($order['notes']['courseId']) ? strtolower(trim($order['notes']['courseId'])) : $expectedCourseId;
    if (!isset($COURSES[$courseId]) || ($expectedCourseId && $expectedCourseId !== $courseId)) {
        http_response_code(400);
        echo json_encode(array("error" => "Payment course details do not match the registration."));
        exit();
    }
    
    $course = $COURSES[$courseId];
    
    if ($payment['status'] !== 'captured') {
        $status = isset($payment['status']) ? $payment['status'] : 'not captured';
        http_response_code(409);
        echo json_encode(array("error" => "Payment is {$status} in Razorpay. Please contact support if money was deducted."));
        exit();
    }
    
    http_response_code(200);
    echo json_encode(array(
        "verified" => true,
        "payment" => array(
            "id" => $payment['id'],
            "orderId" => $orderId,
            "status" => $payment['status'],
            "method" => $payment['method'],
            "amount" => $payment['amount'],
            "currency" => $payment['currency']
        ),
        "order" => array(
            "id" => $order['id'],
            "receipt" => $order['receipt'],
            "courseId" => $courseId,
            "course" => $course['badge'],
            "title" => $course['title'],
            "price" => $course['price']
        )
    ));
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array("error" => "Unable to verify payment. Please contact support if money was deducted."));
}
?>
