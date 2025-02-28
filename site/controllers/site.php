<?php

use Kirby\Cms\Page;
use tobimori\Inertia\Inertia;

return function (Page $page) {
	// var_dump("SITE CONTROLLER");
	return Inertia::createResponse(
		$page->intendedTemplate(),
    $page->toArray()
	);
};