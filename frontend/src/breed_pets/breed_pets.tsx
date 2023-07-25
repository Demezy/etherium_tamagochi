import { Button, TextField } from "@mui/material";
import PetsRepository from "../pet_repository/data/pets_repository";
import React, { useState } from "react";
import useMetaMask from "../hooks/useMetaMask";

export default function BreedPets() {
  const [response, setResponse] = useState<string | null>(null);
  const { address, connectMetaMask } = useMetaMask();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const childName = formData.get("childName")?.toString();
    const pet1 = formData.get("pet1")?.toString();
    const pet2 = formData.get("pet2")?.toString();
    if (
      !childName || !pet1 || !pet2 || childName?.length < 3
    ) {
      setResponse("Illegal parameters");
    }
    if (!address) {
      connectMetaMask;
      setResponse("Log in and try again");
      return;
    }
    console.log(
      PetsRepository.breedPets(childName!, pet1!, pet2!, address),
    );
    setResponse("done");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField label="child name" fullWidth name="childName" />
        <TextField label="Pet 1 id" fullWidth name="pet1" />
        <TextField label="Pet 2 id" fullWidth name="pet2" />
        <Button type="submit">Submit</Button>
      </form>
      <p>{response ? "" : response}</p>
    </>
  );
}
