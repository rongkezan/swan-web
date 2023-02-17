import { API } from "types";

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.User } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    routeFilter: (route: any) => (
      currentUser?.perms?.map(p => p.permName).includes(route.name)
    )
  };
}
