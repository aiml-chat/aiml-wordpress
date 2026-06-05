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
        $api_key    = ! empty( $attributes['apiKey'] ) ? $attributes['apiKey'] : get_option( 'aiml_chat_api_key', '' );
        $website_id = ! empty( $attributes['websiteId'] ) ? $attributes['websiteId'] : get_option( 'aiml_chat_website_id', '' );
        $position   = ! empty( $attributes['position'] ) ? $attributes['position'] : get_option( 'aiml_chat_position', 'right' );
        $theme      = ! empty( $attributes['theme'] ) ? $attributes['theme'] : get_option( 'aiml_chat_theme', 'auto' );
        $color      = ! empty( $attributes['primaryColor'] ) ? $attributes['primaryColor'] : get_option( 'aiml_chat_primary_color', '' );

        if ( empty( $api_key ) ) {
            return '<p class="aiml-block-notice">' . esc_html__( 'AIML.chat: configure your API key in Settings → AIML.chat.', 'aiml-chat' ) . '</p>';
        }

        $website_attr = ! empty( $website_id ) ? sprintf( ' data-website-id="%s"', esc_attr( $website_id ) ) : '';
        $color_attr   = ! empty( $color ) ? sprintf( ' data-primary-color="%s"', esc_attr( $color ) ) : '';

        return sprintf(
            '<script src="https://cdn.aiml.chat/v1/widget.js" data-api-key="%s"%s data-position="%s" data-theme="%s"%s async></script>',
            esc_attr( $api_key ),
            $website_attr,
            esc_attr( $position ),
            esc_attr( $theme ),
            $color_attr
        );
    }
}
