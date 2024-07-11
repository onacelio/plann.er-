import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export const Guests = () => {
  const { tripId } = useParams();

  const [participants, setParticipants] = useState<Participant[]>([]);

  const getParticipants = async () => {
    const { data } = await api.get(`/trips/${tripId}/participants`);
    setParticipants(data.participants);
  };

  useEffect(() => {
    getParticipants();
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        {participants.map((participant) => (
          <div
            className="flex items-center justify-between gap-4"
            key={participant.id}
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {participant.name}
              </span>
              <span className="block text-sm text-zinc-400 truncate">
                {participant.email}
              </span>
            </div>
            {participant.is_confirmed ? (
              <CheckCircle2 className="size-5 text-green-400 shrink-0" />
            ) : (
              <CircleDashed className="size-5 text-zinc-400 shrink-0" />
            )}
          </div>
        ))}
      </div>

      <Button variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  );
};
