<!DOCTYPE html>
<html class="h-full">

	<head>
		<?= vite()->reactRefresh() ?>
		<?= vite(['src/index.tsx']) ?>
		<title><?= $page->title() ?> | <?= $site->title() ?></title>
		<?= inertiaHead() ?>
	</head>

	<body class="h-full">
		<?= inertia() ?>
	</body>

</html>