import Layout from "../components/Layout.tsx";
import Filter from "../components/Filter.tsx";
import Searchbar from "../components/SearchBar/Searchbar.tsx";
import SearchbarContainer from "../components/SearchBar/SearchbarContainer.tsx";
import FilterContainer from "../components/SearchBar/FilterContainer.tsx";
import InformationContainer from "../components/information/InformationContainer.tsx";
import InformationItem from "../components/information/InformationItem.tsx";
import Button from "../components/Button.tsx";
import Modal from "../components/modal/Modal.tsx";
import {useModalStore} from "../../stores/store.ts";
import {AnimatePresence} from "motion/react";
import {useDistributorStore} from "../../stores/distributorStore.ts";
import {useEffect} from "react";
import LoadingComponent from "../components/LoadingComponent.tsx";
import DistributorForm from "../components/form/DistributorForm.tsx";

const Distributors = () => {
  const { showModal, setShowModal } = useModalStore();

  const { fetchDistributors, distributors, isLoading } = useDistributorStore();

  useEffect(() => {
    fetchDistributors();
  }, [])

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
          <AnimatePresence>
            {isLoading
              ? (
                <LoadingComponent/>
              )
              : (
                <InformationContainer>
                  {distributors.map((data, index) => (
                    <InformationItem key={data._id} data={data} index={index} />
                  ))}
                </InformationContainer>
              )
            }
          </AnimatePresence>
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
