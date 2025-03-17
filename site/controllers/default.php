<?php

use Kirby\Cms\Page;
use Kirby\Cms\Site;
use tobimori\Inertia\Inertia;

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

function processBlocks($blocks)
{
    $blocksArray = json_decode($blocks->toJson(), true);

    foreach ($blocksArray as &$block) {
        if ($block['type'] === 'image') {
            $imageData = $block['content']['image'];

            $imageData = $imageData[0];

            $file = kirby()->file($imageData);

            if ($file) {
                $block['content']['image'] = $file->url();
                $block['content']['alt'] = $file->alt()->value();
                $block['content']['credits'] = $file->credits()->value();
//                $block['content']['caption'] = $file->caption()->value();
            }
        }
    }

    return $blocksArray;
}


return function (Page $page, Site $site) {
    return Inertia::createResponse(
        $page->intendedTemplate(),
        [
            'page' => $page->toArray(),
            'menu' => traverseMenu($site),
            'blocks' => processBlocks($page->blocks()),
        ]
    );
};
