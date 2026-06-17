<?php
// Set CORS headers
function setCorsHeaders() {
    $allowedOrigin = getEnvVar('RAZORPAY_ALLOWED_ORIGIN');
    if ($allowedOrigin) {
        header("Access-Control-Allow-Origin: " . $allowedOrigin);
    } else {
        header("Access-Control-Allow-Origin: *");
    }
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // Handle preflight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        echo json_encode(array("ok" => true));
        exit();
    }
}

// Get environment variable with fallback to local .env/.env.local file parsing
function getEnvVar($name) {
    if (isset($_ENV[$name])) return $_ENV[$name];
    if (isset($_SERVER[$name])) return $_SERVER[$name];
    $val = getenv($name);
    if ($val !== false) return $val;
    
    // Parse .env / .env.local file
    static $parsedEnv = null;
    if ($parsedEnv === null) {
        $parsedEnv = array();
        // Look in multiple possible directory depths relative to this file
        $paths = array(
            __DIR__ . '/.env',
            __DIR__ . '/../.env',
            __DIR__ . '/../../.env',
            __DIR__ . '/.env.local',
            __DIR__ . '/../.env.local',
            __DIR__ . '/../../.env.local'
        );
        foreach ($paths as $path) {
            if (file_exists($path)) {
                $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                foreach ($lines as $line) {
                    $line = trim($line);
                    if (empty($line) || strpos($line, '#') === 0) continue;
                    
                    list($key, $value) = explode('=', $line, 2) + array(NULL, NULL);
                    if ($key !== NULL) {
                        $key = trim($key);
                        $value = trim($value);
                        // Strip surrounding quotes
                        if (preg_match('/^"?(.*?)"?$/', $value, $matches)) {
                            $value = $matches[1];
                        }
                        $parsedEnv[$key] = $value;
                    }
                }
            }
        }
    }
    return isset($parsedEnv[$name]) ? $parsedEnv[$name] : null;
}

// Course pricing catalog
$COURSES = array(
    'promptx' => array(
        'badge' => 'PromptX',
        'title' => 'AI Prompt Engineering Mastery',
        'price' => 12500
    ),
    'growthx' => array(
        'badge' => 'GrowthX',
        'title' => 'AI Digital Marketing Mastery',
        'price' => 12500
    ),
    'brandx' => array(
        'badge' => 'BrandX',
        'title' => 'Brand Builder Pro',
        'price' => 9999
    ),
    'copycraft' => array(
        'badge' => 'CopyCraft',
        'title' => 'CopyCraft Mastery',
        'price' => 11999
    )
);

// Fetch an entity from Razorpay API
function fetchRazorpayEntity($path, $keyId, $keySecret) {
    $url = 'https://api.razorpay.com/v1' . $path;
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERPWD, "$keyId:$keySecret");
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_TIMEOUT, 15);
    
    $response = curl_exec($ch);
    $httpStatusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpStatusCode !== 200) {
        return null;
    }
    return json_decode($response, true);
}
?>
