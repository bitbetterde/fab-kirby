<?php

// Build data structure for top bar menu navigation
function traverseMenu($item, $includeHiddenItems = true)
{
    // The "list view" template pages should not have sub menu items
    if ($item->hasChildren() && ($item->intendedTemplate() != 'horizontalcardlist')) {
        $childrenItems = [];

        foreach ($item->children() as $childItem) {
            if ($childItem->isListed()) {
                if (!$includeHiddenItems && $childItem->hideInFooter()->toBool()) {
                    continue;
                } else {
                    $subChildrenItems = traverseMenu($childItem, $includeHiddenItems);
                    if (!is_null($subChildrenItems)) {
                        $childrenItems[] = $subChildrenItems;
                    }
                }
            }
        }

        $itemArr = ['title' => $item->title()->value(), 'children' => $childrenItems];

        // If it's a category template, it should not be clickable / have content of its own
        if ($item->intendedTemplate() != 'category') {
            $itemArr[] = ['target' => $item->url()];
        }

        return $itemArr;
    } else {
        if ($item->isListed() && ($item->intendedTemplate() != 'error')) {
            return ['title' => $item->title()->value(), 'target' => $item->url()];
        }

        return null;
    }
}
