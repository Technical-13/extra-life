import https from 'https';

export default ( url, count = false ) => {
  const getReason = ( code, forbidden = { cfRay: undefined, ip: undefined } ) => {
    switch ( parseInt( code ) ) {
      case 200: break;
      case 204:
        return '204: No Content: The pagination offset is out of range.';
      case 304:
        return '304: Not Modified: *If-None-Match* was furnished and the response is unmodified';
      case 400:
        return '400: Bad Request: The request could not be interpreted.';
      case 403:
        return '403: Forbidden: You have been blocked.\n\tPlease email <support@extra-life.org> with:\n\t\tCloudflare Ray ID: ' +
          forbidden.cfRay + '\n\t\t               IP: ' + forbidden.ip;
      case 404:
        return '404: Not Found: ID or URL provided not found.';
      case 412:
        return '412: Precondition Failed: The version furnished is unsupported.';
      case 429:
        return '429: Too Many Requests: you\'ve been rate limited!  Take a break!';
      case 500:
        return '500: Internal Server Error: xtra-life tech support has been notified.';
      case 503:
        return '503: Service Unavailable: The Extra-life API is unavailable or undergoing maintenance.';
      default:
        return ( typeof code ) + '( ' + code +
          ' ): Unknown Error, for more information:\n\thttps://developer.mozilla.org/en-US/docs/Web/HTTP/Status/' + code;
    }
  }
  return new Promise( ( resolve, reject ) => {
    https.get( url, res => {
      var code = res.statusCode, forbidden = false;
      if ( code === 403 ) { forbidden = { cfRay: res.headers[ 'cf-ray' ], ip: res.headers.ip }; }
      var reason = getReason( code, forbidden );
      if ( reason ) { console.error( '%s:\n\t%s', strNow(), reason ); reject; }
      const numRecords = res.headers[ 'num-records' ];
      if ( count && numRecords !== undefined ) { return resolve( parseInt( numRecords ) ); }
      let data = '';
      res.on( 'data', chunk => { data += chunk; } );
      res.on( 'end', () => {
        if ( numRecords !== undefined ) {
          return resolve( {
            totalRecords: parseInt( numRecords ),
            records: JSON.parse( data )
          } );
        }
        return resolve( JSON.parse( data ) );
      } );
     .on( 'error', err => {
      var code = parseInt( err.response.statusCode ), forbidden = false;
      if ( code === 403 ) { forbidden = { cfRay: err.response.headers[ 'cf-ray' ], ip: err.response.ip }; }
      var reason = getReason( code, forbidden );
      console.error( '%s:\n\t%s', strNow(), reason );
      reject;
     } );
  } );
};
