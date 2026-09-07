# API Endpoints - SIMPLE JKN SKH
## LOCATION
#### POST `/location`
- **Description**: Create a new location.
- **Request Body**:
  ```json
  {
    "location": "Lokasi Anda",
  }
  ```
- **Response**:
  - **Success**:
  ```json
  {
    "code": 201,
    "status": "success",
    "message": "lokasi berhasil ditambahkan",
    "data": {
        "id": "location-y9c0kYqHp6"
    }
  }
  ```
  - **Error**: 400 status, message "lokasi sudah ada".
  - **Error**: 500 status, message "Gagal membuat lokasi".

#### GET `/location`
- **Description**: Retrieve all location entries.
- **Query Params**: ?search={input}
- **Response**:
  - **Success**:
  ```json
  {
      "code": 200,
      "status": "success",
      "message": "Success mengambil data lokasi",
      "data": [
          {
              "id": "location-twmkOlm33c",
              "name_location": "PKU Sukoharjo",
              "created_at": "2026-08-22T23:19:12.000Z",
              "updated_at": "2026-08-22T23:19:12.000Z"
          }
      ]
  }
  ```
  - **Error**: 500 status, message "Gagal memuat lokasi".

#### GET `/location/:id`
- **Description**: Retrieve a specific location entry by ID.
- **Response**:
  - **Success**:
  ```json
  {
      "code": 200,
      "status": "success",
      "message": "Success mengambil data lokasi",
      "data": {
          "id": "location-y9c0kYqHp6",
          "name_location": "Rumah Sakit Anda",
          "created_at": "2026-08-22T23:36:36.000Z",
          "updated_at": "2026-08-22T23:36:36.000Z"
      }
  }
  ```
  - **Error**: 500 status, message "Gagal memuat lokasi".

#### PUT `/location/:id`
- **Description**: Update a location entry.
- **Request Body**:
  ```json
  {
    "location": "Rumah Sakit Baru",
  }
  ```
- **Response**:
  - **Success**:
  ```json
  {
      "code": 200,
      "status": "success",
      "message": "lokasi berhasil diubah",
      "data": {
          "id": "location-y9c0kYqHp6"
      }
  }
  ```
  - **Error**: 400 status, message "lokasi sudah ada".
  - **Error**: 500 status, message "lokasi gagal diubah".

#### DELETE `/location/:id`
- **Description**: Delete a specific location entry by ID.
- **Response**:
  - **Success**:
  ```json
  {
      "code": 200,
      "status": "success",
      "message": "lokasi berhasil dihapus",
      "data": {
          "id": "location-y9c0kYqHp6"
      }
  }
  ```
  - **Error**: 500 status, message "lokasi gagal dihapus".


## HOSPITAL
#### POST `/hospital`
- **Description**: Create a new hospital.
- **Request Body**:
  ```json
  {
    "hospital": "Rumah Sakit Anda",
  }
  ```
- **Response**:
  - **Success**:
  ```json
  {
    "code": 201,
    "status": "success",
    "message": "Rumah Sakit berhasil ditambahkan",
    "data": {
        "id": "hospital-y9c0kYqHp6"
    }
  }
  ```
  - **Error**: 400 status, message "Rumah Sakit sudah ada".
  - **Error**: 500 status, message "Gagal membuat Rumah Sakit".

#### GET `/hospital`
- **Description**: Retrieve all hospital entries.
- **Query Params**: ?search={input}
- **Response**:
  - **Success**:
  ```json
  {
      "code": 200,
      "status": "success",
      "message": "Success mengambil data Rumah Sakit",
      "data": [
          {
              "id": "hospital-twmkOlm33c",
              "name_hospital": "PKU Sukoharjo",
              "created_at": "2026-08-22T23:19:12.000Z",
              "updated_at": "2026-08-22T23:19:12.000Z"
          }
      ]
  }
  ```
  - **Error**: 500 status, message "Gagal memuat Rumah Sakit".

#### GET `/hospital/:id`
- **Description**: Retrieve a specific hospital entry by ID.
- **Response**:
  - **Success**:
  ```json
  {
      "code": 200,
      "status": "success",
      "message": "Success mengambil data Rumah Sakit",
      "data": {
          "id": "hospital-y9c0kYqHp6",
          "name_hospital": "Rumah Sakit Anda",
          "created_at": "2026-08-22T23:36:36.000Z",
          "updated_at": "2026-08-22T23:36:36.000Z"
      }
  }
  ```
  - **Error**: 500 status, message "Gagal memuat Rumah Sakit".

#### PUT `/hospital/:id`
- **Description**: Update a hospital entry.
- **Request Body**:
  ```json
  {
    "hospital": "Rumah Sakit Baru",
  }
  ```
- **Response**:
  - **Success**:
  ```json
  {
      "code": 200,
      "status": "success",
      "message": "Rumah Sakit berhasil diubah",
      "data": {
          "id": "hospital-y9c0kYqHp6"
      }
  }
  ```
  - **Error**: 400 status, message "Rumah Sakit sudah ada".
  - **Error**: 500 status, message "Rumah Sakit gagal diubah".

#### DELETE `/hospital/:id`
- **Description**: Delete a specific hospital entry by ID.
- **Response**:
  - **Success**:
  ```json
  {
      "code": 200,
      "status": "success",
      "message": "Rumah Sakit berhasil dihapus",
      "data": {
          "id": "hospital-y9c0kYqHp6"
      }
  }
  ```
  - **Error**: 500 status, message "Rumah Sakit gagal dihapus".

