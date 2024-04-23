<script setup>

</script>

<template>
    <nav class="navMyAccount">
        <!-- <RouterLink to="/my-account" class="myMenu">My Informations</RouterLink> -->
        <RouterLink to="/my-pixels" class="myMenu">My Pixels</RouterLink>
        <RouterLink to="/my-sales" class="myMenu">My Sales</RouterLink>
        <RouterLink to="/my-shopping-list" class="myMenu">Shop List</RouterLink>
        <RouterLink to="/my-rent" class="myMenu">My Rentals</RouterLink>
    </nav>

</template>

<style scoped lang="scss">
.navMyAccount {
    margin: 9vw 0 0 0;
    height: 26px;
}
.myMenu, .router-link-active {
    margin-top: 5px;
    padding: 10px;

}
.myMenu {
    background: #1f1e24;

}
.router-link-active{
    background: #28272d;
}

</style>