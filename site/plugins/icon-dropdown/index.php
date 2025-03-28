<?php
Kirby::plugin('bitbetter/icon-dropdown', [
    'siteMethods' => [
        'iconOptions' => function () {
            return json_decode(file_get_contents(kirby()->root('plugins') . '/icon-dropdown/options.json'));
        }
    ]
]);
