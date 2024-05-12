# Backend Documentation

## Naming API Routing

## ADMIN ROUTING

**Login** <br>

```
Method : POST
Route : http://localhost:5000/auth/login

Body :
{
    "email" : "nunusaputra17@gmail.com",
    "password" : "encem123"
}
```

**Logout**

```
Method : DELETE
Route : http://localhost:5000/auth/logout
```

**Profile**

```
Method : GET
Route : http://localhost:5000/auth/me
```

### API ROLES PERMISSION

**Get All User**

```
Method : GET
Route : http://localhost:5000/admin
```

**Get User By Id**

```
Method : GET
Route : http://localhost:5000/admin/{id}
```

**Create User**

```
Method : POST
Route : http://localhost:5000/admin/

Body :
{
    "name" : "Wisnu Saputra",
    "email" : "nunusaputra17@gmail.com",
    "password" : "wisnusaputra17",
    "confPassword" : "wisnusaputra17",
    "role" : "mitra"
}
```

**Delete User**

```
Method : DELETE
Route : http://localhost:5000/admin/{id}
```

**Update User**

```
Method : PUT
Route : http://localhost:5000/admin/{id}

Body :
{
    "name" : "Wisnu Saputra",
    "email" : "nunusaputra17@gmail.com",
    "password" : "wisnusaputra17",
    "confPassword" : "wisnusaputra17",
    "role" : "mitra"
}
```

### ADMIN FITUR (INFORMATION) API

**Create Information**

```
    Method : POST
    Router : http://localhost:5000/admin/info

    Body :
    {
        "title" : "Konversi SKS",
        "author" : "Fasilkom",
        "desc" : "Lorem ipsum color sit de amet"
    }
```

### ADMIN FITUR (EDIT PROFILE) API

```
    Method : POST
    Router : http://localhost:5000/admin/edit/:id

    Body :
    {
        "name" : "Wisnu Saputra",
        "email" : "nunusaputra17@gmail.com",
        "profile" : "",
        "alamat" : "Jakarta",
        "no_telpon" : "08821232765",
        "desc" : "Official account of Fasilkom Unsika"
    }
```

### ADMIN FITUR (CHANGE PASSWORD) API

```
    Method : PUT
    Router : http://localhost:5000/mitra/change-pass/:id

    Body :
    {
        "currentPassword" : "naonsiah17",
        "newPassword" : "markoding123",
        "confPassword" : "markoding123"
    }
```

### ADMIN FITUR MELIHAT PLOTING DOSEN PEMBIMBING
```
    Method : GET
    Router : http://localhost:5000/admin/dosen-pembimbing
```

### ADMIN FITUR MELIHAT PLOTING DOSEN PEMBIMBING BERDASARKAN ID
```
    Method : GET
    Router : http://localhost:5000/admin/dosen-pembimbing/:id
```

### ADMIN FITUR MENGHAPUS DATA PLOTING DOSEN PEMBIMBING 
```
    Method : DELETE
    Router : http://localhost:5000/admin/dosen-pembimbing/:id
```

### ADMIN FITUR MELIHAT LAPORAN MAGANG 
```
    Method : GET
    Router : http://localhost:5000/admin/laporan
```

### ADMIN FITUR MELIHAT LAPORAN MAGANG BERDASARKAN ID
```
    Method : GET
    Router : http://localhost:5000/admin/laporan/:id
```

### ADMIN FITUR MENGHAPUS LAPORAN MAGANG 
```
    Method : DELETE
    Router : http://localhost:5000/admin/laporan/:id
```


## MITRA ROUTING

**Login** <br>

```
Method : POST
Route : http://localhost:5000/auth/login

Body :
{
    "email" : "markoding123@gmail.com",
    "password" : "markoding123"
}
```

**Logout**

```
Method : DELETE
Route : http://localhost:5000/auth/logout
```

**Profile**

```
Method : GET
Route : http://localhost:5000/auth/me
```

### MITRA FITUR (EDIT PROFILE) API

```
    Method : PUT
    Router : http://localhost:5000/mitra/edit/:id

    Body :
    {
        "name" : "Skilvul",
        "email" : "markoding123@gmail.com",
        "alamat" : "Bandung",
        "no_telpon" : "08821232884",
        "desc" : "The best online edu tech in the world"
    }
```

### MITRA FITUR (CHANGE PASSWORD) API

```
    Method : PUT
    Router : http://localhost:5000/mitra/change-pass/:id

    Body :
    {
        "currentPassword" : "naonsiah17",
        "newPassword" : "markoding123",
        "confPassword" : "markoding123"
    }
```

### MITRA FITUR (UPLOAD JOB) API

**CREATE**

```
    Method : POST
    Router : http://localhost:5000/mitra/job

    Body :
    {
        "jobTitle": "Software Development Intern",
        "maxApplicants": 5,
        "maxPositions": 4,
        "jobType": "Internship",
        "salary": 4000000,
        "skillSet": "Golang",
        "duration": 3,
        "jobPost": "2024-02-11",
        "deadline": "2024-05-11",
        "desc" : "Dicari software development intern"
    }
```

**READ**

