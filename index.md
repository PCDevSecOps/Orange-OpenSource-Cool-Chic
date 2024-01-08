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
&emsp;&emsp;&emsp;&emsp;&emsp; Cool-chic (pronounced <span class="ipa">/kul ʃik/</span> as in French 🥖🧀🍷) is a <b>low-complexity</b>  neural image codec based on <b>overfitting</b>. With only <b>2 000 multiplication / decoded pixel</b>, it offers coding performance on par with <s>HEVC</s> VVC.
</div>

<div style="text-align: center; margin-bottom: 3%">
{% include button.html text="Show me the code!" icon="github" link="https://github.com/Orange-OpenSource/Cool-Chic" color="#E76F51" %}
</div>


### Version history

* January 24: Cool-chic 3.0
    - Re-implement most of the __encoder-side improvements__ proposed by [_C3: High-performance and low-complexity neural compression from a single image or video_, Kim et al.](https://arxiv.org/abs/2312.02753)
* July 23: Cool-chic 2 [_Low-complexity Overfitted Neural Image Codec_, Leguay et al.](https://arxiv.org/abs/2307.12706)
    - Several architecture changes for the decoder: __convolution-based__ synthesis, learnable upsampling module
    - Friendlier usage: support for YUV 420 input format in 8-bit and 10-bit & Fixed point arithmetic for cross-platform entropy (de)coding
* March 23: Cool-chic 1 [_COOL-CHIC: Coordinate-based Low Complexity Hierarchical Image Codec_, Ladune et al.](https://arxiv.org/abs/2212.05458)

Up to come: Cool-chic 3.1 will extend Cool-chic 3.0 to video coding! 🔥🔥🔥

---

# Cool-chic 3.0 performance

The table below presents the relative rate for identical PSNR of Cool-chic 3.0
against different anchors. A negative figure indicates that Cool-chic 3.0
requires less rate for the same quality. Note that we also provide all the
bitstreams required to reproduce these results.

| Dataset          | Vs. Cool-chic 2                              | Vs. Cool-chic 1                              | Vs. [_C3_, Kim et al.](https://arxiv.org/abs/2312.02753) | Vs. HEVC (HM 16.20)                          | Vs. VVC (VTM 19.1)                           |
|------------------|----------------------------------------------|----------------------------------------------|----------------------------------------------------------|----------------------------------------------|----------------------------------------------|
| kodak            | <span style="color:green" > - 19.0 % </span> | <span style="color:green"> - 28.8 % </span>  | <span style="color:green"> - 1.2 %  </span>              | <span style="color:green" > - 14.5 % </span> | <span style="color:#f50" > + 6.6 %   </span> |
| clic20-pro-valid | <span style="color:green" > - 15.9 % </span> | <span style="color:gray"> /  </span>         | <span style="color:#f50" >+  4.4 %   </span>             | <span style="color:green" > - 20.6 % </span> | <span style="color:#f50" > + 3.4 %   </span> |
| jvet             | <span style="color:green" > - 21.4 % </span> | <span style="color:gray"> /  </span>         | <span style="color:gray"> /  </span>                     | <span style="color:green" > - 12.1 % </span> | <span style="color:#f50" > + 27.7 %  </span> |

# Setup

## ⚠️ Python version

Python version should be at least 3.10!

```bash
python3 --version                                          # Should be at least 3.10
```

### Necessary packages

```bash
python3 -m pip install virtualenv                          # Install virtual env if needed
python3 -m virtualenv venv && source venv/bin/activate     # Create and activate a virtual env named "venv"
(venv) pip install -r requirements.txt                     # Install the required packages
```

# Decoding images with Cool-chic

Already encoded files are provided as bitstreams in ```results/<dataset_name>/```where ```<dataset_name>```can be ```kodak, clic20-pro-valid, clic22-test, jvet```.

For each dataset, a script is provided to decode all the bitstreams.

```bash
(venv) python results/decode_one_dataset.py <dataset_name> # Can take a few minutes
```

The file ```results/<dataset_name>/results.tsv``` provides the results that should be obtained.

<br/>

# Encoding your own images

The script ```samples/encode_image.sh``` provides an example for encoding an image with Cool-chic:

```bash
(venv) python src/encode.py                         \
    --input=samples/biville.png                     \
    --output=samples/bitstream.bin                  \
    --workdir=./my_temporary_workdir/               \
    --lmbda=0.0002                                  \
    --start_lr=1e-2                                 \
    --layers_synthesis=40-1-linear-relu,3-1-linear-relu,X-3-residual-relu,X-3-residual-none \
    --upsampling_kernel_size=8                      \
    --layers_arm=24,24                              \
    --n_ctx_rowcol=3                                \
    --n_ft_per_res=1,1,1,1,1,1,1                    \
    --n_itr=1000                                    \
    --n_train_loops=1
```


| Argument                  | Role                                                      | Suggested value(s)                                                         |
|---------------------------|-----------------------------------------------------------|----------------------------------------------------------------------------|
| ```--input```             | Image to compress                                         | ```image.png```or ```image_<H>x<W>_1fps_yuv420_<bitdepth>b.yuv```          |
| ```--output```            | Output path for the bitstream                             | ```image.bin```                                                            |
| ```--workdir```           | Output several logs into this directory logs              | ```./my_temporary_workdir/```                                              |
| ```--lmbda```             | Rate constraint                                           | From ```1e-4``` (high rate) to ```1e-2``` (low rate)                       |
| ```--start_lr```          | Initial learning rate                                     | ```1e-2```                                                                 |
| ```--layers_synthesis```  | Synthesis architecture, layers are separated with comas.  |```40-1-linear-relu,3-1-linear-relu,X-3-residual-relu,X-3-residual-none```  |
| ```--upsampling_kernel_size``` | Size of the learned upsampling kernel.               |```8```                                                                     |
| ```--layers_arm```        | Dimension of hidden layers for the auto-regressive model  | ```24,24```                                                                |
| ```--n_ctx_rowcol```      | Number of rows & columns of context                       | ```3```                                                                    |
| ```--n_ft_per_res```      | Number of feature(s) for each latent resolution           | ```1,1,1,1,1,1,1```                                                        |
| ```--n_itr```             | Maximum number of iteration per training phase            | From ```10000``` to ```100000```                                           |
| ```--n_train_loops```     | Number of independent encoding of the frame (the best one is kept)    | From ```1``` to ```5```                                        |

The syntax for each layer of the synthesis is  is: ```<out_dim>-<kernel>-<type>-<non_linearity>```.  ```type``` is either```linear``` or ```residual```.  ```non_linearity``` is either ```relu```, ```leakyrelu``` or ```none```. If the ```out_dim``` is set to ```X```, it is automatically replaced by the number of required output channels (i.e. 3 for a RGB or YUV image)

The script ```samples/decode_image.sh``` provides an example for decoding an image with Cool-chic:

```bash
(venv) python src/decode.py                         \
    --input=samples/bitstream.bin                   \
    --output=samples/biville_decoded.png
```

## YUV420 format

Cool-chic is able to process YUV420 data with 8-bit and 10-bit representation. To do so, you need to call the ```src/encode.py``` script with an appropriately formatted name such as:

    --input=<videoname>_<W>x<H>_<framerate>_yuv420_<bitdepth>b.yuv

The encoder codes only the first frame of the video.

---

# Visual comparison



<!-- <div>
<p style="text-align: left; width:70%; display: inline-block;">Up to come: Cool-chic 3.1 will extend Cool-chic 3.0 to video coding.</p>
<p style="text-align: right; width:29%;  display: inline-block;">{% include button.html text="Show me the code!" icon="github" link="https://github.com/Orange-OpenSource/Cool-Chic" color="#E76F51" %}</p>
</div> -->


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


---


# ⚠️ Disclaimer

This repository is only a proof of concept illustrating how the ideas of Cool-chic could be translated into an actual codec.
The encoding process (i.e. learning the NNs and latent representation) might suffer from failures. It may help to do successive encoding and keep the best one or to tweak the learning rate.

# Thanks

Special thanks go to:

* Robert Bamler for the [_constriction package_](https://github.com/bamler-lab/constriction) which serves as our entropy coder. More details @ [_Understanding Entropy Coding With Asymmetric Numeral Systems (ANS): a Statistician's Perspective_, Bamler](https://arxiv.org/pdf/2201.01741.pdf).
* Hyunjik Kim, Matthias Bauer, Lucas Theis, Jonathan Richard Schwarz and Emilien Dupont for their great work enhancing Cool-chic: [_C3: High-performance and low-complexity neural compression from a single image or video_, Kim et al.](https://arxiv.org/abs/2312.02753)
