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
    wp_enqueue_style(
        'carra-google-fonts',
        'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap',
        array(),
        null
    );
    wp_enqueue_style(
        'bootstrap-css',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
        [],
        '5.0.2'
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

    $wp_customize->add_setting('nav_bg_color', [
        'default'   => '#ffffff',
        'transport' => 'postMessage',
    ]);

    // ✅ Setting
    $wp_customize->add_setting('header_custom_image', [
        'default' => '',
    ]);

    // ✅ Image Control
    $wp_customize->add_control(new WP_Customize_Image_Control(
        $wp_customize,
        'header_custom_image_control',
        [
            'label'   => 'Header Image',
            'section' => 'header_section',
            'settings'=> 'header_custom_image',
        ]
    ));

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
    // Control
    $wp_customize->add_control(new WP_Customize_Color_Control(
        $wp_customize,
        'nav_bg_color_control',
        [
            'label'     => 'Navigation Background Color',
            'section'   => 'header_section',
            'settings'  => 'nav_bg_color',
        ]
    ));
}

add_action('customize_register', 'carra_interior_theme_customize_register');

function carra_interior_header_customizer_css() {
    $bg_color = get_theme_mod('header_bg_color', '#ffffff');
    $nav_color = get_theme_mod('nav_bg_color', '#ffffff');
    ?>
    <style>
        .site-header {
            background-color: <?php echo esc_attr($bg_color); ?>;
        }
        .offcanvas.offcanvas-end{
            background-color: <?php echo esc_attr($nav_color); ?>;
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

function carra_enqueue_scripts() {
    wp_enqueue_script(
        'bootstrap-js',
        'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
        [],
        '5.0.2',
        true
    );
    wp_enqueue_script( 'gsap-js', 'https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js', [], false, true );
}
add_action('wp_enqueue_scripts', 'carra_enqueue_scripts');

function carra_add_bootstrap_attributes($html, $handle) {
    if ($handle === 'bootstrap-css') {
        return str_replace(
            "rel='stylesheet'",
            "rel='stylesheet' integrity='sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC' crossorigin='anonymous'",
            $html
        );
    }
    return $html;
}
add_filter('style_loader_tag', 'carra_add_bootstrap_attributes', 10, 2);

function carra_add_preconnect_fonts($urls, $relation_type) {
    if ($relation_type === 'preconnect') {
        $urls[] = [
            'href' => 'https://fonts.googleapis.com',
        ];
        $urls[] = [
            'href' => 'https://fonts.gstatic.com',
            'crossorigin' => true,
        ];
    }
    return $urls;
}
add_filter('wp_resource_hints', 'carra_add_preconnect_fonts', 10, 2);

add_theme_support( 'editor-style' );
add_theme_support( 'align-wide' );
add_theme_support( 'appearance-tools' );

// Register custom modal button block
function carra_register_modal_button_block() {
    wp_register_script(
        'carra-modal-button',
        get_template_directory_uri() . '/blocks/modal-button/index.js',
        array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components' ),
        filemtime( get_template_directory() . '/blocks/modal-button/index.js' )
    );

    wp_register_script(
        'carra-modal-button-frontend',
        get_template_directory_uri() . '/blocks/modal-button/frontend.js',
        array( 'jquery' ),
        filemtime( get_template_directory() . '/blocks/modal-button/frontend.js' ),
        true // load in footer
    );
    
    wp_register_style(
        'carra-modal-button-style',
        get_template_directory_uri() . '/blocks/modal-button/style.css',
        array(),
        filemtime( get_template_directory() . '/blocks/modal-button/style.css' )
    );

    register_block_type( 'carra/modal-button', array(
        'editor_script' => 'carra-modal-button',
        'style'         => 'carra-modal-button-style',
        'view_script'   => 'carra-modal-button-frontend',
    ) );
}
add_action( 'init', 'carra_register_modal_button_block' );

?>