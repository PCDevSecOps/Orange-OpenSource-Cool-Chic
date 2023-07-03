---
# title: Cool-chic
# feature_text: |
# feature_image: ./assets/logos/logo_cool_chic.png
# excerpt: "blablabla"
---

<!-- <div style="text-align: center">
<p>Cool-chic:  <b>Coo</b>rdinate-based <b>L</b>ow-<b>C</b>omplexity <b>H</b>ierarchical <b>I</b>mage <b>C</b>odec.</p>
</div> -->


<div style="margin:auto; margin-bottom: 2%; text-align: justify; width: 70%">
&emsp;&emsp;&emsp;&emsp;&emsp; Cool-chic (pronounced <span class="ipa">/kul ʃik/</span> as in French 🥖🧀🍷) is a <b>low-complexity</b>  neural image codec based on <b>overfitting</b>. With only <b>2 000 multiplication / decoded pixel</b>, it offers coding performance on par with HEVC.
</div>

<div style="text-align: center; margin-bottom: 3%">
{% include button.html text="Show me the code!" icon="github" link="https://github.com/Orange-OpenSource/Cool-Chic" color="#E76F51" %} {% include button.html text="Read the paper 📝" link="https://arxiv.org/abs/2212.05458" color="#376996" %} {% include button.html text="See RD graphs 📈" link="https://arxiv.org/abs/2212.05458" color="#2A9D8F" %}
</div>
<!-- image-rendering: pixelated for nearest neighbor upsampling! -->

<div class="cocoen">
  <img src="" alt="" class="left-comparison" style="image-rendering: pixelated"/>
  <img src="" alt="" class="right-comparison" style="image-rendering: pixelated"/>
  <button class="btn">Button</button>
</div>


<div class="comparison-label" style="text-align:center margin-bottom:2%">
  <div class="radio" style="width: 30%; float: left">
    <!-- Name gender is necessary to have exclusive selection -->
	  <input label="Cool-chic" type="radio" id="button-coolchic" value="coolchic" style="width: 100%" checked>
  </div>
  <p class="label-center" style="width: 40%; float: left; text-align: center">kodim05</p><div class="radio" style="width: auto">
    <!-- Name gender is necessary to have exclusive selection -->
	<input label="JPEG" type="radio" id="button-jpeg" name="gender" value="jpeg" checked>
	<input label="HEVC" type="radio" id="button-hevc" name="gender" value="hevc">
	<input label="VVC" type="radio" id="button-vvc" name="gender" value="vvc">
</div></div>

<!-- List of the possible images -->
<div class="row" style="margin-bottom:2%; width:100%">
  <div class="left-column" style="width:65%">
    <div class="thumbnailselection">
      <img src="assets/comparisons/clem-onojeghuo-33741/thumbnail.png" alt="clem-onojeghuo" class="possible-images"/><img src="assets/comparisons/allef-vinicius-109434/thumbnail.png" alt="allef-vinicius" class="possible-images"/><img src="assets/comparisons/philippe-wuyts-45997/thumbnail.png" alt="philippe-wuyts" class="possible-images"/>
    </div>
  </div>
  <div class="right-column" style="width:35%">
    <div class=wrapper>
      <div class="range">
        <input type="range" min="1" max="5" value="1" id="mySlider" />
        <div class="value" id="sliderValue">1</div>
      </div>
    </div>
  </div>
</div>

<script>
// // Turns all `.cocoen` elements into Cocoens
// Cocoen.create(document.querySelector('.cocoen'), {color: '#f0dfbb',});
// Cocoen.parse(document.body);

// Retrieve the different elements with which we're going to interact
var slider = document.getElementById("mySlider");
var sliderLabel = document.getElementById("sliderValue");

var button_jpeg = document.getElementById("button-jpeg")
var button_hevc = document.getElementById("button-hevc")
var button_vvc = document.getElementById("button-vvc")

var rd_data = get_rd_data()
var [left_codec, right_codec, current_image_name, current_rate_point] = get_initial_parameter();

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  current_rate_point = this.value;
  update_image("left", left_codec, current_rate_point, current_image_name, rd_data)
  update_image("right", right_codec, current_rate_point, current_image_name, rd_data)
}

// Update the codec when clicking on a button
button_jpeg.onclick = function() {
  right_codec = "jpeg";
  update_image("right", right_codec, current_rate_point, current_image_name, rd_data);
}
button_hevc.onclick = function() {
  right_codec = "hevc";
  update_image("right", right_codec, current_rate_point, current_image_name, rd_data);
}
button_vvc.onclick = function() {
  right_codec = "vvc";
  update_image("right", right_codec, current_rate_point, current_image_name, rd_data);
}


var list_possible_images = document.getElementsByClassName("possible-images");

console.log(list_possible_images.length);

for(i = 0; i < list_possible_images.length; i++)
{
  list_possible_images[i].onclick = function(){
        // Retrieve the path of the thumbnail /path/to/image/thumbnail.png
        thumbnail_path = this.src.split("/");
        // Remove thumbnail.png
        thumbnail_path.pop();
        current_image_name = thumbnail_path.pop()

        update_image("left", left_codec, current_rate_point, current_image_name, rd_data)
        update_image("right", right_codec, current_rate_point, current_image_name, rd_data)

    }
}

</script>

# What's new?

This new Cool-Chic version provides several new features 🔥🔥🔥

