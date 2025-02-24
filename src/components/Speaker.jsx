import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import AnimatedText from './text'

function Speaker({
  values = {},
  name = 'Ankit Prasad',
  subname = 'Mr. Prasad',
  ct = '',
  customaudio = '',
  image
}) {
  const containerRef = useRef(null)
  const rowRefs = useRef([])
  const lineRefs = useRef([])
  const valueRefs = useRef([])

  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        toggleActions: 'play reverse play reverse'
      }
    })

    timeline.fromTo(
      lineRefs.current,
      { scaleX: 0, transformOrigin: 'left' },
      { scaleX: 1, duration: 0.8, ease: 'power3.out' }
    )

    timeline.fromTo(
      rowRefs.current,
      { x: '-100%' },
      { x: 0, duration: 0.3, ease: 'power3.out' },
      '-=0.8'
    )

    timeline.fromTo(
      valueRefs.current,
      { x: '-100%' },
      { x: 0, duration: 0.3, ease: 'power3.out' },
      '-=0.8'
    )

    timeline.reverse(0.1)
  }, [])

  return (
    <div className="w-full px-4 pt-6 md:px-10 md:pt-10">
      <div className="flex w-full flex-col border-t-2 border-white md:flex-row md:flex-nowrap md:gap-8 lg:gap-32">
        {/* Left section - Speaker Info */}
        <div className="font-neubit mb-8 w-full text-left md:mb-0 md:w-[40%] lg:w-[40vw]">
          <AnimatedText
            customText={ct}
            text={name}
            time={1}
            className="text-left font-neuebit text-3xl uppercase text-white md:text-5xl lg:text-6xl"
            audioSrc={customaudio || '/sfx/type.wav'}
          />
          <AnimatedText
            customText={ct}
            text={subname}
            time={1}
            className="text-left font-neuebit text-2xl uppercase text-white md:text-4xl lg:text-5xl"
          />
          <img
            src={image}
            alt="Speaker"
            className="h-[40vh] w-full rounded-lg object-cover shadow-lg md:h-[50vh] lg:h-[60vh]"
          />
        </div>

        {/* Right section - Values Table (Hidden on Small Screens) */}
        <div
          ref={containerRef}
          className="font-neubit mt-3 hidden w-full text-white sm:block"
        >
          {Object.entries(values).map(([key, value], index) => (
            <div key={key}>
              <div className="flex flex-col items-start justify-start md:flex-row md:flex-wrap md:items-center">
                {/* Key */}
                <div className="w-full overflow-hidden md:w-auto">
                  <div ref={(el) => (rowRefs.current[index] = el)}>
                    <AnimatedText
                      text={key}
                      time={1}
                      className="w-full font-neuebit text-base uppercase tracking-wider text-green-500 md:text-lg"
                    />
                  </div>
                </div>

                {/* Value */}
                <div className="ml-4 md:ml-[15vw] lg:ml-[25vw]">
                  <div className="overflow-hidden">
                    <div ref={(el) => (valueRefs.current[index] = el)}>
                      <AnimatedText
                        text={value}
                        time={0.2}
                        className="w-full font-neuebit text-base uppercase tracking-wider text-white md:text-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Line */}
                <div className="w-full flex-grow py-2 md:py-3">
                  <div
                    ref={(el) => (lineRefs.current[index] = el)}
                    className="h-[1px] w-full bg-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Speaker
