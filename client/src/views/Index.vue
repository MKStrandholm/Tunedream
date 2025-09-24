<template>
  <div>
    <!-- Spinner overlay -->
    <div id="spinnerSection" class="overlay">
      <div class="overlay-content">
        <div class="spinner-border text-success" style="width: 5rem; height:5rem;" role="status"></div>
        <p id="loadMsg" class="lead text-success">Generating new puzzle</p>
      </div>
    </div>

    <!-- Share modal -->
    <div class="modal fade" id="shareModal" tabindex="-1" aria-labelledby="shareModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Share your score with your friends!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div id="scoreContainer"></div>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" id="copyBtn" class="btn btn-secondary" @click="copyClipboard()">Copy to Clipboard</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Game header -->
    <div class="row">
      <h1 id="title" class="text-center"><span class="text-success" id="aiTag">Tune</span>dream</h1>
    </div>

    <!-- Info / lives -->
    <h5 id="livesText">
      <button type="button" class="btn" id="infoBtn" data-bs-toggle="modal" data-bs-target="#howToModal">Info</button>
      Remaining guesses: <span :class="{ 'text-danger': gameOver }">{{ lives }}</span>
    </h5>

    <!-- Puzzle image -->
    <div class="row justify-content-center pl-4 pt-2 pr-4">
      <div class="col-lg-3">
        <img id="songPic" class="img-fluid" :src="imgSrc" alt="Tunedream Puzzle Image" />
      </div>
    </div>

    <!-- Masked title -->
    <div class="text-center">
      <h1 id="songName" class="text-center p-4">{{ maskedTitle }}</h1>
    </div>

    <!-- Guess input -->
    <div class="row">
      <div class="col-2"></div>
      <div class="col">
        <input type="text" class="form-control text-center" id="guess" @focus="removeError()" v-model="guess" />
        <br>
        <h1 class="p-1" id="endMsg">{{ message }}</h1>
      </div>
      <div class="col-2"></div>
    </div>

    <!-- Buttons -->
    <div class="text-center mb-4">
      <button class="btn btn-success" id="submitBtn" @click="checkGuess()">Guess!</button>
      <button class="btn btn-secondary" id="playAgain" @click="restartGame()">Play Another</button>
      <button class="btn btn-primary mx-2 text-light" id="share" data-bs-toggle="modal" data-bs-target="#shareModal">
        Share
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Index',
  data() {
    return {
      lives: 7,
      song: {},
      rawTitle: '',
      maskedTitle: '',
      imgSrc: '',
      guess: '',
      previousGuesses: [],
      chosenSong: '',
      year: new Date().getFullYear(),
      loser: false,
      winner: false,
      gameOver: false,
      message: '',
      redirect: false,
      // Audio
      winSfx: null,
      loseSfx: null,
      correctSfx: null,
      incorrectSfx: null,
      warningSfx: null,
      tadaSfx: null,
    };
  },
  mounted() {
    // Setup audio
    this.winSfx = new Audio(require('../assets/audio/win.ogg'));
    this.loseSfx = new Audio(require('../assets/audio/lose.ogg'));
    this.correctSfx = new Audio(require('../assets/audio/success.ogg'));
    this.incorrectSfx = new Audio(require('../assets/audio/error.ogg'));
    this.warningSfx = new Audio(require('../assets/audio/warning.ogg'));
    this.tadaSfx = new Audio(require('../assets/audio/tada.mp3'));

    // Load initial song
    this.loadSong();
  },
  watch: {
    guess() {
      document.getElementById('guess').classList.remove('warning');
    }
  },
  methods: {
    async loadSong() {
      const spinner = document.getElementById('spinnerSection');
      spinner.style.display = 'block';

      const idParam = this.$route.params.id;

      try {
        if (idParam) {
          const id = parseInt(idParam);
          if (!Number.isInteger(id)) {
            this.$router.push({ name: 'NotFound' });
            return;
          }
          const response = await axios.get(`${process.env.VUE_APP_LOCAL_URL}/api/${id}`);
          this.song = response.data;
          this.chosenSong = id;
        } else {
          const response = await axios.get(`${process.env.VUE_APP_LOCAL_URL}/ai`);
          this.song = response.data;
          this.chosenSong = this.song.id;
          this.$router.push(`/${this.song.id}`);
        }

        // Setup game
        this.title = this.song.title;
        this.createTitle(this.song.title);
        this.imgSrc = this.song.image;

        // Reset game state
        this.lives = 7;
        this.previousGuesses = [];
        this.guess = '';
        this.gameOver = false;
        this.message = '';
        document.getElementById('submitBtn').style.display = 'unset';
        document.getElementById('playAgain').style.display = 'none';
        document.getElementById('share').style.display = 'none';
        document.getElementById('guess').style.display = 'block';

      } catch (err) {
        this.$router.push({ name: 'NotFound' });
      } finally {
        spinner.style.display = 'none';
      }
    },

    createTitle(rawTitle) {
      let masked = '';
      for (let c of rawTitle) {
        masked += c === ' ' || c === "'" || c === '.' ? c : '_';
      }
      this.maskedTitle = masked;
    },

    removeError() {
      document.getElementById('guess').classList.remove('error');
      document.getElementById('songName').classList.remove('correctFlicker');
    },

    async checkGuess() {
      let charExistsAlready = false;
      let localGuess = this.guess.toLowerCase().trim();
      let localTitle = this.title.toLowerCase();

      if (!localGuess) {
        document.getElementById('guess').classList.add('error');
        this.incorrectSfx.play();
        return;
      }

      if (this.previousGuesses.includes(localGuess)) {
        this.message = `You've already guessed '${localGuess}'`;
        document.getElementById('guess').classList.add('warning');
        this.warningSfx.play();
        return;
      }

      this.previousGuesses.push(localGuess);
      let charFound = false;

      if (localGuess.length === 1) {
        // Single letter guess
        let maskedArr = this.maskedTitle.split('');
        for (let i = 0; i < localTitle.length; i++) {
          if (localTitle[i] === localGuess) {
            charFound = true;
            maskedArr[i] = this.title[i]; // preserve original capitalization
          }
        }
        this.maskedTitle = maskedArr.join('');
      } else {
        // Full word guess
        let pos = 0;
        while ((pos = localTitle.indexOf(localGuess, pos)) !== -1) {
          charFound = true;
          this.maskedTitle = this.maskedTitle.substring(0, pos) + this.title.substr(pos, localGuess.length) + this.maskedTitle.substring(pos + localGuess.length);
          pos += localGuess.length;
        }
      }

      if (!charFound) {
        document.getElementById('guess').classList.add('error');
        this.incorrectSfx.play();
        this.lives--;
      } else {
        document.getElementById('songName').classList.add('correctFlicker');
        this.correctSfx.play();
      }

      this.guess = '';

      if (this.maskedTitle === this.title) {
        this.win();
        this.gameOver = true;
      } else if (this.lives <= 0) {
        this.lose();
        this.gameOver = true;
      }
    },

    win() {
      this.winner = true;
      this.tadaSfx.play();
      let attempts = 7 - this.lives;
      this.message = `Well done! You got it in ${attempts} ${attempts === 1 ? 'try' : 'tries'}!`;
      document.getElementById('songName').classList.add('text-success');
      document.getElementById('guess').style.display = 'none';
      document.getElementById('submitBtn').style.display = 'none';
      document.getElementById('playAgain').style.display = 'unset';
      document.getElementById('share').style.display = 'unset';
      this.setShareModal();
    },

    lose() {
      this.loser = true;
      this.loseSfx.play();
      this.message = `You ran out of guesses! The answer was: ${this.title}`;
      document.getElementById('songName').classList.add('text-danger');
      document.getElementById('guess').style.display = 'none';
      document.getElementById('submitBtn').style.display = 'none';
      document.getElementById('playAgain').style.display = 'unset';
      document.getElementById('share').style.display = 'unset';
      this.setShareModal();
    },

    restartGame() {
      this.$router.push('/');
      this.loadSong();
    },

    setShareModal() {
      const scoreContainer = document.getElementById('scoreContainer');
      scoreContainer.innerHTML = this.winner
        ? `I solved the puzzle: ${this.title}! Can you?`
        : `I tried to solve the puzzle: ${this.title}. Can you do better?`;
    },

    copyClipboard() {
      const text = document.getElementById('scoreContainer').innerText;
      navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard!'));
    },
  },
};
</script>

