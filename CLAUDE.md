# aiml-wordpress — Contributor Reference

Official WordPress plugin for the AIML.chat AI assistant widget.

## Structure

```
aiml-chat.php          Main plugin file — hooks, settings registration
includes/              PHP classes
assets/                Admin CSS/JS
blocks/                Gutenberg block (optional)
```

## Development

```bash
# Lint (requires phpcs + WordPress-Coding-Standards)
composer install
vendor/bin/phpcs --standard=WordPress aiml-chat.php includes/

# Test in a local WordPress environment (WP-CLI, LocalWP, or Docker)
```

## Settings stored

| Option key | Description |
|-----------|-------------|
| `aiml_chat_api_key` | `aiml_pk_...` key |
| `aiml_chat_enabled` | Widget on/off |
| `aiml_chat_position` | `right` or `left` |
| `aiml_chat_theme` | `auto`, `light`, `dark` |
| `aiml_chat_excluded_pages` | Comma-separated page IDs |

## Widget injection

Uses `wp_enqueue_scripts` to add the `<script>` tag on non-excluded pages. No server-side rendering of chat UI.

## Coding standards

WordPress Coding Standards (WPCS). Run phpcs before submitting a PR.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
