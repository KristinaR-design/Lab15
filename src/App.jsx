//восьмая лабораторная работа
//первое, работа с погодой через фетч
// import { useEffect, useState } from 'react'
// import './App.css'

// export default function App() {
//   const [weather, setWeather] = useState({ temp: '', desc: '', icon: '' })

//   useEffect(() => {
//     const CITY = 'Almaty'
//     const KEY = import.meta.env.VITE_OWM_KEY
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${KEY}`)
//       .then(r => r.json())
//       .then(d =>
//         setWeather({
//           temp: d.main?.temp ?? '',
//           desc: d.weather?.[0]?.main ?? '',
//           icon: d.weather?.[0]?.icon ?? ''
//         })
//       )
//       .catch(console.error)
//   }, [])

//   if (!weather.icon) return <div style={{ padding: 24 }}>Loading…</div>

//   return (
//     <div style={{ padding: 24, textAlign: 'center' }}>
//       <p>Temperature: {weather.temp} °C</p>
//       <p>Description: {weather.desc}</p>
//       <img
//         src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
//         alt="Weather icon"
//       />
//     </div>
//   )
// }




// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import Repositories from './Repositories.jsx'
// import './App.css'

// const queryClient = new QueryClient()

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Repositories />
//     </QueryClientProvider>
//   )
// }



// девятая лабораторная работа 

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import PageNotFound from './pages/PageNotFound'
import Grid from './pages/Grid'
import Shopping from './pages/Shopping'

export default function App() {
  return (
    <BrowserRouter>
      <nav className="topnav">
        <Link to="/">Home</Link>
        <Link to="/grid">AG Grid</Link>
        <Link to="/shopping">Shopping List</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grid" element={<Grid />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}