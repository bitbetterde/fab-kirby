<?php

use Kirby\Cms\Page;
use tobimori\Inertia\Inertia;

return function (Page $page) {
  // var_dump("DEFAULT CONTROLLER");
	return Inertia::createResponse(
		"home",
    ["bla" => "text"]
	);
};