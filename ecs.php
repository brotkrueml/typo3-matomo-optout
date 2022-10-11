<?php

declare (strict_types=1);

use Symplify\EasyCodingStandard\Config\ECSConfig;

return static function (ECSConfig $config): void {
    $header = <<<EOF
This file is part of the "matomo_optout" extension for TYPO3 CMS.

For the full copyright and license information, please read the
LICENSE.txt file that was distributed with this source code.
EOF;

    $config->import(__DIR__ . '/.Build/vendor/brotkrueml/coding-standards/config/common.php');

    $config->paths([
        __DIR__ . '/Classes',
        __DIR__ . '/Configuration',
    ]);
    $config->skip([
        \PhpCsFixer\Fixer\Strict\DeclareStrictTypesFixer::class => [
            __DIR__ . '/Configuration/TCA/*',
        ],
    ]);
};
