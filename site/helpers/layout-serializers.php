<?php

use Kirby\Cms\Page;
use Kirby\Cms\Site;

include 'menu.php';
include 'block-serializers.php';

/**
 * This file contains helper functions that read layout-related data from the Kirby content and modify the data in such a way that it can be passed to the React frontend components.
 */

function serializeSocialMedia(Site $site): array
{
  $socialMediaArray = [];

  foreach ($site->content()->social()->toStructure() as $medium) {
    $socialMedia = [
      'platform' => $medium->platform()->toString(),
      'href' => $medium->target()->toString(),
    ];
    $socialMediaArray[] = $socialMedia;
  }
  return $socialMediaArray;
}

function serializeToolbar(Site $site): array|null
{
  $showToolbar = !$site->content()->hideToolbar()->toBool();

  if ($showToolbar) {
    $toolbarArr = [];

    $toolbarStructure = $site->toolbarElements()->toStructure();

    foreach ($toolbarStructure as $item) {
      $modifiedMenuItem = [
        'icon' => $item->icon()->toString(),
        'title' => $item->title()->toString(),
        'href' => $item->href()->toPage() ? $item->href()->toPage()->url() : null,
      ];
      $toolbarArr[] = $modifiedMenuItem;
    }
    return $toolbarArr;
  }

  return null;
}

function serializeSupportedBy(Site $site): array
{
  $supportedByStructure = $site->supportedBy()->toStructure();

  $supportedByArr = [];

  if ($supportedByStructure->isNotEmpty()) {

    foreach ($supportedByStructure as $item) {
      $supportedByItem = [
        'img' => $item->img()->toFile()->url(),
        'alt' => $item->alt()->toString(),
        'href' => $item->href()->toString(),
      ];
      $supportedByArr[] = $supportedByItem;
    }
  }

  return $supportedByArr;
}

function serializePolicyLinks(Site $site): array
{
  $policyLinksStructure = $site->policyLinks()->toStructure();

  $policyLinksArr = [];

  if ($policyLinksStructure->isNotEmpty()) {

    foreach ($policyLinksStructure as $item) {
      $policyLinksItem = [
        'title' => $item->title()->toString(),
        'href' => $item->href()->toPage()->url(),
      ];
      $policyLinksArr[] = $policyLinksItem;
    }
  }

  return $policyLinksArr;
}

function serializeLanguages(Page $page): array
{
  $kirby = kirby();

  $languages = [];
  foreach ($kirby->languages() as $language) {
    $languages[] = [
      'locale' => $language->code(),
      'label' => $language->name(),
      'href' => $page->url($language->code()),
    ];
  }
  return $languages;
}

function serializePois(Page $page)
{
  $pois = [];

  $sorted = $page->children()->listed();

  if ($page->alphabeticsorting()->toBool()) {
    $sorted = $page->children()->listed()->sortBy('title', 'asc');
  }

  foreach ($sorted as $poiPage) {
    $poi = [
      'name' => $poiPage->title()->toString(),
      'lat' => $poiPage->lat()->toString(),
      'lng' => $poiPage->lng()->toString(),
      'description' => $poiPage->text()->toString(),
      'id' => $poiPage->slug(),
      'image' => $poiPage->heroimage()->toFile() ? $poiPage->heroimage()->toFile()->url() : null,
      'website' => $poiPage->website()->toString(),
      'address' => $poiPage->address()->toString(),
      'category' => $poiPage->category()->toString(),
      'tags' => $poiPage->tags()->split(),
    ];
    $pois[] = $poi;
  }

  $categoryColorMapping = [];

  foreach ($page->categoryColorMapping()->toStructure() as $entry) {
    $categoryColorMapping[$entry->category()->toString()] = $entry->color()->toString();
  }

  $tagColorMapping = [];

  foreach ($page->tagColorMapping()->toStructure() as $entry) {
    $tagColorMapping[$entry->category()->toString()] = $entry->color()->toString();
  }

  return [
    'pois' => $pois,
    'categorycolormapping' => $categoryColorMapping,
    'tagcolormapping' => $tagColorMapping
  ];
}

function serializeBreadcrumbs(Site $site)
{
  return $site->breadcrumb()->map(function ($crumb) {
    return [
      'href' => $crumb->url(),
      'title' => $crumb->title()->value
    ];
  })->values();
}

function serializeHorizontalCardListView(Page $page): array
{
  $resolvedChildren = [];
  foreach ($page->children() as $child) {
    if (!$child->isDraft()) {
      $resolvedChild = $child->toArray();
      $resolvedChild['content']['heroimage'] = $child->heroimage()->toFile() ? $child->heroimage()->toFile()->thumb('card-square')->toArray() : null;
      $resolvedChildren[] = $resolvedChild;
    }
  }
  return $resolvedChildren;
}

// These props are needed on article, default and horizontalcardlist template
function getDefaultProps(Page $page, Site $site)
{
  // By default convert everything to array as a fallback, use special serializer if available
  $pageArr = $page->toArray();

  $resolvedBlocks = serializeBlocks($page->text()->toBlocks(), $site);

  $pageArr['content']['text'] = $resolvedBlocks;
  $heroImage = $page->heroimage()->toFile();

  // By default convert everything to array as a fallback, use special serializer if available
  $baseProps = getBaseProps($page, $site);

  $props = [
    ...$baseProps,
    'page' => $pageArr,
    'footermenu' => traverseMenu($site, false),
    'policylinks' => serializePolicyLinks($site),
    'supportedby' => serializeSupportedBy($site),
    'bottomline' => $site->content()->bottomLine()->toString(),
    'socialmedia' => serializeSocialMedia($site),
    'breadcrumbs' => serializeBreadcrumbs($site)
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

// These props are needed on EVERY page
function getBaseProps(Page $page, Site $site)
{
  $kirby = kirby();

  $props = [
    'menu' => traverseMenu($site),
    'toolbar' => serializeToolbar($site),
    'languages' => $kirby->option('languages') ? serializeLanguages($page, $kirby) : null,
    'activelanguage' => $kirby->option('languages') ? $kirby->language()->code() : null,
    'organization' => option('organization', 'frbs'),
  ];

  return $props;
}
