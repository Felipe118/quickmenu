import type { PaginatedResponse } from "@/types/paginate";
import type { Restaurant } from "@/types/restaurant";
import { restaurantService } from "@/utils/api/restaurantService";
import { defineStore } from "pinia";
import { useToast } from '~/composables/useToast';

const toast = useToast()


export const useRestaurantStore = defineStore("restaurant", {
    state: () => ({
        restaurant: null as Restaurant|null,
        restaurants: null as PaginatedResponse<Restaurant> | null,
    }),
    getters: {
        getRestaurant: (state) => state.restaurant,
        getRestaurants: (state) => state.restaurants,
    },
    actions: {
        async fetchRestaurant(restaurantId:number) {
            try{
                const { data } =
                await restaurantService.getRestaurant(restaurantId);

                this.restaurant = data.value ?? null;
            }catch(error){
                const message = handleError(error)
                toast.error(message || 'Ops, algo deu errado , tente novamente')
            }
           
        },

        async fetchRestaurants() {
            try{
                const { data } = await restaurantService.getRestaurants();

                this.restaurants = data.value ?? null;
            }catch(error){
                const message = handleError(error)
                toast.error(message || 'Ops, algo deu errado , tente novamente')
            }
           
        },

        async changeStatus(restaurantId: number) {
            try{
                return await restaurantService.changeStatus(restaurantId)
            }catch(error){
                const message = handleError(error)
                toast.error(message || 'Ops, algo deu errado , tente novamente')
            }
        }
    },
});
