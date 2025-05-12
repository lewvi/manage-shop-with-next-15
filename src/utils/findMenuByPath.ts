export function findMenuByPath(path: string, menus: any[]): any {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index];

    if (menu.path === path || menu.key === path) return menu;

    if (menu.children) {
      const found = findMenuByPath(path, menu.children);

      if (found) {
        return found;
      }
    }
  }
}
