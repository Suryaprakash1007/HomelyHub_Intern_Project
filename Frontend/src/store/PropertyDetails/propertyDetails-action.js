import {propertyDetailsActions} from './propertyDetails-slice';

import {axiosInstance} from '../../utils/axios';


export const getPropertyDetails = (id) => async (dispatch) => {
    try {
        dispatch(propertyDetailsActions.getListRequest());
        const response = await axiosInstance.get(`/api/v1/rent/listing/${id}`);
        console.log(response);
        if(!response){
            throw new Error('No response from server');
        }
        const{data} = response.data;
        dispatch(propertyDetailsActions.getPropertyDetails(data));
    }catch (error) {
        dispatch(propertyDetailsActions.getError(error.response.data.error));
    }
}