import authPage from "./pages/AuthPage/AuthPage";
import homePage from "./pages/HomePage/HomePage";
import audioCallPage from "./pages/AudioCallPage/AudioCallPage";
import sprintPage from "./pages/SprintPage/SprintPage";
import Page from "./common/Page";
import textBookPage from "./pages/TextBook/TextBook";
import TeamPage from "./pages/TeamPage/TeamPage";
import statisticsPage from "./pages/StatisticsPage/StatisticsPage";

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
  { path: 'audiocall', component: audioCallPage },
  { path: 'sprint', component: sprintPage },
  { path: 'textbook', component: textBookPage },
  { path: 'about', component: TeamPage },
  { path: 'statistics', component: statisticsPage },
];

const parseLocation: () => Path = () => {
  const pathName = (window.location.hash.slice(2).toLowerCase() || '/').split('/');
  const path: Path = { resource: pathName[0] };
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
