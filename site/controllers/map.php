<?php

use Kirby\Cms\Page;
use Kirby\Cms\Site;
use tobimori\Inertia\Inertia;

include 'site/helpers/serializers.php';
include 'site/helpers/menu.php';

function getDefaultInertiaProps(Page $page, Site $site)
{
    $pageArr = $page->toArray();

    return [
        'page' => $pageArr,
        'menu' => traverseMenu($site),
        'toolbar' => serializeToolbar($site),
        'organization' => option('organization', 'frbs')
    ];
}


return function (Page $page, Site $site) {
    $defaultProps = getDefaultInertiaProps($page, $site);

    $pois = [];

    $sorted = $page->children()->listed();

    if ($page->alphabeticsorting()->toBool()) {
        $sorted = $page->children()->listed()->sortBy('title', 'asc');
    }

    foreach($sorted as $poiPage) {
        $poi = [
            'name' => $poiPage->title()->toString(),
            'lat' => $poiPage->lat()->toString(),
            'lng' => $poiPage->lng()->toString(),
            'description' => $poiPage->text()->toString(),
            'id' => $poiPage->slug(),
            'image' => $poiPage->heroimage()->toFile()->url(),
            'website' => $poiPage->website()->toString(),
            'address' => $poiPage->address()->toString(),
            'category' => $poiPage->category()->toString(),
            'tags' => $poiPage->tags()->split(),
        ];
        $pois[] = $poi;
    }

    $categoryColorMapping = [];

    foreach ($page->categoryColorMapping()->toStructure() as $entry) {
        $categoryColorMapping[$entry->category()->toString()] = $entry->color()->toString();
    }

    $tagColorMapping = [];

    foreach ($page->tagColorMapping()->toStructure() as $entry) {
        $tagColorMapping[$entry->category()->toString()] = $entry->color()->toString();
    }


    return Inertia::createResponse(
        $page->intendedTemplate(),
        [
            ...$defaultProps,
            'basePath' => array_slice(explode("/", $page->url()),-1)[0],
            'pois' => $pois,
            'categoryColorMapping' => $categoryColorMapping,
            'tagColorMapping' => $tagColorMapping
        ]
    );
};
