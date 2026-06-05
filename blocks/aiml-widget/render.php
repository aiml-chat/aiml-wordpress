<?php
defined( 'ABSPATH' ) || exit;

$api_key    = ! empty( $attributes['apiKey'] ) ? $attributes['apiKey'] : get_option( 'aiml_chat_api_key', '' );
$website_id = ! empty( $attributes['websiteId'] ) ? $attributes['websiteId'] : get_option( 'aiml_chat_website_id', '' );
$position   = ! empty( $attributes['position'] ) ? $attributes['position'] : get_option( 'aiml_chat_position', 'right' );
$theme      = ! empty( $attributes['theme'] ) ? $attributes['theme'] : get_option( 'aiml_chat_theme', 'auto' );
$color      = ! empty( $attributes['primaryColor'] ) ? $attributes['primaryColor'] : get_option( 'aiml_chat_primary_color', '' );

if ( empty( $api_key ) ) {
    echo '<p>' . esc_html__( 'AIML.chat: please configure your API key in Settings.', 'aiml-chat' ) . '</p>';
    return;
}
?>
<script
    src="https://cdn.aiml.chat/v1/widget.js"
    data-api-key="<?php echo esc_attr( $api_key ); ?>"
    <?php if ( ! empty( $website_id ) ) : ?>data-website-id="<?php echo esc_attr( $website_id ); ?>"<?php endif; ?>
    data-position="<?php echo esc_attr( $position ); ?>"
    data-theme="<?php echo esc_attr( $theme ); ?>"
    <?php if ( ! empty( $color ) ) : ?>data-primary-color="<?php echo esc_attr( $color ); ?>"<?php endif; ?>
    async
></script>
