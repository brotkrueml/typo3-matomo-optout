document.addEventListener('DOMContentLoaded', function() {
  if (typeof _paq === 'undefined') {
    console.error('matomo_optout: _paq variable is not defined! Please add the Matomo tracking JavaScript to your website');
    return;
  }

  var form = document.getElementById('moo-optout-form');
  var optedOutText = form.dataset.optedOutText;
  var optedInText = form.dataset.optedInText;

  function setOptOutText(element) {
    _paq.push([function() {
      element.checked = !this.isUserOptedOut();
      form.querySelector('label[for="moo-optout"] strong').innerText = this.isUserOptedOut()
        ? optedOutText
        : optedInText;
    }]);
  }

  var optOut = document.getElementById('moo-optout');
  optOut.addEventListener('click', function() {
    if (this.checked) {
      _paq.push(['forgetUserOptOut']);
    } else {
      _paq.push(['optUserOut']);
    }
    setOptOutText(optOut);
  });
  setOptOutText(optOut);
});
