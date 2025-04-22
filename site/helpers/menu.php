<?php

// Build data structure for top bar menu navigation
function traverseMenu($item, $includeHiddenItems = true)
{
    // The "list view" template pages should only have sub menu items, when the toggle is active
    if (($item->hasChildren() && ($item->intendedTemplate() != 'horizontalcardlist')) || ($item->hasChildren() && ($item->intendedTemplate() == 'horizontalcardlist' && !$item->hideChildrenInMenus()->toBool()))) {
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
