document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        const questionId = this.dataset.question;
        const correctAnswers = JSON.parse(this.dataset.answers);
        const questionCard = document.getElementById('question' + questionId);
        const checkboxes = questionCard.querySelectorAll('input[type="checkbox"]');
        const statusSpan = questionCard.querySelector('.status');
        const statusText = questionCard.querySelector('.status-text');
        
        // Get the selected answers
        const selectedAnswers = [];
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedAnswers.push(checkbox.parentNode.textContent.trim());
            }
        });

        // Check if selected answers match the correct answers
        const selectedCorrect = selectedAnswers.filter(answer => correctAnswers.includes(answer));
        const selectedIncorrect = selectedAnswers.filter(answer => !correctAnswers.includes(answer));
        
        if (selectedCorrect.length === correctAnswers.length && selectedIncorrect.length === 0) {
            // All answers are correct
            questionCard.classList.remove('incorrect', 'some-correct');
            questionCard.classList.add('correct');
            statusText.textContent = 'Correct';
        } else if (selectedCorrect.length > 0 && selectedIncorrect.length > 0) {
            // Some correct answers and some incorrect answers
            questionCard.classList.remove('correct', 'incorrect');
            questionCard.classList.add('some-correct');
            statusText.textContent = 'Some selected answers are incorrect';
        } else {
            // All answers are incorrect
            questionCard.classList.remove('correct', 'some-correct');
            questionCard.classList.add('incorrect');
            statusText.textContent = 'Incorrect';
        }
    });
});
