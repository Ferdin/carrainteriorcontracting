<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset');?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right')?></title>
    <link rel="stylesheet" href="<?php echo esc_url(get_stylesheet_uri()); ?>" type="text/css"/>
    <?php wp_head();?>
</head>
<body <?php body_class();?>>
    <header class="site-header na-sitewide-padding">
        <div class="header-container">
            <div class="site-branding">
                <?php 
                    if ( function_exists( 'the_custom_logo' ) && has_custom_logo() ) {
                        the_custom_logo(); // outputs the logo HTML
                    } else { ?>
                        <h1 class="site-title">
                            <a href="<?php echo esc_url( home_url( '/' ) ); ?>">
                                <?php bloginfo( 'name' ); ?>
                            </a>
                        </h1>
                    <?php } 
                ?>
            </div>
            <div class="site-nav-icon-container"> 
                <?php 
                    $image = get_theme_mod('header_custom_image');

                    if ($image) : ?>
                        <img src="<?php echo esc_url($image); ?>" alt="Header Image" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                <?php endif; ?>
            </div>
        </div>
    </header>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
            <h5 id="offcanvasRightLabel"></h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <nav class="main-nav">
                <?php
                    wp_nav_menu( [
                    'theme_location' => 'primary',
                    'container'      => false,
                    'menu_class'     => 'nav-menu',
                    'fallback_cb'    => false // don’t show a default page list if menu isn’t set
                    ] );
                ?>
            </nav>
        </div>
    </div>
    <div>
        
    </div>
    <main class="site-main">