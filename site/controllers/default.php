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

return function (Page $page, Site $site) {
	// var_dump("DEFAULT CONTROLLER");


	return Inertia::createResponse(
		$page->intendedTemplate(),
		[
			'page' => $page->toArray(),
			'menu' => traverseMenu($site)
		]
	);
};
