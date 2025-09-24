<template>
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
          <h5 class="modal-title" id="shareModal">Share your score with your friends!</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <br>
          <div id="scoreContainer">

          </div>
          <input type="hidden" id="scoreInput" />
          <br>
        </div>
        <div class="modal-footer justify-content-center">
          <div class="row">
            <div class="col-lg-auto">
              <!-- <button type="button" class="btn btn-info twitterBtn mb-1">
                <ShareNetwork id="twitter" class="text-light" style="text-decoration: none;" network="twitter" url=""
                  :title="twitterData" description="">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-twitter" viewBox="0 0 16 16">
                    <path
                      d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg> Share to Twitter
                </ShareNetwork>
              </button> -->
            </div>
            <div class="col-lg-auto">
              <button type="button" id="copyBtn" class="btn btn-secondary" @click="copyClipboard()"><svg
                  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard"
                  viewBox="0 0 16 16">
                  <path
                    d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                  <path
                    d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                </svg> Copy to Clipboard</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <h1 id="title" class="text-center"><span class="text-success" id="aiTag">Tune</span>dream</h1>
  </div>
  <div class="modal fade" id="howToModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">How to Play</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <strong>What is this?</strong><br>
          Tunedream is a game utilizing <em>DeepAI's Text-To-Image API</em> and the <em>Rolling Stone's Top 500 Songs of
            All Time</em> list to create an interesting and unique puzzle for you to solve.<br><br><strong>How does it
            work?</strong><br>The computer generates an image based on a song title, and it's your job to
          guess the song using the image as a clue. <br><br>Be careful as you only have <strong>7</strong> (un)lucky
          attempts to
          crack the title and win the game!
          <!-- <hr>
          <strong>Have song suggestions or issues?</strong><br>Send an e-mail to <a
            href="mailto:tunedreamgame@gmail.com">tunedreamgame@gmail.com</a> with your issues, or with your songs and
          they may be added in
          the future! -->
        </div>
        <br>
        <div class="modal-footer justify-content-center">
          &copy; Tunedream <span id="year">{{this.year}}</span>
        </div>
      </div>
    </div>
  </div>
  <h5 id="livesText"><button type="button" class="btn" id="infoBtn" data-bs-toggle="modal" data-bs-target="#howToModal">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-info-circle"
        viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path
          d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
      </svg>
    </button>Remaining guesses: <span :class="{ 'text-danger': this.gameOver }">{{
      this.lives
    }}</span></h5>
  <div class="row justify-content-center pl-4 pt-2 pr-4">

    <div class="col-lg-3">
      <img id="songPic" class="img-fluid" :src="imgSrc" alt="Tunedream Puzzle Image" />
    </div>
  </div>

  <div class="text-center">
    <h1 id="songName" class="text-center p-4">{{ this.maskedTitle }}</h1>
  </div>
  <br>
  <div class="row">
    <div class="col-2"></div>
    <div class="col">
      <input type="text" class="form-control text-center" id="guess" @focus.native="removeError()" v-model="guess"
        aria-describedby="guessHelp">
      <br>
      <h1 class="p-1" id="endMsg">{{ this.message }}</h1>
    </div>
    <div class="col-2"></div>
  </div>
  <div class="text-center mb-4">
    <button class="btn btn-success" id="submitBtn" @click="checkGuess()">Guess!</button>
    <button class="btn btn-secondary" id="playAgain" @click="restartGame()">Play Another</button>
    <button class="btn btn-primary mx-2 text-light" id="share" data-bs-toggle="modal" data-bs-target="#shareModal">Share
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share-fill"
        viewBox="0 0 16 16">
        <path
          d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />
      </svg></button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Index',
  data() {
    return {
      lives: 7,
      song: {},
      rawTitle: "",
      maskedTitle: "",
      imgSrc: "",
      guess: "",
      previousGuesses: [],
      chosenSong: "",

      year: new Date().getFullYear(),

      twitterData: "",
      fbData: "",

      loser: false,
      winner: false,
      gameOver: false,
      message: "",
      redirect: false,

      // Audio
      winSfx: "",
      loseSfx: "",
      correctSfx: "",
      incorrectSfx: "",
      warningSfx: "",

      idParam: ""
    }
  },
  watch: {
    // Watch input so that warning class is removed if value changes
    guess() {
      document.getElementById("guess").classList.remove("warning");
    }
  },
  // On page load, setup the game
  mounted: async function () {
    // Setup sounds
    this.winSfx = new Audio(require('../assets/audio/win.ogg'));
    this.loseSfx = new Audio(require('../assets/audio/lose.ogg'));
    this.correctSfx = new Audio(require('../assets/audio/success.ogg'));
    this.incorrectSfx = new Audio(require('../assets/audio/error.ogg'));
    this.warningSfx = new Audio(require('../assets/audio/warning.ogg'));
    this.tadaSfx = new Audio(require('../assets/audio/tada.mp3'));
    this.idParam = this.$route.params.id;
    this.setup();
  },
  methods: {
    // This method sets the titles and image source
    setup: async function () {

      // Reset values
      this.lives = 7;
      this.song = {};
      this.rawTitle = "";
      this.maskedTitle = "";
      this.imgSrc = "";
      this.guess = "";
      this.previousGuesses = [];
      this.chosenSong = "";
      this.twitterData = "";
      this.fbData = "";
      this.loser = false;
      this.winner = false;
      this.gameOver = false;
      this.message = "";


      // Update DOM elements
      document.getElementById("songName").classList.remove("text-success");
      document.getElementById("songName").classList.remove("text-danger");
      document.getElementById("guess").classList.remove("error");
      // Replace guess button with replay button
      document.getElementById("submitBtn").style.display = "unset";
      document.getElementById("playAgain").style.display = "none"; ``
      // Hide share btn
      document.getElementById("share").style.display = "none";

      // Show input
      document.getElementById("guess").style.display = "block";

      // Show spinner
      let spinner = document.getElementById("spinnerSection");
      spinner.style.display = "block";


      // Check for redirect, force refresh
      if (this.redirect) {
        this.$route.params.id = undefined;
        this.redirect = false;
      }
      
      // ID successfully parsed from URL
      if (this.$route.params.id !== undefined) {
        const id = parseInt(this.$route.params.id);
        // Check if param in URL is a number - if not, redirect to error
        if (Number.isInteger(id)) {
          // Attempt to set randomIndex value to the id and then show spinner
          try {
            // Get specific image from db
            let response = await axios
              .get(`${process.env.VUE_APP_LOCAL_URL}/api/${id}`);

            // Set song to this image
            this.song = response.data;

            this.chosenSong = id;
            spinner.style.display = "block";

            // Set raw title (plaintext)
            let rawTitle = this.song.title;
            // Bind title of song to raw title
            this.title = rawTitle;
            // Create the masked title with the plaintext
            this.createTitle(rawTitle);
            // Set the source of the image to the image data from the record
            this.imgSrc = this.song.image;
            // Hide spinner 
            spinner.style.display = "none";
          }
          // Catch incorrect id param and redirect to error
          catch (ex) {
            console.log(ex);
            //this.$router.push('error');
          }
        }
        // ID param is NaN
        else {
          console.log(ex);
          this.$router.push('error');
        }
      }
      // No id provided, pick a random index and setup the game for this one
      else {

        // Get random image from db
        let response = await axios
          .get(`${process.env.VUE_APP_LOCAL_URL}/ai`);
        // Set song to this image
        this.song = response.data;
        this.$router.push(`/${this.song.id}`);
        // Hide spinner 
        spinner.style.display = "none";
        // Set raw title (plaintext)
        let rawTitle = this.song.title;
        // Bind title of song to raw title
        this.title = rawTitle;
        // Create the masked title with the plaintext
        this.createTitle(rawTitle);
        // Set the source of the image to the image data from the record
        this.imgSrc = this.song.image;
        // Update chosen song
        this.chosenSong = this.song.id;
      }
    },

    // This method creates a masked title from the raw plaintext
    createTitle: async function (rawTitle) {

      let maskedTitle = rawTitle;
      // Iterate through each letter of the raw title, replacing it with an underscore if it's not a space/apostrophe/period
      for (let i of rawTitle) {
        if (i !== ' ' && i !== "'" && i !== '.') {
          maskedTitle = maskedTitle.replace(i, '_');
        }
      }
      // Set the component masked title value to this new string
      this.maskedTitle = maskedTitle;
    },

    // This method runs on every submit and checks the guess against the stored raw title
    checkGuess: function () {
      let self = this;
      // This tracks to see if a single char guess is contained within an already revealed multi-char guess - this shouldn't cost a life
      let charExistsAlready = false;

      // Make the guess and title lowercase for comparison
      let localGuess = self.guess.toLowerCase();
      let localTitle = self.title.toLowerCase();
      let trimmedGuess = localGuess.trim();

      // Input was not empty
      if (trimmedGuess.length !== 0) {

        // Check if already guessed, if so show a message
        if (self.previousGuesses.includes(trimmedGuess)) {
          self.message = `You've already guessed '${trimmedGuess}'`;
          document.getElementById("guess").classList.add("warning");
          self.warningSfx.play();
        }

        // New guess
        else {
          self.message = ``;
          let charFound = false;

          // Guess was 1 char
          if (trimmedGuess.length === 1) {
            let duplicateCharsMasked = 0;
            let duplicateCharsRaw = 0;
            // First check to see if the letter is already discovered in a multi-char guess
            for (let i = 0; i < self.maskedTitle.length; i++) {
              if (self.maskedTitle[i] !== '_') {
                // Char was found in the title and exists already
                if (trimmedGuess.toUpperCase() === self.maskedTitle[i].toUpperCase()) {
                  duplicateCharsMasked++;
                }
              }
            }
            // Now loop through the actual song title, checking how many matches there are against the single char guess
            for (let i of self.song.title) {
              if (trimmedGuess.toUpperCase() === i.toUpperCase()) {
                duplicateCharsRaw++;
              }
            }

            // If only 1 char was already uncovered in the title within a multi-char guess, and this is the only char instance in the song title, no penalty
            if (duplicateCharsMasked === duplicateCharsRaw && (duplicateCharsMasked === 1)) {
              charExistsAlready = true;
            }

            if (charExistsAlready) {
              self.message = `You've already discovered '${trimmedGuess}'`;
              document.getElementById("guess").classList.add("warning");
              self.warningSfx.play();
            }
            else {
              // Iterate through each letter in the title and check it against the guessed char
              for (let i = 0; i < localTitle.length; i++) {

                let updatedTitle = self.maskedTitle;

                // If there's a match in character, replace the underscore with the letter itself
                if (localTitle[i] === trimmedGuess) {
                  charFound = true;
                  // Slicing isolates the character and replaces it will the converted one
                  let newStr = updatedTitle.slice(0, i);

                  // If the character was meant to be uppercase (in the title), make sure it remains so when revealed
                  if (self.title[i] === self.title[i].toUpperCase()) {
                    newStr += localGuess.toUpperCase();
                  }
                  // Not capitalized in raw title, keep it lower
                  else {
                    newStr += localGuess;
                  }
                  newStr += updatedTitle.slice(i + 1, updatedTitle.length);
                  // Update the component's masked title value with this new string
                  self.maskedTitle = newStr;
                  document.getElementById("songName").classList.add("correctFlicker");
                  self.correctSfx.play();
                }
              }
              // If a correct char was not found, the guess is incorrect (not in title)
              if (!charFound) {
                document.getElementById("guess").classList.add("error");
                self.incorrectSfx.play();
              }

            }

            // Add this guess to previous guesses array
            self.previousGuesses.push(trimmedGuess)
          }

          // Longer than 1 char
          if (trimmedGuess.length > 1) {

            // Create a temporary title that will be searched through for substrings, adding their start pos to the list
            let tempTitle = self.title;
            let matchPositionStartList = [];
            // Position variable that starts at 0 and is incremented based on substring start index to ignore previous instances
            let pos = 0;

            // Loop until all substring instances are found
            while (true) {
              // Break if no instance was found
              if (pos === -1) {
                break;
              }
              // If substring is found in remaining string starting at current tracked position
              if (tempTitle.toLowerCase().includes(trimmedGuess, pos)) {
                charFound = true;
                // Push start index to list for later processing and set position to just after previous instance (to skip it)
                matchPositionStartList.push(tempTitle.toLowerCase().indexOf(trimmedGuess, pos));
                pos = tempTitle.toLowerCase().indexOf(trimmedGuess, pos + 1);
              }
              else {
                break;
              }
            }

            // Loop through instances start indices to replace them in the masked title string
            for (let i of matchPositionStartList) {
              let updatedTitle = self.maskedTitle;

              // Save position of substring
              let position = i;

              // Create new string up til substring start (first half of underscores)
              let newStr = updatedTitle.slice(0, position);

              // Loop through guess and append correctly guessed letters
              for (let i = 0; i < trimmedGuess.length; i++) {
                // Check for original capitals - if found, make sure the replaced chars are capitalized
                if (self.title[position + i] === self.title[position + i].toUpperCase()) {
                  newStr += trimmedGuess[i].toUpperCase();
                }
                else {
                  newStr += trimmedGuess[i];
                }
              }

              // Add rest of string (underscores)
              newStr += updatedTitle.slice(position + trimmedGuess.length, updatedTitle.length);

              // // Update the component's masked title value with this new string
              self.maskedTitle = newStr;
              document.getElementById("songName").classList.add("correctFlicker");
              self.correctSfx.play();
            }

            // If a correct char was not found, the guess is incorrect (not in title)
            if (!charFound) {
              document.getElementById("guess").classList.add("error");
              self.incorrectSfx.play();
            }

            // Add this guess to previous guesses array
            self.previousGuesses.push(trimmedGuess)
          }


          /* GAME WIN CONDITION CHECKS */

          // Only subtract a life and reset if the char exists already flag is false -> meaning a valid guess (since repeats never reach this block)
          if (!charExistsAlready) {
            // Subtract a life
            self.lives -= 1;

            // Reset input box
            self.guess = "";
          }

          // Lives are 0, check for win vs. loss
          if (self.lives === 0) {
            // If the full song title has been guessed correctly
            if (self.maskedTitle === self.title) {
              // WIN! Set the song name to green to show success
              this.win();

              self.gameOver = true;
            }
            // Not guessed correctly, game over
            else {
              this.lose();

              self.gameOver = true;
            }
          }
          else {
            // If the full song title has been guessed correctly
            if (self.maskedTitle === self.title) {
              // WIN! Set the song name to green to show success
              this.win();

            }
          }
        }
      }
      // Empty input, add error class
      else {
        document.getElementById("guess").classList.add("error");
        self.incorrectSfx.play();
      }
    },
    // This method sets up conditions for winning (green font, message, etc.)
    win: function () {
      let self = this;
      self.winner = true;
      self.tadaSfx.play();
      // Calculate attempts for message
      let attempts = 7 - self.lives;
      if (attempts === 1) {
        self.message = `Well done! You got it in ${attempts} try!`;
      }
      else {
        self.message = `Well done! You got it in ${attempts} tries!`;
      }
      document.getElementById("songName").classList.add("text-success");
      // Hide input
      document.getElementById("guess").style.display = "none";
      // Replace guess button with replay button
      document.getElementById("submitBtn").style.display = "none";
      document.getElementById("playAgain").style.display = "unset";
      // Show share btn
      document.getElementById("share").style.display = "unset";
      // Setup share modal with score
      self.setShareModal();
    },
    // This method sets up conditions for losing (red font, message, etc.)
    lose: function () {
      let self = this;
      // Set flag, show full title in red to show loss
      self.loser = true;
      self.loseSfx.play();
      self.maskedTitle = self.title;
      // Update message
      self.message = "Game Over! You ran out of guesses.";
      document.getElementById("songName").classList.add("text-danger");
      // Hide input
      document.getElementById("guess").style.display = "none";
      // Replace guess button with replay button
      document.getElementById("submitBtn").style.display = "none";
      document.getElementById("playAgain").style.display = "unset";
      // Show share btn
      document.getElementById("share").style.display = "unset";
      // Setup share modal with score
      self.setShareModal();
    },
    // This method removes the error class from the input field (when a correct letter is entered + on focus)
    removeError: function () {
      document.getElementById("guess").classList.remove("error");
      document.getElementById("songName").classList.remove("correctFlicker");
    },
    // Restart game, re-init values
    restartGame: function () {
      let self = this;
      self.redirect = true;
      this.$router.push('/');
      self.setup();
    },

    // Setup score sharing modal with score and link
    setShareModal: function () {
      let self = this;
      let body = "";
      body += `<strong><p class="lead"> Tunedream - #${self.chosenSong}</p></strong>`;
      // Player had lives left and won, show green circles for guesses remaining and red circles for guesses used
      if (self.lives > 0) {
        body += "\n";
        for (let i = 0; i < self.lives; i++) {
          body += "&#128994;";
        }
        for (let j = 0; j < 7 - self.lives; j++) {
          body += "&#128308;";
        }
      }
      // No lives left and lost, show all red circles
      else {
        body += "\n";
        for (let i = 0; i < 7; i++) {
          body += "&#128308;";
        }
      }
      body += "\n\n";
      body += `<p class="lead mt-5">Think you can do better?\n<br>Try for yourself at <a href="${process.env.VUE_APP_FRONT_URL}/${self.chosenSong}" target="_blank">${process.env.VUE_APP_FRONT_URL}/${self.chosenSong}</p>`;
      // Set inner HTML of the container to this string
      document.getElementById("scoreContainer").innerHTML = body;

      /* TWITTER */
      // Repeat the same process but with Twitter friendly chars
      // let twitterString = "";
      // twitterString += `Tunedream - #${self.chosenSong}\n`;
      // if (self.lives > 0) {
      //   twitterString += "\n";
      //   for (let i = 0; i < self.lives; i++) {
      //     twitterString += "🟢";
      //   }
      //   for (let j = 0; j < 7 - self.lives; j++) {
      //     twitterString += "🔴";
      //   }
      // }
      // No lives left and lost, show all red circles
      // else {
      //   twitterString += "\n";
      //   for (let i = 0; i < 7; i++) {
      //     twitterString += "🔴";
      //   }
      // }
      // twitterString += "\n\n";
      // twitterString += `Think you can do better?\nTry for yourself at http://tunedream.com/${self.chosenSong}`;
      // self.twitterData = twitterString;
    },
    // Copy results to clipboard
    copyClipboard: async function () {
      var copyText = document.getElementById("scoreContainer");

      try {
        // Copy the text inside the text field
        await navigator.clipboard.writeText(copyText.textContent);
        document.getElementById("copyBtn").innerHTML = "Copied!";
      }
      catch(e) {
        console.error("Failed to copy: ", e);
      }
    },
  }
}
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
