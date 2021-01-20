.. include:: /Includes.rst.txt


.. _configuration:

=============
Configuration
=============

Target group: **Developers, Integrators**

Adjusting the template
======================

The template is based on Fluid, so you can copy it into your site package
extension and make the adjustment you need. Configure the path to the template
file in the TypoScript setup, e.g.::

   tt_content.matomo_optout.templateRootPaths {
      10 = EXT:your_sitepackage/Resources/Private/Templates/MatomoOptOut/
   }

.. note::
   Please keep in mind that the :html:`id` attribute of the HTML elements are
   used by the JavaScript file, so they should not be changed.


Overriding the translations
===========================

You can override the shipped translations. Have a look into the section
:ref:`Custom translations <t3coreapi:xliff-translating-custom>` of the official
TYPO3 documentation.
