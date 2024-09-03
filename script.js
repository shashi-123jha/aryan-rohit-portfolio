console.clear();

gsap.registerPlugin(ScrollTrigger);

const slides = gsap.utils.toArray(".slide");
const amount = slides.length;
gsap.set(slides, { yPercent: (i) => (i ? 100 : 0) });



const tl = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".wrapper",
      start: "top top",
      end: "+=" + amount * 100 + "%",
      scrub: true,
      pin: true,
      markers: false
    }
  })
  .to({}, { duration: 0.01 });

slides.forEach((slide, i) => {
  if (i) {
    tl.call(() => updateTexts(i)).to(slide, { yPercent: 0 });
  }
});

tl.call(() => updateTexts(amount)).to({}, { duration: 0.01 });


document.getElementById('command-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const input = event.target.value.trim();
        const outputElement = document.getElementById('output');

        if (input.toLowerCase() === 'help') {
            outputElement.innerHTML += `<div>Available commands: help, clear, echo [text]</div>`;
        } else if (input.toLowerCase() === 'clear') {
            outputElement.innerHTML = '';
        } else if (input.toLowerCase().startsWith('echo ')) {
            outputElement.innerHTML += `<div>${input.slice(5)}</div>`;
         } else if (input.toLowerCase() === 'date') {
            const currentDate = new Date().toLocaleString();
            outputElement.innerHTML += `<div>${currentDate}</div>`;
        }
        
        else {
            outputElement.innerHTML += `<div>Command not found: ${input}</div>`;
        }

        // Clear the input and scroll to the bottom of the terminal
        event.target.value = '';
        document.getElementById('terminal').scrollTop = document.getElementById('terminal').scrollHeight;
    }
});