export const useRestaurant = () => {
    const restaurant = useState('restaurant')

    const setRestaurant = (value:any) => {
        restaurant.value = value
    }

    return {
        restaurant,
        setRestaurant,
    }
}
