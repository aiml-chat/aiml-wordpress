<?php
defined( 'ABSPATH' ) || exit;

class AIML_Shortcode {

    public function __construct() {
        add_shortcode( 'aiml_chat', array( $this, 'render' ) );
    }

    /**
     * [aiml_chat api_key="..." website_id="..." position="right" theme="auto" primary_color="#4f46e5"]
     *
     * Position/theme/colour are emitted only when explicitly set (attribute or saved option) — an
     * absent data-attribute means the appearance configured in the AIML.chat dashboard applies.
     */
    public function render( $atts ) {
        $atts = shortcode_atts(
            array(
                'api_key'       => get_option( 'aiml_chat_api_key', '' ),
                'website_id'    => get_option( 'aiml_chat_website_id', '' ),
                'position'      => get_option( 'aiml_chat_position', '' ),
                'theme'         => get_option( 'aiml_chat_theme', '' ),
                'primary_color' => get_option( 'aiml_chat_primary_color', '' ),
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
            <?php if ( ! empty( $atts['website_id'] ) ) : ?>data-website-id="<?php echo esc_attr( $atts['website_id'] ); ?>"<?php endif; ?>
            <?php if ( ! empty( $atts['position'] ) ) : ?>data-position="<?php echo esc_attr( $atts['position'] ); ?>"<?php endif; ?>
            <?php if ( ! empty( $atts['theme'] ) ) : ?>data-theme="<?php echo esc_attr( $atts['theme'] ); ?>"<?php endif; ?>
            <?php if ( ! empty( $atts['primary_color'] ) ) : ?>data-primary-color="<?php echo esc_attr( $atts['primary_color'] ); ?>"<?php endif; ?>
            async
        ></script>
        <?php
        return ob_get_clean();
    }
}
