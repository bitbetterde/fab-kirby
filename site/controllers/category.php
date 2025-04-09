<?php

return function ($page) {
  $listedChildren = $page->children()->listed();

  if ($listedChildren->isNotEmpty()) {
    // Redirect to the first child page, because a category does not have content on its own
    $listedChildren->first()->go();
  } else {
    // Otherwise redirect to the parent page (might be the root/home page)
    $page->parent()->go();
  }

  return null;
};