import AuthPage from "./pages/AuthPage/AuthPage";
import HomePage from "./pages/HomePage/HomePage";

type Path = {
  resource: string;
  section?: number;
  id?: number;
}

const root = document.querySelector('#root') as HTMLElement;

const routes = [
  { path: '/', component: HomePage },
  { path: 'auth', component: AuthPage },
];

const parseLocation: () => Path = () => {
  const pathName = (window.location.hash.slice(2).toLowerCase() || '/').split('/');
  const path: Path = { resource: pathName[0] };
  if (pathName[1]) {
    path.section = +pathName[1];
  }
  if (pathName[2]) {
    path.id = +pathName[2];
  }
  return path;
};

const findComponentByPath = (path, routes) => routes.find(route => route.path === path || undefined);

export const router = () => {
  const path = parseLocation();
  console.log(path);
  const { component } = findComponentByPath(path.resource, routes) || routes[0];
  const pageElement = component.render(path.section, path.id);
  root.innerHTML = '';
  root.append(pageElement);
};
