<?php

use Kirby\Cms\Page;
use Kirby\Cms\Site;
use tobimori\Inertia\Inertia;

include 'site/helpers/layout-serializers.php';


return function (Page $page, Site $site) {

    $defaultProps = getDefaultProps($page, $site);
    $defaultProps['page']['content']['text']['content']['resolvedChildren'] = serializeHorizontalCardListView($page);

    return Inertia::createResponse(
        $page->intendedTemplate(),
        $defaultProps

    );
};
