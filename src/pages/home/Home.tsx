import React from 'react';
import Introduction from './components/Introduction';
import Employees from './components/Employees';
import Modal from '../../components/modals/Modal';
import { useTranslation } from 'react-i18next';
import AddEmployeeForm from './components/add-emplyee/AddEmployeeForm';

interface props {
}

const Home: React.FC<props> = () => {
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = React.useState(false);
    const {t} = useTranslation();
    return (
        <div>
            <Introduction />
            <Employees setIsAddEmployeeModalOpen={setIsAddEmployeeModalOpen} />
            <Modal isOpen={isAddEmployeeModalOpen} setIsOpen={setIsAddEmployeeModalOpen} title={t("ADD_NEW_EMPLOYEE")}>
                {/* <AddEmployeeForm setIsAddEmployeeModalOpen={setIsAddEmployeeModalOpen} /> */}
                <AddEmployeeForm setIsAddEmployeeModalOpen={setIsAddEmployeeModalOpen} />
            </Modal>
        </div>
    );
};

export default Home;