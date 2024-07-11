import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export const CreateTripPage = () => {
  const navigate = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [eventStartAndEndDate, setEventStartAndEndDate] = useState<
    DateRange | undefined
  >(undefined);

  const [emailsToInvite, setEmailsToInvite] = useState(["nd7058898@gmail.com"]);

  const changeGuestInput = () => {
    setIsGuestsInputOpen(!isGuestsInputOpen);
  };

  const changeGuestsModal = () => {
    setIsGuestsModalOpen(!isGuestsModalOpen);
  };

  const changeConfirmTripModal = () => {
    setIsConfirmTripModalOpen(!isConfirmTripModalOpen);
  };

  const addNewEmailToInvite = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      return;
    }

    setEmailsToInvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  };

  const createTrip = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(!destination) {
      return
    }

    if(!eventStartAndEndDate?.from || !eventStartAndEndDate?.to) {
      return
    }
    
    if(emailsToInvite.length === 0) {
      return
    }

    if(!ownerEmail || !ownerName) {
      return
    }

    const response = await api.post("/trips", {
      destination,
      starts_at: eventStartAndEndDate.from,
      ends_at: eventStartAndEndDate.to,
      emails_to_invite: emailsToInvite,
      owner_email: ownerEmail,
      owner_name: ownerName,
    });

    const { tripId } = response.data

    navigate(`/trips/${tripId}`)
  };

  const removeEmailFromInvite = (emailToRemove: string) => {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove
    );

    setEmailsToInvite(newEmailList);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col gap-3">
          <img src="/logo.svg" alt="logo plann.er" className="h-11" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua próxima viagem
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep
            changeGuestInput={changeGuestInput}
            isGuestsInputOpen={isGuestsInputOpen}
            setDestination={setDestination}
            eventStartAndEndDate={eventStartAndEndDate}
            setEventStartAndEndDate={setEventStartAndEndDate}
          />

          {isGuestsInputOpen && (
            <InviteGuestsStep
              changeConfirmTripModal={changeConfirmTripModal}
              changeGuestsModal={changeGuestsModal}
              emailsToInvite={emailsToInvite}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{" "}
          <br />
          com nossos{" "}
          <a href="#" className="text-zinc-300 underline">
            termos de uso
          </a>{" "}
          e{" "}
          <a href="#" className="text-zinc-300 underline">
            politícas de privacidade
          </a>
          .
        </p>
      </div>

      {isGuestsModalOpen && (
        <InviteGuestsModal
          addNewEmailToInvite={addNewEmailToInvite}
          changeGuestsModal={changeGuestsModal}
          emailsToInvite={emailsToInvite}
          removeEmailFromInvite={removeEmailFromInvite}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          changeConfirmTripModal={changeConfirmTripModal}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
        />
      )}
    </div>
  );
};
