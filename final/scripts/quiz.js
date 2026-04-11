document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    const questions = [
        {
            id: 'q1',
            prompt: '1. What is the name of the rabbit this site is about?',
            options: { a: 'Fluffy', b: 'Mini', c: 'Thumper' },
            answer: 'b'
        },
        {
            id: 'q2',
            prompt: '2. What are Rex rabbits known for?',
            options: { a: 'Very large size', b: 'Gentle nature', c: 'Distinctive plush fur' },
            answer: 'c'
        },
        {
            id: 'q3',
            prompt: '3. What is one difference in Continental Giants compared to Flemish Giants?',
            options: { a: 'Size of head', b: 'Temperament', c: 'Fur texture' },
            answer: 'a'
        },
        {
            id: 'q4',
            prompt: '4. What is Mini\'s birth date?',
            options: { a: '10/31/2025', b: '12/25/2025', c: '1/1/2026' },
            answer: 'a'
        },
        {
            id: 'q5',
            prompt: '5. Where did Flemish Giants originate?',
            options: { a: 'United Kingdom', b: 'Patagonia', c: 'Flanders' },
            answer: 'c'
        },
        {
            id: 'q6',
            prompt: '6. Which breed is recognized by the BRC but not the ARBA?',
            options: { a: 'Flemish Giant', b: 'Continental Giant', c: 'Rex' },
            answer: 'b'
        },
        {
            id: 'q7',
            prompt: '7. Which breed was first shown publicly at the Paris International Rabbit Show in 1924?',
            options: { a: 'Flemish Giant', b: 'Continental Giant', c: 'Rex' },
            answer: 'c'
        }
    ];

    const userResponses = questions.map((question) => ({
        question,
        selected: params.get(question.id)
    }));

    let score = 0;
    userResponses.forEach((response) => {
        if (response.selected === response.question.answer) {
            score++;
        }
    });

    const scorePercentage = Math.round((score / questions.length) * 100);
    const scoreElement = document.getElementById('score');
    if (!scoreElement) {
        return;
    }

    const feedbackElement = document.getElementById('feedback');
    const answerDetailsElement = document.getElementById('answer-details');

    scoreElement.textContent = `You scored ${score} out of ${questions.length}! (${scorePercentage}%)`;

    if (score === questions.length) {
        feedbackElement.textContent = "Perfect score! You're a rabbit expert!";
    } else if (score >= 5) {
        feedbackElement.textContent = "Great job! You know your rabbits well!";
    } else if (score >= 3) {
        feedbackElement.textContent = "Not bad! You have some rabbit knowledge.";
    } else {
        feedbackElement.textContent = "Better luck next time! Keep learning about rabbits!";
    }

    const highScore = Number(localStorage.getItem('highScore')) || 0;
    if (score > highScore) {
        localStorage.setItem('highScore', score);
        const highScoreElement = document.createElement('p');
        highScoreElement.textContent = "Congratulations! You have a new high score!";
        feedbackElement.appendChild(highScoreElement);
    }

    function renderAnswerDetails() {
        if (!answerDetailsElement) return;

        const list = document.createElement('ol');
        list.className = 'answer-list';

        userResponses.forEach((response) => {
            const { question, selected } = response;
            const isCorrect = selected === question.answer;
            const listItem = document.createElement('li');
            listItem.className = isCorrect ? 'correct-answer' : 'incorrect-answer';

            const userAnswerText = selected ? question.options[selected] : 'No answer selected';
            const correctAnswerText = question.options[question.answer];

            listItem.innerHTML = `
                <p class="question-text">${question.prompt}</p>
                <p><strong>Your answer:</strong> ${userAnswerText}</p>
            `;

            if (!isCorrect) {
                const incorrectNote = document.createElement('p');
                incorrectNote.innerHTML = '<strong>This answer was incorrect!</strong>';
                listItem.appendChild(incorrectNote);
            }

            list.appendChild(listItem);
        });

        answerDetailsElement.appendChild(list);
    }

    renderAnswerDetails();
});