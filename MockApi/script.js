async function getUser() {
  try {
    const data = await fetch(
      "https://611f24619771bf001785c6fb.mockapi.io/user"
    );
    const users = await data.json();
    createUser(users);
  } catch (err) {
    console.log(err);
  }
}
getUser();

function createUser(users) {
  document.querySelector(".container").innerHTML = ``;
  users.forEach((element) => {
    createCard(element);
  });
}

function createCard({ id, avatar, name, createdAt }) {
  document.querySelector(".container").innerHTML += `
    <div class="user-container">
      <img
        class="avatar"
        src=${avatar}
        alt=""
      />
      <div class="profile-detail">
        <div class="name">${name}</div>
        <div class="createAt">Created at : ${new Date(
          createdAt
        ).toDateString()}</div>
        <div class="button">
        <a onclick="editUser(${id},'${name}','${avatar}')" href="#add-btn"><button class="btn">Edit</button></a>
        <button class="red-btn btn" onclick="deleteUser(${id})">Delete</button>
        </div>
      </div>
    </div>`;
}

const editform = document.querySelector("#edit-user");
async function editUser(id, name, avatar) {
  console.log("editing", id, name, avatar);
  editform.querySelector("#user-name").value = name;
  editform.querySelector("#avatar-url").value = avatar;
  editform.querySelector("#id").value = id;
  editform.style.display = "flex";
}
editform.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = editform.querySelector("#user-name").value;
  let avatar = editform.querySelector("#avatar-url").value;
  let id = editform.querySelector("#id").value;
  location.replace(editform);
  updateUser(id, name, avatar);
});

async function updateUser(id, name, avatar) {
  console.log("user update", id, name, avatar);
  const response = await fetch(
    `https://611f24619771bf001785c6fb.mockapi.io/user/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdAt: new Date().toISOString(),
        name: name,
        avatar: avatar,
      }),
    }
  );
  getUser();
  console.log(response);
  editform.style.display = "none";
  return response;
}

const addform = document.querySelector("#add-user");

addform.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = addform.querySelector("#user-name").value;
  let avatar = addform.querySelector("#avatar-url").value;
  addUser(name, avatar);
  console.log("submit clicked", name, avatar);
});
async function addUser(name, avatar) {
  const response = await fetch(
    "https://611f24619771bf001785c6fb.mockapi.io/user",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdAt: new Date().toISOString(),
        name: name,
        avatar: avatar,
      }),
    }
  );
  getUser();
  console.log(response);
  return response;
}

async function deleteUser(id) {
  const data = await fetch(
    `https://611f24619771bf001785c6fb.mockapi.io/user/${id}`,
    { method: "DELETE" }
  );
  getUser();
}

function hideEdit() {
  editform.style.display = "none";
}

function showAdd() {
  addform.style.display = addform.style.display === "flex" ? "none" : "flex";
}
