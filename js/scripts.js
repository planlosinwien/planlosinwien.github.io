/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 
window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Function to stop YouTube video when modal is closed
    function stopYouTubeVideo(modalId) {
        var iframe = document.getElementById(modalId + 'Video');
        var iframeSrc = iframe.src;
        iframe.src = iframeSrc; // Reloads the iframe, stopping the video
    }

    // Event listener to stop YouTube video when modal is closed and lazy image loading
    var modals = document.querySelectorAll('.portfolio-modal');
    modals.forEach(function(modal) {
		modal.addEventListener('shown.bs.modal', function () {
			$(this).find('.lazyload').each(function() {
				var $element = $(this);
				var src = $element.data('src');
				if (src) {
					$element.attr('src', src);
				}
			});
		});
		modal.addEventListener('hidden.bs.modal', function() {
			var modalId = modal.getAttribute('id');
			stopYouTubeVideo(modalId);
		});
    });

    // Form submission
    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Validate form fields
        var name = document.getElementById('name').value.trim();
        var email = document.getElementById('email').value.trim();
        var phone = document.getElementById('phone').value.trim();
        var message = document.getElementById('message').value.trim();

        if (name === '') {
            alert('Name is required!');
            return;
        }

        if (email === '') {
            alert('Email is required!');
            return;
        }

        // Validate email format
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Invalid email format!');
            return;
        }

		/*  
		if (phone === '') {
            alert('Phone number is required for this form! (you can write any mail to absolute.planlosigkeit@gmail.com)');
            return;
        }

        var phoneRegex = /^[\d/]+$/; 
        if (!phoneRegex.test(phone)) {
            alert('Invalid phone number format!');
            return;
        }
		*/
		
        if (message === '') {
            alert('Message is required!');
            return;
        }


        // Prepare form data
        var formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('message', message);

        // Send form data to Formspree
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://formspree.io/f/meqydzpl', true); 
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200 || xhr.status === 201) {
                alert('Email sent successfully!');
                // Optionally, you can reset the form after successful submission
                document.getElementById('contactForm').reset();
            } else {
                alert('Error sending email. Please try again later.');
            }
        };
        xhr.onerror = function() {
            alert('Error sending email. Please try again later.');
        };
        xhr.send(formData);
    });
});
