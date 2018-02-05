const respondXML = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(object);
  response.end();
};

const XMLify = (msg, id) => {
  if (id) {
    return `<response><id>${id}</id><message>${msg}</message></response>`;
  }

  return `<response><message>${msg}</message></response>`;
};

const success = (request, response) => {
  respondXML(request, response, 200, XMLify('This is a successful response'));
};

const badRequest = (request, response, params) => {
  if (!params.valid || params.valid !== 'true') {
    respondXML(request, response, 400, XMLify('Missing valid query parameter set to true', 'badRequest'));
  } else {
    respondXML(request, response, 200, XMLify('This request has the required parameters'));
  }
};

const unauthorized = (request, response, params) => {
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    respondXML(request, response, 401, XMLify('Missing loggedIn query parameter set to yes', 'unauthorized'));
  } else {
    respondXML(request, response, 200, XMLify('This request has the required parameters'));
  }
};


const notFound = (request, response) => {
  respondXML(request, response, 404, XMLify('The page you are looking for was not found.', 'notFound'));
};

const forbidden = (request, response) => {
  respondXML(request, response, 403, XMLify('You do not have access to this content', 'forbidden'));
};

const internal = (request, response) => {
  respondXML(request, response, 500, XMLify('Internal Server Error. Something went wrong.', 'internal'));
};

const notImplemented = (request, response) => {
  respondXML(request, response, 501, XMLify('A get request for this page has not been implemented yet. Check again later for updated content.', 'notImplemented'));
};


module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
};
