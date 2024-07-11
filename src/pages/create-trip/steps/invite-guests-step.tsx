import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestsStepProps {
  changeGuestsModal: () => void;
  emailsToInvite: string[];
  changeConfirmTripModal: () => void;
}

export const InviteGuestsStep = ({
  changeGuestsModal,
  emailsToInvite,
  changeConfirmTripModal,
}: InviteGuestsStepProps) => {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <button
        type="button"
        className="flex items-center gap-2 flex-1 text-left"
        onClick={changeGuestsModal}
      >
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span className="text-zinc-100 text-lg flex-1">
            {emailsToInvite.length}{" "}
            {emailsToInvite.length === 1
              ? "pessoa convidada"
              : "pessoas convidadas"}
          </span>
        ) : (
          <span className="text-zinc-400 text-lg flex-1">
            Quem estará na viagem?
          </span>
        )}
      </button>

      <Button variant="primary" size="default" onClick={changeConfirmTripModal}>
        Confirmar viagem
        <ArrowRight className="size-5" />
      </Button>
    </div>
  );
};
