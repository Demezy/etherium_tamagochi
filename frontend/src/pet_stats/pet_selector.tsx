export default function PetSelector() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement);
    const pet1 = formData.get("id")!.toString();
    console.log(pet1);
    location.replace(`/pet_stats/${pet1}`)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Pet id:
        <input type="number" name="id" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
