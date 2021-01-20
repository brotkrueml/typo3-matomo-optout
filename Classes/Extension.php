<?php

declare(strict_types=1);

/*
 * This file is part of the "matomo_optout" extension for TYPO3 CMS.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 */

namespace Brotkrueml\MatomoOptout;

final class Extension
{
    public const KEY = 'matomo_optout';

    public const PLUGIN_KEY = 'matomo_optout';

    private const LANGUAGE_PATH = 'LLL:EXT:' . self::KEY . '/Resources/Private/Language/';
    public const LANGUAGE_PATH_CONTENT_ELEMENT = self::LANGUAGE_PATH . 'ContentElement.xlf';
}
