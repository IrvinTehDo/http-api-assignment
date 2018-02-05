const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  const dataType = request.headers.accept;

  switch (parsedUrl.pathname) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/style.css':
      htmlHandler.getStyle(request, response);
      break;
    case '/success':
      if (dataType === 'application/json') {
        jsonHandler.success(request, response);
      } else {
        xmlHandler.success(request, response);
      }
      break;
    case '/badRequest':
      if (dataType === 'application/json') {
        jsonHandler.badRequest(request, response, query.parse(parsedUrl.query));
      } else {
        xmlHandler.badRequest(request, response, query.parse(parsedUrl.query));
      }
      break;
    case '/forbidden':
      if (dataType === 'application/json') {
        jsonHandler.forbidden(request, response);
      } else {
        xmlHandler.forbidden(request, response);
      }
      break;
    case '/internal':
      if (dataType === 'application/json') {
        jsonHandler.internal(request, response);
      } else {
        xmlHandler.internal(request, response);
      }
      break;
    case '/notImplemented':
      if (dataType === 'application/json') {
        jsonHandler.notImplemented(request, response);
      } else {
        xmlHandler.notImplemented(request, response);
      }
      break;
    case '/unauthorized':
      if (dataType === 'application/json') {
        jsonHandler.unauthorized(request, response, query.parse(parsedUrl.query));
      } else {
        xmlHandler.unauthorized(request, response, query.parse(parsedUrl.query));
      }
      break;
    default:
      if (dataType === 'application/json') {
        jsonHandler.notFound(request, response);
      } else {
        xmlHandler.notFound(request, response);
      }
      break;
  }
};

http.createServer(onRequest).listen(port);

// console.log(`Listening on 127.0.0.1: ${port}`);
