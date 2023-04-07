var JobDetails = function () {
  _this = this;
  this.element = null;
  this.data = null;
  this.showApply = true;
  this.parent = null;
  this.init = function (parent, data, showApply) {
    this.data = data;
    this.parent = parent;
    if (showApply !== undefined && showApply !== null) {
      this.showApply = showApply;
    }
    this.createLayout();
  };

  this.createLayout = function () {
    var parent = this.parent;
    var data = this.data;
    var jobContainer = createElementWithAttributes("div", {
      class: "jobDetailsElementContainer",
      id: data.id,
    });
    this.element = jobContainer;
    parent.appendChild(this.element);

    var jobTitle = createElementWithAttributes("h1", {
      class: "jobTitle",
    });
    createTextnodeAndAppendToPaasedParent(jobTitle, data.title);
    this.element.appendChild(jobTitle);

    ///jobLocation
    var jobLocationContainer = createElementWithAttributes("div", {
      class: "jobLocationContainer",
    });
    this.element.appendChild(jobLocationContainer);

    var jobLocationLabel = createElementWithAttributes("span", {
      class: "jobLocationLabel",
    });
    createTextnodeAndAppendToPaasedParent(jobLocationLabel, "Location: ");
    jobLocationContainer.appendChild(jobLocationLabel);

    var jobLocation = createElementWithAttributes("span", {
      class: "jobLocation",
    });
    createTextnodeAndAppendToPaasedParent(jobLocation, data.location);
    jobLocationContainer.appendChild(jobLocation);

    ///jobDescription
    var jobDescriptionContainer = createElementWithAttributes("div", {
      class: "jobDescriptionContainer",
    });
    this.element.appendChild(jobDescriptionContainer);

    var jobDescriptionLabel = createElementWithAttributes("span", {
      class: "jobDescriptionLabel",
    });
    createTextnodeAndAppendToPaasedParent(jobDescriptionLabel, "Description: ");
    jobDescriptionContainer.appendChild(jobDescriptionLabel);

    var jobDescription = createElementWithAttributes("span", {
      class: "jobDescription",
    });
    createTextnodeAndAppendToPaasedParent(jobDescription, data.description);
    jobDescriptionContainer.appendChild(jobDescription);

    ///jobDepartment
    var jobDepartmentContainer = createElementWithAttributes("div", {
      class: "jobDepartmentContainer",
    });
    this.element.appendChild(jobDepartmentContainer);

    var jobDepartmentLabel = createElementWithAttributes("span", {
      class: "jobDepartmentLabel",
    });
    createTextnodeAndAppendToPaasedParent(jobDepartmentLabel, "Department: ");
    jobDepartmentContainer.appendChild(jobDepartmentLabel);

    var jobDepartment = createElementWithAttributes("span", {
      class: "jobDepartment",
    });
    createTextnodeAndAppendToPaasedParent(jobDepartment, data.department);
    jobDepartmentContainer.appendChild(jobDepartment);

    if (this.showApply) {
      var applyButton = createElementWithAttributes("button", {
        class: "applyButton",
        onclick: "applyButtonClicked(" + _this.data.id + ")",
      });
      createTextnodeAndAppendToPaasedParent(applyButton, "Apply");
      this.element.appendChild(applyButton);
    }
  };
};
