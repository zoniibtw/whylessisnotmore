<?php
// Define the directory path where the blog_posts.json file should be located
$directory = '/home/customer/www/whylessisnotmore.com/public_html/';

// Specify the file path
$file_path = $directory . 'journals.json';

// Disable caching
header("Cache-Control: no-cache, must-revalidate"); // HTTP 1.1
header("Pragma: no-cache"); // HTTP 1.0
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past

// Include WordPress bootstrap file
require_once('wp-load.php');

// Set proper UTF-8 encoding
header('Content-Type: text/html; charset=utf-8');

// Query to retrieve blog posts
$query = new WP_Query(array(
    'post_type' => 'post',
    'posts_per_page' => -1, // Retrieve all blog posts
));

// Format blog posts data as JSON
$blog_posts = array();
if ($query->have_posts()) {
    while ($query->have_posts()) {
        $query->the_post();

        // Retrieve post categories
        $post_categories = wp_get_post_categories(get_the_ID(), array('fields' => 'names'));
        
        // Retrieve post image
        $post_image_id = get_post_thumbnail_id();
        $post_image_url = wp_get_attachment_image_src($post_image_id, 'full');
        $post_image = $post_image_url ? $post_image_url[0] : '';

        // Retrieve ACF field blog_url
        $blog_url = get_field('blog_url', get_the_ID());

        // Sanitize post content
        $post_content = strip_tags(get_the_content());
        
        // Decode HTML entities in post title
        $post_title = html_entity_decode(get_the_title(), ENT_QUOTES | ENT_XML1, 'UTF-8');
        
        $blog_post = array(
            'id' => get_the_ID(),
            'title' => $post_title,
            'post_content' => $post_content,
            'post_image' => $post_image,
            'blog_url' => $blog_url // Adding blog_url field
        );
        $blog_posts[] = $blog_post;
    }
}

// Convert blog posts array to JSON
$json_data = json_encode($blog_posts, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

// Write JSON data to the file
if (file_put_contents($file_path, $json_data) === false) {
    echo 'Error writing data to journals.json';
} else {
    echo 'Data written to journals.json successfully';
}
?>
