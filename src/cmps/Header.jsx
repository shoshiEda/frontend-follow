import { NavLink } from 'react-router-dom'

export function Header() {
    return (
        <header className="app-header full main-layout">
            <section>
                <h1>Follow mw cases</h1>
                <nav className="app-nav">
                    <NavLink className="link" to="/" >Cases</NavLink>
                    <NavLink className="link" to="/sent" >Sent</NavLink>                   
                </nav>
            </section>
        </header>
    )
}