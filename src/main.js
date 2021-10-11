import get from './request/get';

const BASE_URL = 'https://www.extra-life.org/api';

const buildQueryString = ( limit = 100, page = 1 ) => {
  const parsedLimit = parseInt( limit );
  const parsedPage = parseInt( page );
  limit = ( !!parsedLimit ? parsedLimit : 100 );
  page = ( ( !!parsedPage ? parsedPage : 1 ) || 1 );
  const offset = ( page === 1 ? 1 : limit * ( page - 1 ) );
  return `?limit=${limit}&offset=${offset}`;
};

// Participants
// https://github.com/DonorDrive/PublicAPI/blob/master/docs/1.0/resources/participants.md
export const countParticipants = async ( limit, page ) => ( await get( `${BASE_URL}/participants${buildQueryString( 1 )}` ) ).totalRecords;
export const getParticipants = async ( limit, page ) => await get( `${BASE_URL}/participants${buildQueryString( limit, page )}` );
//export const findParticpantByName = async displayName => await get( `${BASE_URL}/participants?orderBy=displayName&displayName=${displayName}` );
export const getParticipant = async participantId => await get( `${BASE_URL}/participants/${participantId}` );
export const getParticipantActivity = async participantId => await get( `${BASE_URL}/participants/${participantId}/activity` );
export const getParticipantBadges = async participantId => await get( `${BASE_URL}/participants/${participantId}/badges` );
export const getParticipantDonations = async (participantId, limit, page) => await get( `${BASE_URL}/participants/${participantId}/donations${buildQueryString( limit, page )}` );
export const getParticipantDonors = async (participantId, limit, page) => await get( `${BASE_URL}/participants/${participantId}/donors${buildQueryString( limit, page )}` );

// Teams
// https://github.com/DonorDrive/PublicAPI/blob/master/docs/1.0/resources/teams.md
export const countTeams = async ( limit, page ) => ( await get( `${BASE_URL}/teams${buildQueryString( 1 )}` ) ).totalRecords;
export const getTeams = async ( limit, page ) => await get( `${BASE_URL}/teams${buildQueryString( limit, page )}` );
//export const findTeamByName = async teamName => await get( `${BASE_URL}/teams/${teamName}` );
export const getTeam = async teamId => await get( `${BASE_URL}/teams/${teamId}` );
export const getTeamActivity = async teamId => await get( `${BASE_URL}/teams/${teamId}/activity` );
export const getTeamBadges = async teamId => await get( `${BASE_URL}/teams/${teamId}/badges` );
export const getTeamDonations = async ( teamId, limit, page ) => await get( `${BASE_URL}/teams/${teamId}/donations${buildQueryString( limit, page )}` );
export const getTeamDonors = async ( teamId, limit, page ) => await get( `${BASE_URL}/teams/${teamId}/donors${buildQueryString( limit, page )}` );
export const getTeamParticipants = async ( teamId, limit, page ) => await get( `${BASE_URL}/teams/${teamId}/participants${buildQueryString( limit, page )}` );
