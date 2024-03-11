# Reservation Website

## `User Routes`

### create Customer

- **Method:** **`POST`**
- **Endpoint:** **`/users/create-customer`**
  **Request Body:**

```json
{
  "password": "customer3",
  "customer": {
    "userName": "customer",
    "name": "Customer Name",
    "email": "customer@gmail.com",
    "phone": "+01234567890"
  }
}
```

### create Provider

- **Method:** **`POST`**
- **Endpoint:** **`/users/create-provider`**
  **Request Body:**

```json
{
  "password": "provider",
  "provider": {
    "userName": "provider",
    "name": "Provider Name",
    "email": "provider@gmail.com",
    "phone": "+01234567890",
    "location": "Address Of Provider",
    "availableSchedule": [
      {
        "day": "Monday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Tuesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Wednesday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Thursday",
        "startTime": "09:00",
        "endTime": "17:00"
      },
      {
        "day": "Friday",
        "startTime": "09:00",
        "endTime": "17:00"
      }
    ]
  }
}
```

### Get Me

- **Method:** **`GET`**
- **Endpoint:** **`/me`**

#### Headers

```bash
Authorization <USER_ACCESS_TOKEN>
```

---

## `Customer Routes`

### Get All customers

- **Method:** **`GET`**
- **Endpoint:** **`/customers`**

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN>
```

### Get Single Customer

- **Method:** **`GET`**
- **Endpoint:** **`/customers/:_id`**

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN | CUSTOMER_ACCESS_TOKEN>
```

### Update Single Customer

- **Method:** **`PATCH`**
- **Endpoint:** **`/customers/:_id`**

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN | CUSTOMER_ACCESS_TOKEN>
```

**Request Body:**

```json
{
  "customer": {
    "name": "Customer Name"
    // Other field to update
  }
}
```

### Delete Single Customer

- **Method:** **`DELETE`**
- **Endpoint:** **`/customers/:_id`**

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN | CUSTOMER_ACCESS_TOKEN>
```

---

## `Provider Routes`

### Get All providers

- **Method:** **`GET`**
- **Endpoint:** **`/providers`**

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN>
```

### Get Single Provider

- **Method:** **`GET`**
- **Endpoint:** **`/providers/:_id`**

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN | PROVIDER_ACCESS_TOKEN>
```

### Update Single provider

- **Method:** **`PATCH`**
- **Endpoint:** **`/providers/:_id`**

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN | PROVIDER_ACCESS_TOKEN>
```

**Request Body:**

```json
{
  "provider": {
    "name": "Provider Name"
    // Other field to update
  }
}
```

### Delete Single Provider

- **Method:** **`DELETE`**
- **Endpoint:** **`/providers/:_id`**

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN | PROVIDER_ACCESS_TOKEN>
```

## Auth Routes

### Login User

- **Method:** **`POST`**
- **Endpoint:** **`/login`**

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "user123"
}
```

**Response Body:**

```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ0YjRmY2QxNzAxYTEyMDZmZDhiZjUiLCJlbWFpbCI344c1ODJtbnNha2lic0BnbWFpbC5jb20iLCJyb2xlIjoicHJvdmlkZXIiLCJpYXQiOjE3MDg1MTc1MjksImV4cCI6MTcxMTEwOTUyOX0.hlmYKTgdDpcKs5X0-5e4-HhU1KOG0Iy-TfwNfEZeU4A",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ0YjRmY2QxNzAxYTEyMDZmZDhiZjUiLCJlbW343CI6Ijc1ODJtbnNha2lic0BnbWFpbC5jb20iLCJyb2xlIjoicHJvdmlkZXIiLCJpYXQiOjE3MDg1MTc1MjksImV4cCI6MTcxMTEwOTUyOX0.eKqo9A1qrLDFN6AhlG5ZOGCKfaBo9SLPpKhno4yZByQ"
  }
}
```

### Verify Email

- **Method:** **`POST`**
- **Endpoint:** **`/verify-email`**

#### Headers

```bash
Authorization <USER_VERIFICATION_EMAIL_TOKEN>
```

**Response Body:**

```json
{
  "email": "user@gmail.com",
  "newPassword": "user123"
}
```

### Change Password

- **Method:** **`POST`**
- **Endpoint:** **`/change-password`**

**Request Body:**

```json
{
  "oldPassword": "customer123",
  "newPassword": "customer321"
}
```

**Response Body:**

```json
{
  "success": true,
  "message": "Password changed successfully",
  "data": null
}
```

### Refresh Token

- **Method:** **`POST`**
- **Endpoint:** **`/refresh-token`**

#### Request Cookies

```bash
refreshToken <USER_REFRESH_TOKEN>
```

**Response Body:**

```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImN1c3RvbWVyMkBleGFtcGxlLmNvbSIsInVzZXJUeXBlIjoiY433zdG9tZXIiLCJpYXQiOjE3MDM5Njk2NDksImV4cCI6MTcwNDA1NjA0OX0.X19IltUNlQB68ktIl-W1vI9faCgU9WUrrR89dFSC_yo"
  }
}
```

### Forget Password

- **Method:** **`POST`**
- **Endpoint:** **`/forget-password`**

#### Request Cookies

**Response Body:**

```json
{
  "email": "user@gmail.com"
}
```

### Reset Password

- **Method:** **`POST`**
- **Endpoint:** **`/reset-password`**

#### Headers

```bash
Authorization <USER_ACCESS_TOKEN>
```

**Response Body:**

```json
{
  "email": "user@gmail.com",
  "newPassword": "user123"
}
```

---

## `Service Routes`

### Create Service

- **Method:** **`POST`**
- **Endpoint:** **`/services`**
- Only provider can add a product

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN  | PROVIDER_ACCESS_TOKEN>
```

