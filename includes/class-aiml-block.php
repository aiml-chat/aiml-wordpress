<?php
defined( 'ABSPATH' ) || exit;

class AIML_Block {

    public function __construct() {
        add_action( 'init', array( $this, 'register_block' ) );
    }

    public function register_block() {
        if ( ! function_exists( 'register_block_type' ) ) {
            return;
        }

        // Rendering comes from block.json's `render: file:./render.php`. Do NOT pass a
        // render_callback here — it would override that file (a 1.1.0 bug: the override kept
        // forcing data-position/data-theme, defeating the dashboard-first behavior).
        register_block_type( AIML_CHAT_PLUGIN_DIR . 'blocks/aiml-widget' );
    }
}
