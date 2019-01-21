$(function () {
  var red = $("<img>").attr("src", "/IMAGES/shapes_colors/red_apple.jpeg");
  var green = $("<img>").attr("src", "/IMAGES/shapes_colors/green_apple.jpeg");
  var yellow = $("<img>").attr("src", "/IMAGES/shapes_colors/yellow_eleph.png");
  var blue = $("<img>").attr("src", "/IMAGES/shapes_colors/blue_eleph.png");

  var redBrush = $("<img>").attr("src", "/IMAGES/shapes_colors/paint_red.png");
  var greenBrush = $("<img>").attr("src", "/IMAGES/shapes_colors/paint_green.png");
  var blueBrush = $("<img>").attr("src", "/IMAGES/shapes_colors/paint_blue.png");
  var yellowBrush = $("<img>").attr("src", "/IMAGES/shapes_colors/paint_yellow.png");

  var all_images = ["red", "green", "yellow", "blue"];
  var used_brushes = ["redBrush", "greenBrush", "blueBrush", "yellowBrush"];
  var finalArray = [];

  var randomImages = [];
  var chosenImages = [];

  var Time = 100;
  var contino = 0;

  function Randomize(Subject) {
    let counter = Subject.length;
    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;

      let temp = Subject[counter];
      Subject[counter] = Subject[index];
      Subject[index] = temp;
    }
    return Subject;
  }

  function LoadGame() {

    CreateObjBottom();
    CreateObjTop();

  }


  function ClearArrays() {
    randomImages.splice(0, randomImages.length);
    chosenImages.splice(0, chosenImages.length);
    used_brushes.splice(0, used_brushes.length);
  }

  function arraysEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  function Counter() {
    var Countdown = Time;
    $('.counter').text(Countdown);

    count = setInterval(function () {
      Countdown--;
      if (Countdown >= 0) {
        $('.counter').text(Countdown);
      }
      if (Countdown == 0) {
        clearInterval(count);
        ClearGame();
      }
    }, 1000);

  }



  function CreateObjTop() {
    Randomize(all_images);


    $(this).delay(2000).queue(function () {
      $(this).hide();

      // set 4 random colors into random colors array
      var i = 0;
      var firstSequence = [];
      $.each(all_images, function (index, imgName) {
        var imgID = $("#pic" + i);
        imgID.append(eval(imgName));
        firstSequence.push(imgName);
        i++;
      });
    });

  }

  function CreateObjBottom() {

    Randomize(used_brushes);

    // set 4 random colors into random colors array
    var x = 0;
    var secondSequence = [];
    $.each(used_brushes, function (err, brushName) {
      var brushID = $("#brush" + x);
      brushID.append(eval(brushName));

      secondSequence.push(brushName);
      x++;

    });

    $(redBrush).click(function choose() {
      buildArray("red");
    });

    $(greenBrush).click(function choose() {
      buildArray("green");
    });

    $(yellowBrush).click(function choose() {
      buildArray("yellow");
    });

    $(blueBrush).click(function choose() {
      buildArray("blue");
    });

  }

  function buildArray(color) {
    console.log(color);
    finalArray.push(color);
    console.log(finalArray);
    contino++;
    console.log(contino);
    if (contino == 4) {
      compare(finalArray);

    }
  }

  function compare(finalArray) {
    if (finalArray[0] == all_images[0] && finalArray[1] == all_images[1] && finalArray[2] == all_images[2] && finalArray[3] == all_images[3]) {
      $("#correctModal").modal("show");
      location.reload();
    } else {
      $("#incorrectModal").modal("show");
      location.reload();
    }
  }


  function StartGame() {
    Counter();
    LoadGame();
  }

  $("#start").click(function () {
    StartGame();
  })

});