</main>
    <footer class="site-footer carra-footer-inner na-sitewide-padding" style="background-color: <?php echo get_theme_mod( 'footer_bg_color', '#000000' ); ?>; color: <?php echo get_theme_mod( 'footer_text_color', '#ffffff' ); ?>;">
        <!-- Left — Logo -->
        <div class="carra-footer-logo">
            <?php if ( get_theme_mod( 'footer_logo' ) ) : ?>
                <img src="<?php echo esc_url( get_theme_mod( 'footer_logo' ) ); ?>" alt="<?php bloginfo( 'name' ); ?>">
            <?php else : ?>
                <p class="carra-footer-site-name"><?php bloginfo( 'name' ); ?></p>
            <?php endif; ?>
        </div>

        <!-- Middle — Copyright -->
        <div class="carra-footer-copy">
            <p>Copyright &copy; <?php echo date( 'Y' ); ?></p>
            <p>Designed by Ferdin Norbert</p>
        </div>

        <!-- Right — Social Icons -->
        <div class="carra-footer-social">
            <?php
                // Or render a block if you placed social links block in a widget area
                if ( is_active_sidebar( 'footer-social-widget' ) ) {
                    dynamic_sidebar( 'footer-social-widget' );
                }
            ?>
        </div>
    </footer>
    </div>
</div>
<?php wp_footer(); ?>
</body>
</html>