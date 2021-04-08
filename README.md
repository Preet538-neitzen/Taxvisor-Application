
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

![Login](https://postimg.cc/jw8yk3fq)

![SignUp](https://user-images.githubusercontent.com/48253287/89116464-fd2b6180-d4b1-11ea-812f-d8b8554663b7.png)

![Dashboard](https://user-images.githubusercontent.com/48253287/89116459-f997da80-d4b1-11ea-9f6c-684d86384b7c.png)

![Create Invoice](https://user-images.githubusercontent.com/48253287/89116460-fac90780-d4b1-11ea-9362-08aa049206bf.png)

![View Invoices](https://user-images.githubusercontent.com/48253287/89116461-fb619e00-d4b1-11ea-866d-9a58076ec773.png)



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

