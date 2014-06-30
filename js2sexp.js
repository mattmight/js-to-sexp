#!/usr/bin/env node

var fs = require("fs") ;
var sys = require("sys") ;
var reflect = require("Reflect") ;
var assert = require("assert") ;

// Assume the input filename is argv[2]:
var argv = process.argv ;

var input = fs.readFileSync(argv[2],{encoding: 'utf8'}) ;


// Create an AST:
var ast = reflect.parse(input) ;

// map : (a -> b) -> array[a] -> array[b]
function map(f,a) {
  var b = [] ;
  for (var i = 0; i < a.length; i++) {
    b[i] = f(a[i]) ;
  }
  return b ;
}

// sexpify : converts a parse tree node into an S-Expression
function sexpify(node) {

  if (typeof node == "string") return JSON.stringify(node) ;
  if (typeof node == "number") return node ;
  if (typeof node == "boolean") return (node ? '#t' : '#f') ;

  if (node instanceof Array) {
    return map(sexpify,node).join(" ") ;
  }

  assert(node.type, "no type field for node") ;

  var params = [] ;

  for (var k in node) {
    switch (k) {
      case 'type':
      break ;

      case 'loc':
      params.push('(loc (start (line '+node.loc.start.line+') '+
                              '(column '+node.loc.start.column+')) '+
                       '(end (line '+node.loc.end.line+') '+
                            '(column '+node.loc.end.column+')))') ;
      break ;

      default: 
      params.push( '(' + k + ' ' + sexpify(node[k]) + ')' ) ;
    }
  }

  return '(' + node.type + ' ' + params.join(' ') + ')' ;
}


// Print the S-Expressions for the syntax tree:
sys.print(sexpify(ast)) ;


