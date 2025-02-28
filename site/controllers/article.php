<?php

use Kirby\Cms\Page;
use Kirby\Cms\Site;
use tobimori\Inertia\Inertia;

return function (Page $page, Site $site) {
	// 	var_dump($site->breadcrumb()->toArray());
	// 	print_r($site->breadcrumb()->toArray());


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

	return Inertia::createResponse(
		$page->intendedTemplate(),
		[
			'page' => $page->toArray(),
			'menu' => traverseMenu($site),

			'breadcrumbs' => $site->breadcrumb()->map(function ($crumb) {
				return [
					'target' => $crumb->url(),
					'title'  => $crumb->title()->value
				];
			})->values()
		]
	);
};
