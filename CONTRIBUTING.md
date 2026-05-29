# Contributing to aiml-wordpress

Thanks for contributing to the official AIML.chat WordPress plugin!

## Requirements

- PHP 7.4+
- WordPress 5.8+
- Follow [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/)

## Development setup

```bash
# Clone into your local WordPress wp-content/plugins directory
cd wp-content/plugins
git clone https://github.com/aiml-chat/aiml-wordpress aiml-chat
```

Activate the plugin from your WordPress admin dashboard.

## Ground rules

- Must be compatible with PHP 7.4+ (no named arguments, no match, no enums)
- Follow WordPress Coding Standards (`phpcs --standard=WordPress`)
- No composer dependencies — the plugin must be self-contained
- Settings use the WordPress Settings API (no custom admin pages from scratch)
- All user-facing strings must be translatable via `__()` / `_e()`

## Pull requests

1. Fork and branch from `main`
2. Test against WordPress 5.8+ and PHP 7.4+
3. Open a PR with a clear description of the change

## License

GPLv2 or later — all contributions must be compatible.
