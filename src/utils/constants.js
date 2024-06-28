export const API_URL = 'https://backend-ecommerce-nodejs-prisma.vercel.app'
//  export const API_URL = 'http://localhost:3001'

const fetchCategories = async () => {
    try {
        const response = await fetch(`${API_URL}/api/category`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

const createSectionsFromApi = (categories) => {
    return categories.map(category => ({
        id: category.name.toLowerCase().replace(/\s+/g, '-'),
        name: category.name,
        items: [
            ...category.subCategories.map(subCategory => ({
                name: subCategory.name,
                href: `/sub-category/${subCategory.name.toLowerCase()}`
            })),
            {
                name: 'Browse All',
                href: `/search-category/${category.name.toLowerCase().replace(/\s+/g, '-')}`
            }
        ]
    }));
};

const initializeNavigation = async () => {
    const categories = await fetchCategories();
    const sections = createSectionsFromApi(categories);

    return {
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
                sections: sections,
            }
        ],
        pages: [
            { name: 'Inicio', href: '/' },
        ],
    };
};

export default initializeNavigation;