<style scoped>
.overlay {
  /* Height & width depends on how you want to reveal the overlay (see JS below) */
  height: 100%;
  width: 100%;
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Sit on top */
  left: 0;
  top: 0;
  background-color: rgb(0, 0, 0);
  /* Black fallback color */
  background-color: rgb(36, 36, 36);
  /* Dark grey */
  overflow-x: hidden;
  /* Disable horizontal scroll */
  transition: 0.5s;
  /* 0.5 second transition effect to slide in or slide down the overlay (height or width, depending on reveal) */
}

.overlay-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
}

#title {
  color: rgb(236, 236, 236);
  font-family: 'Quicksand', sans-serif;
  font-size: 3.5rem;
}

#loadMsg {
  font-family: 'Quicksand', sans-serif;
}

#livesText,
#endMsg {
  color: rgb(236, 236, 236);
  font-family: 'Quicksand', sans-serif;
}

#endMsg {
  font-size: 1.75rem;
}

#guessGarbage {
  border: 1px solid white;
  border-radius: 5px;
  color: rgb(236, 236, 236);
  font-family: 'Quicksand', sans-serif;
}

#aiTag {
  font-family: 'Mitr', sans-serif;
  font-size: 4rem;
}

#songPic {
  border-radius: 15px;
  border: 1px solid white;

}

