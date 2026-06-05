<script setup lang="ts">

const route = useRoute()
console.log(route.params.id)
definePageMeta({
    middleware: ['auth']
})

</script>
<template>
    Restaurant
</template>
