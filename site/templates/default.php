<!DOCTYPE html>
<html class="h-full" lang="de">

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta property="og:locale" content="de_DE" />

	<title><?= $page->title() ?> | <?= $site->title() ?></title>
	<meta property="og:title" content="<?= $page->title() ?> | <?= $site->title() ?>" />

	<link rel="canonical" href="<?= $page->url() ?>" />
	<meta property="og:url" content="<?= $page->url() ?>" />

	<link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
	<?php if($page->isHomepage()): ?>
		<meta property="og:type" content="website" />
	<?php elseif ($page->intendedTemplate() == "article"): ?>
		<meta property="og:type" content="article" />
	<?php endif ?>
	<?php if ($page->teaser()->isNotEmpty()): ?>
		<meta name="description" content="<?= $page->teaser() ?>" />
		<meta name="og:description" content="<?= $page->teaser() ?>" />
	<?php elseif ($site->metadescription()): ?>
		<meta name="description" content="<?= $site->metadescription() ?>" />
		<meta name="og:description" content="<?= $site->metadescription() ?>" />
	<?php endif ?>
	<?php if ($page->heroimage()->isNotEmpty()): ?>
		<meta name="og:image" content="<?= $page->heroimage()->toFile()->thumb('opengraph')->url() ?>" />
	<?php endif ?>
	<?= $kirby->option('headerSnippet') ?>

	<?= vite()->reactRefresh() ?>
	<?= vite(['src/index.tsx']) ?>
	<?= inertiaHead() ?>

</head>

<body class="h-full">
	<?= inertia() ?>
</body>

</html>