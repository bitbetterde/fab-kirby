<?php

namespace YoutubeEmbed;

class YouTubeHelper
{
    /**
     * Extract YouTube video ID from various YouTube URL formats
     * 
     * @param string $url The YouTube URL
     * @return string|null The video ID or null if not found
     */
    public static function getVideoId($url)
    {
        if (empty($url)) {
            return null;
        }

        // Handle different YouTube URL formats
        $patterns = [
            // Standard youtube.com URLs
            '/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/',
            '/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/',
            '/youtube\.com\/live\/([a-zA-Z0-9_-]+)/',
            '/youtube\.com\/v\/([a-zA-Z0-9_-]+)/',
            // YouTube short URLs
            '/youtu\.be\/([a-zA-Z0-9_-]+)/',
            // YouTube URLs with additional parameters
            '/youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]+)/',
        ];

        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $url, $matches)) {
                return $matches[1];
            }
        }

        return null;
    }

    /**
     * Get YouTube thumbnail URL for a video ID
     * Downloads and caches the thumbnail locally to avoid external requests
     * 
     * @param string $videoId The YouTube video ID
     * @param string $quality Thumbnail quality (default, mqdefault, hqdefault, sddefault, maxresdefault)
     * @return string The local thumbnail URL or empty string on failure
     */
    public static function downloadThumbnail($videoId, $quality = 'hqdefault')
    {
        if (empty($videoId)) {
            return '';
        }

        // Create cache directory if it doesn't exist
        $cacheDir = self::getCacheDir();
        if (!is_dir($cacheDir)) {
            mkdir($cacheDir, 0755, true);
        }

        // Generate local filename
        $filename = "{$videoId}_{$quality}.jpg";
        $localPath = $cacheDir . '/' . $filename;
        $localUrl = kirby()->url('media') . '/youtube-thumbnails/' . $filename;

        // Check if thumbnail already exists locally
        if (file_exists($localPath)) {
            return $localUrl;
        }

        // Download thumbnail from YouTube
        $youtubeUrl = "https://img.youtube.com/vi/{$videoId}/{$quality}.jpg";
        
        try {
            $context = stream_context_create([
                'http' => [
                    'method' => 'GET',
                    'timeout' => 20
                ]
            ]);
            
            $imageData = @file_get_contents($youtubeUrl, false, $context);
            
            if ($imageData && strlen($imageData) > 1000) { // Basic check for valid image
                // Save to local cache
                if (file_put_contents($localPath, $imageData)) {
                    return $localUrl;
                }
            }
        } catch (\Exception $e) {
            // Log error but don't break the site
            error_log("YouTube thumbnail download failed for {$videoId}: " . $e->getMessage());
        }

        // Fallback: return empty string if download fails
        return '';
    }

    /**
     * Get video title from YouTube (requires API call)
     * This is a fallback method that scrapes the page title
     * 
     * @param string $videoId The YouTube video ID
     * @return string The video title or empty string
     */
    public static function getVideoTitle($videoId)
    {
        if (empty($videoId)) {
            return '';
        }

        try {
            $url = "https://www.youtube.com/watch?v={$videoId}";
            $context = stream_context_create([
                'http' => [
                    'method' => 'GET',
                    'header' => 'User-Agent: Mozilla/5.0 (compatible; Kirby YouTube Plugin)',
                    'timeout' => 10
                ]
            ]);
            
            $html = @file_get_contents($url, false, $context);
            
            if ($html && preg_match('/<title>(.+?) - YouTube<\/title>/', $html, $matches)) {
                return html_entity_decode($matches[1], ENT_QUOTES, 'UTF-8');
            }
        } catch (\Exception $e) {
            // Fail silently
        }

        return '';
    }

    /**
     * Generate YouTube embed URL
     * 
     * @param string $videoId The YouTube video ID
     * @param array $params Additional parameters (autoplay, start, etc.)
     * @return string The embed URL
     */
    public static function getEmbedUrl($videoId, $params = [])
    {
        if (empty($videoId)) {
            return '';
        }

        $defaultParams = [
            'enablejsapi' => 1,
            'origin' => $_SERVER['HTTP_HOST'] ?? '',
            'autoplay' => 1,
        ];

        $allParams = array_merge($defaultParams, $params);
        $queryString = http_build_query($allParams);

        return "https://www.youtube-nocookie.com/embed/{$videoId}?" . $queryString;
    }

    /**
     * Check if a thumbnail exists locally or can be downloaded
     * 
     * @param string $videoId The YouTube video ID
     * @return bool True if thumbnail is accessible locally or can be downloaded
     */
    public static function thumbnailExists($videoId)
    {
        if (empty($videoId)) {
            return false;
        }

        // Check if we already have it locally
        $cacheDir = self::getCacheDir();
        $filename = "{$videoId}_hqdefault.jpg";
        $localPath = $cacheDir . '/' . $filename;
        
        if (file_exists($localPath)) {
            return true;
        }

        // Check if we can download it from YouTube
        $youtubeUrl = "https://img.youtube.com/vi/{$videoId}/hqdefault.jpg";
        $headers = @get_headers($youtubeUrl);
        return $headers && strpos($headers[0], '200') !== false;
    }

    /**
     * Validate if URL is a valid YouTube URL
     * 
     * @param string $url The URL to validate
     * @return bool True if valid YouTube URL
     */
    public static function isValidYouTubeUrl($url)
    {
        return self::getVideoId($url) !== null;
    }


    /**
     * Get the local cache directory path for thumbnails
     * 
     * @return string The cache directory path
     */
    private static function getCacheDir()
    {
        return kirby()->root('media') . '/youtube-thumbnails';
    }

}