<script lang="ts">
    type Props = {
        data: {
            username: string,
            text: string
        }
    }
    let {data}: Props = $props();
</script>

<div>
    <span>{data.username}</span>
    <span>{data.text}</span>
</div>

<style>
    div {
        
    }
</style>