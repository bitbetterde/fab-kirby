<?php

use Kirby\Cms\Page;
use Kirby\Cms\Site;
use tobimori\Inertia\Inertia;

include 'site/helpers/layout-serializers.php';

return function (Page $page, Site $site) {

    $defaultProps = getDefaultProps($page, $site);

    return Inertia::createResponse(
        $page->intendedTemplate(),
        [
            ...$defaultProps,
            'recordings' => $page->files()->filterBy('template', 'recording')->filterBy('published', true)->sortBy('created', 'desc')->map(function ($file) {
                return [
                    'url' => $file->url(),
                    'title' => $file->title()->value,
                    'size' => $file->size(),
                    'created' => $file->created()->toDate(),
                    'color' => $file->color()->toString(),
                    'lightText' => $file->lightText()->toBool()
                ];
            })->values(),
        ]
    );
};
