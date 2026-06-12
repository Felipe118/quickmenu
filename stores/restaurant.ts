import type { Restaurant } from "@/types/restaurant";
import { restaurantService } from "@/utils/api/restaurantService";
import { defineStore } from "pinia";
import { useToast } from '~/composables/useToast';

const toast = useToast()


export const useRestaurantStore = defineStore("restaurant", {
    state: () => ({
        restaurant: null as Restaurant|null,
    }),
    getters: {
        getRestaurant: (state) => state.restaurant,
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
    },
});
