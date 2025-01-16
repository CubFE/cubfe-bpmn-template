import { useRouter } from "vue-router";

export function useMenu() {
    const router = useRouter();

    // 提取 `path: '/'` 的子菜单
    const getHomeMenu = () => {
        const rootRoute = router.getRoutes().find((route) => route.path === "/");
        if (!rootRoute || !rootRoute.children) return [];
        return rootRoute.children.map((child) => ({
            title: child.meta.pageTitle,
            icon: child.meta.icon,
            url: `/${child.path}`,
            isActive: router.currentRoute.value.path === `/${child.path}`
        }));
    };

    // 递归提取菜单
    const extractMenu = (routes, basePath = "") => {
        return routes.map((route) => {
            const fullPath = `${basePath}/${route.path}`.replace(/\/+/g, "/"); // 确保路径格式正确
            const menu = {
                title: route.meta?.pageTitle || route.path,
                icon: route.meta?.icon,
                url: fullPath,
                type: route.meta?.type,
                isActive: router.currentRoute.value.path === fullPath
            };

            // 如果存在子路由，递归提取
            if (route.children && route.children.length > 0) {
                menu.children = extractMenu(route.children, fullPath);
            }

            return menu;
        });
    };

    // 提取 `path: '/workspace'` 的子菜单
    const getWorkspaceMenu = () => {
        const workspaceRoute = router
            .getRoutes()
            .find((route) => route.path === "/workspace");
        if (!workspaceRoute || !workspaceRoute.children) return [];
        return extractMenu(workspaceRoute.children, "/workspace");
    };

    return {
        homeMenu: getHomeMenu(),
        workspaceMenu: getWorkspaceMenu()
    };
}