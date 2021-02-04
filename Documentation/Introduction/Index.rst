.. include:: /Includes.rst.txt

.. _introduction:

============
Introduction
============

.. _what-it-does:

What does it do?
================

The extension provides a new content element for opting-out of `Matomo
<https://matomo.org/>`_. The current tracking status is displayed and the
possibility given to opt-out and opt-in again.

The opt-out form is based on a JavaScript solution described in the
`Matomo documentation <https://developer.matomo.org/guides/tracking-javascript-guide#optional-creating-a-custom-opt-out-form>`_.

.. tip::
   If you use Matomo, the :ref:`Matomo Widgets <matomo_widgets:introduction>`
   extension might be of interest to you.


.. _screenshots:

Screenshot
==========

.. figure:: /Images/Introduction/optout-form.png
   :class: with-shadow
   :alt: Opt-out form


.. _release-management:

Release management
==================

This extension uses `semantic versioning <https://semver.org/>`_ which
basically means for you, that

- Bugfix updates (e.g. 1.0.0 => 1.0.1) just includes small bug fixes or security
  relevant stuff without breaking changes.
- Minor updates (e.g. 1.0.0 => 1.1.0) includes new features and smaller tasks
  without breaking changes.
- Major updates (e.g. 1.0.0 => 2.0.0) breaking changes which can be
  refactorings, features or bug fixes.
