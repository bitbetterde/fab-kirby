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


    function resolveLinks(string $content, Page $page)
    {
        $blocksContents = json_decode($content);
        foreach ($blocksContents as $blockKey => $block) {
            if ($block->type != 'text') {
                $keysFromObject = array_keys(get_object_vars($block->content));
                foreach ($keysFromObject as $key) {
                    if (is_string($block->content->$key) && str_starts_with($block->content->$key, 'file://')) {
                        $blocksContents[$blockKey]->content->$key = $page->files()->find($block->content->$key)->toArray();
                    } else if (is_array($block->content->$key)) {
                        foreach ($block->content->$key as $itemKey => $item) {
                            if (is_string($item) && str_starts_with($item, 'file://')) {
                                $blocksContents[$blockKey]->content->$key[$itemKey] = $page->files()->find($item)->toArray();
                            }
                        }
                    }
                }
            }
        }
        return $blocksContents;
    }


    $pageArr = $page->toArray();
    $pageArr['content']['text'] = resolveLinks($page->content()->text(), $page);

    return Inertia::createResponse(
        $page->intendedTemplate(),
        [
            'page' => $pageArr,
            'menu' => traverseMenu($site),
            'toolbar' => $site->content()->hideToolbar()->toBool() ? null : $site->content()->toolbar()->toStructure()->toArray(),
            // This prop should be only passed along for the article template (but how?)
            'breadcrumbs' => $site->breadcrumb()->map(function ($crumb) {
                return [
                    'href' => $crumb->url(),
                    'title' => $crumb->title()->value
                ];
            })->values()
        ]
    );
};
