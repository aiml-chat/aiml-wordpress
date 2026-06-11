=== AIML.chat — AI Website Assistant ===
Contributors: aimlchat
Tags: ai, chatbot, assistant, widget, documentation
Requires at least: 6.0
Tested up to: 6.8
Requires PHP: 8.0
Stable tag: 1.2.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Turn your WordPress site into an AI assistant that answers visitor questions using only your own content.

== Description ==

AIML.chat indexes your site's content and uses it to answer visitor questions in a chat widget. No hallucinations — answers come only from your pages, with source citations.

**Features:**

* One-click setup — enter your API key and the widget appears on every page
* Answers are grounded in your content (no hallucinations)
* Source citations with clickable links
* Lead capture — when the assistant can't answer, it offers to collect the visitor's email so you can follow up (requires Website ID)
* Suggested questions & auto-generated FAQ shown when the chat opens, so visitors always know what to ask
* Brand colour — match the widget accent to your theme
* Light / dark / auto themes
* Bottom-left or bottom-right positioning
* Exclude specific pages (e.g. checkout, login)
* Works with Gutenberg, Shortcodes, and Classic editor
* EU AI Act compliant — widget is labelled "AI Assistant"
* GDPR friendly — no tracking cookies, uses sessionStorage only

**Get started:**

1. Create a free account at [aiml.chat](https://aiml.chat)
2. Add your website and trigger content indexing
3. Copy your API key from the dashboard
4. Paste it in Settings → AIML.chat

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/aiml-chat` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Go to Settings → AIML.chat and enter your API key.

== Frequently Asked Questions ==

= Do I need an account? =

Yes. Create a free account at aiml.chat to get your API key.

= Does this slow down my site? =

No. The widget script loads asynchronously and has no impact on page load time.

= Can I show the widget only on certain pages? =

Use the Gutenberg block or shortcode `[aiml_chat]` to place it on specific pages, or use the "Exclude Pages" setting to hide it on specific URLs.

= Is it GDPR compliant? =

Yes. The widget does not use cookies. Conversation history is stored in sessionStorage (cleared when the browser tab closes) and never sent to third parties.

= Can I remove the "Powered by aiml.chat" badge? =

Yes — Pro plan and above can remove the badge from the dashboard widget settings.

= How do I enable lead capture? =

Enter your Website ID (shown next to your API key in the dashboard) in Settings → AIML.chat. When the assistant can't answer a question, it will invite the visitor to leave their email so you can follow up. Without the Website ID the widget still answers questions, but lead capture is disabled.

== Shortcode ==

`[aiml_chat]`

Optional attributes:
* `api_key` — override the global API key
* `website_id` — override the global Website ID (enables lead capture)
* `position` — `right` (default) or `left`
* `theme` — `auto` (default), `light`, or `dark`
* `primary_color` — hex accent colour, e.g. `#4f46e5`

== Changelog ==

= 1.2.0 =
* Position and Theme now default to "Default (use dashboard setting)" — appearance configured in your AIML.chat dashboard (colours, avatar, launcher, greeting, auto-open and more) applies unless explicitly overridden here
* Fixed a PHP warning on archive, search and 404 pages when "Exclude Pages" was set
* Advanced `aiml_chat_widget_url` / `aiml_chat_api_url` options are now registered with URL sanitization

= 1.1.0 =
* Added Website ID setting — enables visitor lead capture when the assistant can't answer
* Added Brand Colour setting to match the widget accent to your theme
* Suggested questions and auto-generated FAQ now appear when the chat opens
* `website_id` and `primary_color` attributes added to the `[aiml_chat]` shortcode and Gutenberg block
* Tested up to WordPress 6.8

= 1.0.0 =
* Initial release

== Upgrade Notice ==

= 1.2.0 =
Appearance is now managed centrally in your AIML.chat dashboard; plugin settings act as per-site overrides. Existing explicit Position/Theme choices are preserved.

= 1.1.0 =
Adds lead capture (set your Website ID) and brand-colour customisation. Open Settings → AIML.chat to configure.

= 1.0.0 =
Initial release.
