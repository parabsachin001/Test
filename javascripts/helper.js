function createElementWithAttributes(elementType, attributesObject) {
  var element = document.createElement(elementType);
  var attributeKeys = Object.keys(attributesObject);
  attributeKeys.forEach(function (attribute) {
    var attributeValue = attributesObject[attribute];
    element.setAttribute(attribute, attributeValue);
  });
  return element;
}

function createTextnodeAndAppendToPaasedParent(parent, textValue) {
  if (parent) {
    const titleTextNode = document.createTextNode(textValue);
    parent.appendChild(titleTextNode);
  }
}

window.addEventListener("hashchange", (event) => {
  console.log("hashchanged", event);
  var newURL = event.newURL;
  var urlSplited = newURL.split("#/");
  if (urlSplited && urlSplited.length > 1) {
    var hashValue = newURL.split("#/")[1];
    createCustomEventUpdateUIOnHashChangeAndDispatch(hashValue);
  }
});

function createCustomEventUpdateUIOnHashChangeAndDispatch(eventDetail) {
  const event = new CustomEvent("updateUIOnHashChange", {
    detail: eventDetail,
  });
  document.dispatchEvent(event);
}

function updateUrl(pathToRoute) {
  var url = window.location.href;
  var basePath = url.split("#/")[0] + "#/";
  window.location.href = basePath + pathToRoute;
}

function onchangeCategory(value) {
  if (globals.categorySelected !== value) {
    globals.categorySelected = value;
    updateUrl(value === "select" ? "" : value);
  }
}

function applyButtonClicked(value) {
  updateUrl("applyForJob/" + value);
}

function submitButtonClicked(value) {
  console.log(value);
  var formElements = document.body
    .getElementsByClassName("formWrapper")[0]
    .getElementsByTagName("input");
  console.log("submitButtonClicked", formElements);
  var indexValueForFormData = globals.jobApllications.length + 1;
  var applicationFormInformation = { jobId: value, id: indexValueForFormData };
  if (formElements.length) {
    for (var i = 0; i < formElements.length; i++) {
      applicationFormInformation[formElements[i].name] = formElements[i].value;
    }
  }
  console.log("applicationFormInformation", indexValueForFormData);
  var index = globals.jobApllications.length;
  globals.jobApllications.push(applicationFormInformation);
  updateUrl("showSubmittedForm/" + value + "/" + indexValueForFormData);
}

function getMatchedJobDetail(value) {
  return globals.jobPostings.find(function (jobPost) {
    return jobPost.id === +value;
  });
}

function getMatchedJobApplicationDetail(value) {
  return globals.jobApllications.find(function (jobApllication) {
    return jobApllication.id === +value;
  });
}

function validateField(element) {
  var value = element.value;
  switch (element.type) {
    case "email":
      ValidateEmail(value);
      break;

    default:
      break;
  }
}

function ValidateEmail(value) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    return true;
  }
  alert("You have entered an invalid email address!");
  return false;
}
