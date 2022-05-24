import axios from 'axios';

const USER_API_URL = 'https://e-commerce-backend-php.000webhostapp.com';
// const USER_API_URL = 'https://localhost/e-commerce-php';

class ProductService {
    
    // Obtain products from database..
    getProducts(){
        return axios.get(`${USER_API_URL}/index.php`);
    }
}

export default new ProductService()