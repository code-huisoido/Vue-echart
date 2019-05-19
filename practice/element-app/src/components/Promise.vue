<template>
    <div class="content">
        <el-row>
        <el-button type="primary" @click="promise">
            主要按钮
        </el-button>
    </el-row>
    </div>
</template>
<script>
    
    export default {
        methods: {
            promise: function() {
                let promise = new Promise(function(resolve, reject){
                    console.log('Promise')
                    resolve()
                })

                promise.then(function() {
                    console.log('resolved.')
                })

                console.log('Hi!')
            }
        }
    }
</script>