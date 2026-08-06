export interface RestaurantMe {
    id: number
    name: string
    status: boolean
}

export interface Address {
    address_name: string;
    number: string;
    id: number;
    complement?: string;
    district?: string;
    city: string;
    state: string;
    cep: string;
    quatrain?: string;
    neighborhood?: string;
}

export interface Restaurant {
    id: number
    name: string
    perfil_img?: File
    capa_img?: File
    email: string
    open_time: string
    close_time: string
    phone: string
    active: boolean
    address_id: number
    slug: string
    address: Address
}

