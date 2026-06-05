# Changelog

## [Unreleased]

## [1.1.0] — 2026-06

### Added
- `aiml_chat_website_id` setting — emits `data-website-id`, enabling visitor lead capture when the assistant can't answer
- `aiml_chat_primary_color` setting — emits `data-primary-color` to match the widget accent to the site brand
- `website_id` and `primary_color` attributes on the `[aiml_chat]` shortcode and the Gutenberg block
- Auto-generated FAQ / suggested questions surface when the chat opens (server-driven; no config needed)

### Fixed
- Lead capture is no longer silently disabled — the widget now receives the Website ID it requires
- Removed dead inline-script code path in the widget injector

### Changed
- Tested up to WordPress 6.8

## [0.1.0] — 2026-05

### Added
- Initial plugin release
- Settings page via WordPress Settings API
- `wp_enqueue_scripts` widget injection with `data-*` attributes
- Page exclusion by ID list
- Configurable position (right/left) and theme (light/dark/auto)
- `aiml_chat_api_key`, `aiml_chat_enabled`, `aiml_chat_position`, `aiml_chat_theme`, `aiml_chat_excluded_pages` settings
