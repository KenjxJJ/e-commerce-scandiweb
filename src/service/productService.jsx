import axios from "axios";

const USER_API_URL = "https://e-commerce-backend-php.000webhostapp.com";
//const USER_API_URL = "https://localhost/e-commerce-php/";

// Configuration for post data from the form
const POST_CONFIG = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json;charset=UTF-8",
  },
};

class ProductService {
  // Obtain products from database..
  getProducts() {
    return axios.get(`${USER_API_URL}`);
  }

  //   Send json object to the backend
  async saveProduct(formData) {
    await axios.post(`${USER_API_URL}/create.php`, formData, POST_CONFIG);
  }

  deleteProductsByIds(checkedItemsById) {
    const obj = {
      deleteObject: checkedItemsById,
    };
    console.log(JSON.stringify(obj));
  }
}

export default new ProductService();
