<template>
  <div class="home">
      <uni-badge text="1"></uni-badge>
        <uni-badge text="2" type="success"></uni-badge>
        <uni-badge text="3" type="primary" :inverted="true"></uni-badge>
  </div>
</template>

<script>
import {getPasses} from '../../apis/api.js'
import { uniBadge } from '@dcloudio/uni-ui'
export default {
    components: {uniBadge},
    data() {
        return {

        }
    },
    onLoad() {
        console.log(getPasses())
    },
    methods: {
    }
}
</script>