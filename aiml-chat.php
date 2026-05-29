<?php
/**
 * Plugin Name:       AIML.chat — AI Website Assistant
 * Plugin URI:        https://aiml.chat
 * Description:       Turn your WordPress site into an AI assistant in minutes. Add a chat widget powered by your own content.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      8.0
 * Author:            AIML.chat
 * Author URI:        https://aiml.chat
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       aiml-chat
 * Domain Path:       /languages
 */

defined( 'ABSPATH' ) || exit;

define( 'AIML_CHAT_VERSION', '1.0.0' );
define( 'AIML_CHAT_PLUGIN_FILE', __FILE__ );
define( 'AIML_CHAT_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'AIML_CHAT_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

require_once AIML_CHAT_PLUGIN_DIR . 'includes/class-aiml-admin.php';
require_once AIML_CHAT_PLUGIN_DIR . 'includes/class-aiml-widget-injector.php';
require_once AIML_CHAT_PLUGIN_DIR . 'includes/class-aiml-shortcode.php';
require_once AIML_CHAT_PLUGIN_DIR . 'includes/class-aiml-block.php';

function aiml_chat_init() {
    new AIML_Admin();
    new AIML_Widget_Injector();
    new AIML_Shortcode();
    new AIML_Block();
}
add_action( 'plugins_loaded', 'aiml_chat_init' );

register_activation_hook( __FILE__, 'aiml_chat_activate' );
function aiml_chat_activate() {
    add_option( 'aiml_chat_do_redirect', true );
}

add_action( 'admin_init', 'aiml_chat_maybe_redirect' );
function aiml_chat_maybe_redirect() {
    if ( get_option( 'aiml_chat_do_redirect' ) ) {
        delete_option( 'aiml_chat_do_redirect' );
        wp_redirect( admin_url( 'options-general.php?page=aiml-chat' ) );
        exit;
    }
}
