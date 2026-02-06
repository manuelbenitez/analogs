import React from 'react'
import { TypewriterTitle } from '../_components/TypewritterTitle'

export const HomePage = () => {
  return (
    <div
        className="container flex min-h-screen min-w-screen flex-col items-center justify-center gap-12 px-4 py-16"
        style={{
          backgroundImage:
            "url(https://media.licdn.com/dms/image/v2/D5616AQFkFIBzEfWQ2g/profile-displaybackgroundimage-shrink_350_1400/B56ZtIbZsXJIAc-/0/1766446706218?e=1772064000&v=beta&t=-RNoUFZ9eYblsNabHv8g-tsz8IcUAVY0-0-mSgNVFRU)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <TypewriterTitle />
      </div>
  )
}
