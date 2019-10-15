import axios from 'axios';

export const storeUrlMappings = async urlMapping => {
    console.log('here'
    )
    try {
        const res = await axios.post(`http://localhost:3000/setUrl/`,
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

    const res= await axios.get( `http://localhost:3000/getUrl/${id}`,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
    return res.data[0].realUrl;
}

export const checkForExistingUrl = async realUrl => {
    try {
        const res = await axios.post(`http://localhost:3000/checkUrl/`,
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
        const res = await axios.post(`http://localhost:3000/checkId/`,
            id,
        );
        return res.data;
    }
    catch(e){
        console.log(e)
    }
};