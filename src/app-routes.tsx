import { HomePage, PlanningTaskList, ProfilePage, StandardbauPage, CfPage, NcfPage, UtilityPage } from './pages';
import { withNavigationWatcher } from './contexts/navigation';

const routes = [
    {
        path: '/planning-task-list',
        element: PlanningTaskList
    },
    {
        path: '/profile',
        element: ProfilePage
    },
    {
        path: '/home',
        element: HomePage
    }, 
  {
    path: '/standardbau',
    element: StandardbauPage
  }, 
  {
    path: '/cf',
    element: CfPage
  }, 
  {
    path: '/ncf',
    element: NcfPage
  }, 
  {
    path: '/utility',
    element: UtilityPage
  }
];

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});
