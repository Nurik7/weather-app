import React, {useState} from "react";
import {countryList} from "../../Utils/cities_list";
import Lookup from "country-code-lookup";
import Modal from "react-modal";
import {ModalButton, ModalInput, ModalSubtitle, ModalTitle} from "./CountriesDropdownStyles";

export const CountriesDropdown = ({isModalOpen, closeModal, handleSelectCountry}) => {
    const [selectedCityName, setSelectedCityName] = useState("");

    const handleFromCountries = (e) => {
        e.preventDefault();
        const selectedCountry = countryList.find((country) => country.name === selectedCityName)
        const countryData = Lookup.byCountry(selectedCountry.country)
        if (countryData === null) alert("Выбранный город не найден в базе, попробуйте другой")
        else handleSelectCountry(selectedCityName, countryData.iso2)
        closeModal()
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '16px',
            background: "#498CEC"
        },
        overlay: {
            backgroundColor: 'rgba(255, 255, 255, 0.45)'
        }
    };

    return (
        <Modal
            ariaHideApp={false}
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Select Country"
        >
            <ModalTitle>Смена города</ModalTitle>
            <form id={"form"} onSubmit={handleFromCountries}>
                <label>
                    <ModalSubtitle>Введите название города или выберите из списка:</ModalSubtitle>
                    <ModalInput list="capitals" name="myCapitals"
                                onChange={(e) => setSelectedCityName(e.target.value)}/>
                </label>
                <datalist id="capitals">
                    {countryList.map((country, key) => (
                        <option key={key} title={country.code} value={country.name}>
                            {country.name}
                        </option>
                    ))}
                </datalist>
                <ModalButton type="submit">Поиск</ModalButton>
            </form>
        </Modal>
    );
}