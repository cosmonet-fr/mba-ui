<script setup>
setInterval(function () {
    console.log("Down with Big Brother !");
}, 1000);
</script>

<template>
    <div class="bb" >
        <img src="@/assets/BB3.png" alt="">

    </div>
</template>
<style lang="scss" scoped >
.bb {
    z-index: 99999;
    position: fixed;
    top: 0; bottom: 0; left: 0; right: 0;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>