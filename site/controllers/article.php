<?php

use Kirby\Cms\Page;
use Kirby\Cms\Site;
use tobimori\Inertia\Inertia;

include 'default.php';


return function (Page $page, Site $site) {


    function serializeBlocks(Page $page, Site $site, $blocks)
    {
        $result = [];
        foreach ($blocks as $block) {
            if (
                $block->type() === 'verticalnewscardslider'
            ) {
                $result[] = serializeVerticalNewsCardSliderBlock($site, $block);
            } elseif (
                $block->type() !== 'text'
            ) {
                $result[] = resolveLinkInObject($page, $site, $block);
            }
        }

    }

//    function resolveLinks(string $content, Page $page, Site $site)
//    {
//        $blocksContents = json_decode($content);
//        foreach ($blocksContents as $blockKey => $block) {
//            if ($block->type != 'text') {
//                $blocksContents[$blockKey]->content = resolveLinkInObject($page, $site, $block->content);
//            }
//        }
//        return $blocksContents;
//    }
    $i = 0;

    function resolveLinkInObject(Page $page, Site $site, $block): array
    {
        $result = $block->toArray();

        global $i;

        foreach (array_keys($result) as $key) {
            if ($block->{$key}() instanceof Kirby\Content\Field) {
                if (is_string($block->{$key}()->value()) && (str_starts_with($block->{$key}()->value(), 'file://') || str_starts_with($block->{$key}()->value(), '- file://'))) {
                    var_dump($block->{$key}());
                    die();
                }
            }
            if (is_string($block->{$key}()) && (str_starts_with($block->{$key}(), 'file://') || str_starts_with($block->{$key}(), '- file://'))) {
                var_dump($block->{$key}());
                die();
            } elseif (is_object($block->{$key}()) && !($block->{$key}() instanceof Kirby\Content\Field)) {
                $i = $i + 1;
                if ($i > 1000) {
//                    var_dump($block->{$key}());
                    var_dump($block->level());
                    die();
                }
                resolveLinkInObject($page, $site, $block->{$key}());
            }

        }


//        $keysFromObject = array_keys(get_object_vars($object));
//        foreach ($keysFromObject as $key) {
//            if (is_string($object->$key) && (str_starts_with($object->$key, 'file://') || str_starts_with($object->$key, '- file://'))) {
//                if (str_starts_with($object->$key, '- file://')) {
//                    $result->$key = $page->files()->find(substr($object->$key, 2))->toArray();
//                } else {
//                    $result->$key = $page->files()->find($object->$key)->toArray();
//                }
//            } elseif (is_string($object->$key) && str_starts_with($object->$key, 'page://')) {
//                $newPage = $site->pages()->find($object->$key);
//                $result->$key = resolveLinkInObject($newPage, $site, json_decode(json_encode($newPage->toArray())));
//            } elseif (is_object($object->$key)) {
//                $result->$key = resolveLinkInObject($page, $site, $object->$key);
//            } elseif (is_array($object->$key)) {
//                foreach ($object->$key as $itemKey => $item) {
//                    if (is_string($item) && (str_starts_with($item, 'file://') || str_starts_with($item, '- file://'))) {
//                        if (str_starts_with($item, '- file://')) {
//                            $result->$key[$itemKey] = $page->files()->find(substr($item, 2))->toArray();
//                        } else {
//                            $result->$key[$itemKey] = $page->files()->find($item)->toArray();
//                        }
//                    } elseif (is_string($item) && str_starts_with($item, 'page://')) {
//                        $newPage = $site->pages()->find($item);
//                        $result->$key[$itemKey] = resolveLinkInObject($newPage, $site, json_decode(json_encode($newPage->toArray())));
//                    } elseif (is_object($item)) {
//                        $result->$key[$itemKey] = resolveLinkInObject($page, $site, $item);
//                    }
//                }
//            }
//        }
        return $result;
    }


    function serializeVerticalNewsCardSliderBlock(Site $site, $block): array
    {
        $result = $block->toArray();
        if ($block->mode()->value() === 'children') {
            $resolvedChildren = [];
            foreach ($block->parentpage()->toPage()->children()->listed() as $child) {
                $resolvedChildren[] = resolveLinkInObject(
                    $child,
                    $site,
                    json_decode(json_encode($child->toArray()))
                );
                $result['content']['resolvedChildren'] = $resolvedChildren;
            }
        } else {

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

//    function getChildPages(Page $page, Site $site)
//    {
//
//        $blocks = $page->text()->toBlocks()->toArray();
//        $blocks = $page->text()->toBlocks();
//        foreach ($blocks as $block) {
//            if (
//                $block->type() === 'verticalnewscardslider' &&
//                $block->mode()->value() === 'children'
//            ) {
//                $resolvedChildren = [];
//                foreach ($block->parentpage()->toPage()->children()->listed() as $child) {
//                    $resolvedChildren[] = resolveLinkInObject(
//                        $child,
//                        $site,
//                        json_decode(json_encode($child->toArray()))
//                    );
//                    $block['content']['resolvedChildren'] = $resolvedChildren;
//                    var_dump($block->parentpage()->toPage()->children());
//                    die();
//                }
//
//            }
//            foreach ($blocks as &$block) {
//
//                if (
//                    $block['type'] === 'verticalnewscardslider' &&
//                    $block['content']['mode'] === 'children'
//                ) {
//                    $parentField = new Kirby\Content\Field($page, 'parent', $block['content']['parent'] ?? []);
//                    $parent = $parentField->toPages()->first();
//
//                    if ($parent) {
//                        $resolvedChildren = [];
//                        foreach ($parent->children()->listed() as $child) {
//                            $resolvedChildren[] = resolveLinkInObject(
//                                $child,
//                                $site,
//                                json_decode(json_encode($child->toArray()))
//                            );
//                        }
//                        $block['content']['resolvedChildren'] = $resolvedChildren;
//                    }
//                }
//            }
//
//            return $blocks;
//        }
//    }

    $defaultProps = getDefaultInertiaProps($page, $site);
    $pageArr = $defaultProps['page'];
    $resolvedBlocks = serializeBlocks($page, $site, $page->text()->toBlocks());
//    $childResolvedBlocks = getChildPages($page, $site);


//    foreach ($resolvedBlocks as $index => &$block) {
//        if (
//            isset($childResolvedBlocks[$index]) &&
//            $block->type === 'verticalnewscardslider' &&
//            isset($childResolvedBlocks[$index]['content']['resolvedChildren'])
//        ) {
//            $block->content->resolvedChildren = $childResolvedBlocks[$index]['content']['resolvedChildren'];
//        }
//    }

    $pageArr['content']['text'] = $resolvedBlocks;


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
