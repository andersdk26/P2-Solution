import { JSX } from 'react';

export default function Page(): JSX.Element {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Header */}
            <header className="bg-blue-500 text-white p-4 text-center rounded-md">
                <h1 className="text-2xl font-bold">HTML5 Layout</h1>
            </header>

            {/* Navigation */}
            <nav className="bg-gray-200 p-4 rounded-md flex justify-around">
                <a href="test/button" className="text-blue-700 hover:underline">
                    Button
                </a>
                <a href="test/form" className="text-blue-700 hover:underline">
                    Form
                </a>
                <a href="#" className="text-blue-700 hover:underline">
                    Contact
                </a>
            </nav>

            {/* Main content + Sidebar */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* Main Content */}
                <main className="md:w-2/3 p-4 bg-white shadow rounded-md">
                    <h2 className="text-xl font-semibold mb-2">Main Content</h2>
                    <p>Dette er hovedindholdet på siden.</p>

                    {/* Section */}
                    <section className="mt-4 p-4 bg-gray-100 rounded-md">
                        <h3 className="text-lg font-medium">Sektion</h3>
                        <p>Dette er en sektion i main-indholdet.</p>
                    </section>

                    {/* Article */}
                    <article className="mt-4 p-4 bg-gray-200 rounded-md">
                        <h3 className="text-lg font-medium">Artikel</h3>
                        <p>Dette er en artikel med selvstændigt indhold.</p>
                    </article>
                </main>

                {/* Sidebar (Aside) */}
                <aside className="md:w-1/3 p-4 bg-yellow-100 rounded-md shadow">
                    <h3 className="text-lg font-medium">Sideindhold (Aside)</h3>
                    <ul className="mt-2 space-y-2">
                        <li>
                            <a
                                href="#"
                                className="text-blue-700 hover:underline"
                            >
                                Ekstra Link 1
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-blue-700 hover:underline"
                            >
                                Ekstra Link 2
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-blue-700 hover:underline"
                            >
                                Ekstra Link 3
                            </a>
                        </li>
                    </ul>
                </aside>
            </div>

            {/* Footer */}
            <footer className="bg-blue-500 text-white text-center p-4 rounded-md">
                <p>&copy; 2025 Mit Website</p>
            </footer>
        </div>
    );
}
