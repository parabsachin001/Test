var View = function () {
  var _this = this;
  this.rootElement = document.getElementById("root");
  this.bodyContainer;
  this.init = function () {
    console.log("inside View", this.rootElement);
    this.createLayout("headerAndBody");
  };

  this.createLayout = function (value) {
    console.log("this.createLayout", this.createLayout);
    var path = value;
    var additionalParameters;
    if (path.includes("/")) {
      var pathSplited = path.split("/");
      if (pathSplited && pathSplited.length > 1) {
        path = pathSplited[0];
        additionalParameters = pathSplited.slice(1, pathSplited.length);
      }
    }
    switch (path) {
      case "jobDetails":
        this.createJobDetailsPage(additionalParameters, true);
        break;

      case "applyForJob":
        this.createJobDetailsPage(additionalParameters, false);
        this.appendJobApplicationForm(additionalParameters, true);
        break;
      case "showSubmittedForm":
        this.createJobDetailsPage(additionalParameters, false);
        this.appendJobApplicationForm(additionalParameters, false);
        break;

      case "headerAndBody":
        this.createHeader();
        this.createBody();
        this.createLayout("");
        break;
      default:
        this.createMainPage("");
        break;
    }
  };

  this.appendJobApplicationForm = function (details, isEditable) {
    var matchedJobDetail = getMatchedJobDetail(details[0]);
    var matchedJobApplicationDetail = getMatchedJobApplicationDetail(details[1]);
    if (matchedJobDetail) {
      var jobApplication = new JobApplication();
      jobApplication.init(this.bodyContainer, matchedJobDetail, isEditable, matchedJobApplicationDetail);
    }
  };

  function UIUpdate(event) {
    var path = event.detail;
    _this.createLayout(path);
  }

  this.clearBody = function () {
    while (this.bodyContainer.hasChildNodes()) {
      this.bodyContainer.firstChild.remove();
    }
  };

  document.addEventListener("updateUIOnHashChange", UIUpdate);

  this.createJobDetailsPage = function (details, showApply) {
    this.clearBody();
    var matchedJobDetail = globals.jobPostings.find(function (jobPost) {
      return jobPost.id === +details[0];
    });
    if (matchedJobDetail) {
      var jobDeails = new JobDetails();
      jobDeails.init(this.bodyContainer, matchedJobDetail, showApply);
    }
  };

  this.createMainPage = function () {
    this.clearBody();
    this.createCategoriesDropdown();
    switch (globals.categorySelected) {
      case "location":
      case "department":
        var object = {};
        var field = globals.categorySelected;
        globals.jobPostings.forEach((element) => {
          var currentElementsFieldValue = element[field];
          var objectKeys = Object.keys(object);
          if (!objectKeys.includes(currentElementsFieldValue)) {
            object[currentElementsFieldValue] = [];
          }
          object[currentElementsFieldValue].push(
            JSON.parse(JSON.stringify(element))
          );
        });

        var objectKeysToRender = Object.keys(object);
        objectKeysToRender.forEach((element) => {
          var categoryLabel = createElementWithAttributes("p", {
            class: "categories",
          });
          createTextnodeAndAppendToPaasedParent(categoryLabel, element);
          this.bodyContainer.appendChild(categoryLabel);
          object[element].forEach((element) => {
            var jobList = new JobListElement();
            jobList.init(this.bodyContainer, element);
          });
        });
        break;

      default:
        globals.jobPostings.forEach((element) => {
          var jobList = new JobListElement();
          jobList.init(this.bodyContainer, element);
        });
        break;
    }
  };

  this.createCategoriesDropdown = function () {
    var categoriesContainer = createElementWithAttributes("div", {
      class: "categoriesContainer",
    });
    this.bodyContainer.appendChild(categoriesContainer);

    var label = createElementWithAttributes("label", {
      for: "categories",
    });
    createTextnodeAndAppendToPaasedParent(label, "Categories: ");
    categoriesContainer.appendChild(label);
    var selectTag = createElementWithAttributes("select", {
      name: "categories",
      id: "categories",
      onchange: "onchangeCategory(this.value)",
    });
    categoriesContainer.appendChild(selectTag);

    var optionTag0 = createElementWithAttributes("option", {
      value: "select",
    });
    createTextnodeAndAppendToPaasedParent(optionTag0, "Select");
    selectTag.appendChild(optionTag0);

    var optionTag1 = createElementWithAttributes("option", {
      value: "location",
    });
    createTextnodeAndAppendToPaasedParent(optionTag1, "Location");
    selectTag.appendChild(optionTag1);

    var optionTag2 = createElementWithAttributes("option", {
      value: "department",
    });
    createTextnodeAndAppendToPaasedParent(optionTag2, "Department");
    selectTag.appendChild(optionTag2);
    selectTag.value = globals.categorySelected;
  };

  this.createHeader = function () {
    var headerContainer = createElementWithAttributes("div", {
      class: "header",
    });
    this.rootElement.appendChild(headerContainer);

    var headerText = createElementWithAttributes("div", {
      class: "headerText",
    });
    createTextnodeAndAppendToPaasedParent(headerText, "Job Portal");
    headerContainer.appendChild(headerText);
  };

  this.createBody = function (value) {
    this.bodyContainer = createElementWithAttributes("div", {
      class: "body",
    });
    this.rootElement.appendChild(this.bodyContainer);
  };
};
