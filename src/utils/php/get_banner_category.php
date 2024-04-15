<?php
$directory = '/home/customer/www/whylessisnotmore.com/public_html/';

$file_path = $directory . 'get_banner_category.json';

header("Cache-Control: no-cache, must-revalidate");
header("Pragma: no-cache"); 
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); 

require_once('wp-load.php');

header('Content-Type: application/json; charset=utf-8');

$field_names = ['hero_page', 'interior', 'style', 'hotels', 'journal', 'story', 'wishlist', 'cookies', 'consultant'];

$image_urls = [];

foreach ($field_names as $field_name) {
    $image_urls[$field_name] = get_field($field_name, 37973); 
}

$json_data = json_encode($image_urls, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

if (file_put_contents($file_path, $json_data) === false) {
    echo 'Error writing data to get_banner_category.json';
} else {
    echo 'Data written to get_banner_category.json successfully';
}
?>
