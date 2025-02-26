// Function to check the answers for a given question
function checkAnswers(questionIndex, correctAnswers) {
    // Select all checkboxes for the question
    const checkboxes = document.querySelectorAll(`#q${questionIndex} input[type='checkbox']`);
    
    // Build an array of selected answers
    let selected = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            // We assume that the text label immediately follows the checkbox.
            // In a more robust solution, you might wrap the text in a <label> element.
            selected.push(checkbox.nextSibling.textContent.trim());
        }
    });
    
    // If no answers were selected, do nothing.
    if (selected.length === 0) {
        return;
    }
    
    // Sort arrays so we can compare them (exact match required)
    const sortedSelected = selected.slice().sort();
    const sortedCorrect = correctAnswers.slice().sort();
    
    const isCorrect = sortedSelected.length === sortedCorrect.length &&
                      sortedSelected.every((val, idx) => val === sortedCorrect[idx]);
    
    // Get the status span within the corresponding question <li>
    const questionElem = document.getElementById(`question${questionIndex}`);
    const statusSpan = questionElem.querySelector('.status');
    
    // Update the status span with a green check mark or a red X
    if (isCorrect) {
        statusSpan.textContent = "✔️";
        statusSpan.classList.remove("incorrect");
        statusSpan.classList.add("correct");
    } else {
        statusSpan.textContent = "❌";
        statusSpan.classList.remove("correct");
        statusSpan.classList.add("incorrect");
    }
}

// When the DOM is fully loaded, attach event listeners to all submit buttons.
document.addEventListener("DOMContentLoaded", function() {
    // For every button, add a click listener
    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", function() {
            const questionIndex = this.getAttribute("data-question");
            // Parse the data-answers attribute (which is stored as a JSON string)
            const correctAnswers = JSON.parse(this.getAttribute("data-answers"));
            checkAnswers(questionIndex, correctAnswers);
        });
    });
});
