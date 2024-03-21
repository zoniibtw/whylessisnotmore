<?php
// Define the directory path where the products.json file should be located
$directory = '/home/customer/www/whylessisnotmore.com/public_html/';

// Specify the file path
$file_path = $directory . 'products.json';

// Disable caching
header("Cache-Control: no-cache, must-revalidate"); // HTTP 1.1
header("Pragma: no-cache"); // HTTP 1.0
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past

// Include WordPress bootstrap file
require_once('wp-load.php');

// Query to retrieve products
$query = new WP_Query(array(
    'post_type' => 'product',
    'posts_per_page' => -1 // Retrieve all products
));

// Format products data as JSON
$products = array();
if ($query->have_posts()) {
    while ($query->have_posts()) {
        $query->the_post();
        $product_categories = wp_get_post_terms(get_the_ID(), 'product_cat', array('fields' => 'names'));
        $category = !empty($product_categories) ? $product_categories[0] : '';
        
        // Retrieve Skimlink URL from ACF field
        $skimlink_url = get_field('skimlink_url');

        // Retrieve product image
        $product_image_id = get_post_thumbnail_id();
        $product_image_url = wp_get_attachment_image_src($product_image_id, 'full');
        $product_image = $product_image_url ? $product_image_url[0] : '';

        // Retrieve one gallery image
        $gallery_images_ids = get_post_meta(get_the_ID(), '_product_image_gallery', true);
        $gallery_image_url = '';
        if (!empty($gallery_images_ids)) {
            $gallery_image_id = explode(',', $gallery_images_ids)[0];
            $gallery_image_url = wp_get_attachment_image_src($gallery_image_id, 'full');
            $gallery_image_url = $gallery_image_url ? $gallery_image_url[0] : '';
        }

        // Remove escaped slashes from Skimlink URL
        $skimlink_url = str_replace('\\/', '/', $skimlink_url);
        
        $product_description = strip_tags(get_the_content());
        $product = array(
            'id' => get_the_ID(),
            'title' => get_the_title(),
            'price' => get_post_meta(get_the_ID(), '_price', true),
            'category' => $category,
            'skimlink_url' => $skimlink_url, // Use Skimlink URL instead of affiliate_product_url
            'product_description' => $product_description,
            'product_image' => $product_image,
            'gallery_image' => $gallery_image_url
        );
        $products[] = $product;
    }
}

// Convert products array to JSON
$json_data = json_encode($products);

// Write JSON data to the file
if (file_put_contents($file_path, $json_data) === false) {
    echo 'Error writing data to products.json';
} else {
    echo 'Data written to products.json successfully';
}
?>