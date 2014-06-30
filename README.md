js-to-sexp
==========

`js2sexp` is a nodejs shell script to print a JavaScript syntax tree as
S-Expressions.

It requires the npm package [Reflect], though it could be re-engineered to 
work with [esprima].


Installation
------------

To install in `$HOME/bin`, run:

    make install


Usage
-----

To use, run:

    js2sexp <javascript input file>

it will dump the result to stdout.


[Reflect]: https://www.npmjs.org/package/reflect

[esprima]: http://esprima.org/
