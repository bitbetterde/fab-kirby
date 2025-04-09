<?php

// Build data structure for menu navigation
function traverseMenu($item)
{
    // The "list view" template pages should not have sub menu items in the top bar
    if ($item->hasChildren() && ($item->intendedTemplate() != 'horizontalcardlist')) {
        $childrenItems = [];

        foreach ($item->children()->listed() as $childItem) {
            $childrenItems[] = traverseMenu($childItem);
        }

        $itemArr = ['title' => $item->title()->value(), 'children' => $childrenItems];

        // If it's a category template, it should not be clickable / have content of its own
        if ($item->intendedTemplate() != 'category') {
            $itemArr[] = ['target' => $item->url()];
        }

        return $itemArr;
    } else {
        return ['title' => $item->title()->value(), 'target' => $item->url()];
    }
}
