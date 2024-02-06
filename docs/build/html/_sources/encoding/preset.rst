Encoding presets
================

As with conventional codecs, there is a trade-off between Cool-chic encoding
time and compression performance. The encoding settings of Cool-chic are changed
using the following arguments:

* ``--recipe``

* ``--start_lr``

* ``--n_itr``

* ``--n_train_loops``

Recipes
"""""""

Cool-chic encoding works with tweakable recipes *i.e.* different training
parameters. Currently available recipes are:

* ``c3`` Inspired by `C3: High-performance and low-complexity neural compression from a single image or video, Kim et al <https://arxiv.org/abs/2312.02753>`_
  * Composed of two main phases: 1. additive noise model for the quantization 2. Actual quantization

* ``debug`` Extremely fast preset with very bad performance only for debugging purposes.

All recipes feature a decreasing learning rate starting from ``--start_lr``.

The number of iterations in the first (and longest) phase of the ``c3``recipe is
set using ``--n_itr``.

In order to circumvent some training irregularities, it is possible to perform
several independent encoding, keeping only the best one. We call that a training
loop. The number of training loops is set by ``--n_train_loops``.

Reasonable arguments
""""""""""""""""""""

The following encoding parameters gives most of the performance while being
reasonably fast.

.. code-block:: bash

  (venv) python src/encode.py --recipe=c3 --start_lr=1e-2 --n_itr=10000 --n_train_loops=2

.. tip::

    Obtaining the absolute best compression performance from Cool-chic might
    require significantly longer training than suggested above
