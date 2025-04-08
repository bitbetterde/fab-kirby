<!DOCTYPE html>
<html class="h-full">

	<head>
		<?= vite()->reactRefresh() ?>
		<?= vite(['src/index.tsx']) ?>
		<title><?= $page->title() ?> | <?= $site->title() ?></title>
		<?= inertiaHead() ?>
		<link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
	</head>

	<body class="h-full">
		<?= inertia() ?>
	</body>

</html>