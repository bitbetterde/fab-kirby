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
        'organization' => option('organization', 'frbs'),
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

    function serializeHorizontalCardListView($page): array
    {
        $result = [];
        $resolvedChildren = [];
        foreach ($page->children() as $child) {
            if (!$child->isDraft()) {
                $resolvedChild = $child->toArray();
                $resolvedChild['content']['heroimage'] = $child->heroimage()->toFile() ? $child->heroimage()->toFile()->thumb('card-square')->toArray() : null;
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
