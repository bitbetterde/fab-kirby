<?php

use Kirby\Cms\Page;
use Kirby\Cms\Site;
use tobimori\Inertia\Inertia;

include 'site/helpers/layout-serializers.php';

return function (Page $page, Site $site) {
    $baseProps = getBaseProps($page, $site);
    $pois = serializePois($page);

    return Inertia::createResponse(
        $page->intendedTemplate(),
        [
            ...$baseProps,
            ...$pois,
            'basepath' => parse_url($page->url(), PHP_URL_PATH),
        ]
    );
};
