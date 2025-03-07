<?php

use Kirby\Cms\Page;
use Kirby\Cms\Site;
use tobimori\Inertia\Inertia;

// The site controller is called for ALL templates
return function (Page $page, Site $site) {
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
			'toolbar' => $site->content()->hideToolbar()->toBool() ? null : $site->content()->toolbar()->toStructure()->toArray(),
			// This prop should be only passed along for the article template (but how?)
			'breadcrumbs' => $site->breadcrumb()->map(function ($crumb) {
				return [
					'href' => $crumb->url(),
					'title'  => $crumb->title()->value
				];
			})->values()
		]
	);
};
