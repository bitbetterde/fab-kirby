<?php

/**
 * YouTube Embed Plugin for Kirby CMS
 * 
 * Provides server-side YouTube embeds with lazy loading
 * Only loads the actual YouTube iframe when the user clicks the preview
 * 
 * @version 1.0.0
 * @author Moritz Stueckler <moritz@bitbetter.de>
 */

// Autoload the helper class
require_once __DIR__ . '/classes/YouTubeHelper.php';

Kirby::plugin('bitbetter/kirby-tube', [
    'blueprints' => [
        'blocks/youtube-embed' => __DIR__ . '/blueprints/blocks/youtube-embed.yml'
    ],
    'snippets' => [
        'blocks/youtube-embed' => __DIR__ . '/snippets/blocks/youtube-embed.php'
    ],
    'blockMethods' => [
        'youtube-embed' => [
            'videoId' => function() {
                return \YoutubeEmbed\YouTubeHelper::getVideoId($this->url()->value());
            },
            'thumbnailUrl' => function($quality = 'hqdefault') {
                $videoId = $this->videoId();
                return $videoId ? \YoutubeEmbed\YouTubeHelper::downloadThumbnail($videoId, $quality) : '';
            },
            'embedUrl' => function($params = []) {
                $videoId = $this->videoId();
                if (!$videoId) return '';
                
                return \YoutubeEmbed\YouTubeHelper::getEmbedUrl($videoId, $params);
            },
            'isValid' => function() {
                return \YoutubeEmbed\YouTubeHelper::isValidYouTubeUrl($this->url()->value());
            }
        ]
    ],
    'hooks' => [
        // Validate YouTube URL when block is saved
        'block.save:after' => function ($block) {
            if ($block->type() === 'youtube-embed') {
                $url = $block->url()->value();
                if (!empty($url) && !\YoutubeEmbed\YouTubeHelper::isValidYouTubeUrl($url)) {
                    throw new Exception('Invalid YouTube URL provided');
                }
            }
        }
    ],
    'api' => [
        'routes' => [
            [
                'pattern' => 'youtube-embed/validate',
                'method' => 'POST',
                'action' => function () {
                    $url = get('url');
                    
                    if (empty($url)) {
                        return [
                            'valid' => false,
                            'error' => 'URL is required'
                        ];
                    }
                    
                    $videoId = \YoutubeEmbed\YouTubeHelper::getVideoId($url);
                    $isValid = $videoId !== null;
                    
                    $response = ['valid' => $isValid];
                    
                    if ($isValid) {
                        $response['videoId'] = $videoId;
                        $response['thumbnailUrl'] = \YoutubeEmbed\YouTubeHelper::downloadThumbnail($videoId);
                        $response['title'] = \YoutubeEmbed\YouTubeHelper::getVideoTitle($videoId);
                    } else {
                        $response['error'] = 'Invalid YouTube URL';
                    }
                    
                    return $response;
                }
            ],
            [
                'pattern' => 'youtube-embed/thumbnail/(:any)',
                'method' => 'GET',
                'action' => function ($videoId) {
                    if (empty($videoId)) {
                        throw new Exception('Video ID is required');
                    }
                    
                    $quality = get('quality', 'hqdefault');
                    $thumbnailUrl = \YoutubeEmbed\YouTubeHelper::downloadThumbnail($videoId, $quality);
                    
                    return [
                        'videoId' => $videoId,
                        'quality' => $quality,
                        'thumbnailUrl' => $thumbnailUrl,
                        'exists' => \YoutubeEmbed\YouTubeHelper::thumbnailExists($videoId)
                    ];
                }
            ],
        ]
    ]
]);