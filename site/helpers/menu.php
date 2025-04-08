<?php

// Build data structure for menu navigation
function traverseMenu($item)
{
    // The "list view" pages should not have sub menu items in the top bar
    if ($item->hasChildren() && ($item->intendedTemplate() != 'horizontalcardlist')) {
        $childrenItems = [];
        foreach ($item->children()->listed() as $childItem) {
            $childrenItems[] = traverseMenu($childItem);
        }
        return ['title' => $item->title()->value(), 'target' => $item->url(), 'children' => $childrenItems];
    } else {
        return ['title' => $item->title()->value(), 'target' => $item->url()];
    }
}
