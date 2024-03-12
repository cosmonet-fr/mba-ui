<template>
    <div id="loading" class="loading">
        <div>
            <h1>
                The Million Bitcoin App !
            </h1>
            <h2>
                In Satoshi Nakamoto We Trust
            </h2>

        </div>
        <div class="loadingIcon" >
            <img src="../assets/loading.svg" alt="Now Loading">
            <p>Now Loading ...</p>
        </div>
        <div class="bottomLoading" >
            <p>Alpha 3 version</p>
        </div>

    </div>

</template>

<style lang="scss" scoped>
* {
    text-align: center;

h1 {
    margin-top: 20vh;
}}
h2 {
    @media (min-width: 600px) {
        font-size: 2rem;
    }
}
.loading{
    z-index: 2002;
    position: absolute;
    top: 0; bottom: 0; left: 0; right: 0;
    // background: #28272d;
    // background: #176baf;
    // background: linear-gradient(#8b48bb, #8162b9); // Color for Alpha 1
    background: linear-gradient(#aaf255, #09af00); // Color for Alpha 2
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.loadingIcon{
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    p {
        font-size: 1,5em;
        font-weight: bold;
    }

}
.bottomLoading {
margin: 25px 0;
}
</style>