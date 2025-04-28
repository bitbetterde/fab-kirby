<?php

// Disable very strict SVG validation, which makes most SVGs unusable
unset(Kirby\Sane\Sane::$handlers['svg']);
unset(Kirby\Sane\Sane::$aliases['image/svg']);
unset(Kirby\Sane\Sane::$aliases['image/svg+xml']);

return [
    'debug' => true,
    'thumbs' => [
        'presets' => [
            'opengraph' => ['width' => 1200, 'quality' => 90],
            'hero' => ['width' => 1800, 'quality' => 90]
        ],
    ]
];
