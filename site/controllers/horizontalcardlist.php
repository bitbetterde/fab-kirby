<?php

use Kirby\Cms\Page;
use Kirby\Cms\Site;
use tobimori\Inertia\Inertia;

include 'default.php';


return function (Page $page, Site $site) {

    function serializeHorizontalCardListView($page): array
    {
        $result = [];
        $resolvedChildren = [];
        foreach ($page->children()->listed() as $child) {
            $resolvedChild = $child->toArray();
            $resolvedChild['content']['heroimage'] = $child->heroimage()->toFile()->toArray();
            $resolvedChildren[] = $resolvedChild;
        }
        $result['content']['resolvedChildren'] = $resolvedChildren;
        return $result;
    }


    $defaultProps = getDefaultInertiaProps($page, $site);
    $pageArr = $defaultProps['page'];
    $resolved = serializeHorizontalCardListView($page);
    $pageArr['content']['text'] = $resolved;


    return Inertia::createResponse(
        $page->intendedTemplate(),
        [
            ...$defaultProps,
            'page' => $pageArr,
            'breadcrumbs' => $site->breadcrumb()->map(function ($crumb) {
                return [
                    'href' => $crumb->url(),
                    'title' => $crumb->title()->value
                ];
            })->values()
        ]
    );
};