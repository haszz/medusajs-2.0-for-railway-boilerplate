import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="relative h-[90vh] sm:h-[85vh] w-full overflow-hidden pt-12 sm:pt-16">
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-green-50 via-amber-50 to-white"></div>
      
      {/* Floating image cards - repositioned to frame the content rather than overlap it */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {/* Position 1: Top left */}
        <div className="absolute top-[3%] sm:top-[8%] left-[1%] sm:left-[10%] animate-float-slow transform transition-transform duration-500 shadow-xl rounded-lg scale-50 xs:scale-65 sm:scale-100 hidden sm:block">
          <Image 
            src="/plants/1.png" 
            alt="Flower Bricks Set" 
            width={280} 
            height={280}
            className="rounded-lg border-4 border-white"
            priority
          />
        </div>
        
        {/* Position 2: Mid-top right */}
        <div className="absolute top-[12%] sm:top-[15%] right-[2%] sm:right-[15%] animate-float-delay transform -rotate-8 hover:rotate-[-4deg] transition-transform duration-500 shadow-xl rounded-lg scale-50 xs:scale-65 sm:scale-90 md:scale-100 hidden sm:block">
          <Image 
            src="/plants/2.png" 
            alt="Flower Bricks Set" 
            width={240} 
            height={240}
            className="rounded-lg border-4 border-white"
          />
        </div>
        
        {/* Position 3: Bottom right */}
        <div className="absolute bottom-[10%] sm:bottom-[-6%] right-[5%] sm:right-[10%] animate-float transform rotate-[-15deg] hover:rotate-[-8deg] transition-transform duration-500 shadow-xl rounded-lg scale-45 xs:scale-60 sm:scale-80 md:scale-100 hidden sm:block">
          <Image 
            src="/plants/4.png" 
            alt="Flower Bricks Set" 
            width={240} 
            height={240}
            className="rounded-lg border-4 border-white"
          />
        </div>
        
   
        
        {/* Position 5: Top-mid right - for larger screens */}
        <div className="absolute top-[35%] right-[1%] animate-float-random-alt transform rotate-[18deg] hover:rotate-[12deg] transition-transform duration-500 shadow-xl rounded-lg scale-45 xs:scale-55 sm:scale-75 hidden sm:block">
          <Image 
            src="/plants/5.png" 
            alt="Flower Bricks Set" 
            width={180} 
            height={180}
            className="rounded-lg border-4 border-white"
          />
        </div>
        
        {/* Position 6: Top-mid left - for larger screens */}
        <div className="absolute top-[40%] left-[1%] animate-float-delay transform rotate-[5deg] hover:rotate-[2deg] transition-transform duration-500 shadow-xl rounded-lg scale-45 xs:scale-60 sm:scale-75 hidden sm:block">
          <Image 
            src="/plants/6.png" 
            alt="Flower Bricks Set" 
            width={160} 
            height={160}
            className="rounded-lg border-4 border-white"
          />
        </div>
        
        {/* Position 7: Extra small card bottom-mid */}
        <div className="absolute bottom-[-14%] left-[15%] animate-float transform rotate-[8deg] hover:rotate-[4deg] transition-transform duration-500 shadow-xl rounded-lg scale-30 xs:scale-40 sm:scale-50 hidden sm:block">
          <Image 
            src="/plants/7.png" 
            alt="Flower Bricks Set" 
            width={240} 
            height={240}
            className="rounded-lg border-4 border-white"
          />
        </div>
        
        {/* Position 8: Extra small card top-mid */}
        <div className="absolute top-[1%] right-[40%] animate-float-random transform rotate-[-6deg] hover:rotate-[-2deg] transition-transform duration-500 shadow-xl rounded-lg scale-30 xs:scale-40 sm:scale-50 hidden sm:block">
          <Image 
            src="/plants/11.png" 
            alt="Flower Bricks Set" 
            width={130} 
            height={130}
            className="rounded-lg border-4 border-white"
          />
        </div>
        
        {/* Mobile-only image 1: Centered top */}
        <div className="absolute top-[13%] left-[33%] transform -translate-x-1/2 animate-float-slow rotate-[-5deg] transition-transform duration-500 shadow-xl rounded-lg scale-70 block sm:hidden">
          <Image 
            src="/plants/1.png" 
            alt="Flower Bricks Set" 
            width={240} 
            height={240}
            className="rounded-lg border-4 border-white"
            priority
          />
        </div>
        
        {/* Mobile-only image 2: Bottom */}
        <div className="absolute bottom-[-9%] left-[7%] transform -translate-x-1/2 animate-float rotate-[8deg] transition-transform duration-500 shadow-xl rounded-lg scale-65 block sm:hidden">
          <Image 
            src="/plants/2.png" 
            alt="Flower Bricks Set" 
            width={210} 
            height={210}
            className="rounded-lg border-4 border-white"
          />
        </div>
      </div>
      
      {/* Nature particles with enhanced quantity and diversity */}
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
        
        {/* Mobile-optimized particles - reduced number for better performance */}
        <div className="absolute inset-0 xs:hidden">
          {Array.from({ length: 25 }).map((_, i) => (
            <div 
              key={`mobile-particle-${i}`}
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
        
        {/* Rest of the particles - hidden on smallest screens for performance */}
        <div className="absolute inset-0 hidden xs:block">
          {/* Additional pulsing particles */}
          <div className="absolute top-1/5 right-1/5 animate-pulse delay-950 w-4 h-4 rounded-full bg-orange-200 opacity-50"></div>
          <div className="absolute bottom-2/7 left-1/7 animate-pulse delay-775 w-3.5 h-3.5 rounded-full bg-teal-200 opacity-60"></div>
          <div className="absolute top-3/7 right-2/7 animate-pulse delay-525 w-2.5 h-2.5 rounded-full bg-indigo-200 opacity-40"></div>
          <div className="absolute bottom-3/5 left-2/5 animate-pulse delay-650 w-2 h-2 rounded-full bg-purple-200 opacity-50"></div>
          <div className="absolute top-4/5 right-3/7 animate-pulse delay-350 w-3 h-3 rounded-full bg-green-300 opacity-40"></div>
          <div className="absolute bottom-1/7 right-3/5 animate-pulse delay-425 w-2.5 h-2.5 rounded-full bg-amber-300 opacity-50"></div>
          
          {/* Even more pulsing particles for enhanced density */}
          <div className="absolute top-2/6 right-2/3 animate-pulse delay-175 w-3 h-3 rounded-full bg-yellow-100 opacity-70"></div>
          <div className="absolute bottom-4/5 left-4/5 animate-pulse delay-980 w-2 h-2 rounded-full bg-emerald-100 opacity-50"></div>
          <div className="absolute top-4/7 left-3/7 animate-pulse delay-555 w-2.5 h-2.5 rounded-full bg-lime-300 opacity-40"></div>
          <div className="absolute bottom-4/7 right-4/5 animate-pulse delay-888 w-1.5 h-1.5 rounded-full bg-amber-200 opacity-60"></div>
          <div className="absolute top-5/7 right-2/9 animate-pulse delay-620 w-3 h-3 rounded-full bg-green-200 opacity-30"></div>
          
          {/* Leaf-shaped particles (using transform for leaf-like rotation) */}
          <div className="absolute top-2/7 right-2/5 animate-float-random">
            <div className="w-5 h-5 rounded-tl-full rounded-br-full bg-green-300 opacity-40 rotate-45"></div>
          </div>
          <div className="absolute bottom-3/7 left-1/3 animate-float-random-alt">
            <div className="w-4 h-4 rounded-tl-full rounded-br-full bg-emerald-200 opacity-50 rotate-12"></div>
          </div>
          <div className="absolute top-1/2 right-1/4 animate-float-random delay-200">
            <div className="w-6 h-6 rounded-tl-full rounded-br-full bg-lime-200 opacity-30 -rotate-12"></div>
          </div>
          
          {/* Additional leaf shapes */}
          <div className="absolute top-3/5 right-3/8 animate-float-random-alt delay-450">
            <div className="w-7 h-7 rounded-tl-full rounded-br-full bg-green-100 opacity-25 rotate-30"></div>
          </div>
          <div className="absolute bottom-1/8 left-3/5 animate-float-random delay-275">
            <div className="w-4 h-4 rounded-tl-full rounded-br-full bg-emerald-100 opacity-40 -rotate-30"></div>
          </div>
          
          {/* Flower-shaped particles (using multiple overlaid divs) */}
          <div className="absolute top-2/9 left-4/9 animate-float-random-alt delay-333">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 w-3 h-3 bg-pink-200 opacity-50 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute w-3 h-3 bg-pink-100 opacity-40 rounded-full top-0 left-1/2 transform -translate-x-1/2"></div>
              <div className="absolute w-3 h-3 bg-pink-100 opacity-40 rounded-full bottom-0 left-1/2 transform -translate-x-1/2"></div>
              <div className="absolute w-3 h-3 bg-pink-100 opacity-40 rounded-full left-0 top-1/2 transform -translate-y-1/2"></div>
              <div className="absolute w-3 h-3 bg-pink-100 opacity-40 rounded-full right-0 top-1/2 transform -translate-y-1/2"></div>
            </div>
          </div>
          
          <div className="absolute bottom-2/9 right-3/7 animate-float-random delay-475">
            <div className="relative w-6 h-6">
              <div className="absolute inset-0 w-2 h-2 bg-amber-200 opacity-60 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute w-2 h-2 bg-amber-100 opacity-50 rounded-full top-0 left-1/2 transform -translate-x-1/2"></div>
              <div className="absolute w-2 h-2 bg-amber-100 opacity-50 rounded-full bottom-0 left-1/2 transform -translate-x-1/2"></div>
              <div className="absolute w-2 h-2 bg-amber-100 opacity-50 rounded-full left-0 top-1/2 transform -translate-y-1/2"></div>
              <div className="absolute w-2 h-2 bg-amber-100 opacity-50 rounded-full right-0 top-1/2 transform -translate-y-1/2"></div>
            </div>
          </div>
          
          {/* Small floating particles - Group 1 */}
          <div className="absolute inset-0">
            {Array.from({ length: 45 }).map((_, i) => (
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
            {Array.from({ length: 40 }).map((_, i) => (
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
          
          {/* Small floating particles - Group 3 (pink/rose color) */}
          <div className="absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={`small-3-${i}`}
                className="absolute w-1 h-1 rounded-full bg-rose-100 opacity-50 animate-float-random"
                style={{ 
                  top: `${Math.random() * 100}%`, 
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${3 + Math.random() * 3}s`,
                  animationDelay: `${Math.random() * 4}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Small floating particles - Group 4 (blue color) */}
          <div className="absolute inset-0">
            {Array.from({ length: 25 }).map((_, i) => (
              <div 
                key={`small-4-${i}`}
                className="absolute w-1 h-1 rounded-full bg-blue-100 opacity-40 animate-float-random-alt"
                style={{ 
                  top: `${Math.random() * 100}%`, 
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${3.5 + Math.random() * 3.5}s`,
                  animationDelay: `${Math.random() * 3.5}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Tiny dust-like particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 65 }).map((_, i) => (
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
          
          {/* Additional larger particles with varied shapes */}
          <div className="absolute bottom-2/5 right-2/7 animate-float-slow delay-750">
            <div className="w-6 h-6 rounded-full bg-blue-100 opacity-30"></div>
          </div>
          <div className="absolute top-3/5 left-2/7 animate-float delay-500">
            <div className="w-5 h-5 rounded-full bg-violet-100 opacity-25"></div>
          </div>
          <div className="absolute bottom-1/3 right-1/2 animate-float-delay delay-350">
            <div className="w-4 h-4 rounded-full bg-orange-100 opacity-30"></div>
          </div>
          
          {/* Star-shaped particles (using clip-path) */}
          <div className="absolute top-1/4 left-2/5 animate-float-random-alt delay-150">
            <div className="w-6 h-6 bg-yellow-200 opacity-40"
                 style={{clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"}}></div>
          </div>
          <div className="absolute bottom-2/3 right-1/4 animate-float-random delay-600">
            <div className="w-4 h-4 bg-amber-200 opacity-30"
                 style={{clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"}}></div>
          </div>
          
          {/* Additional star shapes with different colors */}
          <div className="absolute top-2/3 left-1/6 animate-float-random-alt delay-825">
            <div className="w-5 h-5 bg-green-200 opacity-30"
                 style={{clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"}}></div>
          </div>
          <div className="absolute bottom-3/5 right-1/6 animate-float-random delay-375">
            <div className="w-3 h-3 bg-rose-100 opacity-40"
                 style={{clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"}}></div>
          </div>
        </div>
      </div>
      
      {/* Main content - significantly improved for mobile */}
      <div className="relative z-20 flex flex-col justify-center items-center text-center px-3 xs:px-4 sm:p-6 small:p-32 gap-3 xs:gap-4 sm:gap-8 h-full">
        <div className="relative backdrop-blur-sm bg-white/70 p-4 xs:p-5 sm:p-8 rounded-lg border-2 border-green-100 shadow-lg max-w-[280px] xs:max-w-xs sm:max-w-md md:max-w-2xl">
          
          {/* Overlapping Card 1: Top-Left Corner */}
          <div className="absolute top-[-99px] left-[-55px] z-30 animate-float transform rotate-[-20deg] hover:rotate-[-15deg] transition-transform duration-500 rounded-lg scale-35 xs:scale-45 sm:scale-50 pointer-events-none">
            <Image 
            src="/plants/alone.png" 
            alt="Corner Decor" 
              width={120} 
              height={120}
              className="rounded-lg border-0 border-white"
            />
          </div>
          
          {/* Overlapping Card 2: Bottom-Right Corner */}
          <div className="absolute bottom-[-25px] right-[-30px] z-30 animate-float-delay transform rotate-[15deg] hover:rotate-[10deg] transition-transform duration-500 rounded-lg scale-35 xs:scale-45 sm:scale-50 pointer-events-none">
            <Image 
            src="/plants/alone2.png" 
            alt="Corner Decor" 
              width={130} 
              height={130}
              className="rounded-lg border-0 border-white"
            />
          </div>
          
       
          {/* Actual Content */}
          <Heading
            level="h1"
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-1 xs:mb-2 sm:mb-3 text-green-900"
          >
            Grow Your Garden of Bricks
          </Heading>
          <Heading
            level="h2"
            className="text-base xs:text-lg sm:text-xl md:text-2xl font-normal text-emerald-700 mb-2 xs:mb-3 sm:mb-6"
          >
            Bloom All Year Round With Botanical Bricks
          </Heading>
          <p className="text-xs xs:text-sm sm:text-base text-gray-700 mb-3 xs:mb-4 sm:mb-8 max-w-md mx-auto">
            Our nature-inspired brick collections let you create enchanting gardens that never need watering. Perfect for bringing the beauty of nature indoors, season after season.
          </p>
        
          <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 sm:gap-4 justify-center">
            <Button 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 xs:px-4 sm:px-8 py-1.5 xs:py-2 sm:py-3 rounded-none transform transition-transform hover:scale-105 shadow-md border-2 border-emerald-600 text-xs xs:text-sm sm:text-base"
            >
              Plant Your Garden
            </Button>
            <Button 
              variant="secondary"
              className="border-2 border-amber-400 text-amber-700 hover:bg-amber-50 px-3 xs:px-4 sm:px-8 py-1.5 xs:py-2 sm:py-3 rounded-none transform transition-transform hover:scale-105 shadow-md text-xs xs:text-sm sm:text-base"
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
