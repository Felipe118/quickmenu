import type { Restaurant } from '@/types/restaurant'

export const restaurantService = {
    getRestaurant(restaurantId: number) {
        return useApi<Restaurant>(
        `/restaurants/${restaurantId}`,
        {
            method: 'GET',
        },
        )
    },
}
