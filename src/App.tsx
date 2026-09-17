import RegistrationForm from './components/RegistrationForm';
import { GraduationCap } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-navy-800 text-white shadow-lg">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">Sport Business School (SBS)</h1>
            <p className="text-xs text-navy-200">Formulaire d'inscription en ligne</p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
          {/* Intro */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-navy-800 mb-2">
              Inscription en ligne
            </h2>
            <p className="text-gray-500 text-sm">
              Remplissez ce formulaire pour soumettre votre candidature à SBS School.
              La procédure prend environ 10 minutes.
            </p>
          </div>

          <RegistrationForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-navy-800 text-navy-200 py-4">
        <div className="max-w-3xl mx-auto px-4 text-center text-xs">
          <p>© {new Date().getFullYear()} SBS School — Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
