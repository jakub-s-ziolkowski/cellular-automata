
import './App.scss';

/*
skala
koordy
prędkość
epoka
stan symulacji
aktywna karta
env
*/

const App = () : React.JSX.Element => {

    return (
        <main className = "main">
            <section className = "display">
                <nav className = "display__sidePanel"></nav>
                <section className = "display__frame">
                    <section className = "display__canvas"></section>
                    <nav className = "display__bottomPanel"></nav>
                </section>
            </section>
            <section className = "workspaceFrame">
                <span className = "workspaceFrame__title">Title</span>
                <section className = "workspace"></section>
                <nav className = "workspaceFrame__nav"></nav>
            </section>
        </main>
    );
};

export default App;
