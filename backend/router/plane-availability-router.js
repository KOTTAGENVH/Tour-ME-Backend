import express from 'express'; 
import axios from 'axios';

const plane_router = express.Router();

// Rapid api call to get the availability of a plane
const getPlaneAvailability = async (req, res) => {
    try {
        const response = await axios.get('https://travel-advisor.p.rapidapi.com/airports/search', {
            params: {
                query: 'colombo',
                locale: 'en_US'
              },
              headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.RAPID_API_HOST,
              }
        });
        res.send(response.data);
    } catch (error) {
        console.error(error);
    }
}

// Get the availability of a plane
plane_router.get('/availability', getPlaneAvailability);

export default plane_router;
