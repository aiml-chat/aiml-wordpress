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

        $api_key  = get_option( 'aiml_chat_api_key', '' );
        $position = get_option( 'aiml_chat_position', 'right' );
        $theme    = get_option( 'aiml_chat_theme', 'auto' );

        wp_enqueue_script(
            'aiml-chat-widget',
            'https://cdn.aiml.chat/v1/widget.js',
            array(),
            null, // version managed by CDN content hash
            array(
                'strategy'  => 'async',
                'in_footer' => true,
            )
        );

        // Add data attributes via a small inline script that sets them before the async script runs.
        // Inline script is the safest cross-theme way to pass config without exposing it in markup.
        $config = array(
            'apiKey'   => $api_key,
            'position' => $position,
            'theme'    => $theme,
        );

        $inline = sprintf(
            'document.currentScript.closest("script")?.setAttribute("data-api-key", %s);',
            wp_json_encode( $api_key )
        );

        // Use filter_input to safely add data attributes to the script tag.
        add_filter( 'script_loader_tag', array( $this, 'add_data_attributes' ), 10, 2 );
        $this->config = $config;
    }

    /** @var array */
    private $config = array();

    public function add_data_attributes( $tag, $handle ) {
        if ( 'aiml-chat-widget' !== $handle ) {
            return $tag;
        }

        $attrs = '';
        if ( ! empty( $this->config['apiKey'] ) ) {
            $attrs .= ' data-api-key="' . esc_attr( $this->config['apiKey'] ) . '"';
        }
        $attrs .= ' data-position="' . esc_attr( $this->config['position'] ) . '"';
        $attrs .= ' data-theme="' . esc_attr( $this->config['theme'] ) . '"';

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
            $excluded = array_filter( array_map( 'trim', explode( "\n", $excluded_raw ) ) );
            $current  = wp_parse_url( get_permalink(), PHP_URL_PATH );
            foreach ( $excluded as $path ) {
                if ( $current === $path || str_starts_with( $current, $path ) ) {
                    return false;
                }
            }
        }

        return true;
    }
}
