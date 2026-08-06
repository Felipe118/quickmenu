import type { RestaurantFormData } from "@/schemas/restaurant";
import type { PaginatedResponse } from "@/types/paginate";
import type { MessageResponse } from '@/types/response';
import type { Restaurant } from '@/types/restaurant';

export const restaurantService = {
    getRestaurant(restaurantId: number) {
        return useApi<Restaurant>(
        `/restaurants/${restaurantId}`,
        {
            method: 'GET',
        },
        )
    },

    getRestaurants() {
        return useApi<PaginatedResponse<Restaurant>>('/restaurants', {
            method: 'GET',
        })
    },

    updateRestaurant(restaurantId: number, formData: RestaurantFormData) {
        return useApi<Restaurant>(
            `/restaurants/${restaurantId}`,
            {
                method: 'PUT',
                body: formData,
            },
        )
    },

    changeStatus(restaurantId: number){
        return useApi<MessageResponse>(
            `/restaurants/${restaurantId}`,
            {
                method: 'DELETE',
            },
        )
    }
}
