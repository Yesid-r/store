export const API_URL = 'https://uptc-store.vercel.app'
export const navigation = {
    categories: [
        {
            id: 'categorias',
            name: 'Categorias',
            featured: [
                {
                    name: 'Nuevo',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Accesorios',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
            ],
            sections: [
                {
                    id: 'libreria',
                    name: 'Libreria',
                    items: [
                        { name: 'Ingenieria', href: '/search-category/ingenieria' },
                        { name: 'Administracion', href: '/search-category/administracion' },
                        { name: 'Finanzas', href: '/search-category/finanzas' },
                        { name: 'Contabilidad', href: '/search-category/contabilidad' },
                        { name: 'Browse All', href: '/search-category/all-libreria' },
                    ],
                },
                {
                    id: 'papeleria',
                    name: 'Papeleria',
                    items: [
                        { name: 'Esferos', href: '/search-category/esferos' },
                        { name: 'Agendas', href: '/search-category/agendas' },
                        { name: 'Cuadernos', href: '/search-category/cuadernos' },
                        { name: 'Libretas', href: '/search-category/libretas' },
                        { name: 'Browse All', href: '/search-category/all-papeleria' },
                    ],
                },
                {
                    id: 'ropa',
                    name: 'Ropa',
                    items: [
                      { name: 'Camisas', href: '/search-category/camisas' },
                      { name: 'Camisetas', href: '/search-category/camisetas' },
                      { name: 'Busos', href: '/search-category/busos' },
                      { name: 'Chaquetas', href: '/search-category/chaquetas' },
                      { name: 'Chalecos', href: '/search-category/chalecos' },
                      { name: 'Gorras', href: '/search-category/gorras' },
                      { name: 'Botas', href: '/search-category/botas' },
                      { name: 'Browse All', href: '/search-category/all-ropa' },
                    ],
                  },
                {
                    id: 'accesorios',
                    name: 'Accesorios',
                    items: [
                        { name: 'Bebidas', href: '/search-category/bebidas' },
                        { name: 'Bolsos', href: '/search-category/bolsos' },
                        { name: 'Llaveros', href: '/search-category/llaveros' },
                        { name: 'Canguros', href: '/search-category/canguros' },
                        { name: 'Oficina', href: '/search-category/oficina' },
                        { name: 'Paraguas', href: '/search-category/paraguas' },
                        { name: 'Browse All', href: '/search-category/all-paraguas' },
                    ],
                },
                
            ],
        }
    ],
    pages: [
        {name: 'Inicio', href: '/'},

    ],
}