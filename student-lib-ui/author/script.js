// --- Author Buttons ---
document.getElementById("addAuthorBtn").onclick = function () {
  document.getElementById("author-container").style.display = "flex";
  document.getElementById("addAuthorForm").style.display = "block";
  //Ensures both the Update Author form and Delete Author form are hidden.
  //only add form is visible
  document.getElementById("updateAuthorForm").style.display = "none";
  document.getElementById("deleteAuthorForm").style.display = "none";
};

document.getElementById("updAuthorBtn").onclick = function () {
  document.getElementById("author-container").style.display = "flex";
  document.getElementById("updateAuthorForm").style.display = "block";
  document.getElementById("addAuthorForm").style.display = "none";
  document.getElementById("deleteAuthorForm").style.display = "none";
};

document.getElementById("delAuthorBtn").onclick = function () {
  document.getElementById("author-container").style.display = "flex";
  document.getElementById("deleteAuthorForm").style.display = "block";
  document.getElementById("addAuthorForm").style.display = "none";
  document.getElementById("updateAuthorForm").style.display = "none";
};

function addAuthor() {
  const name = document.getElementById("caname").value;
  const gender = document.querySelector('input[name="cagender"]:checked').value;
  const country = document.getElementById("cacountry").value;
  const rating = document.getElementById("carating").value;
  const requestData = {
    name: name,
    gender: gender,
    country: country,
    rating: rating,
  };
  fetch("http://localhost:7777/author/apis/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
    })
    .catch((error) => {
      alert(error);
    });
}

function updateAuthor() {
  //Reads user input from the form fields
  const id = document.getElementById("uaid").value;
  const name = document.getElementById("uaname").value;
  const gender = document.querySelector('input[name="uagender"]:checked').value;
  const country = document.getElementById("uacountry").value;
  const rating = document.getElementById("uarating").value;
  //news JSON obj with new values
  const requestData = {
    name: name,
    gender: gender,
    country: country,
    rating: rating,
  };
  //sends request to backend
  fetch(`http://localhost:7777/author/apis/update-author?authorId=${id}`, {//passes author id as query param
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData), //converts request dto into json
  })
    .then((response) => response.text()) //converts response in plain text
    .then((data) => {
      alert(data); //shows it in alert()
    })
    .catch((error) => {
      alert(error);
    });
}

function deleteAuthor() {
  const id = document.getElementById("delid").value;
  fetch(`http://localhost:7777/author/apis/delete-author?authorId=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.text())
    .then((data) => {
      alert(data);
    })
    .catch((error) => {
      alert(error);
    });
}
