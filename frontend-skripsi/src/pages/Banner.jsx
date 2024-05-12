import { XMarkIcon } from '@heroicons/react/20/solid'
import { useState } from "react";
import { Link } from 'react-router-dom';
const Banner = () => {
    const [showBanner, setShowBanner] = useState(true);
    const handleBanner = () => setShowBanner(false)
  return (
    <div className={`${showBanner ? "block" : "hidden"} relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-900 px-6 py-2.5 sm:px-3.5 sm:before:flex-1`}>
      <div
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
        
      </div>
      <div
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
        aria-hidden="true"
      >
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm leading-6 text-white">
          <strong className="font-semibold">Magang Fasilkom</strong>
          <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
            <circle cx={1} cy={1} r={1} />
          </svg>
          Bergabung menjadi mitra dan temukan mahasiswa magang yang berprestasi.
        </p>
        <Link
          to="/auth/login"
          className="flex-none rounded-full bg-gray-800 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          Sign In now <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
      <div className="flex flex-1 justify-end">
        <button type="button" className="-m-3 p-3 focus-visible:outline-offset-[-4px]" onClick={handleBanner}>
          <span className="sr-only">Dismiss</span>
          <XMarkIcon className="h-5 w-5 text-white" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default Banner
