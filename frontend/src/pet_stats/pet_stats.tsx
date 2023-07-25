import PetsRepository from "../pet_repository/data/pets_repository";
import { useEffect, useState } from "react";
import PetData from "../pet_repository/domain/pet_data";
import NotFoundPage from "../routes/not_found";
import { useParams } from "react-router-dom";

type PetStatsProps = {
  petId: string;
};

export default function PetStats() {
  const props = useParams<PetStatsProps>();
  const [petStats, setPetStats] = useState<PetData | "loading" | "error">(
    "loading",
  );
  useEffect(() => {
    async function getPet() {
      if (petStats != "loading" && petStats != "error") return;
      setPetStats("loading");
      console.log(props.petId);
      const pet = await PetsRepository.petById(parseInt(props.petId!));
      setPetStats(pet);
    }
    getPet().catch(() => setPetStats("error"));
  });
  switch (petStats) {
    case ("loading"):
      return <>"Loading"</>;

    case ("error"):
      return <NotFoundPage />;
  }

  return (
    <>
      hi!!!<br />
      Your pet stats are:
      <ul>
        <li>owner - {petStats.owner}</li>
        <li>name - {petStats.name}</li>
        <li>birthDay - {petStats.birthDay}</li>
        <li>experience - {petStats.experience}</li>
        <li>health - {petStats.health}</li>
        <li>mood - {petStats.mood}</li>
        <li>hunger - {petStats.hunger}</li>
      </ul>
    </>
  );
}
