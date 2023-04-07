var JobApplication = function () {
  _this = this;
  this.element = null;
  this.data = null;
  this.isEditable = true;
  this.parent = null;
  this.formValues = null;
  var formFields = [
    { label: "Name", elementType: "input", type: "text" },
    { label: "Email", elementType: "input", type: "email" },
    { label: "Phone Number", elementType: "input", type: "text" },
    { label: "Resume", elementType: "input", type: "file" },
    { label: "Cover Letter", elementType: "input", type: "file" },
  ];
  this.init = function (parent, data, isEditable, formValues) {
    this.data = data;
    this.parent = parent;
    this.formValues = formValues;
    if (isEditable !== undefined && isEditable !== null) {
      this.isEditable = isEditable;
    }
    this.createLayout();
  };
  this.createLayout = function () {
    var parent = this.parent;
    var element = createElementWithAttributes("div", {
      class: "formWrapper",
    });
    parent.appendChild(element);

    formFields.forEach(function (fieldElement) {
      let fieldContainer = createElementWithAttributes("div", {
        class: "fieldContainer",
      });
      element.appendChild(fieldContainer);

      var fieldLabel = createElementWithAttributes("label", {
        class: "label",
      });
      createTextnodeAndAppendToPaasedParent(
        fieldLabel,
        fieldElement.label + " :"
      );
      fieldContainer.appendChild(fieldLabel);
      if (_this.isEditable) {
        var field = createElementWithAttributes(fieldElement.elementType, {
          placeholder: fieldElement.label,
          name: fieldElement.label.toLowerCase(),
          type: fieldElement.type,
          onblur: "validateField(this)",
        });
        fieldContainer.appendChild(field);
      } else {
        var fieldValue = createElementWithAttributes("span", {});
        createTextnodeAndAppendToPaasedParent(
          fieldValue,
          _this.formValues[fieldElement.label.toLowerCase()]
        );
        fieldContainer.appendChild(fieldValue);
      }
    });

    if (this.isEditable) {
      var submitButton = createElementWithAttributes("button", {
        class: "submitButton",
        onclick: "submitButtonClicked(" + this.data.id + ")",
      });
      createTextnodeAndAppendToPaasedParent(submitButton, "Submit");
      element.appendChild(submitButton);
    }
  };
};
