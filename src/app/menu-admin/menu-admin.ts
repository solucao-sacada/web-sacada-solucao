export const MENU_ADMIN = [
    {
        label: 'Painel',
        items: [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/app'],
            },
        ],
    },
    {
        label: 'Pedidos',
        items: [
            {
                label: 'Realizar Pedido',
                icon: 'pi pi-fw pi-box',
                routerLink: ['/app/pedidos/novo'],
            },
            {
                label: 'Meus Pedidos',
                icon: 'pi pi-fw pi-box',
                routerLink: ['/app/pedidos/listar'],
            },
            {
                label: 'Rascunhos',
                icon: 'pi pi-fw pi-box',
                routerLink: ['/app/pedidos/listar/rascunhos'],
            },
        ],
    },
    {
        label: 'Orçamentos',
        items: [
            {
                label: 'Novo Orçamento',
                icon: 'pi pi-fw pi-dollar',
                routerLink: ['/app/orcamentos/novo/S'],
            },
            {
                label: 'Meus Orçamentos',
                icon: 'pi pi-fw pi-dollar',
                routerLink: ['/app/orcamentos/listar'],
            },
        ],
    },
];
