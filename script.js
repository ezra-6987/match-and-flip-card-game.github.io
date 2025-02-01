document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const secondsDisplay = document.getElementById('seconds');
    const scoreDisplay = document.getElementById('score');
    const messageDisplay = document.getElementById('message');
    let cards = [];
    let flippedCards = [];
    let score = 0;
    let timeLeft = 30; // 30 seconds

    function updateTimer() {
        const seconds = timeLeft % 60;
        
        secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;

        if (timeLeft > 0) {
            timeLeft--;
        } else {
            clearInterval(timerInterval);
            cards.forEach(card => card.removeEventListener('click', flipCard));
            checkScore();
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();

    //Mapping card values to image names
    const imageMapping = {
        1: 'bride-attire.png',
        2: 'buffet.png',
        3: 'cake.png',
        4: 'calendar.png',
        5: 'groom-attire.png',
        6: 'invitation.png',
        7: 'photographer.png',
        8: 'ring.png'
    };

    // Generate card values (pairs)
    const cardValues = [];
    for (let i = 1; i <= 8; i++) {
        cardValues.push(i, i);
    }
    cardValues.sort(() => 0.5 - Math.random());

    // Create card elements
    cardValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;

        const img = document.createElement('img');
        img.src = `assets/${imageMapping[value]}`;
        img.style.display = 'none';
        card.appendChild(img);

        card.addEventListener('click', flipCard);
        grid.appendChild(card);
        cards.push(card);
    });

    // Function to check if all cards are matched
    function allCardsMatched() {
        return cards.every(card => card.classList.contains('hidden'));
    }

    // Flip card function
    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('hidden') && !flippedCards.includes(this)) {
            this.querySelector('img').style.display = 'block';
            flippedCards.push(this);
            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }

    // Check for match
    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.value === card2.dataset.value) {
            card1.classList.add('hidden');
            card2.classList.add('hidden');
            score++;
            scoreDisplay.textContent = score;

            // Check if all cards are matched
            if (allCardsMatched()) {
                clearInterval(timerInterval);
                checkScore(); // If all cards are matched, stop the timer and check the score
            }
        } else {
            card1.querySelector('img').style.display = 'none';
            card2.querySelector('img').style.display = 'none';
        }
        flippedCards = [];
    }

    //Check score and determine the option
    function checkScore() {
        if (score <= 4) {
            optionA();
        } else if (score >= 5) {
            optionB();
        }
        localStorage.setItem('score', score);
        window.location.href = 'completion.html'
    }

    //Option A function
    function optionA() {
        // Clear any previous content in the message display
        messageDisplay.innerHTML = '';
        
        // Create an img element
        const img = document.createElement('img');
        img.src = 'assets/modest-wedding.png'; // Replace with your image path
        img.alt = 'Go for modest wedding!';
        img.style.width = '35%'; // Adjust the image size as needed
        img.style.height = 'auto';
        img.style.position = 'absolute'; // Position absolute to use bottom, right
        img.style.bottom = '50%'; // Adjust the distance from the bottom
        img.style.right = '80%'; // Adjust the distance from the right
        img.style.transform = 'translate(-50%, -50%)';
    
        // Append the img element to the message display
        messageDisplay.style.position = 'relative'; // Ensure parent element is positioned
        messageDisplay.appendChild(img);
    }
    
    

    //Option B function
    function optionB() {
        // Clear any previous content in the message display
        messageDisplay.innerHTML = '';
        
        // Create an img element
        const img = document.createElement('img');
        img.src = 'assets/dream-wedding.png'; // Replace with your image path
        img.alt = 'Go for dream wedding!';
        img.style.width = '35%'; // Adjust the image size as needed
        img.style.height = 'auto';
        img.style.position = 'absolute'; // Position absolute to use bottom, right
        img.style.bottom = '50%'; // Adjust the distance from the bottom
        img.style.right = '80%'; // Adjust the distance from the right
        img.style.transform = 'translate(-50%, -50%)';

        // Append the img element to the message display
        messageDisplay.style.position = 'relative'; // Ensure parent element is positioned
        messageDisplay.appendChild(img);
    }
});

