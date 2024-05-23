var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var SubmitBtn = document.getElementById("SubmitBtn");
var tableBody = document.getElementById("tableBody");
var deleteBtn = document.getElementById("deleteBtn");

var tableRow;

if (localStorage.getItem("rowDetails") == null) {
  tableRow = [];
} else {
  tableRow = JSON.parse(localStorage.getItem("rowDetails"));
  Display(tableRow);
}

function Display(arr) {
  var tableDetails = "";
  for (i = 0; i < arr.length; i++) {
    index = arr[i];
    tableDetails += `<tr>
        <td>${i + 1}</td>
        <td class="text-capitalize">${arr[i].siteNameValue}</td>
        <td>
          <a class="btn btn-success" href="${arr[i].siteUrlValue}">
            <i class="fa-solid fa-eye"></i>
            Visit
          </a>
        </td>
        <td>
          <button onclick="deleteRow(${i})" id="deleteBtn" class="btn btn-danger">
            <i class="fa fa-trash-can"></i> Delete
          </button>
        </td>
      </tr>`;
  }
  tableBody.innerHTML = tableDetails;
  //   console.log(tableDetails);
}

function validateInput(element) {
  var regex = {
    siteName: /^\w{3,}(\s+\w+)*$/,
    siteUrl: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/,
  };

  if (regex[element.id].test(element.value)) {
    console.log("Match");
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    console.log("No Match");
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}

function AddTableRow() {
  var tableInput = {
    siteNameValue: siteNameInput.value,
    siteUrlValue: siteUrlInput.value,
  };

    tableRow.push(tableInput);
    localStorage.setItem("rowDetails", JSON.stringify(tableRow));
    Display(tableRow);
    console.log(tableRow);
    clearInputs();
  
}

function clearInputs() {
  (siteNameInput.value = null),
  (siteUrlInput.value = null);
}

function deleteRow(deletedIndex) {
//   console.log(deletedIndex);
  tableRow.splice(deletedIndex, 1);
  localStorage.setItem("rowDetails", JSON.stringify(tableRow));
  Display(tableRow);
}

//  the submit button event (add on clicking submit)
SubmitBtn.addEventListener("click", function () {
    if (
        siteNameInput.classList.contains("is-valid") &&
        siteUrlInput.classList.contains("is-valid")
      ) {
        AddTableRow();
        siteNameInput.classList.remove("is-valid")
        siteUrlInput.classList.remove("is-valid")
    }
      
      else {
        alert("Data not Valid");
      }
});