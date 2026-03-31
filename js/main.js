document.addEventListener('DOMContentLoaded', function() {

  // Facebook tracking on book-now clicks
  document.querySelectorAll('.book-now').forEach(function(el) {
    el.addEventListener('click', function() {
      if (typeof fbq === 'function') {
        fbq('track', 'Lead');
      }
    });
  });

  // Track HotDoc booking link clicks via dataLayer for GTM
  document.querySelectorAll('a[href*="hotdoc.com.au"]').forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      var url = el.href;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'hotdoc_click',
        'click_url': url
      });
      setTimeout(function() {
        window.location.href = url;
      }, 300);
    });
  });

  // Mobile hamburger menu toggle
  var dropdown = document.querySelector('.mobile.dropdown');
  var mobileHeaderBottom = document.querySelector('.mobile.header-bottom');
  var hamburger = document.getElementById('hamburger');

  if (dropdown) dropdown.style.display = 'none';

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      var isActive = this.classList.contains('active');
      if (mobileHeaderBottom) {
        mobileHeaderBottom.style.display = isActive ? 'none' : 'block';
      }
      if (dropdown) {
        dropdown.style.display = isActive ? 'none' : 'block';
      }
      this.classList.toggle('active');
    });
  }

  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      if (dropdown) dropdown.style.display = 'none';
      if (mobileHeaderBottom) mobileHeaderBottom.style.display = 'none';
      if (hamburger) hamburger.classList.remove('active');
    } else {
      if (mobileHeaderBottom) mobileHeaderBottom.style.display = 'block';
    }
  });

  // Mobile dropdown submenu toggle (Patient Information → FAQ, Pre-Op, Post-Op)
  document.querySelectorAll('.dropdown.mobile .menu-item-has-children').forEach(function(item) {
    var trigger = item.querySelector('span');
    if (trigger) {
      trigger.addEventListener('click', function() {
        item.classList.toggle('open');
      });
    }
  });

  // FAQ accordion toggle (FAQ page)
  document.querySelectorAll('.faq-question').forEach(function(question) {
    var button = question.querySelector('.faq-button');
    if (button) {
      button.addEventListener('click', function() {
        question.classList.toggle('active');
      });
    }
  });

});
