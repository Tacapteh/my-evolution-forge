import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/forge/AppShell";
import { ExerciseCatalog } from "@/components/ExerciseCatalog";

export const Route = createFileRoute("/catalogue")({
  component: CataloguePage,
  head: () => ({ meta: [{ title: "Catalogue d'exercices — FORGE" }] }),
});

function CataloguePage() {
  return (
    <div>
      <PageHeader
        title="Catalogue d'Exercices"
        subtitle="Consulte les fiches d'exercices et construis tes séances sur-mesure."
      />
      <div className="px-4 md:px-8 pb-10">
        <ExerciseCatalog />
      </div>
    </div>
  );
}
