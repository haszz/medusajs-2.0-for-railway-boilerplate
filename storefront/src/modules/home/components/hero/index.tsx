import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="relative h-[85vh] w-full overflow-hidden pt-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/back3.png" 
          alt="Flower Bricks"
          fill
          // style={{ objectFit: "cover" }}
          priority
          quality={90}
        />
        
        {/* This is a placeholder gradient that will be visible until you add your background image */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-green-100 to-amber-50"></div> */}
      </div>
      
      {/* Optional overlay to ensure text readability over background */}
      <div className="absolute inset-0 bg-black opacity-10 z-5"></div>
      
      {/* Nature particles only */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        {/* Medium particles with pulse animation */}
        <div className="absolute top-1/6 right-1/6 animate-pulse w-2 h-2 rounded-full bg-yellow-300 opacity-60"></div>
        <div className="absolute bottom-1/3 left-1/5 animate-pulse delay-300 w-3 h-3 rounded-full bg-pink-200 opacity-60"></div>
        <div className="absolute top-2/5 left-1/6 animate-pulse delay-700 w-1.5 h-1.5 rounded-full bg-amber-300 opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 animate-pulse delay-500 w-2.5 h-2.5 rounded-full bg-green-200 opacity-60"></div>
        <div className="absolute top-1/2 right-1/3 animate-pulse delay-200 w-2 h-2 rounded-full bg-emerald-300 opacity-50"></div>
        <div className="absolute top-1/3 left-1/4 animate-pulse delay-400 w-3 h-3 rounded-full bg-lime-200 opacity-60"></div>
        <div className="absolute bottom-2/5 right-1/5 animate-pulse delay-600 w-2 h-2 rounded-full bg-rose-200 opacity-50"></div>
        <div className="absolute top-2/3 left-1/3 animate-pulse delay-100 w-2.5 h-2.5 rounded-full bg-amber-100 opacity-60"></div>
        <div className="absolute bottom-1/5 left-1/6 animate-pulse delay-800 w-3 h-3 rounded-full bg-green-100 opacity-50"></div>
        <div className="absolute top-1/4 right-1/3 animate-pulse delay-900 w-2 h-2 rounded-full bg-yellow-200 opacity-60"></div>
        
        {/* Small floating particles - Group 1 */}
        <div className="absolute inset-0">
          {Array.from({ length: 25 }).map((_, i) => (
            <div 
              key={`small-1-${i}`}
              className="absolute w-1 h-1 rounded-full bg-amber-100 opacity-70 animate-float-random"
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 5}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Small floating particles - Group 2 (different color) */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={`small-2-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-green-100 opacity-60 animate-float-random-alt"
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                animationDuration: `${4 + Math.random() * 4}s`,
                animationDelay: `${Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Tiny dust-like particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 35 }).map((_, i) => (
            <div 
              key={`dust-${i}`}
              className="absolute w-0.5 h-0.5 rounded-full bg-white opacity-80 animate-float-dust"
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                animationDuration: `${2 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Larger slow-moving particles */}
        <div className="absolute top-1/3 right-1/6 animate-float-slow">
          <div className="w-4 h-4 rounded-full bg-pink-200 opacity-40"></div>
        </div>
        <div className="absolute bottom-1/4 left-1/4 animate-float">
          <div className="w-5 h-5 rounded-full bg-amber-200 opacity-30"></div>
        </div>
        <div className="absolute top-2/3 right-1/3 animate-float-delay">
          <div className="w-4 h-4 rounded-full bg-green-200 opacity-40"></div>
        </div>
        <div className="absolute top-1/5 left-1/3 animate-float-slow">
          <div className="w-3 h-3 rounded-full bg-yellow-100 opacity-50"></div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center p-6 small:p-32 gap-8">
        <div className="backdrop-blur-sm bg-white/30 p-8 rounded-none border-2 border-green-100 shadow-lg max-w-2xl">
          <Heading
            level="h1"
            className="text-4xl md:text-5xl font-bold mb-3 text-green-900"
          >
            Grow Your Garden of Bricks
          </Heading>
          <Heading
            level="h2"
            className="text-xl md:text-2xl font-normal text-emerald-700 mb-6"
          >
            Bloom All Year Round With Botanical Bricks
          </Heading>
          <p className="text-gray-700 mb-8 max-w-md mx-auto">
            Our nature-inspired brick collections let you create enchanting gardens that never need watering. Perfect for bringing the beauty of nature indoors, season after season.
          </p>
        
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-none transform transition-transform hover:scale-105 shadow-md border-2 border-emerald-600"
            >
              Plant Your Garden
            </Button>
            <Button 
              variant="secondary"
              className="border-2 border-amber-400 text-amber-700 hover:bg-amber-50 px-8 py-3 rounded-none transform transition-transform hover:scale-105 shadow-md"
            >
              Explore Botanical Sets
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero