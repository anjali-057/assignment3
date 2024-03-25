// Constants for form elements
const pizzaForm = document.getElementById('pizza-form');
const pizzaDescription = document.getElementById('pizza-description');

// Constants for validation
const crustError = document.getElementById('crust-error');
const sizeError = document.getElementById('size-error');
const sauceError = document.getElementById('sauce-error');
const cheeseError = document.getElementById('cheese-error');
const toppingError = document.getElementById('topping-error');

document.addEventListener('DOMContentLoaded', function () {
    const studentInfo = document.getElementById('student-info');
    const studentID = '200556508';
    const studentName = 'Anjali Sharma';
    studentInfo.textContent = `Student ID: ${studentID} | Student Name: ${studentName}`;
}
)

// Array of all error messages
const errorMessages = [crustError, sizeError, sauceError, cheeseError, toppingError];

// Function to validate form fields
function validateForm() {
    let isValid = true;

    // Resetting error messages
    errorMessages.forEach(error => {
        error.textContent = '';
    });

    // Checking if crust is selected
    if (!document.getElementById('crust').value) {
        crustError.textContent = 'Please select crust.';
        isValid = false;
    }

    if (!document.getElementById('pizza-size').value) {
        sizeError.textContent = 'Please select size.';
        isValid = false;
    }

    const selectedSauce = document.querySelector('input[name="base-sauce"]:checked');
    if (!selectedSauce) {
        sauceError.textContent = 'Please select sauce.';
        isValid = false;
    }

    const selectedCheeses = document.querySelectorAll('input[name="base-cheese"]:checked');
    if (selectedCheeses.length === 0) {
        cheeseError.textContent = 'Please select cheese.';
        isValid = false;
    }

    //Checking if at least one topping is selected
    const selectedToppings = document.querySelectorAll('input[name="toppings"]:checked');
    if (selectedToppings.length === 0) {
        toppingError.textContent = 'Please select at least one topping.';
        isValid = false;
    }

    return isValid;
}


pizzaForm.addEventListener('submit', function(event) {
    event.preventDefault(); 


    if (validateForm()) {
        // Getting form values
        const quantity = document.getElementById('quantity').value;
        const crust = document.getElementById('crust').value;
        const pizzaSize = document.getElementById('pizza-size').value;
        const sauce = document.querySelector('input[name="base-sauce"]:checked').value;
        const cheese = Array.from(document.querySelectorAll('input[name="base-cheese"]:checked')).map(checkbox => checkbox.value);
        const toppings = Array.from(document.querySelectorAll('input[name="toppings"]:checked')).map(checkbox => checkbox.value);

        // Pizza object
        const pizza = new Pizza(quantity, pizzaSize, crust, sauce, cheese, toppings);

        // pizza description
        pizzaDescription.textContent = pizza.getDescription();
    } else {
        pizzaDescription.textContent = '';
    }
});

// Pizza class definition
class Pizza {
    constructor(quantity, size, crust, sauce, cheese, toppings) {
        this.quantity = quantity;
        this.size = size;
        this.crust = crust;
        this.sauce = sauce;
        this.cheese = cheese;
        this.toppings = toppings;
    }

    getDescription() {
        let description = `You ordered ${this.quantity} ${this.size} pizzas with ${this.crust} crust, ${this.sauce} sauce, ${this.cheese.join(', ')} cheese`;
        if (this.toppings.length > 0) {
            description += `, and ${this.toppings.join(', ')} toppings each.`;
        } else {
            description += ', and no toppings.';
        }
        return description;
    }
}
