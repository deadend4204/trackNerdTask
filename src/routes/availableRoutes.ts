import LiveMap from "../pages/liveMap/liveMap";
import Dashboard from "../pages/dashboard/dashboard";
import Login from "../pages/login/login";
import { APPLICATION_ROUTES } from "../utils/apiConstant";

export const availableRoutes = [
  {
    component: Login,
    path: APPLICATION_ROUTES.LOGIN,
    isPrivate: false,
    isDashboard: true,
    visibleAfterLogin: false,
  },
  {
    component: Dashboard,
    path: APPLICATION_ROUTES.HOME,
    isPrivate: true,
    isDashboard: true,
    visibleAfterLogin: true,
  },
  {
    component: LiveMap,
    path: APPLICATION_ROUTES.LIVE_MAP,
    isPrivate: false,
    isDashboard: false,
    visibleAfterLogin: true,
  },
];
