import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'

import { UserMsg } from "./cmps/UserMsg.jsx"
import { SentCases } from "./pages/SentCases.jsx"
import { CurrCases } from "./pages/CurrCases.jsx"
import { Header } from "./cmps/Header.jsx"
import { FileDetails } from "./cmps/FileDetails.jsx"
import { ActionPage } from "./cmps/ActionPage.jsx"


import './assets/style/main.css'



export function App() {



    return (
        <Router>
            <section className="app main-layout">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<CurrCases />} />
                        <Route path="/sent" element={<SentCases />} />
                        <Route path="/case/:fileId" element={<FileDetails />} />
                    </Routes>
                </main>
                <UserMsg />

            </section>
        </Router>
    )
} 