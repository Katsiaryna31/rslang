import authPage from "./pages/AuthPage/AuthPage";
import homePage from "./pages/HomePage/HomePage";
import Page from "./common/Page";

export type Path = {
  resource: string;
  section?: number;
  id?: number;
};

type Route = {
  path: string;
  component: Page;
};

const root = document.querySelector('#root') as HTMLElement;

const routes = [
  { path: '/', component: homePage },
  { path: 'auth', component: authPage },
];

const parseLocation: () => Path = () => {
  const pathName = (window.location.hash.slice(2).toLowerCase() || '/').split('/');
  const path: Path = { resource: pathName[0] };
  // if (pathName[1]) {
  //   path.section = +pathName[1];
  // }
  // if (pathName[2]) {
  //   path.id = +pathName[2];
  // }
  return path;
};

const findComponent = (path: string, routesList: Route[]) => routesList.find((r) => r.path === path || undefined);

const router = () => {
  const path = parseLocation();
  const { component } = findComponent(path.resource, routes) || routes[0];
  const pageElement = component.render();
  root.innerHTML = '';
  root.append(pageElement);
};

export default router;
