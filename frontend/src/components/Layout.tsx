import type {ReactNode} from "react";
import Header from "./Header.tsx";

type layoutProps = {
  children: ReactNode;
}

const Layout = ({ children }: layoutProps) => {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="p-2 z-10">
        <Header/>
      </div>
      <div className="relative flex-1 p-2">{children}</div>
    </div>
  )
}
export default Layout
