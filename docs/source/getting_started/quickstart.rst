Quickstart
==========


.. attention::

    Python version must be **3.10 or newer**.

    .. code:: bash

        python3 --version   # Should be at least 3.10


Installing necessary packages
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A ``requirements.txt`` file is provided to install the necessary packages.

.. code:: bash

    python3 -m pip install virtualenv                          # Install virtual env if needed
    python3 -m virtualenv venv && source venv/bin/activate     # Create and activate a virtual env named "venv"
    (venv) pip install -r requirements.txt                     # Install the required packages

You're good to go!
******************
