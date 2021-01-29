document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('moo-optout-form');
  var noTracking = document.getElementById('moo-no-tracking');
  if (!form || !noTracking) {
    console.error('matomo_optout: element with id moo-optout-form element or moo-no-tracking not found!');
    return;
  }

  if (typeof _paq === 'undefined') {
    noTracking.style.fontWeight = 'bold';
    noTracking.style.color = '#f00';
    noTracking.innerText = 'Please add the Matomo tracking JavaScript to the website to display the Matomo opt-out form!';
    return;
  }

  var optedOutText = form.dataset.optedOutText;
  var optedInText = form.dataset.optedInText;
  var optOut = document.getElementById('moo-optout');
  if (!optOut) {
    console.error('matomo_optout: moo-optout element not found!');
    return;
  }

  function setOptOutText(element) {
    _paq.push([function () {
      element.checked = !this.isUserOptedOut();
      form.querySelector('label[for="moo-optout"] strong').innerText = this.isUserOptedOut()
        ? optedOutText
        : optedInText;
      noTracking.style.display = 'none';
      form.style.removeProperty('display');
    }]);
  }

  optOut.addEventListener('click', function () {
    if (this.checked) {
      _paq.push(['forgetUserOptOut']);
    } else {
      _paq.push(['optUserOut']);
    }
    setOptOutText(optOut);
  });
  setOptOutText(optOut);
});
