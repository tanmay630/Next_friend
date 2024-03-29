
import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'


 export const getPlacesData  = async (type, sw, ne) => {
    try {
        const { data: { data }} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`
        , {
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
          },
          headers: {
            
            'x-rapidapi-key': 'cc8cc546c4msha5092df11dbd4e2p1aa7b4jsn03647f4cba3d',
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
          }
        });
        return data;
    } catch (error) {
        console.log(error)
    }

}





