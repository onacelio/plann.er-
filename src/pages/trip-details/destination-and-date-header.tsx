import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

export const DestinationAndDateHeader = () => {
  const { tripId } = useParams();

  const [trip, setTrip] = useState<Trip | undefined>();

  const displayedDate = trip
    ? format(trip?.starts_at, "d ' de ' LLL")
        .concat(" até ")
        .concat(format(trip.ends_at, "d ' de ' LLL"))
    : null;

  const getTrip = async () => {
    const { data } = await api.get(`/trips/${tripId}`);
    setTrip(data.trip);
  };

  useEffect(() => {
    getTrip();
  }, [tripId]);

  return (
    <div className="h-16 flex items-center justify-between px-4 rounded-xl bg-zinc-900 shadow-shape">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />{" "}
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 border-r-zinc-800 border-r-2 pr-5">
          <Calendar className="size-5 text-zinc-400" />{" "}
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <Button variant="secondary" size="default">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  );
};
