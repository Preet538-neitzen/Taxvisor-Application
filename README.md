
<h1 align="center">Invoice Maker</h1>

<h4 align='center'> Repository for the Invoice 2019-2020 project Invoice building and management.</h4>

## File Structure

```
.
├── README.md
├── src/ -> Component files for reactjs
├── public -> Assets
└── requirements.txt
```

## Technology Stack

#### Backend

- Firebase CLI (Realtime DBMS)

#### Frontend

- React 16.6+

## Features

#### SignUp and Authentication

Sign Up is designed in such a way that the company can have different signups for different types of users - customer / intern / core member.

#### Invoices

Invoices show the total number of invoices sent by the user to different people. It also indicates the status of the invoice as well as the taxrate and price.

#### Making an Invoice

- User can add as many invoices as he wants.
- User can add as many items per invoice as desired.
- User can update taxrate, quantity and amount of products. Subsequently, the final price will be generated.
- State and Country are updated automatically after filling the GST-IN number.

#### Email Verification

- After signing up on the platform, the user has to verify the credentials before accessing any tools and services. 

## Screenshots
[![Main.jpg](https://i.postimg.cc/D0h50tyG/Main.jpg)](https://postimg.cc/jw8yk3fq)

[![SignUp.jpg](https://i.postimg.cc/sfJ4KHgn/SignUp.jpg)](https://postimg.cc/mht9gwMM)

[![SignUp2.jpg](https://i.postimg.cc/nhXKFHY5/SignUp2.jpg)](https://postimg.cc/qNd6QHFX)

[![Login.jpg](https://i.postimg.cc/HnW5fHk6/Login.jpg)](https://postimg.cc/gX5nZCRh)

[![Dashboard.jpg](https://i.postimg.cc/Y0Xg7V4M/Dashboard.jpg)](https://postimg.cc/JHktcpc2)

[![Add.jpg](https://i.postimg.cc/25pWCn5b/Add.jpg)](https://postimg.cc/PC4J4pYT)

[![View.jpg](https://i.postimg.cc/9Xxqr6Mj/View.jpg)](https://postimg.cc/Z0dqQDpf)



## Build Instructions

#### Backend Database

```
Update the config file by adding firebase configuration information in .env file
Update rules and regulations in firebase realtime database to read and write in the database.
```

#### Frontend

```bash
  cd InvoiceMaker
  npm install
  npm run start
```

## Development Instructions

1. We have configured the precommit hook for frontend following the `eslint airbnb` guidelines along with `prettier` code formatting. So make sure to follow the above guideline otherwise code will not be commited.
2. The database we are using is firebase realtime database for the prototype.
3. Please follow the directory structure for React JS.

