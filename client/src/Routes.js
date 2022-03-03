import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import PersonWithCars from './components/pages/PersonWithCars'

export default function Paths() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/people/:id" element={<PersonWithCars />} />
      </Routes>
    </>
  )
}
