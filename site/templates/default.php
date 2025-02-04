<!DOCTYPE html>
<html>

	<head>
		<?= vite()->reactRefresh() ?>
		<?= vite(['src/index.tsx']) ?>
		<?= inertiaHead() ?>
	</head>

	<body id="root">
		<?= inertia() ?>
	</body>

</html>