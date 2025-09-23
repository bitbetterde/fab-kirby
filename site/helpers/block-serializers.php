<?php

use YoutubeEmbed\YouTubeHelper;

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
    } elseif ($block->type() === 'tabs') {
      $result[] = convertMarkdownTabs($block);
    } elseif ($block->type() === 'minicard') {
      $result[] = serializeMiniCardBlock($block);
    } elseif ($block->type() === 'accordion') {
      $result[] = convertMarkdownAccordion($block);
    } elseif ($block->type() === 'fullbleed-text') {
      $result[] = $block->toArray();
    } elseif ($block->type() === 'logogrid') {
      $result[] = serializeLogoGridBlock($block);
    } elseif ($block->type() === 'youtube-embed') {
      $result[] = serializeYoutubeBlock($block);
    } else {
      $result[] = $block->toArray();
    }
  }

  return $result;
}

function serializeLogoGridBlock($block): array
{

  $logos = [];
  foreach ($block->logos()->toStructure() as $i => $logo) {
    $logos[] = [
      'url' => $logo->logo()->toFile()->url(),
      'name' => $logo->logo()->toFile()->name(),
      'href' => $logo->href()->value()
    ];
  }

  $result['content'] = [
    'logos' => $logos,
    'columns' => (int) $block->columns()->value(),
    'gap' => $block->gap()->value(),
    'title' =>  $block->title()->value()
  ];

  $result['type'] = 'logogrid';

  return $result;
}

function convertMarkdownTabs($block): array
{

  $result = $block->toArray();
  foreach ($block->content()->tabs()->toStructure() as $i => $tab) {

    $result['content']['tabs'][$i]['text'] = $tab->text()->kirbytext()->toArray();
  }
  return $result;
}

function serializeMiniCardBlock($block): array
{
  $result = $block->toArray();
  $miniCardPage = $block->selectedPage()->toPage();
  $result['content']['target'] = $miniCardPage ? $miniCardPage->toArray() : null;
  $result['content']['target']['content']['heroimage'] = $miniCardPage ? $miniCardPage->heroimage()->toFile()->thumb('card-square')->toArray() : null;
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

    $result['content']['people'][$i]['image'] = $person->image()->toFile()->thumb('person')->toArray();
  }
  return $result;
}

function serializeYoutubeBlock($block): array
{
  // Get the block data
  $url = $block->url()->value();
  $caption = $block->caption()->value();

  // Validate and extract video ID
  if (empty($url)) {
      return [''];
  }

  $videoId = YouTubeHelper::getVideoId($url);
  if (!$videoId) {
      return [''];
  }

  // Get thumbnail and video title
  $thumbnailUrl = YouTubeHelper::downloadThumbnail($videoId, 'maxresdefault');
  $videoTitle = YouTubeHelper::getVideoTitle($videoId);


  $embedUrl = YouTubeHelper::getEmbedUrl($videoId);

  // Generate unique ID for this embed
  $embedId = 'youtube-embed-' . $videoId . '-' . uniqid();

  $result = [
      'type' => 'youtube-embed',
      'content' => [
          'rawUrl' => $url,
          // 'caption' => $caption,
          'videoId' => $videoId,
          'thumbnail' => $thumbnailUrl,
          'title' => $videoTitle,
          'embedUrl' => $embedUrl,
          'embedId' => $embedId
      ]
  ];

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
  $cardPage = $block->target()->toPage();
  $result['content']['target'] = $cardPage ? $cardPage->toArray() : null;
  $result['content']['target']['content']['heroimage'] = $cardPage ? $cardPage->heroimage()->toFile()->thumb('card-square')->toArray() : null;
  return $result;
}

function serializeVerticalNewsCardSliderBlock($block): array
{
  $result = $block->toArray();
  if ($block->mode()->value() === 'children') {
    $resolvedChildren = [];
    $cardPage = $block->parentpage()->toPage();
    if ($cardPage) {
      foreach ($cardPage->children()->listed() as $child) {
        $resolvedChild = $child->toArray();
        $resolvedChild['content']['heroimage'] = $child->heroimage()->toFile()->thumb('card-square')->toArray();
        $resolvedChildren[] = $resolvedChild;
      }
    }
    $result['content']['resolvedChildren'] = $resolvedChildren;
  } else {
    $resolvedPages = [];
    $cardPages = $block->pages()->toPages();
    if ($cardPages) {
      foreach ($cardPages->listed() as $page) {
        $resolvedPage = $page->toArray();
        $resolvedPage['content']['heroimage'] = $page->heroimage()->toFile()->thumb('card-square')->toArray();
        $resolvedPages[] = $resolvedPage;
      }
    }
    $result['content']['pages'] = $resolvedPages;
  }
  return $result;
}
