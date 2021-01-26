document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('moo-optout-form');
  if (!form) {
    console.error('matomo_optout: moo-optout-form element not found!');
    return;
  }

  if (typeof _paq === 'undefined') {
    form.style.fontWeight = 'bold';
    form.style.color = '#f00';
    form.innerText = 'Please add the Matomo tracking JavaScript to the website to display the Matomo opt-out form!';
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
    _paq.push([function() {
      element.checked = !this.isUserOptedOut();
      form.querySelector('label[for="moo-optout"] strong').innerText = this.isUserOptedOut()
        ? optedOutText
        : optedInText;
    }]);
  }

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
