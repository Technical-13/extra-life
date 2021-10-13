import get from './request/get';

const BASE_URL = 'https://www.extra-life.org/api';

const buildQueryString = ( limit = 100, page = 1, getName ) => {
  const displayName = ( getName ? getName.p : undefined );
  const teamName = ( getName ? getName.t : undefined );
  const doName = ( displayName || teamName ? '&where=' + ( teamName ? `name LIKE '${teamName}'` : `displayName LIKE '${displayName}'` ) : '' );
  const parsedLimit = parseInt( limit );
  const parsedPage = parseInt( page );
  limit = ( !!parsedLimit ? parsedLimit : 100 );
  page = ( ( !!parsedPage ? parsedPage : 1 ) || 1 );
  const offset = ( page === 1 ? 1 : limit * ( page - 1 ) );
  return `?version=1.2&limit=${limit}&offset=${offset}${doName}`;
};

// Participants
// https://github.com/DonorDrive/PublicAPI/blob/master/docs/1.0/resources/participants.md
const countParticipants = async () => ( await get( `${BASE_URL}/participants${buildQueryString( 1 )}`, true ) );
const getParticipants = async ( limit, page ) => await get( `${BASE_URL}/participants${buildQueryString( limit, page )}` );
const findParticpantByName = async ( limit, page, displayName ) => await get( `${BASE_URL}/participants${buildQueryString( limit, page, { p: displayName } )}` );
const getParticipant = async participantId => await get( `${BASE_URL}/participants/${participantId}` );
const getParticipantActivity = async participantId => await get( `${BASE_URL}/participants/${participantId}/activity` );
const getParticipantBadges = async participantId => await get( `${BASE_URL}/participants/${participantId}/badges` );
const getParticipantDonations = async ( participantId, limit, page ) => await get( `${BASE_URL}/participants/${participantId}/donations${buildQueryString( limit, page )}` );
const getParticipantDonors = async ( participantId, limit, page ) => await get( `${BASE_URL}/participants/${participantId}/donors${buildQueryString( limit, page )}` );

// Teams
// https://github.com/DonorDrive/PublicAPI/blob/master/docs/1.0/resources/teams.md
const countTeams = async () => ( await get( `${BASE_URL}/teams${buildQueryString( 1 )}`, true ) );
const getTeams = async ( limit, page ) => await get( `${BASE_URL}/teams${buildQueryString( limit, page )}` );
const findTeamByName = async ( limit, page, teamName ) => await get( `${BASE_URL}/teams${buildQueryString( limit, page, { t: teamName } )}` );
const getTeam = async teamId => await get( `${BASE_URL}/teams/${teamId}` );
const getTeamActivity = async teamId => await get( `${BASE_URL}/teams/${teamId}/activity` );
const getTeamBadges = async teamId => await get( `${BASE_URL}/teams/${teamId}/badges` );
const getTeamDonations = async ( teamId, limit, page ) => await get( `${BASE_URL}/teams/${teamId}/donations${buildQueryString( limit, page )}` );
const getTeamDonors = async ( teamId, limit, page ) => await get( `${BASE_URL}/teams/${teamId}/donors${buildQueryString( limit, page )}` );
const getTeamParticipants = async ( teamId, limit, page ) => await get( `${BASE_URL}/teams/${teamId}/participants${buildQueryString( limit, page )}` );
