import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import ProjectCard from "./assets/ProjectCard";
import { projectsData } from "../../constant";

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const glowRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking untuk glow effect
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="relative min-h-screen py-20 px-4 md:px-8 overflow-hidden bg-black"
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

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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

      {/* Mouse Glow Effect */}
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

      <motion.div 
        className="max-w-7xl mx-auto relative z-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h1 
          ref={titleRef}
          variants={titleVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-white to-[#999999] bg-clip-text text-transparent font-semibold text-center relative z-30 overflow-hidden mb-12 md:mb-20"
        >
          My Projects
        </motion.h1>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-15"
          variants={gridVariants}
        >
          {projectsData.map((data, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02, 
                transition: { duration: 0.2 } 
              }}
              className="relative group"
            >
              {/* Cyberpunk Glow Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"
                style={{
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                  transform: 'scale(1.1)'
                }}
              />
              
              {/* Animated Border */}
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
                <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-cyan-400 animate-pulse" />
                <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-purple-400 animate-pulse" style={{animationDelay: '0.3s'}} />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-purple-400 animate-pulse" style={{animationDelay: '0.6s'}} />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-cyan-400 animate-pulse" style={{animationDelay: '0.9s'}} />
              </div>

              {/* Original ProjectCard dengan wrapper untuk efek tambahan */}
              <div className="relative transform transition-all duration-300 group-hover:border-purple-500/50 rounded-xl overflow-hidden">
                <ProjectCard 
                  gambar={data.gambar} 
                  judul={data.judul} 
                  parag={data.parag} 
                  tech={data.tech} 
                  linkDemo={data.linkDemo} 
                  linkCode={data.linkCode} 
                />
                
                {/* Hover Shine Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom Gradient */}
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
          50% { opacity: 1; }
          90% { opacity: 0.7; }
          100% { 
            transform: translateY(-100vh) translateX(50px); 
            opacity: 0; 
          }
        }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }

        .animate-float {
          animation: float 15s infinite linear;
        }

        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Projects;