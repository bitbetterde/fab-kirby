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
                $blocksContents[$blockKey]->content = resolveLinkInObject($page, $block->content);
            }
        }
        return $blocksContents;
    }

    function resolveLinkInObject(Page $page, object $object): object
    {
        $result = clone $object;
        $keysFromObject = array_keys(get_object_vars($object));
        foreach ($keysFromObject as $key) {
            if (is_string($object->$key) && str_starts_with($object->$key, 'file://')) {
                $result->$key = $page->files()->find($object->$key)->toArray();
            } elseif (is_object($object->$key)) {
                $result->$key = resolveLinkInObject($page, $object->$key);
            } elseif (is_array($object->$key)) {
                foreach ($object->$key as $itemKey => $item) {
                    if (is_string($item) && str_starts_with($item, 'file://')) {
                        $result->$key[$itemKey] = $page->files()->find($item)->toArray();
                    } else if (is_object($item)) {
                        $result->$key[$itemKey] = resolveLinkInObject($page, $item);
                    }
                }
            }
        }
        return $result;
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
