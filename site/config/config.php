<?php

// Disable very strict SVG validation, which makes most SVGs unusable
unset(Kirby\Sane\Sane::$handlers['svg']);
unset(Kirby\Sane\Sane::$aliases['image/svg']);
unset(Kirby\Sane\Sane::$aliases['image/svg+xml']);

return [
    'debug' => true,
];
