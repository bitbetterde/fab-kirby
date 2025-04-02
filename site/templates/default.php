<!DOCTYPE html>
<html class="h-full">

	<head>
		<?= vite()->reactRefresh() ?>
		<?= vite(['src/index.tsx']) ?>
		<title><?= $page->title() ?> | <?= $site->title() ?></title>
		<?= inertiaHead() ?>
		<link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
	</head>

	<body class="h-full">
		<?= inertia() ?>
	</body>

</html>