#songName {
  color: rgb(236, 236, 236);
  letter-spacing: 10px;
  font-size: 3.25rem;
  font-family: 'Noto Sans', sans-serif;
}

#submitBtn,
#playAgain,
#share {
  font-size: 1.25rem;
}

#playAgain,
#share {
  display: none;
}

input {
  font-size: 1.5rem;
}

.form-control:focus {
  border-color: #198754;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 20px #198754;
}

.error {
  animation: shake 0.2s ease-in-out 0s 2;
  box-shadow: 0 0 0.5em #dc3545;
}

.warning {
  animation: shake 0.2s ease-in-out 0s 2;
  box-shadow: 0 0 0.5em #ffeb00;
}

@keyframes shake {
  0% {
    margin-left: 0rem;
  }

  25% {
    margin-left: 0.5rem;
  }

  75% {
    margin-left: -0.5rem;
  }

  100% {
    margin-left: 0rem;
  }
}

.modal-content {
  background-color: #303030;
  color: white;
}

.custom-toggler .navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='white' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}

.custom-toggler.navbar-toggler {
  border-color: white;
}

#infoBtn {
  color: white;
}

#infoBtn,
#infoBtn:focus,
#infoBtn:hover {
  border: none;
}

@keyframes flicker {
  0% {
    color: #198754;
  }

  100% {
    color: white;
  }
}

.correctFlicker {
  animation-name: flicker;
  animation-duration: 200ms;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
}

.fbBtn {
  background-color: #4267B2;
  border: 1px solid #4267B2;
  color: white;
}

.fbBtn:hover {
  background-color: #335599;
  border: 1px solid #335599;
  color: white;
}

.twitterBtn {
  background-color: #1DA1F2;
  border: 1px solid #1DA1F2;
  color: white;
}

.twitterBtn:hover {
  background-color: #1085ce;
  border: 1px solid #1085ce;
  color: white;
}

@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mitr:wght@500&display=swap');
</style>
