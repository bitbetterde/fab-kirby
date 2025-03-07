<!DOCTYPE html>
<html>

	<head>
		<?= vite()->reactRefresh() ?>
		<?= vite(['src/index.tsx']) ?>
		<title><?= $page->title() ?> | <?= $site->title() ?></title>
		<?= inertiaHead() ?>
	</head>

	<body>
		<?= inertia() ?>
	</body>

</html>