import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean;
  changeGuestInput: () => void;
  eventStartAndEndDate: DateRange | undefined;
  setDestination: (destination: string) => void;
  setEventStartAndEndDate: (dates: DateRange | undefined) => void;
}

export const DestinationAndDateStep = ({
  isGuestsInputOpen,
  changeGuestInput,
  eventStartAndEndDate,
  setDestination,
  setEventStartAndEndDate,
}: DestinationAndDateStepProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const displayedDate =
    eventStartAndEndDate && eventStartAndEndDate.from && eventStartAndEndDate.to
      ? format(eventStartAndEndDate.from, "d ' de ' LLL")
          .concat(" até ")
          .concat(format(eventStartAndEndDate.to, "d ' de ' LLL"))
      : null;

  const changeDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400" />
        <input
          type="text"
          placeholder="Para onde você vai?"
          disabled={isGuestsInputOpen}
          className="bg-transparent text-lg placeholder:text-zinc-400 outline-none flex-1"
          onChange={(event) => setDestination(event?.target?.value)}
        />
      </div>
      <button
        disabled={isGuestsInputOpen}
        onClick={changeDatePicker}
        className="flex items-center pr-2 gap-2 border-r-2 border-r-zinc-800 text-left"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-400 flex-1">
          {displayedDate || "Quando?"}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="rounded-xl px-6 py-5 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button onClick={changeDatePicker}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
            </div>

            <DayPicker
              mode="range"
              selected={eventStartAndEndDate}
              onSelect={setEventStartAndEndDate}
            />
          </div>
        </div>
      )}

      {isGuestsInputOpen ? (
        <Button variant="secondary" size="default" onClick={changeGuestInput}>
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button variant="primary" size="default" onClick={changeGuestInput}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  );
};
