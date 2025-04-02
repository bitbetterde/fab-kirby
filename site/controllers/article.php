<?php

use Kirby\Cms\Page;
use Kirby\Cms\Site;
use tobimori\Inertia\Inertia;

include 'default.php';


return function (Page $page, Site $site) {

    function serializeBlocks($blocks)
    {
        $result = [];
        foreach ($blocks as $block) {
            if (
                $block->type() === 'verticalnewscardslider'
            ) {
                $result[] = serializeVerticalNewsCardSliderBlock($block);
            } elseif (
                $block->type() === 'image'
            ) {
                $result[] = serializeImageBlock($block);
            } elseif ($block->type() === 'imageslider') {
                $result[] = serializeImageSliderBlock($block);
            } elseif ($block->type() === 'horizontalcard') {
                $result[] = serializeHorizontalCardBlock($block);
            } elseif ($block->type() === 'person') {
                $result[] = serializePersonBlock($block);
            } elseif ($block->type() === 'minicard') {
                $result[] = serializeMiniCardBlock($block);
            } elseif ($block->type() === 'accordion') {
                $result[] = convertMarkdownAccordion($block);
            } else {
                $result[] = $block->toArray();
            }
        }

        return $result;
    }

    function serializeMiniCardBlock($block): array
    {
        $result = $block->toArray();
        $result['content']['target'] = $block->selectedPage()->toPage()->toArray();
        $result['content']['target']['content']['heroimage'] = $block->selectedPage()->toPage()->heroimage()->toFile()->toArray();
        return $result;
    }


    function convertMarkdownAccordion($block): array
    {
        $result = $block->toArray();
        foreach ($block->content()->accordionitems()->toStructure() as $i => $item) {

            $result['content']['accordionitems'][$i]['text'] = $item->text()->kirbytext()->toArray();

        }
        return $result;
    }

    function serializePersonBlock($block): array
    {
        $result = $block->toArray();
        foreach ($block->content()->people()->toStructure() as $i => $person) {

            $result['content']['people'][$i]['image'] = $person->image()->toFile()->toArray();

        }
        return $result;
    }

    function serializeImageBlock($block): array
    {
        $result = $block->toArray();
        if ($block->location()->value() !== 'web') {
            $result['content']['image'] = $block->image()->toFile()->toArray();
        }
        return $result;
    }

    function serializeImageSliderBlock($block): array
    {
        $result = $block->toArray();
        foreach ($block->content()->images()->toStructure() as $i => $image) {
            if ($image->location()->value() !== 'web') {
                $result['content']['images'][$i]['image'] = $image->image()->toFile()->toArray();
            }
        }
        return $result;
    }

    function serializeHorizontalCardBlock($block): array
    {
        $result = $block->toArray();
        $result['content']['target'] = $block->target()->toPage()->toArray();
        $result['content']['target']['content']['heroimage'] = $block->target()->toPage()->heroimage()->toFile()->toArray();
        return $result;
    }

    function serializeVerticalNewsCardSliderBlock($block): array
    {
        $result = $block->toArray();
        if ($block->mode()->value() === 'children') {
            $resolvedChildren = [];
            foreach ($block->parentpage()->toPage()->children()->listed() as $child) {
                $resolvedChild = $child->toArray();
                $resolvedChild['content']['heroimage'] = $child->heroimage()->toFile();
                $resolvedChildren[] = $resolvedChild;
            }
            $result['content']['resolvedChildren'] = $resolvedChildren;
        } else {
            $resolvedPages = [];
            foreach ($block->selectedPages()->toPages()->listed() as $page) {
                $resolvedPage = $page->toArray();
                $resolvedPage['content']['heroimage'] = $page->heroimage()->toFile();
                $resolvedPages[] = $resolvedPage;
            }
            $result['content']['selectedPages'] = $resolvedPages;
        }
        return $result;
    }


    $defaultProps = getDefaultInertiaProps($page, $site);
    $pageArr = $defaultProps['page'];
    $resolvedBlocks = serializeBlocks($page->text()->toBlocks());

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
