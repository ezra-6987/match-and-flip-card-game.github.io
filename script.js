document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const scoreDisplay = document.getElementById('score');
    const messageDisplay = document.getElementById('message');
    let cards = [];
    let flippedCards = [];
    let score = 0;
    let timeLeft = 30; // 30 seconds

    function updateTimer() {
        const minutes = Math.floor(timeLeft/60);
        const seconds = timeLeft % 60;

        minutesDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
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
        1: 'attire.jpg',
        2: 'buffet.jpg',
        3: 'cake.jpg',
        4: 'calendar.jpg',
        5: 'dais.jpg',
        6: 'invitation.jpg',
        7: 'photographer.jpg',
        8: 'ring.jpg'
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

    // Flip card function
    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('hidden')) {
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
    }

    //Option A function
    function optionA() {
        messageDisplay.textContent = 'Low Budget: Go for modest wedding!';
    }

    //Option B function
    function optionB() {
        messageDisplay.textContent = 'High/Sufficient Budget: Grand wedding? Not a big deal!';
    }

});