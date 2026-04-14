window.addEventListener("load", () => {
  gsap.to("body", {
    opacity: 1,
    duration: 1,
    ease: "power2.out"
  });
  
gsap.registerPlugin(ScrollTrigger);

gsap.from(".wp-block-gallery .wp-block-image", {
  opacity: 0,
  y: 30,
  duration: 0.8,
  stagger: 0.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".wp-block-gallery",
    start: "top 80%"
  }
});
});