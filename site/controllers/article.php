<?php

use Kirby\Cms\Page;
use Kirby\Cms\Site;
use tobimori\Inertia\Inertia;

include 'default.php';


return function (Page $page, Site $site) {

    function resolveLinks(string $content, Page $page, Site $site)
    {
        $blocksContents = json_decode($content);
        foreach ($blocksContents as $blockKey => $block) {
            if ($block->type != 'text') {
                $blocksContents[$blockKey]->content = resolveLinkInObject($page, $site, $block->content);
            }
        }
        return $blocksContents;
    }

    function resolveLinkInObject(Page $page, Site $site, object $object): object
    {
        $result = clone $object;
        $keysFromObject = array_keys(get_object_vars($object));
        foreach ($keysFromObject as $key) {
            if (is_string($object->$key) && (str_starts_with($object->$key, 'file://') || str_starts_with($object->$key, '- file://'))) {
                if (str_starts_with($object->$key, '- file://')) {
                    $result->$key = $page->files()->find(substr($object->$key, 2))->toArray();
                } else {
                    $result->$key = $page->files()->find($object->$key)->toArray();
                }
            } elseif (is_string($object->$key) && str_starts_with($object->$key, 'page://')) {
                $newPage = $site->pages()->find($object->$key);
                $result->$key = resolveLinkInObject($newPage, $site, json_decode(json_encode($newPage->toArray())));
            } elseif (is_object($object->$key)) {
                $result->$key = resolveLinkInObject($page, $site, $object->$key);
            } elseif (is_array($object->$key)) {
                foreach ($object->$key as $itemKey => $item) {
                    if (is_string($item) && (str_starts_with($item, 'file://') || str_starts_with($item, '- file://'))) {
                        if (str_starts_with($item, '- file://')) {
                            $result->$key[$itemKey] = $page->files()->find(substr($item, 2))->toArray();
                        } else {
                            $result->$key[$itemKey] = $page->files()->find($item)->toArray();
                        }
                    } elseif (is_string($item) && str_starts_with($item, 'page://')) {
                        $newPage = $site->pages()->find($item);
                        $result->$key[$itemKey] = resolveLinkInObject($newPage, $site, json_decode(json_encode($newPage->toArray())))->toArray();
                    } elseif (is_object($item)) {
                        $result->$key[$itemKey] = resolveLinkInObject($page, $site, $item);
                    }
                }
            }
        }
        return $result;
    }


//    foreach ($page->text()->toBlocks() as $block) {
//        if ($block->type() == 'horizontalcard') {
//            foreach ($block->content()->fields() as $key => $value) {
//                $newPage = $site->pages()->find($value);
//                var_dump($newPage->heroimage());
//            }
//            die();
//        }
//    }


    $defaultProps = getDefaultInertiaProps($page, $site);
    $pageArr = $defaultProps['page'];
    $pageArr['content']['text'] = resolveLinks($page->content()->text(), $page, $site);

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
