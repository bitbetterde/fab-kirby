<!DOCTYPE html>
<html>

	<head>
		<?= vite()->reactRefresh() ?>
		<?= vite(['src/index.tsx']) ?>
		<title><?= $page->title() ?></title>
		<?= inertiaHead() ?>
	</head>

	<body>
		<?= inertia() ?>
	</body>

</html>