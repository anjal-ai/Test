// Arrow Functions Explained
// ----------------------------------------
// Step 1: Traditional Function vs Arrow Function
// Traditional way:
// function add(a, b) {
//     return a + b;
// }

// Arrow function way:
// const add = (a, b) => a + b;

// Step 2: Arrow Function Examples
// Example 1: Single parameter (parentheses optional)
// Traditional:
// function double(x) {
//     return x * 2;
// }
// Arrow way:
// const double = x => x * 2;

// Example 2: No parameters (must use empty parentheses)
// Traditional:
// function sayHello() {
//     return "Hello!";
// }
// Arrow way:
// const sayHello = () => "Hello!";

// Example 3: Multiple lines need curly braces and return
// const multiply = (a, b) => {
//     let result = a * b;
//     return result;
// }

// Ternary Operators Explained
// ----------------------------------------
// Step 1: Basic Structure
// instead of:
// if (condition) {
//     return valueIfTrue;
// } else {
//     return valueIfFalse;
// }
// use:
// condition ? valueIfTrue : valueIfFalse

// Step 2: Simple Examples
// Example 1: Age Check
// Traditional if/else:
// let message;
// if (age >= 18) {
//     message = "Can vote";
// } else {
//     message = "Cannot vote";
// }
// Ternary way:
// const message = age >= 18 ? "Can vote" : "Cannot vote";

// Example 2: Price Display
// Traditional if/else:
// let price;
// if (isPremium) {
//     price = "$10";
// } else {
//     price = "$20";
// }
// Ternary way:
// const price = isPremium ? "$10" : "$20";

// Example 3: Nested Ternary (though not recommended for readability)
// const greeting = hour < 12 ? "Good Morning" 
//                : hour < 18 ? "Good Afternoon" 
//                : "Good Evening";



// Email Validation Regular Expression
// This pattern is used to check if an email address is valid
// Let's break down the pattern:
// 1. ^[a-zA-Z0-9._-]+ means:
//    - ^ starts the string
//    - [] contains allowed characters
//    - a-z allows all lowercase letters (e.g., "john")
//    - A-Z allows all uppercase letters (e.g., "JOHN")
//    - 0-9 allows all numbers (e.g., "john123")
//    - . allows dots (e.g., "john.doe")
//    - _ allows underscores (e.g., "john_doe")
//    - - allows hyphens (e.g., "john-doe")
//    - + means one or more of these characters
// 2. @ is the required @ symbol in email
// 3. [a-zA-Z0-9.-]+ means:
//    - Similar to above, but for domain name
//    - Example: "gmail" or "my-company"
// 4. \. means a literal dot
// 5. [a-zA-Z]{2,6} means:
//    - Only letters allowed
//    - Minimum 2, maximum 6 characters
//    - Examples: "com", "org", "edu", "co.uk"
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Smooth Scrolling for Navigation
// This code makes the page scroll smoothly when clicking navigation links
// Example: Clicking on "About" in navigation smoothly scrolls to About section
// Step 1: Find all links that start with # (internal page links)
// Step 2: When any of these links are clicked:
//    - Stop the default jump behavior
//    - Smoothly scroll to the section instead
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Stop the sudden jump
        scrollToSection(this.getAttribute('href').substring(1)); // Get section name (e.g., "About" from "#About")
    });
});

// Smooth Scrolling Function
// This function handles the actual smooth scrolling behavior
// Example: If you click "Contact", it smoothly scrolls to Contact section
// Parameters:
// - sectionId: The section to scroll to (e.g., "About", "Contact")
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId); // Find the section on the page
    if (section) {
        // Scroll to the section
        // - Subtracts 80px to account for fixed header
        // - 'smooth' makes the scrolling animated instead of instant
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });

        // Special Case for Contact Section
        // When scrolling to Contact section:
        // - Wait 1 second (1000 milliseconds)
        // - Then automatically focus on the name input field
        // This helps users start typing immediately
        if (sectionId === 'Contact') {
            setTimeout(() => {
                document.getElementById('name').focus();
            }, 1000);
        }
    }
}

// Form Validation Functions
// These functions check if the user's input is valid

// 1. Name Validation
// Checks if the name is long enough
// Example:
// - "A" -> false (too short)
// - "Jo" -> true (long enough)
// - "John Doe" -> true (long enough)
function validateName(name) {
    return name.length >= 2;
}

