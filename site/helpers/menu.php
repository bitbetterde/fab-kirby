<?php

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