<?php

use Kirby\Cms\Page;
use Kirby\Cms\Site;
use tobimori\Inertia\Inertia;

// Build data structure for Breadcrumbs navigation
function traverseMenu($item)
{
    if ($item->hasChildren()) {
        $childrenItems = [];
        foreach ($item->children()->listed() as $childItem) {
            array_push($childrenItems, traverseMenu($childItem));
        }
        return ['title' => $item->title()->value(), 'target' => $item->url(), 'children' => $childrenItems];
    } else {
        return ['title' => $item->title()->value(), 'target' => $item->url()];
    }
}

function getDefaultInertiaProps(Page $page, Site $site)
{
    $pageArr = $page->toArray();

    return [
        'page' => $pageArr,
        'menu' => traverseMenu($site),
        'toolbar' => $site->content()->hideToolbar()->toBool() ? null : $site->content()->toolbar()->toStructure()->toArray(),
    ];
}


return function (Page $page, Site $site) {
    $defaultProps = getDefaultInertiaProps($page, $site);
    $mapPage = $site->index()->filterBy('template', 'map')->first();

    $pois = [];

    foreach($mapPage->children() as $poiPage) {
        $poi = [
            'name' => $poiPage->title()->toString(),
            'lat' => $poiPage->lat()->toString(),
            'lng' => $poiPage->lng()->toString(),
            'description' => $poiPage->text()->toString(),
            'id' => preg_replace('/[^a-z0-9]+/', '_', strtolower($poiPage->title()->toString())),
            'image' => $poiPage->heroimage()->toFile()->url(),
            'website' => $poiPage->website()->toString(),
            'address' => $poiPage->address()->toString(),
            'category' => $poiPage->category()->toString()
        ];
        array_push($pois, $poi);
    }



    return Inertia::createResponse(
        $page->intendedTemplate(),
        [
            ...$defaultProps,
            'basePath' => $page->dirname(),
            'pois' => $pois
        ]
    );
};
