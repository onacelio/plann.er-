import { Tag, User, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateActivityModalProps {
  changeCreateActivityModal: () => void;
}

export const CreateActivityModal = ({
  changeCreateActivityModal,
}: CreateActivityModalProps) => {
  const { tripId } = useParams()

  const createActivity = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const title = data.get('title')?.toString()
    const occursAt = data.get('occurs_at')?.toString()

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at: occursAt
    })

    changeCreateActivityModal()
  }
  
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl px-6 py-5 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <button onClick={changeCreateActivityModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos os convidados podem visualizar as atividades cadastradas
          </p>
        </div>

        <form onSubmit={createActivity} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="size-5 text-zinc-400" />
            <input
              type="text"
              name="title"
              placeholder="Atividade"
              className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 flex-1">
              <User className="size-5 text-zinc-400" />
              <input
                type="datetime-local"
                name="occurs_at"
                placeholder="Data e horário"
                className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1"
              />
            </div>
          </div>

          <Button variant="primary" size="full">
            Salvar atividade
          </Button>
        </form>
      </div>
    </div>
  );
};
