fetch("http://localhost:3000/mahasiswa")
  .then((response) => response.json())
  .then((item) => {
    console.log(item)
    const container = document.getElementById('daftar-mahasiswa');

    item.data.forEach(mhs => {
        const item = document.createElement('li');
        item.textContent = `Nama: ${mhs.nama}, NIM: ${mhs.nim}, Email: ${mhs.email}, Jurusan: ${mhs.jurusan}`;
        container.appendChild(item);
    });
}).catch(err => {
    console.log(err.message);
});
