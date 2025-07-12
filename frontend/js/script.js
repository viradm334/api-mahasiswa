const formTambah = document.getElementById("form-tambah");
const formEdit = document.getElementById("form-edit");
const sectionDashboard = document.getElementById("dashboard");
const sectionTambah = document.getElementById("add-mahasiswa");
const sectionEdit = document.getElementById("edit-mahasiswa");
const dashboardBtn = document.getElementById("dashboard-btn");
const addBtn = document.getElementById("add-btn");
const editBtn = document.getElementById("edit-btn");
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

const showEditDataMahasiswa = editBtn.addEventListener("click", function () {
  sectionEdit.classList.remove("d-none");
  sectionTambah.classList.add("d-none");
  sectionDashboard.classList.add("d-none");
});

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

    </td>
              </tr>`
        );
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
}
