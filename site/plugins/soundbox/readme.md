# Kirby Soundbox Plugin

A Kirby CMS plugin that enables public audio recording and submission functionality with admin moderation capabilities.

## Features

- **Public Audio Recording**: Allow website visitors to record audio directly in their browser
- **File Upload API**: Secure endpoint for uploading audio recordings
- **Admin Moderation**: Review and approve recordings before publication


## Installation

1. Download or clone this plugin into your `site/plugins/` directory:
   ```
   site/plugins/soundbox/
   ```

2. Enable the plugin in your `site/config/config.php`:
   ```php
   return [
       'bitbetter.soundbox.enabled' => true,
       'bitbetter.soundbox.maxFileSize' => 1048576, // 1MB in bytes (optional)
   ];
   ```

## Usage

### 1. Create a Soundbox Page

Create a page with the `soundbox` template. This page will store all uploaded recordings.

### 2. Add the Recorder Block

In your templates or blocks, use the `recorder` block:

```yaml
# In your page blueprint
blocks:
  - recorder
```



## API Endpoints

### POST `/api/bitbetter/soundbox`

Upload an audio recording.

**Parameters:**
- `file` (required): Audio file (WebM, OGG, MP3, WAV)
- `color` (optional): Background color for the recording card
- `lightText` (optional): Use light text color (boolean)

**Response:**
```json
{
  "status": "ok",
  "message": "File uploaded successfully.",
  "filename": "recording_25-01-05_14-30-25_a1b2c3.ogg"
}
```

## Configuration

Add these options to your `site/config/config.php`:

```php
return [
    // Enable/disable the soundbox functionality
    'bitbetter.soundbox.enabled' => true,
    
    // Maximum file size in bytes (default: 0.5MB)
    'bitbetter.soundbox.maxFileSize' => 1048576, // 1MB
    
    // Timezone for recording timestamps
    'timezone' => 'Europe/Berlin',
];
```
