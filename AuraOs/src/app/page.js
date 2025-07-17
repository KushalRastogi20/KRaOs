"use client"
import React, { useState, useEffect } from 'react';
import { ChevronRight, Monitor, Zap, Shield, Brain, Globe, ArrowRight, Cpu, Lock, Layers } from 'lucide-react';

const AuraOSLanding = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    setIsLoaded(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Brain className="w-7 h-7" />,
      title: "Neural Processing Engine",
      description: "Advanced AI algorithms optimize every interaction and predict user needs with machine learning precision."
    },
    {
      icon: <Cpu className="w-7 h-7" />,
      title: "Quantum Computing Ready",
      description: "Built on next-generation architecture to leverage quantum computing capabilities for unprecedented performance."
    },
    {
      icon: <Lock className="w-7 h-7" />,
      title: "Zero-Trust Security",
      description: "Military-grade encryption with blockchain-verified authentication ensures enterprise-level data protection."
    },
    {
      icon: <Layers className="w-7 h-7" />,
      title: "Infinite Workspaces",
      description: "Seamlessly manage unlimited virtual environments with intelligent resource allocation and instant switching."
    },
    {
      icon: <Globe className="w-7 h-7" />,
      title: "Universal Protocol Support",
      description: "Native compatibility with all web standards, legacy systems, and emerging decentralized technologies."
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Real-Time Rendering",
      description: "Sub-millisecond response times with predictive caching and distributed computing architecture."
    }
  ];

  const stats = [
    { value: "99.9%", label: "Uptime Guarantee" },
    { value: "50ms", label: "Average Response" },
    { value: "256-bit", label: "Encryption Standard" },
    { value: "∞", label: "Concurrent Users" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 text-gray-900 overflow-hidden relative">
      {/* Sophisticated Light Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/98 via-gray-100/95 to-slate-200/98"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-radial from-purple-300/30 via-purple-200/15 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-rose-300/30 via-rose-200/15 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-gradient-radial from-amber-300/25 via-amber-200/12 to-transparent rounded-full blur-3xl"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20"></div>
      </div>

      {/* Light Professional Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollY > 50 ? 'bg-white/80 backdrop-blur-2xl border-b border-purple-200/50 shadow-lg shadow-purple-100/20' : 'bg-white/60 backdrop-blur-xl'
      }`}>
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <Monitor className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500 bg-clip-text text-transparent tracking-tight">
                  AuraOS
                </h1>
                <p className="text-xs text-gray-500 font-medium tracking-wider">AI BROWSER OS</p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-12">
              <a href="#platform" className="text-gray-600 hover:text-purple-700 transition-colors duration-300 font-medium tracking-wide">Platform</a>
              <a href="#enterprise" className="text-gray-600 hover:text-purple-700 transition-colors duration-300 font-medium tracking-wide">Enterprise</a>
              <a href="#security" className="text-gray-600 hover:text-purple-700 transition-colors duration-300 font-medium tracking-wide">Security</a>
              <a href="#docs" className="text-gray-600 hover:text-purple-700 transition-colors duration-300 font-medium tracking-wide">Documentation</a>
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium px-6 py-3 rounded-xl hover:bg-gray-100">
                  Sign In
                </button>
                <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-xl font-bold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-600/40">
                  Get Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-8 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`transform transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-100 to-rose-100 border border-purple-200 rounded-2xl px-6 py-4 mb-12">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-purple-800 tracking-wide">ENTERPRISE AI OPERATING SYSTEM</span>
              </div>
              
              <h1 className="text-7xl lg:text-8xl font-black mb-8 leading-none">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                  AuraOS
                </span>
              </h1>
              
              <p className="text-2xl text-gray-600 mb-12 leading-relaxed font-light max-w-2xl">
                The world's first AI-powered browser operating system. Engineered for enterprises that demand unprecedented performance, security, and scalability.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-8">
                <button className="group relative bg-gradient-to-r from-purple-600 to-purple-700 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-xl shadow-purple-500/30 hover:shadow-purple-600/40 transform hover:scale-105">
                  <span className="flex items-center space-x-3">
                    <Monitor className="w-6 h-6" />
                    <span>Launch Desktop</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                <button className="group bg-white/80 backdrop-blur-sm border border-purple-200 text-purple-700 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:border-purple-300 transition-all duration-300 shadow-lg">
                  <span className="flex items-center space-x-3">
                    <Brain className="w-6 h-6" />
                    <span>View Demo</span>
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
            
            {/* Hero Visual */}
            <div className={`relative transform transition-all duration-1000 delay-300 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200/40 to-rose-200/40 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/80 backdrop-blur-2xl rounded-3xl border border-purple-200/50 shadow-2xl shadow-purple-500/20 p-8">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 backdrop-blur-sm border border-gray-200/50">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center space-x-4">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-xs text-gray-500 font-mono">AuraOS://desktop</div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <Brain className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="h-3 bg-gradient-to-r from-purple-300 to-purple-100 rounded-full mb-2"></div>
                          <div className="h-2 bg-gradient-to-r from-purple-200 to-purple-50 rounded-full w-3/4"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center">
                          <Cpu className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="h-3 bg-gradient-to-r from-rose-300 to-rose-100 rounded-full mb-2"></div>
                          <div className="h-2 bg-gradient-to-r from-rose-200 to-rose-50 rounded-full w-2/3"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
                          <Lock className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="h-3 bg-gradient-to-r from-amber-300 to-amber-100 rounded-full mb-2"></div>
                          <div className="h-2 bg-gradient-to-r from-amber-200 to-amber-50 rounded-full w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-purple-700 to-purple-600 bg-clip-text text-transparent mb-4">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium tracking-wider text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="platform" className="relative z-10 py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              Enterprise-Grade Architecture
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Built from the ground up for organizations that require uncompromising performance, security, and scalability in their computing infrastructure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 border border-gray-200/50 hover:border-purple-300/50 transition-all duration-500 hover:transform hover:scale-105 shadow-xl hover:shadow-purple-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-rose-50/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative">
                  <div className="text-purple-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 group-hover:text-purple-900 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/60 to-rose-100/60 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/90 backdrop-blur-2xl rounded-3xl border border-purple-200/50 shadow-2xl shadow-purple-500/20 p-16 text-center">
              <h2 className="text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                Ready for the Future?
              </h2>
              <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join leading enterprises worldwide who trust AuraOS to power their most critical computing infrastructure. Experience the next generation of operating systems.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
                <button className="group bg-gradient-to-r from-purple-600 to-purple-700 text-white px-12 py-6 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-xl shadow-purple-500/30 hover:shadow-purple-600/40 transform hover:scale-105">
                  <span className="flex items-center space-x-3">
                    <Monitor className="w-6 h-6" />
                    <span>Request Enterprise Demo</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button className="group bg-white/80 backdrop-blur-sm border border-purple-200 text-purple-700 px-12 py-6 rounded-2xl font-bold text-lg hover:bg-white hover:border-purple-300 transition-all duration-300 shadow-lg">
                  <span className="flex items-center space-x-3">
                    <span>Download Whitepaper</span>
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-8 lg:mb-0">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center">
                <Monitor className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-600 bg-clip-text text-transparent">
                  AuraOS
                </span>
                <p className="text-xs text-gray-500 font-medium">Enterprise AI Operating System</p>
              </div>
            </div>
            <div className="text-gray-500 text-sm">
              © 2025 AuraOS Technologies. All rights reserved. Enterprise computing redefined.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuraOSLanding;