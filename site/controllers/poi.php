<?php

use Kirby\Cms\Page;
use Kirby\Cms\Site;
use tobimori\Inertia\Inertia;

include 'site/helpers/layout-serializers.php';

return function (Page $page, Site $site) {
    $baseProps = getBaseProps($page, $site);
    $mapPage = $site->index()->filterBy('intendedTemplate', 'map')->first();
    $pois = serializePois($mapPage);

    return Inertia::createResponse(
        $page->intendedTemplate(),
        [
            ...$baseProps,
            ...$pois,
            'basepath' => parse_url($page->parent()->url(), PHP_URL_PATH),
        ]
    );
};
