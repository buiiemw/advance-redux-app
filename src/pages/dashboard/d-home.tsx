import { useAccount } from "../../hooks/use-account";

const DHome = () => {
  const { account } = useAccount();

  return (
    <div>
      Welcome: {account?.firstName} {account?.lastName} Role: {account?.role}
    </div>
  );
};

export default DHome;
