import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { Button } from "../../components/button";

export const TripDetailsPage = () => {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  const changeCreateActivityModal = () => {
    setIsCreateActivityModalOpen(!isCreateActivityModalOpen);
  };

  return (
    <div className="w-6xl px-24 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>

            <Button
              variant="primary"
              size="default"
              onClick={changeCreateActivityModal}
            >
              <Plus className="size-5" />
              Cadastrar atividade
            </Button>
          </div>

          <Activities />
        </div>
        <div className="w-80 space-y-6">
          <ImportantLinks />
          <div className="h-px w-full bg-zinc-800"></div>
          <Guests />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          changeCreateActivityModal={changeCreateActivityModal}
        />
      )}
    </div>
  );
};
