import axios from 'axios'

const Request = async (endpoint, body, session) => {
    try {

        if(!session){
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_IP}${endpoint}`, body);
            if (response.data) {
              return response.data;
            }
            return res.json({msg:"Error"})
        }

        const headers = {
            'Authorization': `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)sessionid\s*=\s*([^;]*).*$)|^.*$/, "$1")}`
        };

        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_IP}${endpoint}`, body, { headers });
        if (response.data) {
          return response.data;
        }
        return res.json({msg:"Error"})

    } catch (error) {
        console.log(error)
    }
}

export default Request