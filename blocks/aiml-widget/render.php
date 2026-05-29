<?php
defined( 'ABSPATH' ) || exit;

$api_key  = ! empty( $attributes['apiKey'] ) ? $attributes['apiKey'] : get_option( 'aiml_chat_api_key', '' );
$position = ! empty( $attributes['position'] ) ? $attributes['position'] : get_option( 'aiml_chat_position', 'right' );
$theme    = ! empty( $attributes['theme'] ) ? $attributes['theme'] : get_option( 'aiml_chat_theme', 'auto' );

if ( empty( $api_key ) ) {
    echo '<p>' . esc_html__( 'AIML.chat: please configure your API key in Settings.', 'aiml-chat' ) . '</p>';
    return;
}
?>
<script
    src="https://cdn.aiml.chat/v1/widget.js"
    data-api-key="<?php echo esc_attr( $api_key ); ?>"
    data-position="<?php echo esc_attr( $position ); ?>"
    data-theme="<?php echo esc_attr( $theme ); ?>"
    async
></script>
