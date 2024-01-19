export const getIsUserAuth = store => store.user.isAuth;
export const getIsUserLoading = store => store.user.is_loading;
export const getUserRole = store => store.user.role;
// export const getUserRole = store => store.user.role.name;
// export const getUserTeam = store => store.user.team.name;
export const getUserTeam = store => store.user.team;
export const getUserTeamId = store => store.user.teamId;