// Event handling functions
function update_image(left_or_right, codec, rate_point, image_name, rd_data) {
    if (!(["left", "right"].includes(left_or_right))) {
      console.log("left_or_right should be either 'left' or 'right'");
      console.log("found: " + left_or_right);
      return;
    }

    // Retrieve the element corresponding either to the left or the right image
    image_element = document.getElementsByClassName(left_or_right + "-comparison")[0];

    // Compute the new image path
    image_path = "assets/comparisons/" + image_name + "/" + codec + "-R" + rate_point + ".png";

    // Set src to the new path
    image_element.src = image_path;

    // Change the image name
    label = document.getElementsByClassName("label-center")[0];
    label.innerText = image_name.substring(0, 20);

    // Change the rate value next to the slider
    // ! rate point is from [1 to 5]
    rate_bpp = rd_data[image_name].rate_bpp[rate_point - 1];
    rate_kbytes = rd_data[image_name].rate_kbytes[rate_point - 1];
    var sliderLabel = document.getElementById("sliderValue");
    sliderLabel.innerText = " Rate: " + rate_bpp.toFixed(2) + " bpp"


    console.log(left_or_right + ',' + image_path)
    return;
  }
