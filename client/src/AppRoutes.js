import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import PersonWithCars from './components/pages/PersonWithCars'

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people/:id" element={<PersonWithCars />} />
      </Routes>
    </>
  )
}
