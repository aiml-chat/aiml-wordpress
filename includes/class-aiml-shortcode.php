<?php
defined( 'ABSPATH' ) || exit;

class AIML_Shortcode {

    public function __construct() {
        add_shortcode( 'aiml_chat', array( $this, 'render' ) );
    }

    /**
     * [aiml_chat api_key="..." position="right" theme="auto"]
     */
    public function render( $atts ) {
        $atts = shortcode_atts(
            array(
                'api_key'  => get_option( 'aiml_chat_api_key', '' ),
                'position' => get_option( 'aiml_chat_position', 'right' ),
                'theme'    => get_option( 'aiml_chat_theme', 'auto' ),
            ),
            $atts,
            'aiml_chat'
        );

        if ( empty( $atts['api_key'] ) ) {
            return '<!-- AIML.chat: no API key configured -->';
        }

        ob_start();
        ?>
        <script
            src="https://cdn.aiml.chat/v1/widget.js"
            data-api-key="<?php echo esc_attr( $atts['api_key'] ); ?>"
            data-position="<?php echo esc_attr( $atts['position'] ); ?>"
            data-theme="<?php echo esc_attr( $atts['theme'] ); ?>"
            async
        ></script>
        <?php
        return ob_get_clean();
    }
}
