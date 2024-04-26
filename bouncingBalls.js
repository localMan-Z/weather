gsap.to("svg", { opacity: 1 });

const balls = document.querySelectorAll("#balls > ellipse");
let tl = gsap.timeline();

function fountain() {
  tl.clear().progress(0);
  gsap.set(balls, { scale: "random(0.3, 1)", y: 50, x: 0 });
  tl.to(balls, {
    y: -100,
    stagger: { each: 0.1, repeat: 1, yoyo: true },
    ease: "circ",
  }).to(
    balls,
    { x: "random(-200, 200)", ease: "none", duration: 1, stagger: 0.1 },
    0
  );
  gsap.delayedCall(tl.duration() + 1, fountain);
}
fountain();
