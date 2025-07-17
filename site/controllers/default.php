<?php

use Kirby\Cms\Page;
use Kirby\Cms\Site;
use tobimori\Inertia\Inertia;

include 'site/helpers/serializers.php';
include 'site/helpers/menu.php';

function getDefaultInertiaProps(Page $page, Site $site)
{
    $pageArr = $page->toArray();
    $heroImage = $page->heroimage()->toFile();

    $props = [
        'page' => $pageArr,
        'menu' => traverseMenu($site),
        'footermenu' => traverseMenu($site, false),
        'policylinks' => serializePolicyLinks($site),
        'toolbar' => serializeToolbar($site),
        'supportedby' => serializeSupportedBy($site),
        'bottomline' => $site->content()->bottomLine()->toString(),
        'socialmedia' => serializeSocialMedia($site),
        'organization' => option('organization', 'frbs')
    ];

    if ($heroImage) {
        $props['heroimage'] = [
            'url' => $heroImage->thumb('hero')->url(),
            'alt' => $heroImage->alt() ?? null,
            'credits' => $heroImage->credits()->toString() ?? null,
            'height' => $heroImage->dimensions()->height(),
            'width' => $heroImage->dimensions()->width()
        ];
    }

    return $props;
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
