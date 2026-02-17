import React, { useState } from "react";
import SelectionMenu from "./Pages/SelectionMenu.jsx";
import FormulaireIdentifiant from "./Pages/FormulaireIdentifiant/FormulaireIdentifiant.jsx";
import RemiseInfoClient from "./Pages/RemiseInfoClient/RemiseInfoClient.jsx";

// Import dynamique
const AccueilFormulaire = React.lazy(() => import("./Pages/FormulaireIdentifiant/AccueilFormulaire.jsx"));

function App() {
  const [currentView, setCurrentView] = useState("menu");
  const [loadedFormData, setLoadedFormData] = useState(null);

  const handleLoadExisting = (formData) => {
    setLoadedFormData(formData);
    setCurrentView("identifiant");
  };

  const handleCreateNew = () => {
    setLoadedFormData(null);
    setCurrentView("identifiant");
  };

  return (
    <React.Suspense fallback={<div>Chargement...</div>}>
      {currentView === "menu" && (
        <SelectionMenu onSelect={setCurrentView} />
      )}

      {currentView === "identifiant-accueil" && (
        <AccueilFormulaire 
          onCreateNew={handleCreateNew}
          onLoadExisting={handleLoadExisting}
          onBack={() => setCurrentView("menu")}
        />
      )}

      {currentView === "identifiant" && (
        <FormulaireIdentifiant 
          onBack={() => setCurrentView("identifiant-accueil")}
          onHome={() => setCurrentView("menu")} // <--- AJOUT : Retour direct au menu
          initialData={loadedFormData}
        />
      )}

      {currentView === "remise" && (
        <RemiseInfoClient onBack={() => setCurrentView("menu")} />
      )}
    </React.Suspense>
  );
}

export default App;