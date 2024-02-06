<script setup>
const mode = import.meta.env.MODE;
const devEnv = import.meta.env.DEV;
if (import.meta.env.DEV) { console.table(import.meta.env) }

</script>
<template>
    <div class="env" v-if="devEnv" >
        <p>{{mode}}</p>

    </div>
</template>
<style lang="scss" scoped >
.env {
    position: fixed;
    bottom: 0; right: 0;
    z-index: 9999;
    background: red;

}
</style>