## NEED
#### POST `/need`
- **Description**: Create a new need.
- **Request Body**:
  ```json
  {
    "need": "Nama keperluan Anda",
  }
  ```
- **Response**:
  - **Success**:
  ```json
  {
    "code": 201,
    "status": "success",
    "message": "Nama keperluan berhasil ditambahkan",
    "data": {
        "id": "need-y9c0kYqHp6"
    }
  }
  ```
  - **Error**: 400 status, message "Nama keperluan sudah ada".
  - **Error**: 500 status, message "Gagal membuat Nama keperluan".

#### GET `/need`
- **Description**: Retrieve all need entries.
- **Query Params**: ?search={input}
- **Response**:
  - **Success**:
  ```json
  {
      "code": 200,
      "status": "success",
      "message": "Success mengambil data Nama keperluan",
      "data": [
          {
              "id": "need-twmkOlm33c",
              "name_need": "Pembuatan Akun",
              "created_at": "2026-08-22T23:19:12.000Z",
              "updated_at": "2026-08-22T23:19:12.000Z"
          }
      ]
  }
  ```
  - **Error**: 500 status, message "Gagal memuat Nama keperluan".

#### GET `/need/:id`
- **Description**: Retrieve a specific need entry by ID.
- **Response**:
  - **Success**:
  ```json
  {
      "code": 200,
      "status": "success",
      "message": "Success mengambil data Nama keperluan",
      "data": {
          "id": "need-y9c0kYqHp6",
          "name_need": "Nama keperluan Anda",
          "created_at": "2026-08-22T23:36:36.000Z",
          "updated_at": "2026-08-22T23:36:36.000Z"
      }
  }
  ```
  - **Error**: 500 status, message "Gagal memuat Nama keperluan".

#### PUT `/need/:id`
- **Description**: Update a need entry.
- **Request Body**:
  ```json
  {
    "need": "Nama keperluan Baru",
  }
  ```
- **Response**:
  - **Success**:
  ```json
  {
      "code": 200,
      "status": "success",
      "message": "Nama keperluan berhasil diubah",
      "data": {
          "id": "need-y9c0kYqHp6"
      }
  }
  ```
  - **Error**: 400 status, message "Nama keperluan sudah ada".
  - **Error**: 500 status, message "Nama keperluan gagal diubah".

#### DELETE `/need/:id`
- **Description**: Delete a specific need entry by ID.
- **Response**:
  - **Success**:
  ```json
  {
      "code": 200,
      "status": "success",
      "message": "Nama keperluan berhasil dihapus",
      "data": {
          "id": "need-y9c0kYqHp6"
      }
  }
  ```
  - **Error**: 500 status, message "Nama keperluan gagal dihapus".

## INFORMATION
#### POST `/information`
- **Description**: Create a new information.
- **Request Body**:
  ```json
  {
    "information": "Nama informasi Anda",
  }
  ```
- **Response**:
  - **Success**:
  ```json
  {
    "code": 201,
    "status": "success",
    "message": "Nama informasi berhasil ditambahkan",
    "data": {
        "id": "information-y9c0kYqHp6"
    }
  }
  ```
  - **Error**: 400 status, message "Nama informasi sudah ada".
  - **Error**: 500 status, message "Gagal membuat Nama informasi".

#### GET `/information`
- **Description**: Retrieve all information entries.
- **Query Params**: ?search={input}
- **Response**:
  - **Success**:
  ```json
  {
      "code": 200,
      "status": "success",
      "message": "Success mengambil data Nama informasi",
      "data": [
          {
              "id": "information-twmkOlm33c",
              "name_information": "Pembuatan Akun",
              "created_at": "2026-08-22T23:19:12.000Z",
              "updated_at": "2026-08-22T23:19:12.000Z"
          }
      ]
  }
  ```
  - **Error**: 500 status, message "Gagal memuat Nama informasi".

#### GET `/information/:id`
- **Description**: Retrieve a specific information entry by ID.
- **Response**:
  - **Success**:
  ```json
  {
      "code": 200,
      "status": "success",
      "message": "Success mengambil data Nama informasi",
      "data": {
          "id": "information-y9c0kYqHp6",
          "name_information": "Nama informasi Anda",
          "created_at": "2026-08-22T23:36:36.000Z",
          "updated_at": "2026-08-22T23:36:36.000Z"
      }
  }
  ```
  - **Error**: 500 status, message "Gagal memuat Nama informasi".

#### PUT `/information/:id`
- **Description**: Update a information entry.
- **Request Body**:
  ```json
  {
    "information": "Nama informasi Baru",
  }
  ```
- **Response**:
  - **Success**:
  ```json
  {
      "code": 200,
      "status": "success",
      "message": "Nama informasi berhasil diubah",
      "data": {
          "id": "information-y9c0kYqHp6"
      }
  }
  ```
  - **Error**: 400 status, message "Nama informasi sudah ada".
  - **Error**: 500 status, message "Nama informasi gagal diubah".

#### DELETE `/information/:id`
- **Description**: Delete a specific information entry by ID.
- **Response**:
  - **Success**:
  ```json
  {
      "code": 200,
      "status": "success",
      "message": "Nama informasi berhasil dihapus",
      "data": {
          "id": "information-y9c0kYqHp6"
      }
  }
  ```
  - **Error**: 500 status, message "Nama informasi gagal dihapus".