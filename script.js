// Google Sheets configuration
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';
const API_KEY = 'YOUR_GOOGLE_API_KEY';
const SHEET_NAME = 'Coupons';

// DOM Elements
const couponForm = document.getElementById('coupon-form');
const emailInput = document.getElementById('email');
const errorMessage = document.getElementById('error-message');
const formContainer = document.getElementById('form-container');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    couponForm.addEventListener('submit', handleFormSubmit);
});

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    // Basic email validation
    if (!validateEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    try {
        // Show loading state
        showLoading();
        
        // Get coupon from Google Sheets
        const coupon = await getCouponFromSheet(email);
        
        if (coupon) {
            // Display the coupon
            displayCoupon(coupon);
        } else {
            showError('No coupons available at this time. Please try again later.');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Failed to generate coupon. Please try again.');
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

function showLoading() {
    formContainer.innerHTML = `
        <div class="loading">
            <p>Generating your coupon...</p>
        </div>
    `;
}

async function getCouponFromSheet(email) {
    // In a real implementation, you would use the Google Sheets API
    // This is a mock implementation for demonstration
    
    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response data
    const mockCoupons = [
        { code: 'PWSTUDENT20', discount: '20% OFF', validUntil: '2023-12-31' },
        { code: 'PWLEARN15', discount: '15% OFF', validUntil: '2023-12-31' },
    ];
    
    // Return a random coupon for demo purposes
    return mockCoupons[Math.floor(Math.random() * mockCoupons.length)];
    
    /* 
    // Actual Google Sheets API implementation would look like:
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    // Process the data to find available coupons
    // ...
    */
}

function displayCoupon(coupon) {
    formContainer.innerHTML = `
        <div class="coupon-result">
            <span class="material-icons">local_offer</span>
            <h3>Your Exclusive Coupon</h3>
            <div class="coupon-code">${coupon.code}</div>
            <div class="coupon-details">
                <p>${coupon.discount} on all PW courses</p>
                <p>Valid until: ${coupon.validUntil}</p>
            </div>
            <button class="btn-outline" onclick="resetForm()">Get Another Coupon</button>
        </div>
    `;
}

function resetForm() {
    formContainer.innerHTML = `
        <form id="coupon-form">
            <div class="form-group">
                <label for="email">Your Student Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            <button type="submit" class="btn-primary">
                <span>Get My Coupon</span>
                <span class="material-icons">send</span>
            </button>
            <p id="error-message" class="error-message"></p>
        </form>
    `;
    
    // Re-attach event listener
    document.getElementById('coupon-form').addEventListener('submit', handleFormSubmit);
    emailInput = document.getElementById('email');
    errorMessage = document.getElementById('error-message');
}
