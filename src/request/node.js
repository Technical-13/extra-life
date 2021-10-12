import https from 'https';

export default ( url, count = false ) => {
  return new Promise( ( resolve, reject ) => {
    https
      .get( url, res => {
      var reason = undefined;
      switch ( res.statusCode ) {
        case 200: break;
        case 204:
          reason = `204: No Content:\n\tThe pagination offset is out of range.`;
          break;
        case 304:
          reason = `304: Not Modified:\n\t*If-None-Match* was furnished and the response is unmodified`;
          break;
        case 400:
          reason = `400: Bad Request:\n\tThe request could not be interpreted.`;
          break;
        case 404:
          reason = `404: Not Found:\n\tID or URL provided not found.`;
          break;
        case 412:
          reason = `412: Precondition Failed:\n\tThe version furnished is unsupported.`;
          break;
        case 429:
          reason = `429: Too Many Requests:\n\tYou've been rate limited!  Take a break!`;
          break;
        case 500:
          reason = `500: Internal Server Error:\n\tExtra-life tech support has been notified.`;
          break;
        case 503:
          reason = `503: Service Unavailable:\n\tThe Extra-life API is unavailable or undergoing maintenance.`;
          break;
        default:
          reason = `${res.statusCode}: Unknown Error, for more information:\n\thttps://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${res.statusCode}`;
      }
      if ( reason ) { return reject( new Error( reason ) ); }

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
      } )
      .on( 'error', reject );
  } );
};