* -15% rate vs. [_COOL-CHIC, Ladune et al._](https://arxiv.org/abs/2212.05458) thanks to
  * Convolution-based synthesis transform
  * Adapted upsampling module
  * Improved Straight Through Estimator derivative during training
* Friendlier usage
  * Support for YUV 420 input format in 8-bit and 10-bit
  * Fixed point arithmetic for the probability model allowing for cross-platform entropy (de)coding
  * Encoding recipes _e.g._ ```fast```, ```medium```, ```slow```, ```placebo```

---

# Setup

### Necessary packages

```bash
# Install virtual env if needed
python3 -m pip install virtualenv
# Create and activate a virtual env named "venv"
virtualenv venv && source venv/bin/activate
# Install the required packages
python3 -m pip install -r requirements.txt
```

### Using Apple M1/M2 Neural Engine

For some operations, the mps backend is not yet available. If you want to use
Apple Neural Engine, you need to set the following environment variable:

```bash
export PYTORCH_ENABLE_MPS_FALLBACK=1
```

# Reproducing paper results

Already encoded files are provided as bitstreams in ```results/<dataset_name>/```where ```<dataset_name>```can be ```kodak```, ```clic20-pro-valid```, ```clic22-test```, ```jvet```.

For each dataset, a script is provided to decode all the bitstreams.

```bash
python3 results/decode_one_dataset.py <dataset_name> # Can take a few minutes
```

The file ```results/<dataset_name>/results.tsv``` provides the results that should be obtained.

Compared to HEVC (HM 16.20), Cool-chic bitstreams offer the following results:

| Dataset          | BD-rate vs. HEVC (HM 16.20) |
|------------------|-----------------------------|
| kodak            | <span style="color:#f50">+ 7.16 %  </span> |
| clic20-pro-valid | <span style="color:green">- 4.92 %  </span>                    |
| clic22-test      | <span style="color:green">- 4.46 %  </span>               |
| jvet             | <span style="color:#f50">+ 11.96 %  </span>              |


<br/>

# Compressing your own images

### Encoding

The script ```samples/encode_image.sh``` provides an example for encoding an image with Cool-chic:

```bash
python3 src/encode.py                               \
    --input=samples/biville.png                     \
    --output=samples/bitstream.bin                  \
    --model_save_path=samples/model.pt              \
    --enc_results_path=samples/encoder_results.txt  \
    --lmbda=0.0002                                  \
    --start_lr=1e-2                                 \
    --recipe=instant                                \
    --layers_arm=24,24                              \
    --n_ctx_rowcol=3                                \
    --latent_n_grids=7                              \
    --layers_synthesis=40-1-linear-relu,3-1-linear-relu,3-3-residual-relu,3-3-residual-none
```

| Argument                 | Role                                                                                                                                                                                                                                                                                                   | Suggested value(s)                                                         |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| ```--input```            | Image to compress                                                                                                                                                                                                                                                                                      | ```image.png```or ```image_<H>x<W>_1fps_yuv420_<bitdepth>b.yuv```          |
| ```--output```           | Output path for the bitstream                                                                                                                                                                                                                                                                          | ```image.bin```                                                            |
| ```--model_save_path```  | Save the overfitted model for analysis                                                                                                                                                                                                                                                                 | ```model.pt```                                                             |
| ```--enc_results_path``` | Save encoder logs                                                                                                                                                                                                                                                                                      | ```encoder_results.txt```                                                  |
| ```--lmbda```            | Rate constraint                                                                                                                                                                                                                                                                                        | From ```1e-4``` (high rate) to ```1e-2``` (low rate)                       |
| ```--start_lr```         | Initial learning rate                                                                                                                                                                                                                                                                                  | ```1e-2```                                                                 |
| ```--recipe```           | Encoder preset                                                                                                                                                                                                                                                                                         | ```instant, faster, fast, medium, slow, placebo```                         |
| ```--layers_arm```       | Dimension of hidden layers for the auto-regressive model                                                                                                                                                                                                                                               | ```24,24```                                                                |
| ```--n_ctx_rowcol```     | Number of rows & columns of context                                                                                                                                                                                                                                                                    | ```3```                                                                    |
| ```--latent_n_grids```   | Number of latent resolutions                                                                                                                                                                                                                                                                           | ```7```                                                                    |
| ```--layers_synthesis``` | Synthesis architecture, layers are separated with comas. |```40-1-linear-relu,3-1-linear-relu,3-3-residual-relu,3-3-residual-none```

<br/>
The syntax for each layer of the synthesis is  is: ```<out_dim>-<kernel>-<type>-<non_linearity>```.  ```type``` is either```linear``` or ```residual```.  ```non_linearity``` is either ```relu```, ```leakyrelu``` or ```none```

## Decoding a bitstream

The script ```samples/decode_image.sh``` provides an example for decoding an image with Cool-chic:

```bash
python3 src/decode.py                               \
    --input=samples/bitstream.bin                   \
    --output=samples/biville_decoded.png
```

## YUV420 format

Cool-chic is able to process YUV420 data with 8-bit and 10-bit representation. To do so, you need to call the ```src/encode.py``` script with an appropriately formatted name such as:

    --input=<videoname>_<W>x<H>_<framerate>_yuv420_<bitdepth>b.yuv

The encoder codes only the first frame of the video.

---

# ⚠️ Disclaimer ⚠️

This repository is only a proof of concept illustrating how the ideas of
Cool-chic could be translated into an actual codec. The encoding process (i.e.
learning the NNs and latent representation) might suffer from failures. In may
help to do successive encoding and keep the best one or tweak the learning rate.

---

# Thanks

We use the [constriction package](https://github.com/bamler-lab/constriction)
from Robert Bamler as our entropy coder. Many thanks for the great work!

    Bamler, Understanding Entropy Coding With Asymmetric Numeral Systems (ANS): a Statistician's Perspective
