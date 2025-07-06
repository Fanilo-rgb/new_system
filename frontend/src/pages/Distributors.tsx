import Layout from "../components/Layout.tsx";
import Filter from "../components/Filter.tsx";
import Searchbar from "../components/SearchBar/Searchbar.tsx";
import SearchbarContainer from "../components/SearchBar/SearchbarContainer.tsx";
import FilterContainer from "../components/SearchBar/FilterContainer.tsx";
import InformationContainer from "../components/information/InformationContainer.tsx";
import InformationItem from "../components/information/InformationItem.tsx";
import Button from "../components/Button.tsx";
import Modal from "../components/modal/Modal.tsx";
import DistributorForm from "../components/DistributorForm.tsx";
import {useModalStore} from "../../stores/store.ts";
import {AnimatePresence} from "motion/react";

const fakedata = [
  {
    _id: "1",
    number_card: "18053436",
    name: "ANDRIAMBOLOLONA",
    surname: "Faniloniaina Princy",
    cin: "101 000 000 000 000",
    phone: "034 58 205 84",
  },
  {
    _id: "2",
    number_card: "18053436",
    name: "ANDRIAMBOLOLONA",
    surname: "Faniloniaina Princy",
    cin: "101 000 000 000 000",
    phone: "034 58 205 84",
  },
  {
    _id: "3",
    number_card: "18053436",
    name: "ANDRIAMBOLOLONA",
    surname: "Faniloniaina Princy",
    cin: "101 000 000 000 000",
    phone: "034 58 205 84",
  },
  {
    _id: "4",
    number_card: "18053436",
    name: "ANDRIAMBOLOLONA",
    surname: "Faniloniaina Princy",
    cin: "101 000 000 000 000",
    phone: "034 58 205 84",
  },
  {
    _id: "5",
    number_card: "18053436",
    name: "ANDRIAMBOLOLONA",
    surname: "Faniloniaina Princy",
    cin: "101 000 000 000 000",
    phone: "034 58 205 84",
  },
]

const Distributors = () => {
  const { showModal, setShowModal } = useModalStore();

  return (
    <Layout>
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-between">
          <SearchbarContainer>
            <Searchbar/>
            <FilterContainer>
              <Filter text="new"/>
              <Filter text="homme"/>
              <Filter text="femme"/>
            </FilterContainer>
          </SearchbarContainer>
          <Button
            onClick={() => setShowModal(true)}
          >
            Créer un distributeur
          </Button>
        </div>
        <div className="bg-white/90 h-full shadow-md rounded-2xl overflow-hidden">
          <InformationContainer>
            {fakedata.map((data) => (
              <InformationItem key={data._id} data={data} />
            ))}
          </InformationContainer>
        </div>
      </div>
      <AnimatePresence>
        {showModal && (
          <Modal>
            <DistributorForm />
          </Modal>
        )}
      </AnimatePresence>
    </Layout>
  )
}
export default Distributors
