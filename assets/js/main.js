(function (timeInterval) {
  let container = document.querySelector('#carousel');
  let slides = document.querySelectorAll('.slide');
  let controls = document.querySelector('#controls-container');
  let indicatorsContainer = document.querySelector('#indicators-container')
  let indicators = document.querySelectorAll('.indicator')
  let pausePlayBtn = document.querySelector('#pause');
  let prevBtn = document.querySelector('#prev');
  let nextBtn = document.querySelector('#next');
  let currentSlide = 0;
  let isPlaying = true;
  let interval = timeInterval;
  let timerID = null;
  let slidesCount = slides.length;
  let swipeStartX = null;
  let swipeEndX = null;

  const FA_PLAY = 'Play';
  const FA_PAUSE = 'Pause';
  const SPACE = ' ';
  const LEFT_ARROW = 'ArrowLeft';
  const RIGHT_ARROW = 'ArrowRight';

  function goToNth(n) {
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (slidesCount + n) % slidesCount;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
  };

  function goToPrev() {
    goToNth(currentSlide - 1);
  };

  function goToNext() {
    goToNth(currentSlide + 1);
  };

  function pause() {
    if (isPlaying) {
      isPlaying = !isPlaying;


      clearInterval(timerID);
      pausePlayBtn.innerHTML = FA_PLAY;
    } else { }
  }

  function play() {
    isPlaying = !isPlaying;
    pausePlayBtn.innerHTML = FA_PAUSE;
    timerID = setInterval(goToNext, interval);
  }

  function prev() {
    pause();
    goToPrev();
  }

  function next() {
    pause();
    goToNext();
  }

  const pausePlay = () => isPlaying ? pause() : play();

  const indicate = (e) => {
    let target = e.target;

    if (target.classList.contains('indicator')) {
      pause();
      goToNth(+target.getAttribute('data-slide-to'));
    }
  }

  const pressKey = (e) => {
    if (e.key === LEFT_ARROW) prev();
    if (e.key === RIGHT_ARROW) next();
    if (e.key === SPACE) pause();
  }

  const swipeStart = (e) => {
    swipeStartX = e.changedTouches[0].pageX;
  }

  const swipeEnd = (e) => {
    swipeEndX = e.changedTouches[0].pageX;
    swipeStartX - swipeEndX < 100 && next();
    swipeStartX - swipeEndX > -100 && prev();
  }

  const setListeners = () => {
    pausePlayBtn.addEventListener('click', pausePlay);
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    indicatorsContainer.addEventListener('click', indicate);
    document.addEventListener('keydown', pressKey);
    container.addEventListener('touchstart', swipeStart);
    container.addEventListener('touchend', swipeEnd);
  };

  const init = () => {
    controls.style.display = 'block';
    indicatorsContainer.style.display = 'block';
    setListeners();
    timerID = setInterval(goToNext, interval);
  };

  init();

}) (3000);

// repair function to ES6