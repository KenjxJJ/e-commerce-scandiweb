import axios from 'axios';

const USER_API_URL = 'http://localhost/e-commerce-php';

class ProductService {
    
    // Obtain products from database..
    getProducts(){
        return axios.get(`${USER_API_URL}/read.php`);
    }
}

export default new ProductService()