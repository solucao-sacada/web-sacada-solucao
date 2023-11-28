export const MENUS = [
    {
        label: 'Admin',
        items: [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/'],
            },
            {
                label: 'Orçamentos',
                icon: 'pi pi-fw pi-dollar',
                routerLink: ['/admin/orcamentos'],
            },
            {
                label: 'Pedidos',
                icon: 'pi pi-fw pi-box',
                routerLink: ['/admin/pedidos/novo'],
            },
        ],
    },
    {
        label: 'Pedidos',
        items: [
            {
                label: 'Realizar Pedido',
                icon: 'pi pi-fw pi-box',
                routerLink: ['/admin/pedidos/novo'],
            },
            {
                label: 'Meus Pedidos',
                icon: 'pi pi-fw pi-box',
                routerLink: ['/admin/pedidos/listar'],
            },
        ],
    },
    {
        label: '4 Code SolutionS',
        items: [
            {
                label: 'Visit Website',
                icon: 'pi pi-fw pi-arrow-up-right',
                url: ['https://4codesolutions.com/'],
                target: '_blank',
            },
        ],
    },
];
