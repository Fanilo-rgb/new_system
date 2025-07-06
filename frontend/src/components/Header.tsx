import {Link} from "react-router-dom";
import {ClipboardList, LayoutDashboard, Plus, UserRound, Wallet} from "lucide-react";
import ChevronButton from "./ChevronButton.tsx";
import IconLink from "./IconLink.tsx";
import {useState} from "react";
import NavContainer from "./nav/NavContainer.tsx";
import NavItem from "./nav/NavItem.tsx";
import NavList from "./nav/NavList.tsx";
import MenuButton from "./MenuButton.tsx";
import { useEffect, useRef } from "react";

const chevronButtonList = [
  {
    icon: <UserRound size={18} />,
    index: 0,
    link: [
      { placeholder: "Ajouter un distributeur", to: "/" },
      { placeholder: "Ajouter un client", to: "/" }
    ]
  },
  {
    icon: <ClipboardList size={18} />,
    index: 1,
    link: [
      { placeholder: "Voir les commandes", to: "/" },
      { placeholder: "Voir les factures", to: "/" }
    ]
  },
]

const Header = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveIndex(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])

  const chevronButtonComponent = chevronButtonList.map((c) => {
    return (
      <NavList key={c.index}>
        <ChevronButton
          icon={c.icon}
          isActive={activeIndex === c.index}
          onToggle={() => setActiveIndex(activeIndex === c.index ? null : c.index)}
          link={c.link}
        />
      </NavList>
    )
  })

  return (
    <div className="inset-shadow-sm inset-shadow-white bg-white/20 h-fit rounded-3xl backdrop-blur-md p-2 flex justify-between items-center">
      <div className="flex gap-4 items-center text-gray-700">
        <Link className="p-2 rounded-2xl border-2 hover:border-white bg-white/50 border-emerald-300 transition-all" to={"/"}>
          <LayoutDashboard size={18}/>
        </Link>
        <h3 className="font-medium hidden sm:block text-base md:text-lg">Distributeurs</h3>
      </div>
      <nav ref={containerRef} className="flex items-center gap-2 h-full rounded-2xl text-base text-gray-800">
        <NavContainer>
          <NavItem placeholder={"Achat"} to={"/"} />
          <NavItem placeholder={"Commande"} to={"/"} />
        </NavContainer>
        <span className="border-1 border-gray-700 h-6"></span>
        <NavContainer>
          <NavList>
            <IconLink icon={<Plus size={18}/>} placeholder="Stock" to="/"/>
          </NavList>
          <NavList>
            <IconLink icon={<Wallet size={18}/>} placeholder="Vente" to="/"/>
          </NavList>
          { chevronButtonComponent }
          <NavList notHidden>
            <MenuButton
              isActive={activeIndex === 3}
              onToggle={() => setActiveIndex(activeIndex === 3 ? null: 3)}
            />
          </NavList>
        </NavContainer>
      </nav>
    </div>
  )
}
export default Header