// 2. Email Validation
// Checks if the email follows correct format
// Example:
// - "john@gmail.com" -> true (valid format)
// - "john@gmail" -> false (missing top-level domain)
// - "john.doe@my-company.org" -> true (valid format)
function validateEmail(email) {
    return emailRegex.test(email);
}

// 3. Message Validation
// Checks if the message is long enough
// Example:
// - "Hi" -> false (too short)
// - "Hello there" -> false (too short)
// - "Hello, I would like to inquire about..." -> true (long enough)
function validateMessage(message) {
    return message.length >= 10;
}

// Error Display Functions
// These functions handle showing and hiding error messages

// 1. Show Error Message
// Displays an error message below the input field
// Parameters:
// - elementId: Which input has error (e.g., "name", "email")
// - message: What error to show (e.g., "Name is too short")
// Example: showError('name', 'Name must be at least 2 characters')
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId + 'Error');
    errorElement.textContent = message;
    errorElement.style.opacity = '1'; // Make error visible
}

// 2. Clear Error Message
// Removes error message when input becomes valid
// Parameters:
// - elementId: Which input to clear error for
// Example: clearError('email') removes error under email field
function clearError(elementId) {
    const errorElement = document.getElementById(elementId + 'Error');
    errorElement.textContent = '';
    errorElement.style.opacity = '0'; // Hide error
}

// Form Submission Handler
// This function runs when the form is submitted
// Step by Step Process:
// 1. Stop form from submitting normally
// 2. Get what user typed and remove extra spaces
// 3. Check if everything is valid
// 4. If valid, show success message
function handleSubmit(event) {
    event.preventDefault(); // Stop normal form submission
    
    // Get and clean up user input
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Check if all inputs are valid
    if (validateName(name) && validateEmail(email) && validateMessage(message)) {
        // Create success popup (dialog)
        const dialog = document.createElement('dialog');
        dialog.innerHTML = `
            <div class="dialog-content">
                <button class="dialog-close-btn">×</button>
                <h3>Thank You!</h3>
                <p>Your message has been received. We'll get back to you soon.</p>
            </div>
        `;
        document.body.appendChild(dialog);
        dialog.showModal(); // Show the popup

        // Make the close button work
        dialog.querySelector('.dialog-close-btn').addEventListener('click', () => {
            dialog.close();
        });

        // Close popup when clicking outside
        // This checks if click was outside the popup area
        dialog.addEventListener('click', (e) => {
            const dialogDimensions = dialog.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                dialog.close();
            }
        });
        
        event.target.reset(); // Clear all form fields
    }
}

// Real-time Input Validation
// These check user input as they type
// This provides immediate feedback instead of waiting for form submission

// 1. Name Input Checker
// Validates name as user types
// Example: If user types "A" -> shows error
//         If user types "Al" -> removes error
document.getElementById('name').addEventListener('input', function() {
    if (this.value.trim()) {
        validateName(this.value.trim()) 
            ? clearError('name')
            : showError('name', 'Name must be at least 2 characters');
    }
});

// 2. Email Input Checker
// Validates email as user types
// Example: If user types "john@" -> shows error
//         If user types "john@gmail.com" -> removes error
document.getElementById('email').addEventListener('input', function() {
    if (this.value.trim()) {
        validateEmail(this.value.trim())
            ? clearError('email')
            : showError('email', 'Please enter a valid email address');
    }
});

// 3. Message Input Checker
// Validates message as user types
// Example: If user types "Hi" -> shows error
//         If user types "Hello, I would like to" -> removes error
document.getElementById('message').addEventListener('input', function() {
    if (this.value.trim()) {
        validateMessage(this.value.trim())
            ? clearError('message')
            : showError('message', 'Message must be at least 10 characters');
    }
});

// Mobile Menu Handler
// This makes the mobile hamburger menu work
// Step by Step:
// 1. When hamburger icon is clicked
// 2. If menu is hidden -> show it
// 3. If menu is shown -> hide it
// Example: User clicks hamburger icon:
//         - If menu was hidden -> menu appears
//         - If menu was visible -> menu disappears
document.querySelector('.hamburger-menu').addEventListener('click', () => {
    const navItems = document.querySelector('.navigation-items');
    navItems.style.display = navItems.style.display === 'flex' ? 'none' : 'flex';
});