<?php
defined( 'ABSPATH' ) || exit;

$api_key    = ! empty( $attributes['apiKey'] ) ? $attributes['apiKey'] : get_option( 'aiml_chat_api_key', '' );
$website_id = ! empty( $attributes['websiteId'] ) ? $attributes['websiteId'] : get_option( 'aiml_chat_website_id', '' );
// Empty = "use dashboard setting": no data-attribute is emitted below.
$position   = ! empty( $attributes['position'] ) ? $attributes['position'] : get_option( 'aiml_chat_position', '' );
$theme      = ! empty( $attributes['theme'] ) ? $attributes['theme'] : get_option( 'aiml_chat_theme', '' );
$color      = ! empty( $attributes['primaryColor'] ) ? $attributes['primaryColor'] : get_option( 'aiml_chat_primary_color', '' );

if ( empty( $api_key ) ) {
    echo '<p>' . esc_html__( 'AIML.chat: please configure your API key in Settings.', 'aiml-chat' ) . '</p>';
    return;
}

// Same source-URL settings the injector honors (self-hosted / local QA overrides).
// Blank widget URL (the normal case) = CDN default.
$widget_url = get_option( 'aiml_chat_widget_url', '' );
if ( empty( $widget_url ) ) {
    $widget_url = 'https://cdn.aiml.chat/v1/widget.js';
}
$api_url = get_option( 'aiml_chat_api_url', '' );
?>
<script
    src="<?php echo esc_url( $widget_url ); ?>"
    data-api-key="<?php echo esc_attr( $api_key ); ?>"
    <?php if ( ! empty( $website_id ) ) : ?>data-website-id="<?php echo esc_attr( $website_id ); ?>"<?php endif; ?>
    <?php if ( ! empty( $position ) ) : ?>data-position="<?php echo esc_attr( $position ); ?>"<?php endif; ?>
    <?php if ( ! empty( $theme ) ) : ?>data-theme="<?php echo esc_attr( $theme ); ?>"<?php endif; ?>
    <?php if ( ! empty( $color ) ) : ?>data-primary-color="<?php echo esc_attr( $color ); ?>"<?php endif; ?>
    <?php if ( ! empty( $api_url ) ) : ?>data-api-url="<?php echo esc_url( $api_url ); ?>"<?php endif; ?>
    async
></script>
