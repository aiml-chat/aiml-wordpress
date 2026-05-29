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

        register_block_type(
            AIML_CHAT_PLUGIN_DIR . 'blocks/aiml-widget',
            array(
                'render_callback' => array( $this, 'render_block' ),
            )
        );
    }

    public function render_block( $attributes ) {
        $api_key  = ! empty( $attributes['apiKey'] ) ? $attributes['apiKey'] : get_option( 'aiml_chat_api_key', '' );
        $position = ! empty( $attributes['position'] ) ? $attributes['position'] : get_option( 'aiml_chat_position', 'right' );
        $theme    = ! empty( $attributes['theme'] ) ? $attributes['theme'] : get_option( 'aiml_chat_theme', 'auto' );

        if ( empty( $api_key ) ) {
            return '<p class="aiml-block-notice">' . esc_html__( 'AIML.chat: configure your API key in Settings → AIML.chat.', 'aiml-chat' ) . '</p>';
        }

        return sprintf(
            '<script src="https://cdn.aiml.chat/v1/widget.js" data-api-key="%s" data-position="%s" data-theme="%s" async></script>',
            esc_attr( $api_key ),
            esc_attr( $position ),
            esc_attr( $theme )
        );
    }
}
