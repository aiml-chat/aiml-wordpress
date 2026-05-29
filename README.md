# aiml-wordpress

Official WordPress plugin for [AIML.chat](https://aiml.chat) — AI documentation & website assistant.

**License:** GPLv2 or later  
**Requires:** WordPress 5.8+ / PHP 7.4+

---

## Installation

### From the WordPress plugin directory (recommended)

1. In your WordPress admin: **Plugins → Add New**
2. Search **AIML Chat**
3. Install and Activate

### Manual

1. Download `aiml-chat.zip` from your AIML.chat dashboard
2. **Plugins → Add New → Upload Plugin**
3. Activate and go to **Settings → AIML Chat**

## Configuration

| Setting | Description |
|---------|-------------|
| API Key | Your `aiml_pk_...` key from aiml.chat |
| Enable widget | Toggle on/off site-wide |
| Position | `right` (default) or `left` |
| Theme | `auto`, `light`, or `dark` |
| Excluded pages | Comma-separated page IDs to hide the widget |

## How it works

The plugin injects the AIML.chat widget script tag on every non-excluded page:

```html
<script
  src="https://cdn.aiml.chat/v1/widget.js"
  data-api-key="..."
  data-website-id="..."
  async defer>
</script>
```

## Development

```bash
# Clone into your local WordPress plugins directory
cd wp-content/plugins
git clone https://github.com/aiml-chat/aiml-wordpress aiml-chat
```

## License

GPLv2 or later. See [LICENSE](LICENSE).
