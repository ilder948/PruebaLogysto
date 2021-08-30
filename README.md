# Prueba tecnica backend logysto

### Ildebrando Mora Valdes

### ilder948@gmail.com

### 3142613909

<hr>

<hr>
# Endpoints

**urlBase**: `localhost:3000`

### Register

> POST  
> `{{urlBase}}/register`

- No requiere autenticacion

**Body json**

```json
{
	"firstname": String,
	"lastname": String,
	"email": String,
	"password": String
}
```

**Successful response**

```json
{
  "code": 201,
  "status": "Ok",
  "user": {
    "id": Number,
    "firstname": String,
    "lastname": String,
    "email": String
  }
}
```

**Error Response**

- User existe

```json
{
  "code": 403,
  "status": "Error",
  "error": "User is already registered"
}
```

- Empty field

```json
{
  "code": 403,
  "status": "Error",
  "error": "Incomplete data"
}
```

- Other Error

```json
{
  "code": 403,
  "status": "Error",
  "error": "Error registering data"
}
```

### Login

> GET  
> `{{urlBase}}/login`

- No requiere autenticacion

**Body json**

```json
{
	"email": String,
	"password": String
}
```

**Successful response**

```json
{
  "status": 200,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODcsImlhdCI6MTYzMDM2Mjc2NH0.cvCCoZ16WGWQ1GbZCl7zRcO0BF_P33psORCxB3uY3q4"
}
```

**Error Response**

- User not found

```json
{
  "error": "No such user found"
}
```

- wrong credentials

```json
{
  "error": "User or password incorrect"
}
```

## Search Address

> GET
> `{{urlBase}}/search`

### Bearer Authentication

`bearer {{token}}`

### Query Params

**_streetName_**: Calle, Carrera, diagonal, transversal, avenida, etc.

**_streetNumber_**: Number of **streetName**.

**_number_**: Complement of address.

**_city_**: City ​​where the address is to be found. Example: `Bogota, Cali, Medellin, etc`.

**_country_**: City ​​where the address is to be found. Example: `Colombia`.

**Request Example**

> `{{urlBase}}/search?streetName=Calle&streetNumber=101&number=70g-65&city=Bogota&country=Colombia`

**Successful response**

```json
{
  "code": 200,
  "status": "Ok",
  "data": {
    "address": "Calle 102 70G-65, 111121 Bogotá, D.C., Colombia",
    "location": {
      "lat": 4.69839,
      "lng": -74.07701
    }
  }
}
```

**Address not found**

```json
{
  "code": 200,
  "status": "Ok",
  "data": "Address not found"
}
```
