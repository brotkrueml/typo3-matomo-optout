(function () {
  "use strict";

  const noTracking = document.getElementById('moo-no-tracking');
  const form = document.getElementById('moo-optout-form');
  const optOut = document.getElementById('moo-optout');

  function checkElements() {
    if (!noTracking) {
      console.error('matomo_optout: element with id "moo-no-tracking" not found!');
      return false;
    }

    if (!form) {
      console.error('matomo_optout: element with id "moo-optout-form" not found!');
      return false;
    }

    if (!optOut) {
      console.error('matomo_optout: element with id "moo-optout" not found!');
      return false;
    }

    return true;
  }

  function checkMatomoEmbedding() {
    if (typeof _paq === 'undefined') {
      noTracking.style.fontWeight = 'bold';
      noTracking.style.color = '#f00';
      noTracking.innerText = 'Please add the Matomo tracking JavaScript to the website to display the Matomo opt-out form!';
      return false;
    }

    return true;
  }

  function setOptOutText(isFirstCall) {
    _paq.push([function () {
      // This function is only executed if Matomo JavaScript is properly loaded and available
      optOut.checked = !this.isUserOptedOut();
      form.querySelector('label[for="moo-optout"] strong').innerText = this.isUserOptedOut()
        ? form.dataset.optedOutText
        : form.dataset.optedInText;

      if (isFirstCall) {
        noTracking.style.display = 'none';
        form.style.removeProperty('display');
      }
    }]);
  }

  function addListener() {
    optOut.addEventListener('click', function () {
      if (this.checked) {
        _paq.push(['forgetUserOptOut']);
      } else {
        _paq.push(['optUserOut']);
      }

      setOptOutText();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!checkElements() || !checkMatomoEmbedding()) {
      return;
    }

    addListener();
    setOptOutText(true);
  });
})();
