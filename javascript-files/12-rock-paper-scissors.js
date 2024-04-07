let score = JSON.parse(localStorage.getItem('score'));

      if (!score) {
        score = {
          wins: 0,
          losses: 0,
          ties: 0
        };
      };

      updateScoreElement();

      let isAutoPlaying = false;
      let intervalId;
      const autoPlayButton = document.querySelector('.autoplay');

      function resetScoreFunction() {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();
      };

      // const autoPlay = () => {

      // };

      function autoPlay() {
        if (!isAutoPlaying) {
          autoPlayButton.innerHTML = 'Auto playing';
          intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
          }, 900);
          isAutoPlaying = true;
        }else {
          autoPlayButton.innerHTML = 'Auto play';
          clearInterval(intervalId);
          isAutoPlaying = false;
        }
      };

      document.querySelector('.rock').addEventListener('click', () => {
        playGame('Rock');
      });

      document.querySelector('.paper').addEventListener('click', () => {
        playGame('Paper');
      });

      document.querySelector('.scissors').addEventListener('click', () => {
        playGame('Scissors');
      });

      document.querySelector('.reset-score').addEventListener('click', () => {
        resetScoreFunction();
      });

      document.querySelector('.autoplay').addEventListener('click', () => {
        autoPlay();
      });

      document.body.addEventListener('keydown', (event) => {
        if (event.key === 'r') {
          playGame('Rock')
        }else if (event.key === 'p') {
          playGame('Paper')
        }else if (event.key === 's') {
          playGame('Scissors')
        }
      });

      function playGame(playerMove) {
          const computerMove = pickComputerMove();

      let result = '';
      if (playerMove === 'Scissors') {
          if (computerMove === 'Rock') {
          result = 'You lose';
        } else if (computerMove === 'Paper') {
          result = 'You win!';
        } else if (computerMove === 'Scissors') {
          result = 'Tie';
        }

      }else if (playerMove === 'Paper') {
        if (computerMove === 'Rock') {
          result = 'You win!';
        } else if (computerMove === 'Paper') {
          result = 'Tie';
        } else if (computerMove === 'Scissors') {
          result = 'You lose';
        }
        
      }else if (playerMove === 'Rock') {
        if (computerMove === 'Rock') {
          result = 'Tie';
        } else if (computerMove === 'Paper') {
          result = 'You lose';
        } else if (computerMove === 'Scissors') {
          result = 'You win!';
        }
      }

      if (result === 'You win!') {
        score.wins += 1;
      }else if (result === 'You lose') {
        score.losses += 1;
      }else if (result === 'Tie') {
        score.ties += 1;
      }

      localStorage.setItem('score', JSON.stringify(score));

      updateScoreElement();

      document.querySelector('.js-result').
        innerHTML = result;

      document.querySelector('.js-moves').
        innerHTML = `You <img class="move-rps" src="images/${playerMove}-emoji.png"> <img src="images/${computerMove}-emoji.png" class="move-rps"> Computer`;

      };

      function updateScoreElement() {
        document.querySelector('.js-score')
          .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
      };

      function pickComputerMove() {
        const randomNumber = Math.random();

        let computerMove = '';

        if (randomNumber >= 0 && randomNumber < 1 / 3) {
          computerMove = 'Rock';
        } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
          computerMove = 'Paper';
        }else if (randomNumber >= 2 / 3 && randomNumber < 1) {
          computerMove = 'Scissors';
        }

        return computerMove;
      };
