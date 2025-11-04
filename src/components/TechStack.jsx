import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { techstack } from "../../constant";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const TechStack = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const itemsRef = useRef([]);
  const glowRef = useRef(null);
  const [hoveredTech, setHoveredTech] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;
    const items = itemsRef.current;

    // Set initial states
    gsap.set(title, { 
      opacity: 0, 
      y: 100,
      scale: 0.8,
      rotationX: 45
    });
    
    gsap.set(grid, { 
      opacity: 0, 
      y: 50 
    });

    gsap.set(items, { 
      opacity: 0, 
      scale: 0,
      y: 50,
      rotation: 180
    });

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Title animation
    tl.to(title, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotationX: 0,
      duration: 1.2,
      ease: "power4.out"
    })
    // Grid animation
    .to(grid, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6")
    // Items animation
    .to(items, {
      opacity: 1,
      scale: 1,
      y: 0,
      rotation: 0,
      duration: 0.8,
      stagger: {
        amount: 1.2,
        from: "random",
        grid: "auto"
      },
      ease: "elastic.out(1, 0.5)"
    }, "-=0.4");

    // Parallax effect
    gsap.to(items, {
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      },
      y: (i) => (i % 2 === 0 ? -30 : 30),
      ease: "none"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Mouse tracking untuk glow effect yang konsisten
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

  // Add items to refs array
  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  // Improved hover effect dengan glow yang konsisten
  const handleTechHover = (tech, e, index) => {
    setHoveredTech(tech);
    
    const item = itemsRef.current[index];
    if (item) {
      gsap.to(item, {
        scale: 1.2,
        z: 50,
        rotationY: 10,
        rotationX: -10,
        duration: 0.3,
        ease: "power2.out"
      });

      // Enhanced glow effect pada item yang dihover
      gsap.to(item.querySelector('.tech-glow'), {
        opacity: 1,
        scale: 1.2,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleTechLeave = (index) => {
    setHoveredTech(null);
    
    const item = itemsRef.current[index];
    if (item) {
      gsap.to(item, {
        scale: 1,
        z: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 0.4,
        ease: "power2.out"
      });

      // Reset glow effect
      gsap.to(item.querySelector('.tech-glow'), {
        opacity: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen px-4 md:px-8 lg:px-16 py-20 overflow-hidden bg-black" 
      style={{ fontFamily: "Sora Variable" }}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite'
          }}
        />
      </div>

      {/* Mouse Glow Effect - SAMA dengan About section */}
      <div 
        ref={glowRef}
        className="absolute pointer-events-none z-10 transition-opacity duration-300"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '600px',
          height: '600px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 30%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: mousePosition.x > 0 ? 1 : 0
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-500 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Title Section */}
      <div className="relative z-20">
        <h1 
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-white to-[#999999] bg-clip-text text-transparent font-semibold text-center relative z-30 overflow-hidden mb-12 sm:mb-16 md:mb-20"
          style={{
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 80px rgba(139, 92, 246, 0.5)',
            fontWeight: 700,
            letterSpacing: '0.05em'
          }}
        >
          Tech Stack
        </h1>
      </div>
      <div 
        ref={gridRef}
        className="relative z-20 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-4 sm:gap-6 md:gap-8 mt-16 sm:mt-20 md:mt-24 items-center justify-center max-w-7xl mx-auto"
        style={{ perspective: '1000px' }}
      >
        {techstack.map((tech, index) => (
          <div
            key={tech.id}
            ref={addToRefs}
            onMouseEnter={(e) => handleTechHover(tech, e, index)}
            onMouseLeave={() => handleTechLeave(index)}
            className="relative group cursor-pointer"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Glow Background - Efek yang sama dengan About */}
            <div 
              className="absolute inset-0 tech-glow opacity-0 transition-all duration-300 rounded-2xl"
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
                filter: 'blur(20px)',
                transform: 'scale(1)'
              }}
            />
            
            {/* Card Container */}
            <div className="relative flex items-center justify-center p-3 sm:p-4 md:p-5 bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 group-hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
              
              {/* Hover Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
             {/* Animated Border - Version 4: Cyberpunk Grid */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-600 overflow-hidden">
                {/* Grid Pattern */}
                <div 
                  className="absolute inset-[-2px] rounded-xl opacity-70"
                  style={{
                    backgroundImage: `
                      linear-gradient(90deg, transparent 95%, #8b5cf6 100%),
                      linear-gradient(180deg, transparent 95%, #06b6d4 100%)
                    `,
                    backgroundSize: '20px 20px',
                    animation: 'gridMove 2s linear infinite'
                  }}
                />
                
                {/* Scanning Line */}
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan rounded-full" />
                
                {/* Pulsing Corner Brackets */}
                <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-cyan-400 animate-pulse" />
                <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-purple-400 animate-pulse" style={{animationDelay: '0.3s'}} />
                <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-purple-400 animate-pulse" style={{animationDelay: '0.6s'}} />
                <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-cyan-400 animate-pulse" style={{animationDelay: '0.9s'}} />
              </div>

              {/* Tech Icon */}
              <div className="relative z-10 p-2">
                <img 
                  src={"/img/" + tech.src} 
                  alt={`${tech.name || 'Tech'} Stack`}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain transition-all duration-300 group-hover:brightness-125 group-hover:scale-110"
                  style={{
                    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
                  }}
                />
              </div>

              {/* Hover Tooltip */}
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900/90 border border-purple-500/30 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-30 backdrop-blur-sm">
                <p className="text-white text-xs font-medium">{tech.name}</p>
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900/90 border-t border-l border-purple-500/30 rotate-45" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Gradient - SAMA dengan About section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-10"></div>
      
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0); 
            opacity: 0; 
          }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { 
            transform: translateY(-100vh) translateX(50px); 
            opacity: 0; 
          }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-float {
          animation: float 15s infinite linear;
        }

        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default TechStack;