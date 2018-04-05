<template>
  <div id="app" class="justify-content-md-center" style="display:flex;">
     <radar-spinner 
          :animation-duration="1000"
          :size="60"
          :color="'#ff1d5e'"
     />
  </div>
</template>

<script>
  // To use minified css and js files instead of .vue single file components:
  // import 'epic-spinners/dist/lib/epic-spinners.min.css'
  // import {AtomSpinner} from 'epic-spinners/dist/lib/epic-spinners.min.js'
  import { RadarSpinner  } from 'epic-spinners'
  export default {
    components: {
      RadarSpinner
    }
  }
</script>