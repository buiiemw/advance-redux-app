import { selectAuthState } from "../../redux-toolkit/auth/auth-slice";
import { useAppSelector } from "../../redux-toolkit/hooks";


const DHome = () => {
  const { account } = useAppSelector(selectAuthState);

  return (
    <div>Welcome: {account?.firstName} {account?.lastName}</div>
  )
}

export default DHome;