
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggleButton = document.getElementById('dark-mode-toggle-button');
    const body = document.body;
    const html = document.documentElement;

    // Function to apply the theme
    function applyTheme(theme) {
        if (theme === 'enabled') {
            html.classList.add('dark-mode');
            darkModeToggleButton.textContent = 'Light Mode';
        } else {
            html.classList.remove('dark-mode');
            darkModeToggleButton.textContent = 'Dark Mode';
        }
    }

    // Check local storage for saved theme
    let darkMode = localStorage.getItem('darkMode');

    // Apply the saved theme on initial load
    applyTheme(darkMode);

    // Toggle dark mode on button click
    darkModeToggleButton.addEventListener('click', () => {
        // Re-check the current state from local storage
        darkMode = localStorage.getItem('darkMode');

        // Add a class to prevent transitions during theme switch
        body.classList.add('no-transition');

        if (darkMode !== 'enabled') {
            localStorage.setItem('darkMode', 'enabled');
            applyTheme('enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
            applyTheme('disabled');
        }

        // Remove the no-transition class after a short delay
        setTimeout(() => {
            body.classList.remove('no-transition');
        }, 100);
    });

    const inquiryForm = document.querySelector('.inquiry-form form');
    inquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(inquiryForm);
        const data = {
            name: formData.get('name'),
            contact: formData.get('contact'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        const scriptURL = 'https://script.google.com/macros/s/AKfycbzqnHV1impopM_XrfTe0a5xuV9lw4iKV173RH-GTi6BMDuPvYqilVz7dFoKFzNDBSqT/exec'; // <-- PASTE YOUR WEB APP URL HERE

        fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(data),
            mode: 'no-cors',
        })
        .then(response => {
            alert('Your enquiry has been sent successfully!');
            inquiryForm.reset();
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert('There was an error sending your enquiry. Please try again.');
        });
    });
});
