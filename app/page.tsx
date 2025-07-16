"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronDown, Brain, Zap, Shield, ArrowRight } from "lucide-react"

export default function AnzneyModernLanding() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle intersection observer for card animations
  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
            }, index * 200) // Stagger the animations
          }
        },
        { threshold: 0.3 },
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  const smoothScroll = (elementId: string) => {
    const element = document.getElementById(elementId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white font-inter overflow-x-hidden">
      {/* Header with Blur Effect */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-purple-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="/text-logo.jpg"
                alt="Anzney Technovation"
                width={200}
                height={50}
                className="h-10 w-auto rounded-lg"
              />
            </div>

            <nav className="hidden md:flex space-x-8">
              {["Home", "Solutions", "About", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => smoothScroll(item.toLowerCase())}
                  className={`font-medium transition-all duration-300 hover:scale-105 ${
                    isScrolled ? "text-gray-800 hover:text-purple-600" : "text-white hover:text-purple-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              className={`md:hidden transition-colors duration-300 ${isScrolled ? "text-gray-800" : "text-white"}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Animated Background */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-900">
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          {/* Circuit Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M0 10h20M10 0v20" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  <circle cx="10" cy="10" r="2" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)" className="text-white" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
              Innovative AI Solutions for a{" "}
              <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                Smarter Future
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-4xl mx-auto text-blue-100 leading-relaxed">
              Empowering businesses with responsible AI, driving technological advancement, fostering trust, and fueling
              growth.
            </p>
            <button
              onClick={() => smoothScroll("solutions")}
              className="group bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 flex items-center gap-2 mx-auto"
            >
              Discover Our Solutions
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/70" />
        </div>
      </section>

      {/* Solutions Section with Blooming Animation */}
      <section id="solutions" className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
              Our Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cutting-edge AI technologies designed to transform your business operations and drive innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-12 h-12 text-purple-600" />,
                title: "Local LLM Solutions",
                description:
                  "Advanced local Large Language Model solutions tailored to meet specific business needs while ensuring compliance with local privacy regulations.",
                gradient: "from-purple-500 to-blue-500",
              },
              {
                icon: <Zap className="w-12 h-12 text-blue-600" />,
                title: "AI Systems & Automation",
                description:
                  "Optimizing business operations through AI and Robotic Process Automation (RPA), driving efficiency, enhancing decision-making, and providing data-driven insights.",
                gradient: "from-blue-500 to-indigo-500",
              },
              {
                icon: <Shield className="w-12 h-12 text-indigo-600" />,
                title: "Privacy Enhancing Technologies",
                description:
                  "Pioneering the integration of AI with advanced privacy-preserving techniques, ensuring sensitive data remains protected while leveraging AI's power.",
                gradient: "from-indigo-500 to-purple-500",
              },
            ].map((solution, index) => (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 transform ${
                  visibleCards[index] ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
                } hover:scale-105 hover:-translate-y-2`}
              >
                {/* Gradient Border */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${solution.gradient} rounded-3xl p-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                >
                  <div className="bg-white rounded-3xl w-full h-full" />
                </div>

                <div className="relative z-10">
                  <div className={`mb-6 p-4 rounded-2xl bg-gradient-to-r ${solution.gradient} w-fit`}>
                    <div className="text-white">{solution.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors duration-300">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{solution.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
                About Anzney Technovation
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  At Anzney Technovation, we are committed to developing and implementing responsible AI solutions that
                  drive meaningful technological advancement while maintaining the highest standards of ethics and
                  trust.
                </p>
                <p className="text-lg">
                  Our mission is to empower businesses across industries with cutting-edge artificial intelligence
                  technologies that not only enhance operational efficiency but also respect privacy, ensure security,
                  and promote sustainable growth.
                </p>
                <p className="text-lg">
                  We believe that the future of AI lies in responsible innovation—creating solutions that serve humanity
                  while preserving the values and principles that matter most to our clients and communities.
                </p>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                <Image
                  src="/square-logo.jpg"
                  alt="Anzney Technovation Logo"
                  width={400}
                  height={400}
                  className="relative rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700" />
        <div className="absolute inset-0 bg-black/20" />

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Ready to Transform Your Business with AI?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-purple-100">
            {"Let's discuss how our tailored AI solutions can help you achieve your goals and gain a competitive edge."}
          </p>
          <button
            onClick={() => smoothScroll("contact")}
            className="group bg-white text-purple-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-2 mx-auto"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
              Contact Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to start your AI transformation journey? Get in touch with our team of experts.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <form className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-300"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-purple-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none hover:border-purple-300"
                  placeholder="Tell us about your project and how we can help..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="mb-8">
              <Image
                src="/text-logo.jpg"
                alt="Anzney Technovation"
                width={200}
                height={50}
                className="h-10 w-auto rounded-lg mx-auto"
              />
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
              <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-300 transition-colors duration-200">
                Terms of Service
              </a>
            </div>

            <p className="text-gray-400">© 2025 Anzney Technovation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
