# Pizzeria API
Welcome to the Pizzeria API! This API provides endpoints to manage users and products for a pizzeria application. With this API, you can perform operations such as registering users, updating user information, managing user carts, listing products, and more.

## Getting Started
To get started with using the Pizzeria API, follow these steps:

### Prerequisites
- Make sure you have Node.js installed on your machine.
- Ensure you have npm (Node Package Manager) installed.

### Installation
1. Clone the repository to your local machine:
 ```bash
git clone https://github.com/LeeYooBin/Pizzaria-API.git
 ```
2. Navigate to the project directory:
```bash
cd Pizzaria-API
```
3. Install dependencies:
```bash
yarn install
```
or
```bash
npm install
```
4. Start the development server:
```bash
yarn dev
```
or
```bash
npm dev
```
5. The server will start running at http://localhost:8080.

### Documentation
The API documentation is available in the api-docs directory. It provides detailed information about the available endpoints, request parameters, request bodies, and response codes.

###Usage
You can use tools like Postman or curl to interact with the API endpoints. Refer to the API documentation for details on how to make requests to each endpoint.

## Endpoints

### /users
- **POST**: User registration and authentication.

### /users/{id}
- **PUT**: Updates information for a specific user by ID.
- **DELETE**: Deletes a specific user by ID.

### /users/cart/add
- **POST**: Add a product to a specific user's cart.

### /users/cart/remove/{id}
- **DELETE**: Removes a product from a specific user's cart.

### /products
- **GET**: Lists all products registered in the API.
- **POST**: Registers a new product in the API.

### /products/{id}
- **GET**: Gets the products registered in the API.
- **PUT**: Updates information for a specific product by ID.
- **DELETE**: Deletes a specific product by ID.



License
This project is licensed under the MIT License.
