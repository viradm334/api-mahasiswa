const formTambah = document.getElementById("form-tambah");
const formEdit = document.getElementById("form-edit");
const sectionDashboard = document.getElementById("dashboard");
const sectionTambah = document.getElementById("add-mahasiswa");
const sectionEdit = document.getElementById("edit-mahasiswa");
const dashboardBtn = document.getElementById("dashboard-btn");
const addBtn = document.getElementById("add-btn");
const tableBody = document.getElementById("table-body");

const showDataMahasiswa = dashboardBtn.addEventListener("click", function () {
  sectionDashboard.classList.remove("d-none");
  sectionTambah.classList.add("d-none");
  sectionEdit.classList.add("d-none");

  loadMhs();
});

const showFormTambahMahasiswa = addBtn.addEventListener("click", function () {
  sectionTambah.classList.remove("d-none");
  sectionDashboard.classList.add("d-none");
  sectionEdit.classList.add("d-none");
});

const showEditDataMahasiswa = document.addEventListener(
  "click",
  async function (e) {
    if (e.target.classList.contains("edit-btn")) {
      e.preventDefault();

      const id = e.target.dataset.id;

      try {
        const res = await fetch(`http://localhost:3000/mahasiswa/${id}`);
        const result = await res.json();

        if (result.data) {
          showEditForm(result.data);
        } else {
          alert("Mahasiswa tidak ditemukan!");
        }
      } catch (err) {
        alert(`Error: ${err.message}`);
      }
    }
  }
);

const tambahMhs = formTambah.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {
    nama: formData.get("nama"),
    nim: formData.get("nim"),
    email: formData.get("email"),
    jurusan: formData.get("jurusan"),
  };

  try {
    const res = await fetch("http://localhost:3000/mahasiswa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    alert(result.message);

    formTambah.reset();
    sectionTambah.classList.add("d-none");
    sectionDashboard.classList.remove("d-none");

    loadMhs();
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
});

const deleteMhs = document.addEventListener("click", async function (e) {
  if (e.target.matches(".delete-btn")) {
    e.preventDefault();
    const id = e.target.dataset.id;

    try {
      const res = await fetch(`http://localhost:3000/mahasiswa/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      alert(result.message);
      loadMhs();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  }
});

const updateMhs = formEdit.addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const id = document.getElementById("edit-id").value;
    const nama = document.getElementById("edit-nama").value;
    const email = document.getElementById("edit-email").value;
    const nim = document.getElementById("edit-nim").value;
    const jurusan = document.getElementById("edit-jurusan").value;
  
    try {
      const res = await fetch(`http://localhost:3000/mahasiswa/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nama, email, nim, jurusan })
      });
  
      const result = await res.json();
      alert(result.message);
  
      formEdit.reset();
      sectionEdit.classList.add("d-none");
      sectionDashboard.classList.remove("d-none");
  
      loadMhs();
  
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  });
  

function loadMhs() {
  fetch("http://localhost:3000/mahasiswa")
    .then((response) => response.json())
    .then((item) => {
      console.log(item);

      tableBody.innerHTML = "";

      item.data.forEach((mhs, index) => {
        tableBody.insertAdjacentHTML(
          "beforeend",
          `              <tr>
                <th scope="row">${index + 1}</th>
                <td>${mhs.nama}</td>
                <td>${mhs.nim}</td>
                <td>${mhs.email}</td>
                <td>${mhs.jurusan}</td>
                <td>    <button class="delete-btn btn btn-danger" data-id="${
                  mhs.id
                }">Delete</button>
                <button class="edit-btn btn btn-warning" data-id="${
                  mhs.id
                }">Edit</button>
    </td>
              </tr>`
        );
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
}

function showEditForm(mhs) {
  const idInput = document.getElementById("edit-id");
  const namaInput = document.getElementById("edit-nama");
  const emailInput = document.getElementById("edit-email");
  const nimInput = document.getElementById("edit-nim");
  const jurusanInput = document.getElementById("edit-jurusan");

  if (!idInput || !namaInput || !emailInput || !nimInput || !jurusanInput) {
    return alert("Edit form elements not found in the DOM.");
  }

  idInput.value = mhs.id;
  namaInput.value = mhs.nama;
  emailInput.value = mhs.email;
  nimInput.value = mhs.nim;
  jurusanInput.value = mhs.jurusan;

  sectionEdit.classList.remove("d-none");
  sectionTambah.classList.add("d-none");
  sectionDashboard.classList.add("d-none");
}
