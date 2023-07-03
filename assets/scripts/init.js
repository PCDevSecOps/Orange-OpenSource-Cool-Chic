function init_document() {
    // Turns all `.cocoen` elements into Cocoens
    Cocoen.create(document.querySelector('.cocoen'), {color: '#f0dfbb',});
    Cocoen.parse(document.body);

    var slider = document.getElementById("mySlider");
    slider.value = 1;
    console.log("init");

    var [left_codec, right_codec, current_image_name, current_rate_point] = get_initial_parameter();

    var rd_data = get_rd_data()
    update_image("left", left_codec, current_rate_point, current_image_name, rd_data);
    update_image("right", right_codec, current_rate_point, current_image_name, rd_data);
}

function get_initial_parameter() {
    var slider = document.getElementById("mySlider");

    var current_rate_point = slider.value; // Display the default slider value
    var left_codec = "coolchic"
    var right_codec = "jpeg"
    var current_image_name = "clem-onojeghuo-33741"

    return [left_codec, right_codec, current_image_name, current_rate_point]
}

function get_rd_data() {
    // Gather all the rate distortion results in this dictionary-like object
    let rd_data = new Object()

    rd_data["kodim05"] = new Object()
    rd_data["kodim05"]["rate_kbytes"] =  [9.60, 24.46, 50.14, 73.07, 112.05]
    rd_data["kodim05"]["rate_bpp"] =  [0.19523112, 0.497721354, 1.020019531, 1.486653646, 2.279622396]

    // rd_data["75dfed17593736b1ea4acf6a746de40a19d86f15cfa6ed98ec2ea355f900dc8d"] = new Object()
    // rd_data["75dfed17593736b1ea4acf6a746de40a19d86f15cfa6ed98ec2ea355f900dc8d"]["rate_kbytes"] =  [22.776, 49.848, 99.408, 152.520, 459.136]
    // rd_data["75dfed17593736b1ea4acf6a746de40a19d86f15cfa6ed98ec2ea355f900dc8d"]["rate_bpp"] =  [0.06517857142857143, 0.1426510989010989, 0.28447802197802197, 0.4364697802197802, 1.313919413919414]

    rd_data["allef-vinicius-109434"] = new Object()
    rd_data["allef-vinicius-109434"]["rate_kbytes"] =  [7.208, 16.960, 37.744, 78.124, 433.760,]
    rd_data["allef-vinicius-109434"]["rate_bpp"] =  [0.020627289377289377, 0.048534798534798536, 0.10801282051282052, 0.2235691391941392, 1.2413003663003663,]

    rd_data["clem-onojeghuo-33741"] = new Object()
    rd_data["clem-onojeghuo-33741"]["rate_kbytes"] =  [24.084, 62.836, 140.012, 219.200, 416.664,]
    rd_data["clem-onojeghuo-33741"]["rate_bpp"] =  [0.0689217032967033, 0.1798191391941392, 0.4006753663003663, 0.6272893772893773, 1.1923763736263737,]

    rd_data["philippe-wuyts-45997"] = new Object()
    rd_data["philippe-wuyts-45997"]["rate_kbytes"] =  [16.596, 67.876, 173.644, 312.132, 532.188,]
    rd_data["philippe-wuyts-45997"]["rate_bpp"] =  [0.05392509266547581, 0.22054830017846686, 0.5642184135215643, 1.0142050508472098, 1.729229164585095,]

    return rd_data

}