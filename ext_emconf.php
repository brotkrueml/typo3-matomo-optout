<?php

$EM_CONF[$_EXTKEY] = [
    'title' => 'Matomo Opt-Out',
    'description' => 'Content element for opting-out of Matomo analytics',
    'category' => 'fe',
    'author' => 'Chris Müller',
    'author_email' => 'typo3@krue.ml',
    'state' => 'stable',
    'version' => '1.1.0',
    'constraints' => [
        'depends' => [
            'typo3' => '10.4.11-12.4.99',
        ],
        'conflicts' => [
        ],
        'suggests' => [
        ],
    ],
];