```
    Method : GET
    Router : http://localhost:5000/mitra/job
```

**READ (BY ID)**

```
    Method : GET
    Router : http://localhost:5000/mitra/job/:id
```

**UPDATE**

```
    Method : PUT
    Router : http://localhost:5000/mitra/job/:id

    Body :
    {
        "jobTitle": "Software Development Intern",
        "maxApplicants": 5,
        "maxPositions": 4,
        "jobType": "Internship",
        "salary": 4000000,
        "skillSet": "Golang",
        "duration": 3,
        "jobPost": "2024-02-11",
        "deadline": "2024-05-11",
        "desc" : "Dicari software development intern"
    }    
```

**DELETE**

```
    Method : DELETE
    Router : http://localhost:5000/mitra/job/:id
```

### FITUR GET ALL LOGBOOK MITRA
```
    Method  : GET
    Router  : http://localhost:5000/mitra/logbook
```

### FITUR GET LOGBOOK MITRA BY ID
```
    Method  : GET
    Router  : http://localhost:5000/mitra/logbook/:id
```

## MAHASISWA ROUTING

### FITUR REGISTRASI (MAHASISWA) 
```
    Method : POST
    Router : http://localhost:5000/mahasiswa/register

    Body : 
    {
        "name" : "Jhon Doe",
        "email" : "jhon_doe@gmail.com",
        "password" : "jhonjhon123",
        "confPassword" : "jhonjhon123",
        "prodi" : "Informatika",
        "semester" : "8",
        "tgl_lahir" : "2001-11-16"
    }
```

### FITUR LOGIN (MAHASISWA)
```
    Method : POST
    Router : http://localhost:5000/mahasiswa/login

    Body : 
    {
        "email" : "jhon_doe@gmail.com",
        "password" : "jhonjhon123"
    }
```

### FITUR REFRESH TOKEN (MAHASISWA)
```
    Method : GET
    Router : http://localhost:5000/mahasiswa/token
```

### FITUR LOGOUT (MAHASISWA)
```
    Method : DELETE
    Router : http://localhost:5000/mahasiswa/logout
```

### FITUR GET ALL (MAHASISWA)
```
    Method : GET
    Router : http://localhost:5000/mahasiswa/get-user
```

### FITUR UPDATE DATA (MAHASISWA)
```
    Method : PUT
    Router : http://localhost:5000/mahasiswa/edit/:id

    Body : 
    {
        "name" : "Jhon Doe",
        "email" : "jhon_doe@gmail.com",
        "prodi" : "Informatika",
        "semester" : "8",
        "tgl_lahir" : "2001-11-16",
        "alamat" : "Karawang",
        "no_hp" : "083815499134",
        "desc" : "I'm backend developer guys"
    }
```

### FITUR UPLOAD PROFILE (MAHASISWA)
```
    Method : PUT
    Router : http://localhost:5000/mahasiswa/edit/profile/:id

    Body : 
    {
        "image" : req.file
    }
```

### FITUR UPLOAD CV (MAHASISWA)
```
    Method : PUT
    Router : http://localhost:5000/mahasiswa/edit/cv/:id

    Body : 
    {
        "document" : req.file
    }
```

### FITUR UBAH PASSWORD (MAHASISWA)
```
    Method : PUT
    Router : http://localhost:5000/mahasiswa/change-pass/:id

    Body :
    {
        "currentPassword" : "naonsiah17",
        "newPassword" : "markoding123",
        "confPassword" : "markoding123"
    }
```

### FITUR APPLY JOB (MAHASISWA)
```
    Method : POST
    Router : http://localhost:5000/mahasiswa/job/:id/apply

    Body : 
    {
        "sop" : "Saya ingin mendaftar magang disini"
    }
```

### FITUR MELIHAT SEMUA JOB TERSEDIA (MAHASISWA)
```
    Method : GET
    Router : http://localhost:5000/mahasiswa/job
```

### FITUR MELIHAT JOB BERDASARKAN ID (MAHASISWA)
```
    Method : GET
    Router : http://localhost:5000/mahasiswa/job/:id
```

### FITUR PLOTTING DOSEN PEMBIMBING (MAHASISWA)
```
    Method : POST
    Router : http://localhost:5000/mahasiswa/dosen-pembimbing

    Body : 
    {
        "nama" : "Dadang Abdurahman",
        "npm" : "2010631170024",
        "surat_covid" : "https://google-drive.co.id",
        "surat_balasan" : "https://goolgle-drive.co.id",
        "tempat_magang" : "PT. ImpactByte Teknologi Edukasi",
        "alamat_magang" : "Kebayoran Baru, Jakarta",
        "pic" : "Ismail Fajar",
        "kontak_pic" : "083815499143",
        "latitude_magang" : "9823948jaksjdkjak9812q9384nasd",
        "longitude_magang" : "192839128ahsdkajsd128399asdas",
        "tgl_mulai" : "13-03-2024",
        "tgl_selesai" : "13-06-2024",
        "bidang_minat" : "Software Engineering",
        "rencana_magang" : "Full Turu"
    }
```

