<script lang="ts">
    import { pickedWord } from "$lib/stores";
    import { onMount } from "svelte";

    export let width: string | undefined = undefined;
    export let reversed: boolean = false;
    export let bowtie: string | undefined = undefined;
    export let monochrome: boolean = false;
    export let clickable: boolean = false;

    let SVG: SVGElement | undefined = undefined;

    onMount(() => {
        SVG?.querySelectorAll('path').forEach((path) => {
            path.addEventListener('click', () => {
                $pickedWord = path.classList[0];
                console.log($pickedWord);
            });
        })
        if(!clickable) {
            SVG?.querySelectorAll('path').forEach((path) => {
                path.style.cursor = 'default';

            })
        }
    });

</script>


<svg bind:this={SVG} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        {width} {...$$restProps}
     class:-scale-x-100={reversed}
	 viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve" fill="var(--color-text)">
    {#if !monochrome} 
     <style type="text/css">
        .sunglasses{fill-rule:evenodd;clip-rule:evenodd;fill:var(--color-text);}
        .nose{fill-rule:evenodd;clip-rule:evenodd;fill:var(--color-text);}  /* Black or White */
        .hair{fill-rule:evenodd;clip-rule:evenodd;fill:#FFCE6B;} /* Yellow */
        .shirt{fill-rule:evenodd;clip-rule:evenodd;fill:#04A9DE;} /* Blue */
        .bowtie{fill-rule:evenodd;clip-rule:evenodd;fill:#9E1C20;} /* Red */
    </style>
    {:else}
    <style type="text/css">
        path {
            fill: var(--color-text);
        } /* Red */
    </style>
    {/if}
    
    <path
        class:text-orange-400={clickable}
        class:cursor-pointer={clickable}
        class="nose {clickable ? 'hover:fill-red-400' : ''}" 
        d="M158.3,267.7C158.3,267.7,158.3,267.7,158.3,267.7c1.5,0.5,10.9,3.3,8.4,10.5c0,0-13.4-8.9-22.6-1.1
        c0,0,0.2-0.4,0.5-0.9c-1.2,0.4-2.6,0.2-3.8-0.6c-0.3,0.2-0.5,0.5-0.8,0.7c-5.3-3.6-4.8-9.3-4.8-9.3c-4.9,6,1.4,13.4,1.4,13.4
        c-0.1,0.2-0.3,0.5-0.4,0.7c1.1,1,2,2.2,2.8,3.4c1.3,0,2.7-0.1,4-0.2c1-0.1,2-0.2,3-0.3c7.7-4.2,16.2-3.8,23.7-0.5
        c2.2-0.9,4.5-1.7,6.7-2.6C175.9,277,173.3,265.1,158.3,267.7z"/>
    <path
        class:cursor-pointer={clickable} 
        class="hair {clickable ? 'hover:fill-red-400' : ''}" d="M307.2,220.9c2.9,14.7,2.1,31.4-7.5,47.4c0.2,0,0.4,0,0.5,0c3.8-4.6,12.3-16.3,12.6-27.4c0,0,3,15.7-0.5,30.3
        c6.3,2.3,12.1,5.7,17.4,10c-6.7-38.1-0.4-63,9.1-70.9c0,0-10.5,5.2-14.8,17c6.3-46.6,73.3-41.1,56.7,5.5c-12,33.6-24,38.9-20.5,80
        c7.2-50.6,75.5-87,32.4-132c0,0,21.6,7.4,20.7,33.6c0,0,28.3-31.6,9.6-66.7h0C463.7-1.5,318.6,55.8,266,10.3
        c0.7,2.2,1.6,4.4,2.6,6.5c26.7,63.5,68,80.6,68,80.6c-47.1-2.6-62.1-67.9-117.8-61.5c25.3,3.4,63.2,45.2,63.2,45.2
        c-21.2-9.2-39.2-23.3-39.2-23.3c4.6,9.7,18.5,19.6,18.5,19.6c-33.4-5-51.1-61.8-119.4-46.6c71.4-8.9,70.7,63.1,166.5,76.4
        c-100.5,8.5-134.1-134.1-226-35.1c18.5-17.5,52.6-14.1,52.6-14.1C60.4,91.1,61,160.2,61,160.2c20.7-60.7,69.2-82.7,69.2-82.7
        c-80.2,59.7-58.3,136.6-58.3,136.6c0.6-95.2,75.2-117.7,75.2-117.7C103.5,127.2,94.8,200,94.8,200C122,104.2,183.4,95,183.4,95
        c-62.7,25.4-64.3,95.7-64.3,95.7c18.8-81.1,70.9-85.3,70.9-85.3c-47.7,19.6-48.5,66-48.5,66c11.2-48.9,50.7-54.9,50.7-54.9
        c-24.3,10.5-30.8,31.4-30.8,31.4c17.7-19.6,40.1-25.6,62.7-22c60.9,9.9,86.9-4.5,139.7-2.7c0,0,0.5-20.3-21.5-43.4
        c0,0,32.3,15.9,33.4,47.5c0,0,16.2,2.1,27.2,13.4c0,0-43.8-11.6-76.4-2.6c0,0,15.8-7.4,33-6.2c0,0-30.7-7.2-66.2,15.3
        c-7.2,5-13.6,10.1-18.6,14.4l-0.1,0.1v0c-6.8,5.8-11,9.9-11,9.9s46.9-11.2,84.9,9.3c0,0-33.9-11.6-62.5-5.2c0,0,10.3,12.5,17,30.5"
        />
    <path
        class:cursor-pointer={clickable} 
        class="sunglasses {clickable ? 'hover:fill-red-400' : ''}" d="M303,206.3l-77.2-0.5c0,0-42.9-17.6-68.5,1.9c-11.3,7.4-23.7-13.6-36.4,2c-4.6,5.6-9.6,40.7,24.2,41.8
        c0,0-3.6,10.4-7.8,11.9c0,0,17.3-2.6,16-39.2c0,0,5.4-4.8,6.5,2.2c10,66,73,37.6,68.6-4.6l78.8-0.7"/>
    <path
        class:cursor-pointer={clickable} 
        class="shirt {clickable ? 'hover:fill-red-400' : ''}" d="M351.1,336.2c0,0,4.3,22.1-95.3,67.5c0,0-11.9,14.6-14.7,31.2l-15.5,0.5l12.9-6.7c0,0,1.5-12.5,9.6-23.2
        c1.3-1.3,2.5-2.8,3.8-4.3c2.3-2.3,4.9-4.3,8-6c18.5-10.2,94-42.7,85.9-64.7c0,0,8-25.2,26.5-2.2l12.2,46.2l15,2.6
        c0,0-16,62.6-65.1,109.6c0,0,46-62.8,50.7-103.5c0,0-20,32-59.1,57.2c0,0,36.2-32.9,47.5-56.1c0,0-18.5,22-35.8,29.6
        c0,0,24.2-22,34.8-38c0,0-21.1,19.7-34,25.6c0,0,17.2-17.5,21.9-24c0,0-14.7,13.9-27.9,21c0,0,20.1-18.5,30-32.4
        c0,0-22.3,17.4-39.3,26.7c0,0,20.2-18.1,29.3-27.7c0,0-22.7,16.3-38.1,22.7c0,0,39.1-27.2,51.4-49.3c0,0,1.1-9.5-7.7-12.2
        C349.3,324,351.1,336.2,351.1,336.2z"/>
    <path 
        class:cursor-pointer={clickable}
        class="bowtie {clickable ? 'hover:fill-red-400' : ''}" d="M220.6,447.5l26.8-0.2c0,0,37.6-20.5,59.4-21c0,0-23.9-2.1-44.2,7.6c0,0,23.9-20,40.2-24.3
        c0,0-33.2,7.1-51.9,24.6c0,0,10.6-32.7,60.6-35.3c0,0,20.7,55.3-5.4,90.8c0,0-32.2-11.6-62.8-34.9l-18.7,1.8
        c0,0-20.8,28.5-52.3,30.8c0,0-11.7-30.3-10.8-55.2c0.1,0,28.7,2.5,43.4,8.3c0,0-10.8-0.8-15.3-0.1
        C189.5,440.4,213.8,442.9,220.6,447.5"/>
    <g>
        <path 
            class:cursor-pointer={clickable}
            class="st0 {clickable ? 'hover:fill-red-400' : ''}" d="M-247.1,492.5l-219.8-380.7h82.9v24.4h-40.6l177.5,307.4l88.7-153.7l88.7-153.7H-121v-24.4h93.7L-247.1,492.5"
            />
    </g>
    </svg>
    

<style>

    svg {
        transition: all 0.5s ease-in-out;
    }
</style>