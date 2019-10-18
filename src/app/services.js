import axios from 'axios';
import {api} from "./components/UrlContainer";

export const storeUrlMappings = async urlMapping => {
    try {
        const res = await axios.post(`${api}/setUrl/`,
            {
                id: urlMapping.id,
                realUrl: urlMapping.realUrl,
                newUrl: urlMapping.newUrl
            },
        );
        console.log(res)
        return res;
    }
    catch(e){
        console.log(e)
    }
};

export const getUrlMappings = async(id)=>{
    console.log(id);

    const res= await axios.get( `${api}/getUrl/${id}`,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
    return res.data[0].realUrl;
}

export const checkForExistingUrl = async realUrl => {
    try {
        const res = await axios.post(`${api}/checkUrl/`,
            {
                realUrl: realUrl,
            },
        );
        return res.data;
    }
    catch(e){
        console.log(e)
    }
};

export const checkForExistingId = async id => {
    try {
        const res = await axios.post(`${api}/checkId/`,
            id,
        );
        return res.data;
    }
    catch(e){
        console.log(e)
    }
};