import {useCallback, useEffect, useState} from "react";
import accommodationRepository from "../repository/accommodationRepository.js";
import hostRepository from "../repository/hostRepository.js";
import countryRepository from "../repository/countryRepository.js";

const useAccommodationDetails = (id) => {
    const [state, setState] = useState({
        "accommodation": null,
        "country": null,
        "host": null,
    });

    useEffect(() => {
        if (!id) return;
        accommodationRepository
            .findById(id)
            .then((response) => {
                setState(prevState => ({...prevState, "accommodation": response.data}));
                hostRepository
                    .findById(response.data.hostId)
                    .then((response) => {
                        setState(prevState => ({...prevState, "host": response.data}));
                    })
                    .catch((error) => console.log(error));
                countryRepository
                    .findById(response.data.countryId)
                    .then((response) => {
                        setState(prevState => ({...prevState, "country": response.data}));
                    })
                    .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    }, [id]);

    return state;
};

export default useAccommodationDetails;
