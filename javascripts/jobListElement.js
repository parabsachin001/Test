var JobListElement = function () {
  var _this = this;
  this.element = null;
  this.data = null;
  this.parent = null;
  this.init = function (parent, data) {
    this.data = data;
    this.parent = parent;
    this.createLayout();
  };
  this.bindEvent = function () {
    this.element.addEventListener("click", onclick);
  };

  function onclick() {
    updateUrl("jobDetails/" + _this.data.id);
  }
  this.createLayout = function () {
    var parent = this.parent;
    var data = this.data;
    var jobContainer = createElementWithAttributes("div", {
      class: "jobListElementContainer",
      id: data.id,
    });
    this.element = jobContainer;
    parent.appendChild(this.element);

    var jobTitle = createElementWithAttributes("div", {
      class: "jobTitle",
    });
    createTextnodeAndAppendToPaasedParent(jobTitle, data.title);
    this.element.appendChild(jobTitle);

    var jobDescription = createElementWithAttributes("div", {
      class: "jobDescription",
    });
    createTextnodeAndAppendToPaasedParent(jobDescription, data.description);
    this.element.appendChild(jobDescription);

    var jobLocation = createElementWithAttributes("div", {
      class: "jobLocation",
    });
    createTextnodeAndAppendToPaasedParent(jobLocation, data.location);
    this.element.appendChild(jobLocation);

    var jobDepartment = createElementWithAttributes("div", {
      class: "jobDepartment",
    });
    createTextnodeAndAppendToPaasedParent(jobDepartment, data.department);
    this.element.appendChild(jobDepartment);

    this.bindEvent();
  };
};
