Overview
========

Encoding your own image or video is achieved by using the script ``src/encode.py``.

.. code:: bash

    (venv) python src/encode.py                         \
        --input=path_to_my_example                      \
        --output=bitstream.bin                          \
        --workdir=./my_temporary_workdir/

Unlike the decoding script which only takes input and output arguments, the
encoder has many arguments allowing to tune Cool-chic for your need.

* :doc:`Neural networks architecture <./architecture>` parametrizes the decoder complexity
* :doc:`Encoding presets <./preset>` affects the encoding complexity by
  changing the training parameters
* :doc:`Video configuration <./video>` sets the coding structure *i.e.* random
  access vs. low-delay, intra period *etc.*

A full-fledged encoding example is given for both images and videos.

.. code:: bash

    (venv) ./samples/encode_image.sh                    # Encode a single image
    (venv) ./samples/encode_video_random_access.sh      # Encode a random access GOP
    (venv) ./samples/encode_video_low_delay_p.sh        # Encode a low-delay P GOP

I/O format
""""""""""

Cool-chic is able to encode PNG files and YUV 420 files. The naming of YUV files
must comply with the following convention

.. code:: bash

    --input=<videoname>_<Width>x<Height>_<framerate>p_yuv420_<bitdepth>b.yuv

Note that Cool-chic support both 8-bit and 10-bit YUV file. Support for YUV 444
is not yet implemented.

