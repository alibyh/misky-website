export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    tag?: string;
    subtext: string;
}

export interface NavItem {
    icon: string;
    label: string;
    path: string;
    isActive?: boolean;
}