### FITUR MELIHAT DATA PLOTING DOSEN PEMBIMBING (MAHASISWA)
```
    Method : GET
    Router : http://localhost:5000/mahasiswa/dosen-pembimbing
```

### FITUR MELIHAT DATA PLOTING DOSEN PEMBIMBING BERDASARKAN ID (MAHASISWA)
```
    Method : GET
    Router : http://localhost:5000/mahasiswa/dosen-pembimbing/:id
```

### FITUR UPDATE PLOTING DOSEN PEMBIMBING (MAHASISWA)
```
    Method : PUT
    Router : http://localhost:5000/mahasiswa/dosen-pembimbing/:id

        Body : 
    {
        "nama" : "Dadang Abdurahman",
        "npm" : "2010631170024",
        "surat_covid" : "https://google-drive.co.id",
        "surat_balasan" : "https://goolgle-drive.co.id",
        "tempat_magang" : "PT. ImpactByte Teknologi Edukasi",
        "alamat_magang" : "Kebayoran Baru, Jakarta",
        "pic" : "Ismail Fajar",
        "kontak_pic" : "083815499143",
        "latitude_magang" : "9823948jaksjdkjak9812q9384nasd",
        "longitude_magang" : "192839128ahsdkajsd128399asdas",
        "tgl_mulai" : "13-03-2024",
        "tgl_selesai" : "13-06-2024",
        "bidang_minat" : "Software Engineering",
        "rencana_magang" : "Full Turu"
    }
```

### FITUR MENGHAPUS DATA PLOTING DOSEN PEMBIMBING (MAHASISWA)
```
    Method : DELETE
    Router : http://localhost:5000/mahasiswa/dosen-pembimbing/:id
```

### FITUR UPLOAD LAPORAN MAGANG (MAHASISWA)
```
    Method : POST
    Router : http://localhost:5000/mahasiswa/laporan

    Body :
    {
        "nama" : "Dadang Abdurahman",
        "npm" : "2010631170024",
        "dosen_pembimbing" : "Adhi Rizal, M.T",
        "tempat_magang" : "PT. ImpactByte Teknologi Edukasi",
        "alamat_magang" : "Kebayoran Baru, Jakarta",
        "latitude_magang" : "9823948jaksjdkjak9812q9384nasd",
        "longitude_magang" : "192839128ahsdkajsd128399asdas",
        "lembar_pengesahan" : "https://google-drive.co.id",
        "laporan_magang" : "https://google-drive.co.id",
        "dokumentasi" : "https://google-drive.co.id"
    }
```

### FITUR MELIHAT DATA LAPORAN MAGANG (MAHASISWA)
```
    Method : GET
    Router : http://localhost:5000/mahasiswa/laporan
```

### FITUR MELIHAT DATA LAPORAN MAGANG (MAHASISWA) BERDASARKAN ID
```
    Method : GET
    Router : http://localhost:5000/mahasiswa/laporan/:id
```

### FITUR UPDATE LAPORAN MAGANG MAHASISWA
```
    Method : PUT
    Router : http://localhost:5000/mahasiswa/laporan/:id

    Body :
    {
        "nama" : "Dadang Abdurahman",
        "npm" : "2010631170024",
        "dosen_pembimbing" : "Adhi Rizal, M.T",
        "tempat_magang" : "PT. ImpactByte Teknologi Edukasi",
        "alamat_magang" : "Kebayoran Baru, Jakarta",
        "latitude_magang" : "9823948jaksjdkjak9812q9384nasd",
        "longitude_magang" : "192839128ahsdkajsd128399asdas",
        "lembar_pengesahan" : "https://google-drive.co.id",
        "laporan_magang" : "https://google-drive.co.id",
        "dokumentasi" : "https://google-drive.co.id"
    }
```

### FITUR MENGHAPUS LAPORAN MAGANG MAHASISWA
```
    Method : DELETE
    Router : http://localhost:5000/mahasiswa/laporan/:id
```

### FITUR GET ALL LOGBOOK MAHASISWA
```
    Methode : GET
    Router  : http://localhost:5000/mahasiswa/logbook
```

### FITUR GET LOGBOOK MAHASISWA BY ID
```
    Method : GET
    Router : http://localhost:5000/mahasiswa/logbook/:id
```

### FITUR MEMBUAT LOGBOOK MAHASISWA
```
    Method  : POST
    Router  : http://localhost:5000/mahasiswa/logbook

    Body : 
    {
        "title" : "Logbook Minggu Ke-1",
        "desc" : "Hari ini aku tidak mengerjakan apa-apa",
        "dateOfPosting" : "2024-05-10"
    }
```

### FITUR UPDATE LOGBOOK MAHASISWA
```
    Method  : PUT
    Router  : http://localhost:5000/mahasiswa/logbook/:id

    Body : {
        "title" : "Logbook Minggu Ke-1",
        "desc" : "Hari ini aku tidak mengerjakan apa-apa",
        "dateOfPosting" : "2024-05-10"
    }
```


### FITUR DELETE LOGBOOK MAHASISWA
```
    Method  : DELETE
    Router  : http://localhost:5000/mahasiswa/delete/:id
```