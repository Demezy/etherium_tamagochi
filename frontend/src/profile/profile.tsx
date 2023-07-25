import useMetaMask from "../hooks/useMetaMask";

const Profile: React.FC = () => {
  const { address, connectMetaMask } = useMetaMask();

  return (
    <div>
      {address
        ? <p>Connected with address: {address}</p>
        : <button onClick={connectMetaMask}>Connect with MetaMask</button>}
    </div>
  );
};

export default Profile;
