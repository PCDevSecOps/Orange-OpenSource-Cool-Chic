Cool-chic code at a glance
==========================

The source directory is organized as follows

.. code:: none

    src/
    |______ bitstream/                             Functions to map Cool-chic to a binary file and vice versa     
    |______ encoding_management/                   Contains training (i.e. encoding) hyperparameters              
    |______ models/                                The different modules composing the encoder                    
    |          |______ coolchic_components/        The different neural networks (ARM, upsampling and synthesis)  
    |          |______ coolchic_encoder.py         Entire Cool-chic architecture i.e. ARM + upsampling + synthesis
    |          |______ inter_coding_module.py      Not used for image coding                                      
    |          |______ frame_encoder.py            A coolchic encoder followed by a inter_coding_module           
    |          |______ video_encoder.py            One frame_encoder for each frame of the video to compress      
    |______ utils/                                 Utilities                                                      
    |______ visu/                                  Helper to visualize the inner behavior of Cool-chic            