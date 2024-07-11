import { AtSign, Plus, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";

interface InviteGuestModalProps {
  changeGuestsModal: () => void;
  emailsToInvite: string[];
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void;
  removeEmailFromInvite: (email: string) => void;
}

export const InviteGuestsModal = ({
  addNewEmailToInvite,
  changeGuestsModal,
  emailsToInvite,
  removeEmailFromInvite,
}: InviteGuestModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl px-6 py-5 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <button onClick={changeGuestsModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map((email) => (
            <div
              className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
              key={email}
            >
              <span className="text-zinc-300">{email}</span>
              <button onClick={() => removeEmailFromInvite(email)}>
                <X className="text-zinc-400 size-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="h-px w-full bg-zinc-800"></div>

        <form
          onSubmit={addNewEmailToInvite}
          className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2"
        >
          <div className="px-2 flex flex-1 gap-2 items-center">
            <AtSign className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Digite o e-mail do convidado"
              className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1"
            />
          </div>

          <Button variant="primary" size="default">
            Convidar
            <Plus className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};
