<?php

defined('TYPO3') || die();

(static function () {
    if ((new TYPO3\CMS\Core\Information\Typo3Version())->getMajorVersion() < 11) {
        $iconRegistry = TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(
            TYPO3\CMS\Core\Imaging\IconRegistry::class
        );
        $iconRegistry->registerIcon(
            'ext-matomo_optout-ce',
            TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
            ['source' => 'EXT:' . Brotkrueml\MatomoOptout\Extension::KEY . '/Resources/Public/Icons/content-element.svg']
        );
    }

    TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
        '@import "EXT:' . Brotkrueml\MatomoOptout\Extension::KEY . '/Configuration/TSconfig/Page/NewContentElementWizard.tsconfig"'
    );
})();
