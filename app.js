// Application State
const appState = {
    currentSlide: 0,
    slides: [
        { name: 'Stroop Effect 1.png', path: 'slides/Stroop Effect 1.png' },
        { name: 'Stroop Effect 2.png', path: 'slides/Stroop Effect 2.png' },
        { name: 'Stroop Effect 3.png', path: 'slides/Stroop Effect 3.png' },
        { name: 'Stroop Effect 4.png', path: 'slides/Stroop Effect 4.png' }
    ],
    times: [],
    isTimerRunning: false,
    timerStartTime: null,
    timerIntervalId: null
};

// DOM References
const pages = {
    landing: document.getElementById('landing-page'),
    slide: document.getElementById('slide-page'),
    break: document.getElementById('break-page'),
    results: document.getElementById('results-page')
};

const elements = {
    slideImage: document.getElementById('slide-image'),
    slideNumber: document.getElementById('slide-number'),
    timer: document.getElementById('timer'),
    resultsList: document.getElementById('results-list'),
    restartButton: document.getElementById('restart-button')
};

// Utility Functions
function showPage(pageName) {
    Object.values(pages).forEach(page => page.classList.remove('active'));
    pages[pageName].classList.add('active');
}

function startTimer() {
    if (appState.isTimerRunning) return;
    
    appState.isTimerRunning = true;
    appState.timerStartTime = performance.now();
    
    appState.timerIntervalId = setInterval(() => {
        const elapsed = (performance.now() - appState.timerStartTime) / 1000;
        elements.timer.textContent = elapsed.toFixed(1) + 's';
    }, 100);
}

function stopTimer() {
    if (!appState.isTimerRunning) return;
    
    clearInterval(appState.timerIntervalId);
    appState.isTimerRunning = false;
    
    const finalTime = (performance.now() - appState.timerStartTime) / 1000;
    appState.times.push(finalTime);
    
    return finalTime;
}

function displaySlide(slideIndex) {
    appState.currentSlide = slideIndex;
    const slide = appState.slides[slideIndex];
    elements.slideImage.src = slide.path;
    elements.slideNumber.textContent = `Slide ${slideIndex + 1} of ${appState.slides.length}`;
    elements.timer.textContent = '0.0s';
}

function displayResults() {
    elements.resultsList.innerHTML = '';
    
    appState.times.forEach((time, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.textContent = `Slide ${index + 1}: ${time.toFixed(2)} seconds`;
        elements.resultsList.appendChild(resultItem);
    });
}

function resetApp() {
    appState.currentSlide = 0;
    appState.times = [];
    appState.isTimerRunning = false;
    if (appState.timerIntervalId) {
        clearInterval(appState.timerIntervalId);
    }
    showPage('landing');
}

// State Machine for Page Navigation
function advancePage() {
    const slidesComplete = appState.currentSlide + 1;
    const totalSlides = appState.slides.length;
    
    // Landing → First Slide
    if (pages.landing.classList.contains('active')) {
        displaySlide(0);
        showPage('slide');
        startTimer();
        return;
    }
    
    // On a slide page
    if (pages.slide.classList.contains('active')) {
        stopTimer();
        
        // Check if there are more slides
        if (slidesComplete < totalSlides) {
            showPage('break');
        } else {
            // All slides complete
            displayResults();
            showPage('results');
        }
        return;
    }
    
    // Break page → Next slide
    if (pages.break.classList.contains('active')) {
        displaySlide(slidesComplete);
        showPage('slide');
        startTimer();
        return;
    }
    
    // Results page → Do nothing on space (button only)
}

// Event Listeners
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        advancePage();
    }
});

elements.restartButton.addEventListener('click', () => {
    resetApp();
});

// Initialize
window.addEventListener('load', () => {
    showPage('landing');
});
