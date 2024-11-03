<script lang="ts">

    import {getIconFor} from "../../lib/icons";
    
    type Props = { name: string }
    
    let { name }: Props = $props();
    let isImposter = $derived();

    
</script>