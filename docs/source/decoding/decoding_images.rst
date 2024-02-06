Decoding images with Cool-chic
===============================

The script ``./src/decode.py`` is used to decode image with Cool-chic:

.. code:: bash

    (venv) python src/decode.py                         \
        --input=samples/bitstream.bin                   \
        --output=samples/biville_decoded.png

.. attention::

    While Cool-chic requires few arithmetic operations to decode a file, the
    current implementation is slow due to its experimental nature. It does not
    reflect the decoding time that a proper implementation would achieve
