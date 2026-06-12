<?php
defined( 'ABSPATH' ) || exit;

class AIML_Admin {

    public function __construct() {
        add_action( 'admin_menu', array( $this, 'add_settings_page' ) );
        add_action( 'admin_init', array( $this, 'register_settings' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_assets' ) );
    }

    public function add_settings_page() {
        add_options_page(
            __( 'AIML.chat Settings', 'aiml-chat' ),
            __( 'AIML.chat', 'aiml-chat' ),
            'manage_options',
            'aiml-chat',
            array( $this, 'render_settings_page' )
        );
    }

    public function register_settings() {
        register_setting( 'aiml_chat_settings', 'aiml_chat_api_key', array(
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default'           => '',
        ) );
        register_setting( 'aiml_chat_settings', 'aiml_chat_website_id', array(
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default'           => '',
        ) );
        register_setting( 'aiml_chat_settings', 'aiml_chat_enabled', array(
            'type'              => 'boolean',
            'sanitize_callback' => 'rest_sanitize_boolean',
            'default'           => true,
        ) );
        // Empty string = "Default": no data-attribute is emitted, so the appearance configured in
        // the AIML.chat dashboard applies. An explicit choice here overrides the dashboard.
        register_setting( 'aiml_chat_settings', 'aiml_chat_position', array(
            'type'              => 'string',
            'sanitize_callback' => array( $this, 'sanitize_position' ),
            'default'           => '',
        ) );
        register_setting( 'aiml_chat_settings', 'aiml_chat_theme', array(
            'type'              => 'string',
            'sanitize_callback' => array( $this, 'sanitize_theme' ),
            'default'           => '',
        ) );
        register_setting( 'aiml_chat_settings', 'aiml_chat_primary_color', array(
            'type'              => 'string',
            'sanitize_callback' => array( $this, 'sanitize_color' ),
            'default'           => '',
        ) );
        register_setting( 'aiml_chat_settings', 'aiml_chat_excluded_pages', array(
            'type'              => 'string',
            'sanitize_callback' => 'sanitize_textarea_field',
            'default'           => '',
        ) );
        // Advanced overrides (self-hosted widget bundle / non-default API endpoint).
        register_setting( 'aiml_chat_settings', 'aiml_chat_widget_url', array(
            'type'              => 'string',
            'sanitize_callback' => 'esc_url_raw',
            'default'           => 'https://cdn.aiml.chat/v1/widget.js',
        ) );
        register_setting( 'aiml_chat_settings', 'aiml_chat_api_url', array(
            'type'              => 'string',
            'sanitize_callback' => 'esc_url_raw',
            'default'           => '',
        ) );
    }

    public function sanitize_position( $value ) {
        return in_array( $value, array( 'left', 'right' ), true ) ? $value : '';
    }

    public function sanitize_theme( $value ) {
        return in_array( $value, array( 'light', 'dark', 'auto' ), true ) ? $value : '';
    }

    public function sanitize_color( $value ) {
        $value = sanitize_text_field( $value );
        // Accept a #rgb / #rrggbb hex colour; otherwise store empty so the widget uses its default.
        return preg_match( '/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/', $value ) ? $value : '';
    }

    public function enqueue_admin_assets( $hook ) {
        if ( 'settings_page_aiml-chat' !== $hook ) {
            return;
        }
        wp_enqueue_style(
            'aiml-chat-admin',
            AIML_CHAT_PLUGIN_URL . 'assets/css/admin.css',
            array(),
            AIML_CHAT_VERSION
        );
    }

    public function render_settings_page() {
        if ( ! current_user_can( 'manage_options' ) ) {
            return;
        }
        $api_key    = get_option( 'aiml_chat_api_key', '' );
        $website_id = get_option( 'aiml_chat_website_id', '' );
        $enabled    = get_option( 'aiml_chat_enabled', true );
        $position   = get_option( 'aiml_chat_position', '' );
        $theme      = get_option( 'aiml_chat_theme', '' );
        $color      = get_option( 'aiml_chat_primary_color', '' );
        $excluded   = get_option( 'aiml_chat_excluded_pages', '' );
        $widget_url = get_option( 'aiml_chat_widget_url', '' );
        $api_url    = get_option( 'aiml_chat_api_url', '' );
        ?>
        <div class="wrap aiml-wrap">
            <h1><?php esc_html_e( 'AIML.chat Settings', 'aiml-chat' ); ?></h1>
            <p class="aiml-intro">
                <?php esc_html_e( 'Connect your site to an AI assistant powered by your own content.', 'aiml-chat' ); ?>
                <a href="https://aiml.chat/dashboard" target="_blank" rel="noopener">
                    <?php esc_html_e( 'Get your API key →', 'aiml-chat' ); ?>
                </a>
            </p>
            <form method="post" action="options.php">
                <?php settings_fields( 'aiml_chat_settings' ); ?>
                <table class="form-table" role="presentation">
                    <tr>
                        <th scope="row"><label for="aiml_chat_api_key"><?php esc_html_e( 'API Key', 'aiml-chat' ); ?></label></th>
                        <td>
                            <input
                                type="password"
                                id="aiml_chat_api_key"
                                name="aiml_chat_api_key"
                                value="<?php echo esc_attr( $api_key ); ?>"
                                class="regular-text"
                                autocomplete="off"
                                placeholder="aiml_pk_…"
                            />
                            <p class="description"><?php esc_html_e( 'Find this in your AIML.chat dashboard under Website Settings.', 'aiml-chat' ); ?></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="aiml_chat_website_id"><?php esc_html_e( 'Website ID', 'aiml-chat' ); ?></label></th>
                        <td>
                            <input
                                type="text"
                                id="aiml_chat_website_id"
                                name="aiml_chat_website_id"
                                value="<?php echo esc_attr( $website_id ); ?>"
                                class="regular-text"
                                autocomplete="off"
                                placeholder="e.g. 3f2a…"
                            />
                            <p class="description"><?php esc_html_e( 'Required for lead capture — lets the assistant collect a visitor email when it can’t answer. Find it next to your API key in the dashboard.', 'aiml-chat' ); ?></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php esc_html_e( 'Enable Widget', 'aiml-chat' ); ?></th>
                        <td>
                            <label>
                                <input type="checkbox" name="aiml_chat_enabled" value="1" <?php checked( $enabled ); ?> />
                                <?php esc_html_e( 'Show the chat widget on this site', 'aiml-chat' ); ?>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="aiml_chat_position"><?php esc_html_e( 'Position', 'aiml-chat' ); ?></label></th>
                        <td>
                            <select id="aiml_chat_position" name="aiml_chat_position">
                                <option value="" <?php selected( $position, '' ); ?>><?php esc_html_e( 'Default (use dashboard setting)', 'aiml-chat' ); ?></option>
                                <option value="right" <?php selected( $position, 'right' ); ?>><?php esc_html_e( 'Bottom right', 'aiml-chat' ); ?></option>
                                <option value="left" <?php selected( $position, 'left' ); ?>><?php esc_html_e( 'Bottom left', 'aiml-chat' ); ?></option>
                            </select>
                            <p class="description"><?php esc_html_e( 'Appearance (colours, avatar, launcher, greeting…) is managed centrally in your AIML.chat dashboard. Settings here override it for this site only.', 'aiml-chat' ); ?></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="aiml_chat_theme"><?php esc_html_e( 'Theme', 'aiml-chat' ); ?></label></th>
                        <td>
                            <select id="aiml_chat_theme" name="aiml_chat_theme">
                                <option value="" <?php selected( $theme, '' ); ?>><?php esc_html_e( 'Default (use dashboard setting)', 'aiml-chat' ); ?></option>
                                <option value="auto" <?php selected( $theme, 'auto' ); ?>><?php esc_html_e( 'Auto (follows system)', 'aiml-chat' ); ?></option>
                                <option value="light" <?php selected( $theme, 'light' ); ?>><?php esc_html_e( 'Light', 'aiml-chat' ); ?></option>
                                <option value="dark" <?php selected( $theme, 'dark' ); ?>><?php esc_html_e( 'Dark', 'aiml-chat' ); ?></option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="aiml_chat_primary_color"><?php esc_html_e( 'Brand Colour', 'aiml-chat' ); ?></label></th>
                        <td>
                            <input
                                type="text"
                                id="aiml_chat_primary_color"
                                name="aiml_chat_primary_color"
                                value="<?php echo esc_attr( $color ); ?>"
                                class="regular-text"
                                placeholder="#4f46e5"
                            />
                            <p class="description"><?php esc_html_e( 'Optional. A hex colour (e.g. #4f46e5) for the widget accent, to match your brand. Leave blank for the default.', 'aiml-chat' ); ?></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="aiml_chat_excluded_pages"><?php esc_html_e( 'Exclude Pages', 'aiml-chat' ); ?></label></th>
                        <td>
                            <textarea
                                id="aiml_chat_excluded_pages"
                                name="aiml_chat_excluded_pages"
                                rows="4"
                                class="large-text"
                                placeholder="/cart&#10;/checkout&#10;/my-account"
                            ><?php echo esc_textarea( $excluded ); ?></textarea>
                            <p class="description"><?php esc_html_e( 'One URL path per line. Widget will not appear on these pages.', 'aiml-chat' ); ?></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" colspan="2"><h2 class="title"><?php esc_html_e( 'Advanced', 'aiml-chat' ); ?></h2></th>
                    </tr>
                    <tr>
                        <th scope="row"><label for="aiml_chat_widget_url"><?php esc_html_e( 'Widget Script URL', 'aiml-chat' ); ?></label></th>
                        <td>
                            <input
                                type="url"
                                id="aiml_chat_widget_url"
                                name="aiml_chat_widget_url"
                                value="<?php echo esc_attr( $widget_url ); ?>"
                                class="regular-text code"
                                placeholder="https://cdn.aiml.chat/v1/widget.js"
                            />
                            <p class="description"><?php esc_html_e( 'Leave blank to load the widget from the AIML.chat CDN (recommended). Only change for self-hosted or staging setups.', 'aiml-chat' ); ?></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="aiml_chat_api_url"><?php esc_html_e( 'API URL', 'aiml-chat' ); ?></label></th>
                        <td>
                            <input
                                type="url"
                                id="aiml_chat_api_url"
                                name="aiml_chat_api_url"
                                value="<?php echo esc_attr( $api_url ); ?>"
                                class="regular-text code"
                                placeholder="https://api.aiml.chat"
                            />
                            <p class="description"><?php esc_html_e( 'Leave blank for the default AIML.chat API. Only change for self-hosted or staging setups.', 'aiml-chat' ); ?></p>
                        </td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }
}
