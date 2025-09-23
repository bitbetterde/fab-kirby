# YouTube Embed Plugin for Kirby CMS

A Kirby plugin that provides privacy-friendly server-side YouTube embeds with lazy loading functionality. This means, that no connection to YouTube will be established, when visitors just open your page (only after clicking on the "Play icon"/thumbnail).

## Features

- 🚀 **Lazy Loading**: Only loads YouTube iframe when clicked
- 🖼️ **Server-side Thumbnails**: Downloads and caches high-quality video thumbnails on the server
- 🔒 **Privacy-First**: No external requests until user clicks play button
- 📝 **Block Editor**: Works seamlessly with Kirby's block editor

## Installation

1. Download or clone this plugin into your `site/plugins/` directory:
   ```
   site/plugins/kirby-tube/
   ```

2. The plugin will be automatically loaded by Kirby.

## Usage

### In the Kirby Panel

1. Add a new block to your content
2. Select "YouTube Embed" from the block types
3. Enter a YouTube URL in the URL field
4. Optionally add a caption
5. Save your changes

### Supported YouTube URL Formats

The plugin supports various YouTube URL formats:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/v/VIDEO_ID`
- URLs with additional parameters

### In Templates

The plugin automatically handles rendering when using blocks:

```php
<?= $page->text()->toBlocks() ?>
```

### Manual Usage

You can also use the plugin components manually:

```php
<?php
use YoutubeEmbed\YouTubeHelper;

$videoId = YouTubeHelper::getVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
$thumbnailUrl = YouTubeHelper::downloadThumbnail($videoId);
$embedUrl = YouTubeHelper::getEmbedUrl($videoId);
?>

<div class="youtube-embed" data-video-id="<?= $videoId ?>" data-embed-url="<?= $embedUrl ?>">
    <!-- Your custom HTML here -->
</div>
```

## API Endpoints

The plugin provides REST API endpoints for validation and thumbnail fetching:

### Validate YouTube URL

```
POST /api/youtube-embed/validate
```

**Payload:**
```json
{
  "url": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

**Response:**
```json
{
  "valid": true,
  "videoId": "VIDEO_ID",
  "thumbnailUrl": "https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg",
  "title": "Video Title"
}
```

## Thumbnail Caching

The plugin automatically downloads and caches YouTube thumbnails in your `media/youtube-thumbnails/` directory. This provides several benefits:

- **Privacy**: No external requests to YouTube until video is played
- **Performance**: Faster loading since images are served from your server
- **Reliability**: Cached images continue to work even if YouTube changes their thumbnail URLs
- **GDPR Compliance**: No third-party requests on page load

### Cache Management

Thumbnails are automatically downloaded when first needed and cached locally. You can manage the cache using:

- **API endpoints** for programmatic management
- **Automatic cleanup** can be scheduled via cron jobs
- **Manual deletion** of the `media/youtube-thumbnails/` directory

## Customization

### Styling

The plugin includes comprehensive CSS that you can override in your theme:

```css
.youtube-embed {
    /* Your custom styles */
}

.youtube-embed__preview {
    /* Customize the preview area */
}

.youtube-embed__play-button {
    /* Customize the play button */
}
```

### Block Methods

The plugin extends blocks with useful methods:

```php
// In your templates
foreach ($blocks as $block) {
    if ($block->type() === 'youtube-embed') {
        echo $block->videoId();        // Get video ID
        echo $block->thumbnailUrl();   // Get thumbnail URL
        echo $block->embedUrl();       // Get embed URL
        echo $block->isValid();        // Check if URL is valid
    }
}
```

### Configuration

You can extend the plugin functionality by adding hooks in your `config.php`:

```php
return [
    'hooks' => [
        'block.save:after' => function ($block) {
            if ($block->type() === 'youtube-embed') {
                // Custom validation or processing
            }
        }
    ]
];
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Internet Explorer 11+ (with polyfills)
- Mobile browsers (iOS Safari, Android Chrome)

## Performance

- Thumbnails are loaded lazily with `loading="lazy"`
- JavaScript is loaded with `defer` attribute
- CSS and JS assets are loaded only once per page
- No external API calls during rendering (uses YouTube's thumbnail URLs)

## Privacy

This plugin is privacy-friendly:
- No tracking cookies are set
- No third-party scripts are loaded until user interaction
- YouTube content is only loaded when explicitly requested by the user
- Complies with GDPR requirements for lazy loading