```json
{
  "name": "Manicure and Pedicure",
  "description": "Professional nail care service including manicure and pedicure.",
  "provider": "65d4b501d1701a1206fd8bf8",
  "pricePerHour": 40
}
```

### Get All services

- **Method:** **`GET`**
- **Endpoint:** **`/services`**

### Get Single Service

- **Method:** **`GET`**
- **Endpoint:** **`/services/:_id`**

### Update Single Service

- **Method:** **`PATCH`**
- **Endpoint:** **`/services/:_id`**
- Only providers and admin can update a product

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN  | PROVIDER_ACCESS_TOKEN>
```

**Request Body:**

```json
{
  "name": "Sallon",
  "deletedImages": [
    "https://res.cloudinary.com/duuwqmunp/image/upload/v1708356492/Hair%20Wash-%22image%22-0.jpg",
    "https://res.cloudinary.com/duuwqmunp/image/upload/v1708356497/Hair%20Wash-%22image%22-1.jpg",
    "https://res.cloudinary.com/duuwqmunp/image/upload/v1708356500/Hair%20Wash-%22image%22-2.jpg"
  ] // If we want to delete any service image then we have to send as array
  // Other fields to update
}
```

### Delete Single Product

- **Method:** **`DELETE`**
- **Endpoint:** **`/products/:_id`**
- Only providers and admins can delete a product

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN  | PROVIDER_ACCESS_TOKEN>
```

---

## `Booking Routes`

### Create Booking

- **Method:** **`POST`**
- **Endpoint:** **`/booking`**
- Only customer can book any service

#### Headers

```bash
Authorization <CUSTOMER_ACCESS_TOKEN>
```

```json
{
  "customer": "65d39a11517b812d2f2a3bc4", // customer id
  "service": "65d4bd4db59778574378d411", // service id
  "provider": "65d4b501d1701a1206fd8bf8", //provider id
  "schedule": {
    "date": "2024-02-23",
    "startTime": "12:00",
    "endTime": "14:00"
  }
}
```

### Get All Booking

- **Method:** **`GET`**
- **Endpoint:** **`/booking`**

```bash
Authorization <ADMIN_ACCESS_TOKEN>
```

### Get Single Booking

- **Method:** **`GET`**
- **Endpoint:** **`/services/:_id`**

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN | PROVIDER_ACCESS_TOKEN | CUSTOMER_ACCESS_TOKEN>
```

### Delete Booking

- **Method:** **`DELETE`**
- **Endpoint:** **`/booking/:_id`**
- Only providers and admins can delete a product

#### Headers

```bash
Authorization <ADMIN_ACCESS_TOKEN | PROVIDER_ACCESS_TOKEN | CUSTOMER_ACCESS_TOKEN>
```

#### Headers

---

## Upload images in file

- First send all data in text format inside 'data'
- Then send image as file formate and received it with req.file
- Have to parse the file with multer before going to the controller
- Make sure that we have parse text **`req.body.data`** to json format and add in **`req.body`** before data going to validateRequest.

### **`Example:`**

**`Route:`**

#### For single upload

```javascript
router.post(
  "/create-customer",
  upload.single("file"), // parse file with multer
  textToJsonParser, // parse req.data.body which is in text formate to req.body with textToJson Middleware
  validateRequest(CustomerValidations.createCustomerValidationSchema),
  UserControllers.createCustomer,
);
```

#### For multiple upload

```javascript
router.post(
  "/",
  upload.array("files", 10),
  textToJsonParser,
  auth(USER_ROLE.admin, USER_ROLE.provider),

  validateRequest(ServiceValidations.createServiceValidationSchema),
  ServiceControllers.addService,
);
```

---

## Error format

```javascript
res.status(statusCode).json({
    success: false,
    message,
    errorSources = [
      {
        path: '',
        message: error.message,
      },
    ],
    error,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  });
```
