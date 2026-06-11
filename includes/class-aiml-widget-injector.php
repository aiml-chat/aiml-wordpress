<?php
defined( 'ABSPATH' ) || exit;

class AIML_Widget_Injector {

    public function __construct() {
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_widget' ) );
    }

    public function enqueue_widget() {
        if ( ! $this->should_inject() ) {
            return;
        }

        $api_key    = get_option( 'aiml_chat_api_key', '' );
        $website_id = get_option( 'aiml_chat_website_id', '' );
        $position   = get_option( 'aiml_chat_position', '' );
        $theme      = get_option( 'aiml_chat_theme', '' );
        $color      = get_option( 'aiml_chat_primary_color', '' );

        $widget_url = get_option( 'aiml_chat_widget_url', 'https://cdn.aiml.chat/v1/widget.js' );
        wp_enqueue_script(
            'aiml-chat-widget',
            $widget_url,
            array(),
            null, // version managed by CDN content hash
            array(
                'strategy'  => 'async',
                'in_footer' => true,
            )
        );

        // The widget reads its config from data-* attributes on the script tag. WordPress builds the
        // tag for enqueued scripts, so we append the attributes via the script_loader_tag filter below.
        $api_endpoint = get_option( 'aiml_chat_api_url', '' );
        $this->config = array(
            'apiKey'       => $api_key,
            'websiteId'    => $website_id,
            'position'     => $position,
            'theme'        => $theme,
            'primaryColor' => $color,
            'apiEndpoint'  => $api_endpoint,
        );
        add_filter( 'script_loader_tag', array( $this, 'add_data_attributes' ), 10, 2 );
    }

    /** @var array */
    private $config = array();

    public function add_data_attributes( $tag, $handle ) {
        if ( 'aiml-chat-widget' !== $handle ) {
            return $tag;
        }

        // Only emit an attribute when the admin chose an explicit override — an absent attribute
        // means the widget uses the appearance configured in the AIML.chat dashboard.
        $attrs = '';
        if ( ! empty( $this->config['apiKey'] ) ) {
            $attrs .= ' data-api-key="' . esc_attr( $this->config['apiKey'] ) . '"';
        }
        if ( ! empty( $this->config['websiteId'] ) ) {
            $attrs .= ' data-website-id="' . esc_attr( $this->config['websiteId'] ) . '"';
        }
        if ( ! empty( $this->config['position'] ) ) {
            $attrs .= ' data-position="' . esc_attr( $this->config['position'] ) . '"';
        }
        if ( ! empty( $this->config['theme'] ) ) {
            $attrs .= ' data-theme="' . esc_attr( $this->config['theme'] ) . '"';
        }
        if ( ! empty( $this->config['primaryColor'] ) ) {
            $attrs .= ' data-primary-color="' . esc_attr( $this->config['primaryColor'] ) . '"';
        }
        if ( ! empty( $this->config['apiEndpoint'] ) ) {
            $attrs .= ' data-api-url="' . esc_attr( $this->config['apiEndpoint'] ) . '"';
        }

        return str_replace( ' src=', $attrs . ' src=', $tag );
    }

    private function should_inject() {
        if ( ! get_option( 'aiml_chat_enabled', true ) ) {
            return false;
        }
        if ( empty( get_option( 'aiml_chat_api_key', '' ) ) ) {
            return false;
        }

        $excluded_raw = get_option( 'aiml_chat_excluded_pages', '' );
        if ( ! empty( $excluded_raw ) ) {
            // get_permalink() is false on archives/search/404 — exclusion paths can't match those,
            // and str_starts_with(null|false, …) is a PHP warning, so bail out of matching early.
            $permalink = get_permalink();
            $current   = $permalink ? wp_parse_url( $permalink, PHP_URL_PATH ) : null;
            if ( is_string( $current ) && '' !== $current ) {
                $excluded = array_filter( array_map( 'trim', explode( "\n", $excluded_raw ) ) );
                foreach ( $excluded as $path ) {
                    if ( $current === $path || str_starts_with( $current, $path ) ) {
                        return false;
                    }
                }
            }
        }

        return true;
    }
}
