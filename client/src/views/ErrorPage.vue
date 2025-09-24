<template>
    <div class="px-4">
        <div>
            <img id="thinking" src="../assets/thinking.gif" class="img-fluid">
        </div>
        <div id="errorCode"><strong>404</strong></div>
        <div class="msg">Uh-oh! We couldn't find the page you were looking for!</div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
    #errorCode {
        font-size: 4rem;
        color: white;
    }
    .msg {
        color: white;
        font-size: 2rem;
    }

    #thinking {
        width: 15rem;
    }

</style>