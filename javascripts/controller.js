var Controller = function () {
  var view = new View();
  globals = {
    jobPostings: [
      {
        id: 1,
        title: "Javascript Developer",
        description: "Javascript Developement",
        location: "Remote",
        department: "Programming",
      },
      {
        id: 2,
        title: "React JS Developer",
        description: "React JS Developement",
        location: "Mumbai(Onsite)",
        department: "Programming",
      },
    ],
    jobApllications: [],
    categorySelected: "select",
  };

  this.init = function () {
    view.init();
  };
};
