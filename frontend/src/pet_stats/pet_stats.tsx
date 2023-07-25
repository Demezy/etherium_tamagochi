import PetsRepository from "../pet_repository/data/pets_repository";
import { useEffect, useState } from "react";
import PetData from "../pet_repository/domain/pet_data";
import { useParams } from "react-router-dom";
import ErrorPage from "../routes/error_page";
import { Box } from "@mui/material";

type PetStatsProps = {
  petId: string;
};

export default function PetStats() {
  const props = useParams<PetStatsProps>();
  const [petStats, setPetStats] = useState<
    PetData | "initial" | "loading" | "error"
  >(
    "initial",
  );
  useEffect(() => {
    async function getPet() {
      if (petStats != "initial") return;
      setPetStats("loading");
      const pet = await PetsRepository.petById(parseInt(props.petId!));
      setPetStats(pet);
    }
    getPet().catch((reason) => {
      console.log(reason);
      return setPetStats("error");
    });
  });
  switch (petStats) {
    case ("initial"):
      return <></>;
    case ("loading"):
      return <>"Loading..."</>;

    case ("error"):
      return <ErrorPage />;
  }

  return (
    <>
      hi!!!<br />
      {!petStats.name
        ? (
          <p>
            Hmm looks like this pet does not exist, but lets try to see stats)
          </p>
        )
        : <></>}
      Your pet stats are:
      <ul>
        <li>owner - {petStats.owner}</li>
        <li>name - {petStats.name}</li>
        <li>birthDay - {petStats.birthDay.toString()}</li>
        <li>experience - {petStats.experience.toString()}</li>
        <li>health - {petStats.health.toString()}</li>
        <li>mood - {petStats.mood.toString()}</li>
        <li>hunger - {petStats.hunger.toString()}</li>
      </ul>
      <p>And here is its photo:</p>
      <Box
        component={"img"}
        src={`/animals/${petStats.id}-animal.png`}
        alt={`Image of the animal with id ${petStats.id}`}
      />
    </>
  );
}
