<?php

use Kirby\Cms\Page;
use Kirby\Cms\Site;
use tobimori\Inertia\Inertia;

include 'default.php';


return function (Page $page, Site $site) {

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

    $defaultProps = getDefaultInertiaProps($page, $site);

    $pageArr = $defaultProps['page'];
    $pageArr['content']['text'] = resolveLinks($page->content()->text(), $page);

    return Inertia::createResponse(
        $page->intendedTemplate(),
        [
            ...$defaultProps,
            'page' => $pageArr,
            'breadcrumbs' => $site->breadcrumb()->map(function ($crumb) {
                return [
                    'href' => $crumb->url(),
                    'title' => $crumb->title()->value
                ];
            })->values()
        ]
    );
};
