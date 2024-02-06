# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

import sys
import os

# sys.path.insert(0, os.path.abspath(os.path.join('..', '..', 'src')))
# sys.path.insert(0, os.path.abspath(os.path.join('..', '..')))


# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'Cool-chic'
copyright = '2024 Orange'
author = 'Théo Ladune'
release = '3.0'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    "sphinx.ext.autodoc",
    "sphinx.ext.autosummary",
    "sphinx.ext.mathjax",
    "sphinx.ext.napoleon",
    "sphinx.ext.viewcode",
    'sphinx.ext.duration',
    'sphinx.ext.todo',
]


# templates_path = ['_templates']
exclude_patterns = []

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = "sphinx_book_theme"  # furo
html_title = "Cool-chic"
# html_logo = "_static/logo_cool_chic.png"
# html_show_sphinx = False

pygments_style = "sphinx"
pygments_dark_style = "monokai"

# build the templated autosummary files
autosummary_generate = True
add_module_names = False

# Automatically extract typehints when specified and place them in
# descriptions of the relevant function/method.
autodoc_typehints = "description"

# Don't show class signature with the class' name.
autodoc_class_signature = "separated"

html_theme_options = {
    # "repository_url": "https://github.com/Orange-OpenSource/Cool-Chic",
    # "use_repository_button": True,
    # "home_page_in_toc": True,
}

html_static_path = ['_static']
