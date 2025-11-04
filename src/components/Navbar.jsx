import React, { useState, useEffect } from 'react'
import { navlinks } from '../../constant'

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <>
      {/* Desktop Navbar dengan efek cyberpunk */}
      <nav className={`hidden md:flex justify-around font-sora font-semibold text-white items-center h-20 transition-all duration-500 fixed z-50 w-full px-8 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-cyan-500/30 shadow-2xl shadow-cyan-500/20' 
          : 'bg-transparent'
      }`}>
        {/* Animated Border Effect */}
        <div className="absolute inset-0 overflow-hidden rounded-b-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-pulse" />
          {/* Scanning Line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
        </div>

        <div className="relative z-10">
          <h1 className='text-2xl glitch-text' data-text="R'e">
            R'e
            {/* Glitch Effect Layers */}
            <span className="glitch-layer glitch-layer-1">R'e</span>
            <span className="glitch-layer glitch-layer-2">R'e</span>
          </h1>
        </div>
        
        <div className="relative z-10">
          <ul className='flex gap-12'>
            {navlinks.map((navlink) => (
              <li key={navlink.id} className="relative group">
                <a 
                  href={navlink.link}
                  className='relative text-lg hover:text-cyan-400 transition-all duration-300 glitch-link py-2 px-4'
                  data-text={navlink.text}
                >
                  {navlink.text}
                  {/* Hover Border Effect */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-500"></span>
                  {/* Cyberpunk Corner Brackets */}
                  <span className="absolute -top-1 -left-1 w-2 h-2 border-l border-t border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="absolute -top-1 -right-1 w-2 h-2 border-r border-t border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="absolute -bottom-1 -left-1 w-2 h-2 border-l border-b border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="absolute -bottom-1 -right-1 w-2 h-2 border-r border-b border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* RGB Split Effect on Hover */}
        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute top-0 left-0 w-20 h-20 bg-cyan-400/10 blur-xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-purple-400/10 blur-xl" />
        </div>
      </nav>

      {/* Mobile Header dengan efek cyberpunk */}
      <header className={`md:hidden flex justify-between items-center h-20 transition-all duration-500 fixed z-50 w-full px-6 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-cyan-500/30 shadow-2xl shadow-cyan-500/20' 
          : 'bg-transparent'
      }`}>
        {/* Animated Border Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-pulse" />
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
        </div>

        <div className="relative z-10">
          <h1 className='text-xl font-sora font-semibold text-white glitch-text' data-text="Rafaditya .S">
            Rafaditya .S
            <span className="glitch-layer glitch-layer-1">Rafaditya .S</span>
            <span className="glitch-layer glitch-layer-2">Rafaditya .S</span>
          </h1>
        </div>
        
        <button
          onClick={toggleSidebar}
          className='relative z-10 text-white p-3 hover:bg-cyan-500/20 rounded-lg transition-all duration-300 group border border-cyan-500/30'
          aria-label='Toggle menu'
        >
          {/* Animated Hamburger Icon */}
          <div className="relative w-6 h-6">
            <span className={`absolute left-0 w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${
              isSidebarOpen ? 'rotate-45 top-3' : 'top-1'
            }`} />
            <span className={`absolute left-0 w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${
              isSidebarOpen ? 'opacity-0' : 'top-3'
            }`} />
            <span className={`absolute left-0 w-6 h-0.5 bg-cyan-400 transition-all duration-300 ${
              isSidebarOpen ? '-rotate-45 top-3' : 'top-5'
            }`} />
          </div>
          
          {/* Button Glow Effect */}
          <div className="absolute inset-0 bg-cyan-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className='md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40'
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar dengan efek cyberpunk */}
      <aside
        className={`md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-black/95 backdrop-blur-xl border-l border-cyan-500/30 shadow-2xl shadow-cyan-500/20 z-50 transform transition-transform duration-500 ease-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Animated Border Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-20 h-20 bg-cyan-400/10 blur-xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-purple-400/10 blur-xl animate-pulse" style={{animationDelay: '1s'}} />
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(90deg, transparent 95%, #06b6d4 100%),
                linear-gradient(180deg, transparent 95%, #8b5cf6 100%)
              `,
              backgroundSize: '20px 20px'
            }}
          />
        </div>

        <div className='flex justify-between items-center p-6 border-b border-cyan-500/30 relative z-10'>
          <h1 className='text-xl font-sora font-semibold text-white glitch-text' data-text="Rafaditya .S">
            Rafaditya .S
            <span className="glitch-layer glitch-layer-1">Rafaditya .S</span>
            <span className="glitch-layer glitch-layer-2">Rafaditya .S</span>
          </h1>
          <button
            onClick={closeSidebar}
            className='text-white p-2 hover:bg-cyan-500/20 rounded-lg transition-all duration-300 group border border-cyan-500/30'
            aria-label='Close menu'
          >
            <div className="relative w-6 h-6">
              <span className="absolute left-0 top-3 w-6 h-0.5 bg-cyan-400 rotate-45" />
              <span className="absolute left-0 top-3 w-6 h-0.5 bg-cyan-400 -rotate-45" />
            </div>
            <div className="absolute inset-0 bg-cyan-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          </button>
        </div>
        
        <nav className='p-6 relative z-10'>
          <ul className='space-y-3'>
            {navlinks.map((navlink) => (
              <li key={navlink.id} className="group">
                <a
                  href={navlink.link}
                  onClick={closeSidebar}
                  className='block text-white font-sora font-semibold text-lg py-4 px-6 rounded-lg hover:bg-cyan-500/20 transition-all duration-300 relative overflow-hidden border border-transparent hover:border-cyan-500/30 glitch-link'
                  data-text={navlink.text}
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-cyan-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                  
                  {/* Content */}
                  <span className="relative z-10">{navlink.text}</span>
                  
                  {/* Cyberpunk Corner Brackets */}
                  <span className="absolute top-2 left-2 w-2 h-2 border-l border-t border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-2 right-2 w-2 h-2 border-r border-t border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Scanning Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 animate-scan" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
      </aside>

      {/* Global Styles untuk efek cyberpunk */}
      <style jsx>{`
        .glitch-text {
          position: relative;
          display: inline-block;
          color: #ffffff;
          text-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }

        .glitch-text::before {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: -2px;
          width: 100%;
          height: 100%;
          color: #06b6d4;
          background: transparent;
          clip: rect(0, 900px, 0, 0);
          animation: glitch-1 3s infinite linear alternate-reverse;
        }

        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 2px;
          width: 100%;
          height: 100%;
          color: #8b5cf6;
          background: transparent;
          clip: rect(0, 900px, 0, 0);
          animation: glitch-2 2s infinite linear alternate-reverse;
        }

        .glitch-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }

        .glitch-layer-1 {
          color: #06b6d4;
          animation: glitch-3 4s infinite linear alternate-reverse;
          z-index: -1;
        }

        .glitch-layer-2 {
          color: #8b5cf6;
          animation: glitch-4 5s infinite linear alternate-reverse;
          z-index: -2;
        }

        .glitch-link {
          position: relative;
          overflow: hidden;
        }

        .glitch-link:hover::before {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: -1px;
          width: 100%;
          height: 100%;
          color: #06b6d4;
          animation: link-glitch-1 0.3s linear;
        }

        .glitch-link:hover::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 1px;
          width: 100%;
          height: 100%;
          color: #8b5cf6;
          animation: link-glitch-2 0.3s linear;
        }

        @keyframes glitch-1 {
          0% { clip: rect(20px, 9999px, 25px, 0); }
          5% { clip: rect(15px, 9999px, 30px, 0); }
          10% { clip: rect(40px, 9999px, 35px, 0); }
          15% { clip: rect(10px, 9999px, 40px, 0); }
          20% { clip: rect(30px, 9999px, 45px, 0); }
          25% { clip: rect(25px, 9999px, 50px, 0); }
          30% { clip: rect(45px, 9999px, 55px, 0); }
          35% { clip: rect(15px, 9999px, 60px, 0); }
          40% { clip: rect(35px, 9999px, 65px, 0); }
          45% { clip: rect(20px, 9999px, 70px, 0); }
          50% { clip: rect(40px, 9999px, 75px, 0); }
          55% { clip: rect(25px, 9999px, 80px, 0); }
          60% { clip: rect(45px, 9999px, 85px, 0); }
          65% { clip: rect(30px, 9999px, 90px, 0); }
          70% { clip: rect(50px, 9999px, 95px, 0); }
          75% { clip: rect(35px, 9999px, 100px, 0); }
          80% { clip: rect(55px, 9999px, 105px, 0); }
          85% { clip: rect(40px, 9999px, 110px, 0); }
          90% { clip: rect(60px, 9999px, 115px, 0); }
          95% { clip: rect(45px, 9999px, 120px, 0); }
          100% { clip: rect(65px, 9999px, 125px, 0); }
        }

        @keyframes glitch-2 {
          0% { clip: rect(65px, 9999px, 125px, 0); }
          5% { clip: rect(45px, 9999px, 120px, 0); }
          10% { clip: rect(60px, 9999px, 115px, 0); }
          15% { clip: rect(40px, 9999px, 110px, 0); }
          20% { clip: rect(55px, 9999px, 105px, 0); }
          25% { clip: rect(35px, 9999px, 100px, 0); }
          30% { clip: rect(50px, 9999px, 95px, 0); }
          35% { clip: rect(30px, 9999px, 90px, 0); }
          40% { clip: rect(45px, 9999px, 85px, 0); }
          45% { clip: rect(25px, 9999px, 80px, 0); }
          50% { clip: rect(40px, 9999px, 75px, 0); }
          55% { clip: rect(20px, 9999px, 70px, 0); }
          60% { clip: rect(35px, 9999px, 65px, 0); }
          65% { clip: rect(15px, 9999px, 60px, 0); }
          70% { clip: rect(30px, 9999px, 55px, 0); }
          75% { clip: rect(10px, 9999px, 50px, 0); }
          80% { clip: rect(25px, 9999px, 45px, 0); }
          85% { clip: rect(5px, 9999px, 40px, 0); }
          90% { clip: rect(20px, 9999px, 35px, 0); }
          95% { clip: rect(0px, 9999px, 30px, 0); }
          100% { clip: rect(15px, 9999px, 25px, 0); }
        }

        @keyframes glitch-3 {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        @keyframes glitch-4 {
          0% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(-2px, 2px); }
          100% { transform: translate(0); }
        }

        @keyframes link-glitch-1 {
          0% { transform: translate(0); clip: rect(0, 0, 0, 0); }
          10% { transform: translate(-1px, 1px); clip: rect(0, 500px, 10px, 0); }
          20% { transform: translate(1px, -1px); clip: rect(0, 500px, 20px, 0); }
          30% { transform: translate(-1px, -1px); clip: rect(0, 500px, 30px, 0); }
          40% { transform: translate(1px, 1px); clip: rect(0, 500px, 40px, 0); }
          50% { transform: translate(-1px, 1px); clip: rect(0, 500px, 50px, 0); }
          60% { transform: translate(1px, -1px); clip: rect(0, 500px, 60px, 0); }
          70% { transform: translate(-1px, -1px); clip: rect(0, 500px, 70px, 0); }
          80% { transform: translate(1px, 1px); clip: rect(0, 500px, 80px, 0); }
          90% { transform: translate(-1px, 1px); clip: rect(0, 500px, 90px, 0); }
          100% { transform: translate(0); clip: rect(0, 0, 0, 0); }
        }

        @keyframes link-glitch-2 {
          0% { transform: translate(0); clip: rect(0, 0, 0, 0); }
          10% { transform: translate(1px, -1px); clip: rect(10px, 500px, 20px, 0); }
          20% { transform: translate(-1px, 1px); clip: rect(20px, 500px, 30px, 0); }
          30% { transform: translate(1px, 1px); clip: rect(30px, 500px, 40px, 0); }
          40% { transform: translate(-1px, -1px); clip: rect(40px, 500px, 50px, 0); }
          50% { transform: translate(1px, -1px); clip: rect(50px, 500px, 60px, 0); }
          60% { transform: translate(-1px, 1px); clip: rect(60px, 500px, 70px, 0); }
          70% { transform: translate(1px, 1px); clip: rect(70px, 500px, 80px, 0); }
          80% { transform: translate(-1px, -1px); clip: rect(80px, 500px, 90px, 0); }
          90% { transform: translate(1px, -1px); clip: rect(90px, 500px, 100px, 0); }
          100% { transform: translate(0); clip: rect(0, 0, 0, 0); }
        }

        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }

        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </>
  )
}

export default Navbar