<?php

use Kirby\Cms\Page;
use Kirby\Cms\Site;
use tobimori\Inertia\Inertia;

include 'site/helpers/serializers.php';
include 'site/helpers/menu.php';

function getDefaultInertiaProps(Page $page, Site $site)
{
    $showToolbar = !$site->content()->hideToolbar()->toBool();
    $pageArr = $page->toArray();
    $heroImageArr = $page->heroimage()->toFile()->toArray();

    $toolbarArr = [];

    if ($showToolbar) {

        $toolbarStructure = $site->toolbar()->toStructure();

        foreach ($toolbarStructure as $item) {
            $modifiedMenuItem = [
                'icon' => $item->icon()->toString(),
                'title' => $item->title()->toString(),
                'href' => $item->href()->toPage() ? $item->href()->toPage()->url() : null,
            ];
            array_push($toolbarArr, $modifiedMenuItem);
        }
    }

    return [
        'page' => $pageArr,
        'menu' => traverseMenu($site),
        'toolbar' => $showToolbar ? $toolbarArr : null,
        'bottomline' => $site->content()->bottomLine()->toString(),
        'socialmedia' => serializeSocialMedia($site),
        'heroimage' => [
            'url' => $heroImageArr['url'],
            'alt' => $heroImageArr['content']['alt'] ?? null,
            'credits' => $heroImageArr['content']['credits'] ?? null,
            'height' => $heroImageArr['dimensions']['height'],
            'width' => $heroImageArr['dimensions']['width']
        ],
    ];
}


return function (Page $page, Site $site) {

    function serializeHorizontalCardListView($page): array
    {
        $result = [];
        $resolvedChildren = [];
        foreach ($page->children() as $child) {
            if (!$child->isDraft()) {
                $resolvedChild = $child->toArray();
                $resolvedChild['content']['heroimage'] = $child->heroimage()->toFile() ? $child->heroimage()->toFile()->toArray() : null;
                $resolvedChildren[] = $resolvedChild;
            }
        }
        $result['content']['resolvedChildren'] = $resolvedChildren;
        return $result;
    }


    $defaultProps = getDefaultInertiaProps($page, $site);
    $pageArr = $defaultProps['page'];
    $resolved = serializeHorizontalCardListView($page);
    $pageArr['content']['text'] = $resolved;


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