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
    wp_enqueue_style( 'norbert_academy_theme_custom_css', get_template_directory_uri() . '/styles/custom.css', [], '2.0' );
    wp_enqueue_style(
        'typekit-fonts',
        'https://use.typekit.net/jlx5ibz.css',
        array(),
        null
    );
}

add_action( 'wp_enqueue_scripts', 'carra_interior_theme_enqueue_styles' );

function na_allow_svg_uploads($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'na_allow_svg_uploads');

function carra_interior_theme_customize_register($wp_customize){

    // Section
    $wp_customize->add_section('header_section', [
        'title'     => 'Header Settings',
        'priority'  => 30,
    ]);

    $wp_customize->add_setting('header_bg_color', [
        'default'   => '#ffffff',
        'transport' => 'postMessage',
    ]);

    // Control
    $wp_customize->add_control(new WP_Customize_Color_Control(
        $wp_customize,
        'header_bg_color_control',
        [
            'label'     => 'Header Background Color',
            'section'   => 'header_section',
            'settings'  => 'header_bg_color',
        ]
    ));
}

add_action('customize_register', 'carra_interior_theme_customize_register');

function carra_interior_header_customizer_css() {
    $bg_color = get_theme_mod('header_bg_color', '#ffffff');
    ?>
    <style>
        .site-header {
            background-color: <?php echo esc_attr($bg_color); ?>;
        }
    </style>
    <?php
}

add_action('wp_head', 'carra_interior_header_customizer_css');

function carra_interior_customize_preview_js() {
    wp_enqueue_script(
        'customizer-preview',
        get_template_directory_uri() . '/js/customizer.js',
        array('customize-preview'),
        null,
        true
    );
}

add_action('customize_preview_init', 'carra_interior_customize_preview_js');