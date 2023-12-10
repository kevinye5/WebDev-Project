/*!
    * Start Bootstrap - Freelancer v6.0.0 (https://startbootstrap.com/themes/freelancer)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-freelancer/blob/master/LICENSE)
    */
    (function($) {
    "use strict"; // Start of use strict
  
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 71)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });
  
    // Scroll to top button appear
    $(document).scroll(function() {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
      } else {
        $('.scroll-to-top').fadeOut();
      }
    });
  
    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
    });
  
    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#mainNav',
      offset: 80
    });
  
    // Collapse Navbar
    var navbarCollapse = function() {
      if ($("#mainNav").offset().top > 100) {
        $("#mainNav").addClass("navbar-shrink");
      } else {
        $("#mainNav").removeClass("navbar-shrink");
      }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
  
    // Floating label headings for the contact form
    $(function() {
      $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
      }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
      }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
      });
    });
  
  })(jQuery); // End of use strict

  //form validation

  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('example-form');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const data = { username, email, password };

        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            alert('User registered successfully!');
            // Additional handling like form reset or redirection
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to register user.');
        }
    });
});

//google books api
$(document).ready(function() {
  $("#search").click(function() {
      var searchData = $("#search-box").val();

      if (searchData) {
          $.ajax({
              url: '/api/searchbooks?query=' + encodeURIComponent(searchData),
              dataType: 'json',
              success: function(response) {
                  displayResults(response);
              },
              error: function() {
                  alert('Error while fetching data.');
              }
          });
      } else {
          alert('Please enter a search term.');
      }
  });

  function displayResults(data) {
      var outputList = document.getElementById('list-output');
      outputList.innerHTML = '';

      if (data.items && data.items.length > 0) {
          data.items.forEach(item => {
              var htmlCard = formatBookCard(item.volumeInfo);
              outputList.innerHTML += htmlCard;
          });
      } else {
          outputList.innerHTML = '<p>No results found.</p>';
      }
  }

  function formatBookCard(book) {
      return `
          <div class="col-md-4">
              <div class="card mb-4">
                  <img src="${book.imageLinks ? book.imageLinks.thumbnail : 'https://via.placeholder.com/150'}" class="card-img-top" alt="${book.title}">
                  <div class="card-body">
                      <h5 class="card-title">${book.title}</h5>
                      <p class="card-text">${book.authors ? book.authors.join(', ') : 'Unknown Author'}</p>
                  </div>
              </div>
          </div>`;
  }
});




  