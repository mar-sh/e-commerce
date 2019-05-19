# e-commerce

## API-Documentation

|No|Route|HTTP Method|Request|Response(success)|Description|
|---|---|---|---|---|---|
1|/register| POST|```body: {username, email, password} ``` | ``` status(201), body: {currentUser: { id, email, role} , token: jwt} ```|User Register
2|/login|POST|```body: {email, password} ```|``` status(200), body: {currentUser: { id, email, role}, token: jwt} ```|  User login|
3|/products| GET | ``` none ``` | ```status(200), body: {products: array of objects} ``` | Get all products
4|/products| POST| ```headers: {Authorization: accessToken}```| ```status(201), body: {product: object } ``` | Add a product
5|/products/:id| GET | ``` params: { productID: ObjectID } ``` | ```status(200), body: {product: object } ```|Get a product by id
6|/products/:id| PUT |```headers: {Authorization: accessToken}```| ```status(200), body: {product: object } ``` | Edit a product
7|/products/delete/:id| DELETE | ```headers: {Authorization: accessToken}, params: {productID}``` | ```status(204), body: none ```|   Delete a product by id |
8|/carts| GET | ```headers: {Authorization: accessToken}``` | ```status(200), body: {carts: array of objects} ``` | Get all carts by user id
9|/carts| POST |```headers: {Authorization: accessToken}``` | ```status(201), body: {cart: object} ``` | Add a cart item
10|/carts/:id| DELETE |```headers: {Authorization: accessToken}``` | ```status(204), body: none ``` |  Delete cart by id |
11|/carts/:id|GET |```headers: {Authorization: accessToken}``` | ```status(204), body: none ``` |  Get a cart by id |
12|/transactions|POST |```headers: {Authorization: accessToken}, body:{ cartId, userId, userAddress, userContact, totalCharge }``` | ```status(201), body: {transaction: {..., status, confirmed}} ``` |  Create a new transaction(checkout)|
13|/transactions|GET |```headers: {Authorization: accessToken(admin)}``` | ```status(200), body: transactions: [{tx}, {tx}] ``` |  Get all transactions( admin only ) |
14|/transactions/:id|PATCH |```headers: {Authorization: accessToken}, body: { status: (delivering || delivered || completed) || confirmed: true } ``` | ```status(200), body: {updated transaction} ``` |  Edit transaction status |
15|/transactions/admin|GET |```headers: {Authorization: accessToken}``` | ```status(200), body: [{tx}, {tx}] ``` |  Get all transactions(admin only) |
16|/carts|DELETE |```headers: {Authorization: accessToken}``` | ```status(204), body: none ``` |  Delete all carts(admin only) |

### Run test
```
npm run test
```
