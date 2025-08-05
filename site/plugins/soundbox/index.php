<?php

use Kirby\Toolkit\Date;
use Kirby\Http\Response;

Kirby::plugin('bitbetter/soundbox', [
  'options' => [
    'cache' => true
  ],
  'api' => [
    'routes' => [
      [
        'pattern' => 'bitbetter/soundbox',
        'method'  => 'POST',
        'auth'    => false,
        'action'  => function () {
          if (!option('bitbetter.soundbox.enabled', false)) {
            return new Response(
              json_encode(['status' => 'error', 'message' => 'Soundbox is disabled.']),
              'application/json',
              403
            );
          }

          $kirby = kirby();

          $cacheDurationInMinutes = 60;

          $ip ??= strval($kirby->visitor()->ip());
          $limit = 60;
          $key = sha1(__DIR__ . $ip . date('Ymd'));
          $count = $kirby->cache('bitbetter.soundbox.ratelimit')->get(
            $key,
            0
          );

          $count++;

          if ($count > $limit) {
            // Rate limit exceeded
            return new Response(
              json_encode(['status' => 'error', 'message' => 'Rate limit exceeded. Please try again later.']),
              'application/json',
              429
            );
          }

          // Rate limit not exceeded, proceed with the upload
          $kirby->cache('bitbetter.soundbox.ratelimit')->set($key, $count, $cacheDurationInMinutes);


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
            $maxSize = $kirby->option('bitbetter.soundbox.maxFileSize', 0.5 * 1024 * 1024);

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
                'title'     => $request->get('title', "Audioaufnahme"),
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
