#!/usr/bin/env python3
"""
    Get locale from request
"""
from flask import Flask, render_template, request
from flask_babel import Babel


class Config(object):
    """ Configuration Babel """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_TIMEZONE = 'UTC'
    BABEL_DEFAULT_LOCALE = 'en'


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@babel.localeselector
def get_locale():
    """ Locale language

        Return:
            Best match to the language
    """
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/', strict_slashes=False)
def index():
    """
        Renders the index page

        Return:
            The index page
    """
    return render_template('2-index.html')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")