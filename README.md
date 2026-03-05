# Stroop Effect Test

An interactive web application to test the **Stroop Effect** - a classic psychology phenomenon that demonstrates the interference between different types of information.

## About the Stroop Effect

The Stroop Effect occurs when the name of a color is spelled in a color that differs from the color it denotes. For example, the word "RED" written in blue ink. When asked to name the color of the word rather than read the word itself, most people find it difficult and take longer to respond, even though the task seems simple.

## How to Use

1. **Start**: Press the SPACE bar to begin the test
2. **Read Colors**: Follow the instructions on each slide to read or name the colors displayed
3. **Complete Each Section**: Press SPACE when you're finished with each section
4. **Take a Break**: After each section, you'll see a congratulations message - press SPACE to continue
5. **View Results**: After completing all 4 sections, your times for each section will be displayed
6. **Try Again**: Click "Start Again" to retake the test

## What You'll See

The test consists of 4 slides (sections), each testing different aspects of the Stroop Effect:

- **Slide 1**: Baseline color reading test
- **Slide 2**: Word reading with color interference
- **Slide 3**: Color naming with word interference (classic Stroop Effect)
- **Slide 4**: Another variation of the interference test

Each section times how long it takes you to complete it. The results show your performance across all sections.

## Deployment

This app is deployed using GitHub Pages and GitHub Actions. Any push to the `main` branch automatically deploys the latest version.

**Live App**: <https://gschivley.github.io/stroop-effect/>

## Technical Details

- **Framework**: Vanilla HTML, CSS, and JavaScript (no dependencies)
- **Timing**: High-resolution timer using `performance.now()`
- **Responsive**: Works on desktop, tablet, and mobile devices
- **Deployment**: GitHub Pages with automated GitHub Actions workflow

## Files

- `index.html` - Main HTML structure
- `styles.css` - All styling and animations
- `app.js` - Application logic and state management
- `slides/` - The 4 Stroop Effect test images
- `.github/workflows/deploy.yml` - Automated deployment workflow

## License

MIT © 2026 Greg Schivley
