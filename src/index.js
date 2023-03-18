const api_student = "http://localhost:3000/students";
const listStudentEl = document.querySelector("#list_student");
const addName = document.querySelector("#name");
const add_Address = document.querySelector("#address");
const addBtn = document.querySelector("#addBtn");

async function start() {
  let list_student = await fetch(api_student).then((response) => {
    return response.json();
  });
  renderList(list_student);
}
start();

function renderList(list) {
  let html_list = list.map((student) => {
    return `<li>
    <p><b>Name:'${student.name}'</b> <br /></p>
    <p>Address: '${student.address}'</p> <br />
    <button id="deleBtn" onclick="updBtn('${student.id}','${student.name}','${student.address}')">Sửa</button>
    <button id="updBtn" onclick="deleBtn('${student.id}')">Xoá</button>
  </li>`;
  });
  listStudentEl.innerHTML = html_list.join("");
}
addBtn.onclick = async (e) => {
  data = {
    name: addName.value,
    address: add_Address.value,
  };
  option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  await fetch(api_student, option).then((respone) => {
    return respone.json();
  });
};

async function deleBtn(id) {
  // console.log("oke");
  option = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  await fetch(api_student + "/" + id, option).then((res) => {
    return res.json();
  });
}
async function updBtn(id, name, address) {
  addName.value = name;
  add_Address.value = address;
  addBtn.innerHTML = "Lưu";
  updBtn.onclick = async () => {
    data = {
      name: addName.value,
      address: add_Address.value,
    };
    option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    await fetch(api_student + "/" + id, option).then((res) => {
      return res.json();
    });
  };
}
