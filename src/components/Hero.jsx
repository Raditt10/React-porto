import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const Hero = () => {
  const glowRef = useRef(null);
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position untuk glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const section = sectionRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useGSAP(() => {
    gsap.set("#nama", { overflow: "hidden" });
    gsap.set([".hero-subtitle", ".hero-description", ".scroll-text", ".scroll-arrow"], {
      opacity: 0,
      y: 50
    });

    let mm = gsap.matchMedia();

    const createTypewriterLoop = (chars, speed) => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
      
      const cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      cursor.style.cssText = `
        display: inline-block;
        width: 3px;
        height: 1em;
        background: linear-gradient(180deg, #fff 0%, #00fff9 50%, #ff00de 100%);
        margin-left: 2px;
        vertical-align: middle;
        animation: blink 0.7s infinite;
        box-shadow: 0 0 10px rgba(0, 255, 249, 0.5);
      `;
      
      gsap.set(chars, { opacity: 0, y: 25, scale: 0.8, rotateX: -90, transformOrigin: "50% 50%" });
      
      tl.to(chars, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: speed,
        ease: "elastic.out(1, 0.5)",
        stagger: {
          each: speed,
          from: "start",
          onComplete: function() {
            if (Math.random() > 0.7) {
              this.targets()[0].classList.add('glitch-effect');
              setTimeout(() => {
                this.targets()[0].classList.remove('glitch-effect');
              }, 300);
            }
          }
        },
        onStart: function() {
          const namaEl = document.getElementById('nama');
          if (namaEl && !namaEl.querySelector('.typing-cursor')) {
            namaEl.appendChild(cursor);
          }
        },
        onUpdate: function() {
          const visibleChars = Array.from(chars).filter(char => 
            parseFloat(window.getComputedStyle(char).opacity) > 0.5
          );
          if (visibleChars.length > 0) {
            const lastChar = visibleChars[visibleChars.length - 1];
            lastChar.parentNode.insertBefore(cursor, lastChar.nextSibling);
          }
        }
      })
      .to(chars, {
        duration: 0.1,
        textShadow: "2px 0 #ff00de, -2px 0 #00fff9",
        ease: "none"
      })
      .to(chars, {
        duration: 0.1,
        textShadow: "-2px 0 #ff00de, 2px 0 #00fff9",
        ease: "none"
      })
      .to(chars, {
        duration: 0.1,
        textShadow: "0 0 transparent",
        ease: "none"
      })
      .to(chars, {
        y: -5,
        duration: 0.4,
        ease: "sine.inOut",
        stagger: {
          each: 0.03,
          from: "start",
          yoyo: true,
          repeat: 1
        }
      })
      .to({}, { duration: 1.2 })
      .to(chars, {
        duration: 0.15,
        textShadow: "3px 0 #ff00de, -3px 0 #00fff9",
        x: 2,
        ease: "none"
      })
      .to(chars, {
        duration: 0.15,
        textShadow: "-3px 0 #ff00de, 3px 0 #00fff9",
        x: -2,
        ease: "none"
      })
      .to(chars, {
        duration: 0.15,
        textShadow: "0 0 transparent",
        x: 0,
        ease: "none"
      })
      .to(chars, {
        opacity: 0,
        y: -20,
        scale: 0.8,
        rotateX: 90,
        duration: speed * 0.4,
        ease: "power3.in",
        stagger: {
          each: speed * 0.4,
          from: "end"
        },
        onUpdate: function() {
          const visibleChars = Array.from(chars).filter(char => 
            parseFloat(window.getComputedStyle(char).opacity) > 0.5
          );
          if (visibleChars.length > 0) {
            const lastChar = visibleChars[visibleChars.length - 1];
            lastChar.parentNode.insertBefore(cursor, lastChar.nextSibling);
          }
        },
        onComplete: function() {
          if (cursor.parentNode) {
            cursor.parentNode.removeChild(cursor);
          }
        }
      });
      
      return tl;
    };

    mm.add("(min-width: 768px)", () => {
      const mainTl = gsap.timeline();

      mainTl.to(".hero-subtitle", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      })
      .to(".hero-description", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      }, "-=0.8")
      .add(() => {
        const chars = gsap.utils.toArray("#nama .char");
        const typewriterTl = createTypewriterLoop(chars, 0.08);
      }, "-=0.5")
      .to(".scroll-text", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.3")
      .to(".scroll-arrow", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "back.out(1.7)",
      }, "-=0.5");
    });

    mm.add("(max-width: 767px)", () => {
      const mainTl = gsap.timeline();

      mainTl.to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.8 })
        .add(() => {
          const chars = gsap.utils.toArray("#nama .char");
          const typewriterTl = createTypewriterLoop(chars, 0.06);
        }, "-=0.4")
        .to(".hero-description", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(".scroll-text", { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
        .to(".scroll-arrow", { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");
    });

    gsap.to(".scroll-arrow", {
      y: -10,
      duration: 1.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: 3
    });
  }, []);

  const renderNameWithSpans = () => {
    const name = "Rafaditya Syahputra";
    return name.split('').map((char, index) => (
      <span key={index} className="char">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{ fontFamily: "Sora Variable" }}
      className="font-sora flex flex-col items-center relative min-h-screen overflow-hidden"
    >
      {/* Mouse Glow Effect - Enhanced */}
      <div 
        ref={glowRef}
        className="absolute pointer-events-none z-5 transition-opacity duration-300"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '800px',
          height: '800px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(59, 130, 246, 0.15) 30%, transparent 70%)',
          filter: 'blur(60px)',
          opacity: mousePosition.x > 0 ? 1 : 0
        }}
      />

      {/* Floating Particles - Simple Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-500 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              boxShadow: '0 0 10px rgba(139, 92, 246, 0.6)'
            }}
          />
        ))}
      </div>

      {/* Background */}
      <div style={{ width: "100%", height: "600px" }} className="absolute top-0">
        {/* Replace with your DarkVeil component */}
        <div className="w-full h-full bg-gradient-to-b from-black via-purple-900/10 to-black" />
      </div>

      {/* Konten */}
      <div className="relative z-10 mt-[100px] lg:mt-[155px] text-center lg:text-left px-6">
        <h1 className="text-2xl sm:text-3xl hero-subtitle bg-gradient-to-r from-white to-[#999999] bg-clip-text text-transparent">
          Hi, I'm
        </h1>
        <h2
          id="nama"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] text-white font-bold leading-tight"
        >
          {renderNameWithSpans()}
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl hero-description bg-gradient-to-r from-white to-[#999999] bg-clip-text text-transparent mt-4">
          I'm Front-end Dev, UI/UX Designer, Artist <br className="hidden sm:block" /> and
          Photographer. Enjoy my Portfolio 🙌.
        </p>
      </div>

      {/* Tombol GitHub */}
      <div className="w-16 sm:w-15 flex items-center justify-center relative z-25 mt-8 lg:mt-15">
        <a
          href="https://github.com/raditt10"
          className="hover:scale-110 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <img src="/img/github2.jpg" alt="GitHub Logo" className="w-8 h-8" />
          </div>
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="mt-10 lg:mt-20 flex flex-col items-center gap-6 lg:gap-10 relative z-10">
        <h1 className="scroll-text text-xl sm:text-2xl lg:text-3xl bg-gradient-to-r from-white to-[#999999] bg-clip-text text-transparent font-extralight">
          Scroll Down
        </h1>
        <div className="scroll-arrow">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0); 
            opacity: 0; 
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-100vh) translateX(50px); 
            opacity: 0; 
          }
        }

        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        .animate-float {
          animation: float 10s infinite linear;
        }

        .glitch-effect {
          animation: glitch 0.3s linear;
        }

        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
      `}</style>
      
    </section>
  );
};

export default Hero;