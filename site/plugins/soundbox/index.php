<?php

use Kirby\Toolkit\Date;

Kirby::plugin('bitbetter/soundbox', [
  'api' => [
    'routes' => [
      [
        'pattern' => 'bitbetter/soundbox',
        'method'  => 'POST',
        'auth'    => false,
        'action'  => function () {
          $kirby = kirby();
          $kirby->impersonate('kirby');
          $request = $kirby->request();
          $targetPage = $kirby->site()->pages()->findBy('intendedTemplate', 'soundbox');

          if (!$targetPage) {
            return new Response(
              json_encode(['status' => 'error', 'message' => 'Target page with template "soundbox" not found.']),
              'application/json',
              404
            );
          }

          try {
            $uploads = $request->files()->get('file');

            if (empty($uploads)) {
              throw new Exception('No file was uploaded.');
            }

            // Check file size (1MB = 1048576 bytes)
            $maxSize = 0.5 * 1024 * 1024; // 0.5MB in bytes

            if ($uploads['size'] > $maxSize) {
              throw new Exception('File is too large. ');
            }

            $createdDate = Date::now()->add(new DateInterval("PT2H"));

            // Create the file and attach a random "salt" to the filename so the filenames are not easily guessable (because all are publicly accessible)
            $file = $targetPage->createFile([
              'source'      => $uploads['tmp_name'],
              'filename'    => 'recording_' . $createdDate->format('y-m-d_H-i-s') . '_' . bin2hex(random_bytes(3)) . '.ogg',
              'template'    => 'recording', // from your file blueprint
              'content'     => [
                'title'     => "Audioaufnahme",
                'created'   => $createdDate,
                'published' => false,
                'color'     => $request->get('color'),
                'lightText' => $request->get('lightText'),
              ]
            ]);

            return new Response(
              json_encode(['status' => 'ok', 'message' => 'File uploaded successfully.', 'filename' => $file->filename()]),
              'application/json',
              201
            );
          } catch (Exception $e) {
            return new Response(
              json_encode(['status' => 'error', 'message' => $e->getMessage()]),
              'application/json',
              500
            );
          }
        }
      ]
    ],
  ],
  'blueprints' => [
    'files/recording' => __DIR__ . '/blueprints/files/recording.yml',
    'blocks/recorder' => __DIR__ . '/blueprints/blocks/recorder.yml',
    'sections/soundbox-fields' => __DIR__ . '/blueprints/sections/soundbox-fields.yml',
    'users/recorder' => __DIR__ . '/blueprints/users/recorder.yml',
  ]
]);
