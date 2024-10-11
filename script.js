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




window.addEventListener('scroll', function() {
  const scrollFooter = document.querySelector('.scroll-footer');
  const mouseIcon = document.querySelector('.mouse-icon');
  const wheel = document.querySelector('.wheel');

  // Get the page scroll position
  const scrollPos = window.scrollY;

  // Add animation when scrolled a certain distance
  if (scrollPos > 100) {  // Adjust this value based on when you want the animation to start
    mouseIcon.style.animation = "bounce 2s infinite";
    wheel.style.animation = "scroll 2s infinite";
  } else {
    mouseIcon.style.animation = "none";
    wheel.style.animation = "none";
  }
});

// terminL CODE 
document.addEventListener('DOMContentLoaded', function () {
  const terminal = document.getElementById('terminal');
  const cliInput = document.getElementById('cli-input');

  // Commands and their responses
  const commands = {
      help: "Available commands: help, whoami, about, clear",
      whoami: "Aryan Rohit - Developer, MERN Stack Enthusiast",
      about: "I am a passionate MERN stack developer with a keen interest in full-stack development...",
      clear: ''
  };

  // Function to execute commands
  function executeCommand(command) {
      const output = document.createElement('p');
      if (commands[command]) {
          output.textContent = commands[command];
      } else {
          output.textContent = `Command not found: ${command}`;
      }

      // Append output to terminal
      terminal.insertBefore(output, cliInput.parentNode);
      cliInput.value = ''; // Clear the input field

      // Handle clear command
      if (command === 'clear') {
          terminal.innerHTML = ''; // Clear the terminal's content
          terminal.appendChild(cliInput.parentNode); // Re-append the input line
          terminal.style.minHeight = '300px'; // Maintain minimum height after clearing
      }
  }

  // Handle input when Enter is pressed
  cliInput.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
          const command = cliInput.value.trim();
          if (command) {
              const newLine = document.createElement('div');
              newLine.className = 'cli-line';
              newLine.innerHTML = `<span class="cli-prompt">root@Gladiator:~$</span> ${command}`;
              terminal.insertBefore(newLine, cliInput.parentNode);

              executeCommand(command);
          }
      }
  });

  // Adding a blink effect to the cursor
  setInterval(() => {
      const inputLine = document.querySelector('#cli-input');
      inputLine.style.caretColor = inputLine.style.caretColor === 'transparent' ? '#c5c8c6' : 'transparent';
  }, 500);
});
