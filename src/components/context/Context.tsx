import { ReactNode, SetStateAction } from "react";
import { useState, createContext, Dispatch } from "react";

export type User = {
  name: string;
  email: string;
};

export interface UserContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}
type values = {
  value1: string;
  value2: string;
};
const values: values = {
  value1: "",
  value2: "",
};
values["value1"] =
  "The best online platform for your medical needs and emergency";
values["value2"] =
  "We offer a comprehensive suite of services to address your medical needs and provide assistance during emergencies.";

const defaultState = {
  user: {
    name: "",
    email: "",
  },
  setUser: (_user: User) => {},
} as UserContextInterface;

export const UserContext = createContext(defaultState);
export const Page2Context = createContext(values);

type UserProviderProps = {
  children: ReactNode;
};

export default function UserProvider(props: UserProviderProps) {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Page2Context.Provider value={values}>
        {props.children}
      </Page2Context.Provider>
    </UserContext.Provider>
  );
}
