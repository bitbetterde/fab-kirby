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
        'heroimage' => [
            'url' => $heroImageArr['url'],
            'alt' => $heroImageArr['content']['alt'] ?? null,
            'credits' => $heroImageArr['content']['credits'] ?? null,
            'height' => $heroImageArr['dimensions']['height'],
            'width' => $heroImageArr['dimensions']['width']
        ],
        'socialmedia' => serializeSocialMedia($site),
    ];
}



return function (Page $page, Site $site) {

    $defaultProps = getDefaultInertiaProps($page, $site);
    $pageArr = $defaultProps['page'];
    $resolvedBlocks = serializeBlocks($page->text()->toBlocks());


    $pageArr['content']['text'] = $resolvedBlocks;

    return Inertia::createResponse(
        $page->intendedTemplate(),
        [
            ...$defaultProps,
            'page' => $pageArr,
        ]
    );
};
