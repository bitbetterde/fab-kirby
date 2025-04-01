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
    $showToolbar = !$site->content()->hideToolbar()->toBool();
    $pageArr = $page->toArray();
    $heroImageArr = $page->heroimage()->toFile()->toArray();

    $toolbarArr = [];

    if ($showToolbar) {

        $toolbarStructure = $site->toolbar()->toStructure();

        foreach ($toolbarStructure as $item) {
            $modifiedMenuItem = [
                'icon' => $item->icon()->toString(),
                'title' => $item->title()->toString(),
                'href' => $item->href()->toPage()->url(),
            ];
            array_push($toolbarArr, $modifiedMenuItem);
        }
    }

    return [
        'page' => $pageArr,
        'menu' => traverseMenu($site),
        'toolbar' => $showToolbar ? $toolbarArr : null,
        'heroimage' => [
            'url' => $heroImageArr['url'],
            'alt' => $heroImageArr['content']['alt'] ?? null,
            'credits' => $heroImageArr['content']['credits'] ?? null,
            'height' => $heroImageArr['dimensions']['height'],
            'width' => $heroImageArr['dimensions']['width']
        ],
    ];
}


return function (Page $page, Site $site) {
    return Inertia::createResponse(
        $page->intendedTemplate(),
        getDefaultInertiaProps($page, $site),
    );
};
