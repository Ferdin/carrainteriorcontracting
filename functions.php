<?php

function carra_interior_theme_setup() {
    add_theme_support( 'custom-logo', [
        'height'      => 60,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ]);

    register_nav_menus(
        [
            'primary' => __( 'Primary Menu', 'carra-interior' ),
            'footer'  => __( 'Footer Menu', 'carra-interior' ),
        ]
    );
}

add_action( 'after_setup_theme', 'carra_interior_theme_setup' );

function carra_interior_theme_enqueue_styles() {        
    // Custom fonts
    wp_enqueue_style( 'norbert_academy_theme_font_css', get_template_directory_uri() . '/fonts/fonts.css', array(), '2.0' );
    wp_enqueue_style( 'norbert_academy_theme_custom_css', get_template_directory_uri() . '/styles/custom.css', array(), '2.0' );
}

add_action( 'wp_enqueue_scripts', 'carra_interior_theme_enqueue_styles' );

function na_allow_svg_uploads($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'na_allow_svg_uploads');