export const ApiPath = {
  // Auth
  LOGIN: getApiPath("auth/admin-login"),

  //Profile
  GET_PROFILE: getApiPath("auth/user"),
  UPDATE_PROFILE: getApiPath("auth/update"),

  //Transaction History
  TRANSACTION_HISTORY: getApiPath("bill/all"),

  //Post
  GET_POSTS: getApiPath("post/list"),
  DELETE_POST: getApiPath("post/delete"),
  CREATE_POST: getApiPath("post/create"),
  UPDATE_POST: getApiPath("post/update"),

  //Users
  GET_USERS: getApiPath("auth/list-admin"),
  CREATE_ADMIN: getApiPath("auth/add-admin"),
  ACTIVE_ADMIN: getApiPath("auth/active-admin"),

  //Home
  BILL_CHART: getApiPath("dashboard/bill"),
  TOPIC_CHART: getApiPath("dashboard/topic"),
  USER_CHART: getApiPath("dashboard/user"),
};

function getApiPath(path: string) {
  return `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT!}/api/v1/${path}`;
}
