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

