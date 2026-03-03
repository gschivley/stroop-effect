// Application State
const appState = {
    currentSlide: 0,
    slides: [
        { name: 'Stroop Effect 1.png', path: 'slides/Stroop Effect 1.png', instruction: 'Recite the ink color' },
        { name: 'Stroop Effect 2.png', path: 'slides/Stroop Effect 2.png', instruction: 'Recite the ink color, ignore the words' },
        { name: 'Stroop Effect 3.png', path: 'slides/Stroop Effect 3.png', instruction: 'Read the word, ignore the ink color' },
        { name: 'Stroop Effect 4.png', path: 'slides/Stroop Effect 4.png', instruction: 'Recite the ink color, ignore the words' }
    ],
    times: [],
    isTimerRunning: false,
    timerStartTime: null,
    timerIntervalId: null
};

// DOM References
const pages = {
    landing: document.getElementById('landing-page'),
    instruction: document.getElementById('instruction-page'),
    slide: document.getElementById('slide-page'),
    break: document.getElementById('break-page'),
    results: document.getElementById('results-page')
};

const elements = {
    slideImage: document.getElementById('slide-image'),
    slideNumber: document.getElementById('slide-number'),
    timer: document.getElementById('timer'),
    instructionStep: document.getElementById('instruction-step'),
    instructionText: document.getElementById('instruction-text'),
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
    
    // Landing → First Instruction
    if (pages.landing.classList.contains('active')) {
        showInstruction(0);
        showPage('instruction');
        return;
    }
    
    // Instruction page → Slide
    if (pages.instruction.classList.contains('active')) {
        displaySlide(appState.currentSlide);
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
    
    // Break page → Next instruction
    if (pages.break.classList.contains('active')) {
        showInstruction(slidesComplete);
        showPage('instruction');
        return;
    }
    
    // Results page → Do nothing on space (button only)
}

function showInstruction(slideIndex) {
    appState.currentSlide = slideIndex;
    const slide = appState.slides[slideIndex];
    elements.instructionStep.textContent = slideIndex + 1;
    elements.instructionText.textContent = slide.instruction;
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
