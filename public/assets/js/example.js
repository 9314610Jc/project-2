// Get references to page elements

const $workoutText = $("#workoutDropdown");
const $workoutDescription = $("#example-description");
const $submitBtn = $("#submit");
const $workoutList = $("#example-list");
const $workoutCalories = $("#calories-burned");

let choice;

// The API object contains methods for each kind of request we'll make
const API = {
  saveWorkout: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json",
      },
      type: "POST",
      url: "api/workouts",
      data: JSON.stringify(example),
    });
  },
  getWorkout: function () {
    return $.ajax({
      url: "api/workouts",
      type: "GET",
    });
  },
  deleteWorkout: function (id) {
    return $.ajax({
      url: "api/workouts/" + id,
      type: "DELETE",
    });
  },
};

// refreshExamples gets new examples from the db and repopulates the list
const refreshWorkouts = function () {
  API.getWorkout().then((data) => {
    const $workouts = data.map((workout) => {
      // eslint-disable-next-line no-unused-vars
      const $a = $("<a>")
        .text(workout.text)
        .attr("href", "/workout/" + workout.id);

      const $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": workout.id,
        })
        .append($workouts);

      const $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $workoutList.empty();
    $workoutList.append($workouts);
  });
};

//Save Selection in dropdown text

// eslint-disable-next-line prefer-const
choice = $("#workoutDropdown li");
choice.on("click", function () {
  const choiceText = $(this).text();
  $("#dropdownMenuButton").text(choiceText);
  console.log(choiceText);
});

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
const handleFormSubmit = function (event) {
  event.preventDefault();

  const workout = {
    text: $("#dropdownMenuButton").text(),
    description: $workoutDescription.val().trim(),
    calories: $workoutCalories.val().trim(),
    UserId: window.userId,
  };

  if (!(workout.text && workout.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveWorkout(workout).then(() => {
    refreshWorkouts();
  });

  $workoutText.val("");
  $workoutDescription.val("");
  $workoutCalories.val("");
  location.reload();
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
const handleDeleteBtnClick = function () {
  const idToDelete = $(this).parent().attr("data-id");

  API.deleteWorkout(idToDelete).then(() => {
    refreshWorkouts();
  });
  location.reload();
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$workoutList.on("click", ".delete", handleDeleteBtnClick);
