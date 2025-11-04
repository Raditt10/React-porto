import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const GlitchText = ({ children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        className="absolute top-0 left-0 z-0"
        style={{
          color: "#ff00de",
          clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
          animation: "glitch-1 0.5s infinite",
        }}
      >
        {children}
      </span>
      <span
        className="absolute top-0 left-0 z-0"
        style={{
          color: "#00fff9",
          clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
          animation: "glitch-2 0.5s infinite",
        }}
      >
        {children}
      </span>
    </div>
  );
};

const CountUpGlitch = ({ from, to, duration = 1000, onComplete }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setCount(Math.floor(from + (to - from) * progress));
      
      if (progress >= 1) {
        clearInterval(timer);
        onComplete?.();
      }
    }, 16);

    return () => clearInterval(timer);
  }, [from, to, duration, onComplete]);

  return (
    <GlitchText className="text-white font-extrabold text-7xl md:text-8xl lg:text-9xl">
      {count.toLocaleString()}
    </GlitchText>
  );
};

const Opening = () => {
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();
  const containerControls = useAnimation();
  const scanlineControls = useAnimation();
  const [showCount, setShowCount] = useState(true);

  useEffect(() => {
    // Add glitch animation styles
    const style = document.createElement("style");
    style.textContent = `
      @keyframes glitch-1 {
        0%, 100% {
          transform: translate(0);
        }
        20% {
          transform: translate(-3px, 3px);
        }
        40% {
          transform: translate(-3px, -3px);
        }
        60% {
          transform: translate(3px, 3px);
        }
        80% {
          transform: translate(3px, -3px);
        }
      }
      
      @keyframes glitch-2 {
        0%, 100% {
          transform: translate(0);
        }
        20% {
          transform: translate(3px, -3px);
        }
        40% {
          transform: translate(3px, 3px);
        }
        60% {
          transform: translate(-3px, -3px);
        }
        80% {
          transform: translate(-3px, 3px);
        }
      }
      
      @keyframes scanline {
        0% {
          top: 0%;
        }
        100% {
          top: 100%;
        }
      }
      
      @keyframes flicker {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.8;
        }
      }
      
      @keyframes rgb-shift {
        0%, 100% {
          text-shadow: 0.05em 0 0 #ff00de, -0.05em -0.025em 0 #00fff9, -0.025em 0.05em 0 #fff;
        }
        14% {
          text-shadow: 0.05em 0 0 #ff00de, -0.05em -0.025em 0 #00fff9, -0.025em 0.05em 0 #fff;
        }
        15% {
          text-shadow: -0.05em -0.025em 0 #ff00de, 0.025em 0.025em 0 #00fff9, -0.05em -0.05em 0 #fff;
        }
        49% {
          text-shadow: -0.05em -0.025em 0 #ff00de, 0.025em 0.025em 0 #00fff9, -0.05em -0.05em 0 #fff;
        }
        50% {
          text-shadow: 0.025em 0.05em 0 #ff00de, 0.05em 0 0 #00fff9, 0 -0.05em 0 #fff;
        }
        99% {
          text-shadow: 0.025em 0.05em 0 #ff00de, 0.05em 0 0 #00fff9, 0 -0.05em 0 #fff;
        }
      }
    `;
    document.head.appendChild(style);

    // Scanline animation
    scanlineControls.start({
      y: ["0%", "100%"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      },
    });

    return () => {
      document.head.removeChild(style);
    };
  }, [scanlineControls]);

  useEffect(() => {
    const sequence = async () => {
      // Count animation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Count exit with glitch
      await controls1.start({
        y: -200,
        opacity: 0,
        scale: 0.8,
        rotateX: 90,
        filter: "blur(10px)",
        transition: { duration: 0.6, ease: "easeIn" },
      });
      setShowCount(false);

      // HI entrance
      await controls2.start({
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: { duration: 0.5, ease: "backOut" },
      });
      
      await new Promise(resolve => setTimeout(resolve, 800));

      // HI exit
      await controls2.start({
        y: -200,
        opacity: 0,
        scale: 0.8,
        rotateX: 90,
        transition: { duration: 0.6 },
      });

      // ENJOY entrance
      await controls3.start({
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: { duration: 0.5, ease: "backOut" },
      });
      
      await new Promise(resolve => setTimeout(resolve, 800));

      // ENJOY exit
      await controls3.start({
        y: -200,
        opacity: 0,
        scale: 0.8,
        rotateX: 90,
        transition: { duration: 0.6 },
      });

      // PRESENT entrance with extra flair
      await controls4.start({
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: { duration: 0.6, ease: "backOut" },
      });

      await new Promise(resolve => setTimeout(resolve, 1500));

      // Final exit - entire screen
      await containerControls.start({
        y: "-100%",
        transition: { duration: 1.2, ease: "easeInOut" },
      });
    };

    sequence();
  }, [controls1, controls2, controls3, controls4, containerControls]);

  return (
    <motion.div
      animate={containerControls}
      style={{ 
        fontFamily: "Sora Variable",
        perspective: "1000px",
      }}
      className="fixed bg-black h-screen w-screen flex flex-col items-center justify-center z-[500] overflow-hidden"
    >
      {/* Noise/Grain Effect */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Scanline Effect */}
      <motion.div
        animate={scanlineControls}
        className="absolute left-0 w-full h-1 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent pointer-events-none"
        style={{ filter: "blur(1px)" }}
      />

      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, transparent 0%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent" />

      {/* Count */}
      {showCount && (
        <motion.div
          animate={controls1}
          initial={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          className="absolute"
        >
          <CountUpGlitch from={0} to={100} duration={1200} />
        </motion.div>
      )}

      {/* HI */}
      <motion.div
        animate={controls2}
        initial={{ opacity: 0, y: 100, scale: 0.8, rotateX: -90 }}
        className="absolute"
      >
        <GlitchText className="text-white font-extrabold text-7xl md:text-8xl lg:text-9xl">
          HELLOWORLD!
        </GlitchText>
      </motion.div>

      {/* ENJOY */}
      <motion.div
        animate={controls3}
        initial={{ opacity: 0, y: 100, scale: 0.8, rotateX: -90 }}
        className="absolute"
      >
        <GlitchText className="text-white font-extrabold text-7xl md:text-8xl lg:text-9xl">
          R'e
        </GlitchText>
      </motion.div>

      {/* PRESENT */}
      <motion.div
        animate={controls4}
        initial={{ opacity: 0, y: 100, scale: 0.8, rotateX: -90 }}
        className="absolute"
      >
        <motion.div
          animate={{
            textShadow: [
              "0.05em 0 0 #ff00de, -0.05em -0.025em 0 #00fff9",
              "-0.05em -0.025em 0 #ff00de, 0.025em 0.025em 0 #00fff9",
              "0.025em 0.05em 0 #ff00de, 0.05em 0 0 #00fff9",
            ],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <GlitchText className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 font-extrabold text-7xl md:text-8xl lg:text-9xl">
            PRESENT
          </GlitchText>
        </motion.div>
      </motion.div>

      {/* Corner Accents */}
      <div className="absolute top-4 left-4 w-20 h-20 border-t-2 border-l-2 border-purple-500/50" />
      <div className="absolute top-4 right-4 w-20 h-20 border-t-2 border-r-2 border-cyan-500/50" />
      <div className="absolute bottom-4 left-4 w-20 h-20 border-b-2 border-l-2 border-cyan-500/50" />
      <div className="absolute bottom-4 right-4 w-20 h-20 border-b-2 border-r-2 border-purple-500/50" />
    </motion.div>
  );
};

export default Opening;