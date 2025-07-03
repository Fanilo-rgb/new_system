import {Link} from "react-router-dom";

type listType = {
  title: string,
  links: { placeholder: string; url?: string; type?: string }[],
}

const list: listType[] = [
  {
    title: "+ Ajout",
    links: [
      { placeholder: "Ajout tock", url: "/" },
      { placeholder: "Ajout client"},
      { placeholder: "Ajout distributeur"},
    ]
  },
  {
    title: "Shop",
    links: [
      { placeholder: "Ventes", url: "/" },
      { placeholder: "Commandes", url: "/" },
      { placeholder: "Factures", url: "/" },
    ]
  }
]

const HamburgerList = () => {
  const listComponent = list.map(item => (
    <>
      <li className="w-full">
        <p className="text-gray-600 text-xs py-2">{item.title}</p>
        <ul>
          {item.links.map((link) => (
            <li className="flex">
              {link.url ?
                (<Link to={link.url} className=" bg-transparent hover:bg-black/10 w-full p-2 rounded-md transition-all">
                  {link.placeholder}
                </Link>)
                :
                (<button className="bg-transparent flex items-start hover:bg-black/10 w-full p-2 rounded-md transition-all">
                  {link.placeholder}
                </button>)
              }
            </li>
          ))}
        </ul>
      </li>
      <span className="border border-gray-500 w-28" ></span>
    </>
  ))

  return (
    <div className="absolute right-0 top-12 bg-white/90 w-fit rounded-xl overflow-hidden text-sm">
      <ul className="p-2 flex flex-col gap-2 w-48 items-center">
        {listComponent}
      </ul>
    </div>
  )
}
export default HamburgerList
