interface ICartModifier {
    id: string;
    name: string;
    price: number;
}

interface ICartItem {
    description: string;
    id: string;
    _uniqueID?: string;
    price: number;
    tax: number;
    modifiers: ICartModifier[];
}

interface ICartCategory {
    category: string;
    description: string;
    id: string;
    items: ICartItem[];
}