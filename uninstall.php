<?php
defined( 'WP_UNINSTALL_PLUGIN' ) || exit;

$options = array(
    'aiml_chat_api_key',
    'aiml_chat_enabled',
    'aiml_chat_position',
    'aiml_chat_theme',
    'aiml_chat_excluded_pages',
    'aiml_chat_do_redirect',
);

foreach ( $options as $option ) {
    delete_option( $option );
}
