# Net-a-Porter

A web application to track the status of product from inventory. It has four filters to 
get the status of desirable items. All filters are dynamic and can be changed to any other
by minimal changes of code. Code for both server and the client are totally orthogonal with 
minimum coupling, so to increase the efficiency while developing and bug fixing. The number
of data items are quite large. So, optimization has been done on both client side and server side.
## Server-side

Server is built on NodeJS, ExpressJS. And MongoDB is used to serve as database. 

The concept of caching has been implemented to increase the performance. It also reduce the response time and load on database.
Response data pruning has been done to reduce the size of response for faster response.

## Client-side

ReactJS is used as frontend framework. 

In client side optimization is done by not making api call for each query. It is loading all data from server at initial rendering
and then for different queries processing the data at the client side, so that user can get better user experience. 

## Deployment

Heroku is used as a platform for deployment of application.
https://net-a-porter1.herokuapp.com/

## How to run it in local machine

```
cd client && npm install && npm run build

npm install && npm start
```
The first command will install the dependencies for frontend part and build it.

The second command will install the dependencies for server-side and will serve it on port 8080.

http://localhost:8080/

## How to change the filter dynamically

There are four types of filter

(i)Comparable - Can be used to filter items based on comparison with some numerical value. It can be used to filter by comparing Regular price, Offer price, Discount etc.

(ii) Searchable Filter - Can be used to filter items by string matching. Suitable for properties like brand name, name, description_text etc.

(iii) Boolean Filter - Can be used to filter items by properties with boolean value (true or false) like stock_availability.

(iv) Date in Range - Can be used to find that a date is in the given range. It can be used to filter items upon properties like created_at,update_at.

It is a simple process, you just have to change Four variables, two in client-side and two on server-side. No other code changes are required.
Steps to change filters:

### Client-side

Step I : Go to client/constants/FiltersType.js and add filter of your need in filterType array. It si is supposed to keep information about the filters.

Step II : In the same file add the information about attribute on which you want to apply the filter.

### Server-side

Step I : Go to server/controllers/processFilters.js and add the query_parameter which will keep the information about the attribute on which filter has to be applied.

Step II: Go to server/controllers/product-controller.js and add the your parameter in response data variable.(It is required because we are doing pruning of unnecessary data to reduce the response data size.)
