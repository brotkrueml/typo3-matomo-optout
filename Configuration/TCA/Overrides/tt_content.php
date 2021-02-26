<?php

/*
 * This file is part of the "matomo_optout" extension for TYPO3 CMS.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 */

defined('TYPO3') || die();

(function () {
    TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPlugin(
        [
            Brotkrueml\MatomoOptout\Extension::LANGUAGE_PATH_CONTENT_ELEMENT . ':title',
            Brotkrueml\MatomoOptout\Extension::PLUGIN_KEY,
            'EXT:' . Brotkrueml\MatomoOptout\Extension::KEY . '/Resources/Public/Icons/content-element.svg',
            'special',
        ],
        TYPO3\CMS\Extbase\Utility\ExtensionUtility::PLUGIN_TYPE_CONTENT_ELEMENT,
        Brotkrueml\MatomoOptout\Extension::KEY
    );

    $tempTypes = [
        Brotkrueml\MatomoOptout\Extension::PLUGIN_KEY => [
            'showitem' => '
                --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
                --palette--;;general,
                --palette--;;headers,
                --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:language,
                --palette--;;language,
                --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access,
                --palette--;;hidden,
                --palette--;;access,
                --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:extended
            ',
        ],
    ];

    $GLOBALS['TCA']['tt_content']['types'] += $tempTypes;

    $GLOBALS['TCA']['tt_content']['ctrl']['typeicon_classes'][Brotkrueml\MatomoOptout\Extension::PLUGIN_KEY] = 'ext-matomo_optout-ce';
})();
