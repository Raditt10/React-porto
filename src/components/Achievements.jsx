import React, { useEffect, useRef, useState } from 'react'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CertificationCard from './assets/CertificationCard'
import { dataCerti } from '../../constant'
// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import CompetitionCard from './assets/CompetitionCard';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const sectionRef = useRef(null);
  const mainTitleRef = useRef(null);
  const competitionTitleRef = useRef(null);
  const competitionCardRef = useRef(null);
  const certificationTitleRef = useRef(null);
  const swiperRef = useRef(null);
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

  useEffect(() => {
    const section = sectionRef.current;
    const mainTitle = mainTitleRef.current;
    const competitionTitle = competitionTitleRef.current;
    const competitionCard = competitionCardRef.current;
    const certificationTitle = certificationTitleRef.current;
    const swiper = swiperRef.current;

    // Set initial states
    gsap.set(mainTitle, { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    });
    
    gsap.set(competitionTitle, { 
      opacity: 0, 
      x: -50 
    });

    gsap.set(competitionCard, { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    });

    gsap.set(certificationTitle, { 
      opacity: 0, 
      x: -50 
    });

    gsap.set(swiper, { 
      opacity: 0, 
      y: 50 
    });

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 30%",
        toggleActions: "play none none reverse"
      }
    });

    // Animate main title
    tl.to(mainTitle, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power3.out"
    })
    // Animate competition section
    .to(competitionTitle, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.3")
    .to(competitionCard, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.2)"
    }, "-=0.4")
    // Animate certification section
    .to(certificationTitle, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.2")
    .to(swiper, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4");

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id='achievements'
      ref={sectionRef}
      className="relative min-h-screen py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-28 overflow-hidden bg-black" 
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

      <div className="max-w-7xl mx-auto relative z-20">
        <h1 
          ref={mainTitleRef}
          className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-white to-[#999999] bg-clip-text text-transparent font-semibold text-center relative z-30 overflow-hidden mb-12 sm:mb-16 md:mb-20'
        >
          Achievements
        </h1>
        
        {/* Competition Section */}
        <div className="mb-16 sm:mb-20 md:mb-24">
          <h2 
            ref={competitionTitleRef}
            className='text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 md:mb-10'
          >
            Competition
          </h2>
          <div 
            ref={competitionCardRef}
            className='flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-10'
          >
            {/* Wrapper untuk CompetitionCard dengan efek cyberpunk */}
            <div className="relative group">
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

              {/* Original CompetitionCard dengan wrapper untuk efek tambahan */}
              <div className="relative transform transition-all duration-300 group-hover:border-purple-500/50 rounded-xl overflow-hidden">
                <CompetitionCard />
                
                {/* Hover Shine Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Certification Section with Swiper */}
        <div>
          <h2 
            ref={certificationTitleRef}
            className='text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8 md:mb-10'
          >
            Certification
          </h2>
          
          <div 
            ref={swiperRef}
            className="flex justify-center items-center relative"
          >
            {/* Cyberpunk border untuk swiper container */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-600 overflow-hidden pointer-events-none">
              <div 
                className="absolute inset-[-2px] rounded-2xl opacity-50"
                style={{
                  backgroundImage: `
                    linear-gradient(90deg, transparent 95%, #8b5cf6 100%),
                    linear-gradient(180deg, transparent 95%, #06b6d4 100%)
                  `,
                  backgroundSize: '30px 30px',
                  animation: 'gridMove 3s linear infinite'
                }}
              />
            </div>

            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              centeredSlides={true}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{ 
                clickable: true,
                dynamicBullets: true 
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 25,
                  centeredSlides: false,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                  centeredSlides: false,
                }
              }}
              className='my-6 sm:my-8 md:my-10 w-full max-w-6xl relative z-20'
              style={{
                '--swiper-navigation-color': '#8b5cf6',
                '--swiper-pagination-color': '#8b5cf6',
                '--swiper-pagination-bullet-inactive-color': '#4b5563',
                '--swiper-pagination-bullet-inactive-opacity': '0.5',
              }}
            >
              {dataCerti.map((d, index) => (
                <SwiperSlide key={index} className="flex justify-center items-center pb-12">
                  <div className="flex justify-center items-center w-full h-full">
                    {/* Wrapper untuk CertificationCard dengan efek cyberpunk */}
                    <div className="relative group w-full">
                      {/* Cyberpunk Glow Effect */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl"
                        style={{
                          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
                          filter: 'blur(15px)',
                          transform: 'scale(1.05)'
                        }}
                      />
                      
                      {/* Animated Border untuk Certification Card */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-600 overflow-hidden">
                        <div 
                          className="absolute inset-[-1px] rounded-xl opacity-60"
                          style={{
                            backgroundImage: `
                              linear-gradient(90deg, transparent 95%, #8b5cf6 100%),
                              linear-gradient(180deg, transparent 95%, #06b6d4 100%)
                            `,
                            backgroundSize: '15px 15px',
                            animation: 'gridMove 2s linear infinite'
                          }}
                        />
                      </div>

                      <div className="relative transform transition-all duration-300 group-hover:scale-105">
                        <CertificationCard 
                          gambar={d.gambar} 
                          judul={d.judul} 
                          link={d.link} 
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

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

        /* Custom Swiper Styles */
        .swiper-button-next,
        .swiper-button-prev {
          color: #8b5cf6 !important;
          background: rgba(139, 92, 246, 0.1) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(139, 92, 246, 0.3) !important;
          border-radius: 50% !important;
          width: 50px !important;
          height: 50px !important;
          margin-top: -25px !important;
          transition: all 0.3s ease !important;
        }
        
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(139, 92, 246, 0.2) !important;
          border-color: rgba(139, 92, 246, 0.6) !important;
          transform: scale(1.1);
        }
        
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px !important;
          font-weight: bold;
        }
        
        .swiper-pagination-bullet {
          background: rgba(139, 92, 246, 0.5) !important;
          opacity: 0.7 !important;
          width: 12px !important;
          height: 12px !important;
          transition: all 0.3s ease !important;
        }
        
        .swiper-pagination-bullet-active {
          background: #8b5cf6 !important;
          opacity: 1 !important;
          transform: scale(1.2);
        }
        
        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            width: 40px !important;
            height: 40px !important;
            margin-top: -20px !important;
          }
          
          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 16px !important;
          }
        }
        
        @media (max-width: 640px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}

export default Achievements